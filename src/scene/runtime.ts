import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { loadModel } from './model.ts';
import { fitPoints,keepOrbit } from './camera.ts';
import { saveSceneImage } from './capture.ts';
import { isTap,pickOffsets } from './pointer.ts';
import type { Assembly,Part,SceneHandle,ViewState } from './types.ts';

type GhostBase={transparent:boolean;opacity:number;depthWrite:boolean};
/** Dim a material so the selected part stands out without a bounding box crossing the screen. */
function setGhost(material:T.Material,dim:boolean){
 if(Boolean(material.userData.ghost)===dim)return;
 const base=(material.userData.base??={transparent:material.transparent,opacity:material.opacity,depthWrite:material.depthWrite}) as GhostBase;
 material.userData.ghost=dim;material.transparent=dim||base.transparent;material.opacity=dim?.16:base.opacity;material.depthWrite=dim?false:base.depthWrite;material.needsUpdate=true;
}
const materialsOf=(mesh:T.Mesh)=>Array.isArray(mesh.material)?mesh.material:[mesh.material];

export function createScene(host:HTMLElement,onSelect:(id:string)=>void,onReady:(parts:Part[])=>void,onError:(message:string)=>void):SceneHandle{
 const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 const canvas=renderer.domElement;canvas.setAttribute('aria-label','Voyager 1 em 3D. Arraste para girar; selecione um conjunto para explorar.');host.append(canvas);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.01,800),controls=new OrbitControls(camera,canvas);
 controls.enableDamping=false;controls.minDistance=.25;controls.maxDistance=100;
 // On touch screens a vertical swipe scrolls the page; a sideways swipe or a pinch moves the probe.
 canvas.style.touchAction=matchMedia('(pointer: coarse)').matches?'pan-y':'none';
 const room=new RoomEnvironment(),pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.7;room.dispose();pmrem.dispose();
 scene.add(new T.HemisphereLight('#c8ddff','#2d3041',1.35));const light=new T.DirectionalLight('#ffefd5',2.6);light.position.set(6,10,12);scene.add(light);
 const positions=new Float32Array(720*3);let seed=7;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<720;i++){const angle=random()*Math.PI*2,z=random()*2-1,r=Math.sqrt(1-z*z);positions.set([r*Math.cos(angle)*160,z*160,r*Math.sin(angle)*160],i*3);}
 const starsGeometry=new T.BufferGeometry();starsGeometry.setAttribute('position',new T.BufferAttribute(positions,3));const starsMaterial=new T.PointsMaterial({color:'#8d9ab9',size:.14,transparent:true,opacity:.55});scene.add(new T.Points(starsGeometry,starsMaterial));
 const abort=new AbortController(),direction=new T.Vector3(1,.5,1);let model:Assembly|undefined,disposed=false,active=false,framed=false,last=-Infinity;
 let state:ViewState={selected:null,isolated:false,wireframe:false,visible:true};
 let previousPose:{position:T.Vector3;target:T.Vector3}|null=null;
 const pointCache=new Map<string,T.Vector3[]>();
 const points=(id?:string)=>{if(!model)return [];if(!id)return model.points;let out=pointCache.get(id);if(out)return out;out=[];const group=model.parts.find(p=>p.id===id)?.group;group?.traverse(o=>{if(o instanceof T.Mesh){const a=o.geometry.getAttribute('position');for(let i=0;i<a.count;i++)out!.push(new T.Vector3().fromBufferAttribute(a,i));}});pointCache.set(id,out);return out;};
 const shown=()=>points(state.isolated?state.selected??undefined:undefined);
 const invalidate=()=>{if(disposed||!state.visible||document.hidden||active)return;active=true;renderer.setAnimationLoop(frame);};
 function frame(time:number){
  if(time-last<1000/30)return;last=time;const moved=controls.update();renderer.render(scene,camera);
  if(import.meta.env.DEV){const data=canvas.dataset;data.renderCount=String(Number(data.renderCount??0)+1);data.drawCalls=String(renderer.info.render.calls);data.cameraPose=JSON.stringify([...camera.position.toArray(),...controls.target.toArray()]);}
  if(!moved){renderer.setAnimationLoop(null);active=false;}
 }
 const fit=(dir:T.Vector3)=>{if(!model)return;controls.target.copy(fitPoints(camera,shown(),dir));controls.update();framed=true;invalidate();};
 const home=()=>fit(direction);
 const reframe=()=>fit(framed?camera.position.clone().sub(controls.target):direction);
 const ghosting=(on:boolean)=>{model?.parts.forEach(p=>{const dim=on&&Boolean(state.selected)&&!state.isolated&&p.id!==state.selected;p.group.traverse(o=>{if(o instanceof T.Mesh)materialsOf(o).forEach(m=>setGhost(m,dim));});});};
 const size=()=>{
  if(!state.visible||host.closest('.journey-mode'))return;const {width,height}=host.getBoundingClientRect();if(width<1||height<1)return;
  const current=renderer.getSize(new T.Vector2());if(current.x!==width||current.y!==height)renderer.setSize(width,height);
  const previous=camera.aspect,aspect=width/height;if(Math.abs(aspect-previous)<=.0001){invalidate();return;}
  camera.aspect=aspect;camera.updateProjectionMatrix();
  if(framed){keepOrbit(camera,controls.target,shown(),previous);controls.update();}
  invalidate();
 };
 const observer=new ResizeObserver(size);observer.observe(host);controls.addEventListener('change',invalidate);
 // The page keeps scrolling with the wheel; Ctrl/⌘ + wheel (and trackpad pinch) zooms the probe.
 const wheel=(e:WheelEvent)=>{if(!e.ctrlKey&&!e.metaKey)e.stopPropagation();};host.addEventListener('wheel',wheel,{capture:true});
 let press:{id:number;x:number;y:number}|null=null;
 const pointerDown=(e:PointerEvent)=>{press=e.isPrimary?{id:e.pointerId,x:e.clientX,y:e.clientY}:null;};
 const pointerCancel=()=>{press=null;};
 const pick=(e:PointerEvent)=>{
  if(!model)return;const rect=canvas.getBoundingClientRect(),ray=new T.Raycaster(),meshes:T.Mesh[]=[];model.root.traverseVisible(o=>{if(o instanceof T.Mesh)meshes.push(o);});
  for(const [dx,dy] of pickOffsets(e.pointerType)){
   ray.setFromCamera(new T.Vector2((e.clientX+dx-rect.left)/rect.width*2-1,-(e.clientY+dy-rect.top)/rect.height*2+1),camera);
   let hit:T.Object3D|undefined=ray.intersectObjects(meshes,false)[0]?.object;while(hit&&!hit.userData.partId)hit=hit.parent??undefined;
   if(hit){onSelect(hit.userData.partId);return;}
  }
  // A tap on empty space is ignored: it must not undo a selection or an isolated part.
 };
 const pointerUp=(e:PointerEvent)=>{const start=press;press=null;if(!start||start.id!==e.pointerId||!isTap(e.clientX-start.x,e.clientY-start.y,e.pointerType))return;pick(e);};
 canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerCancel);
 const visibility=()=>{if(document.hidden||!state.visible){renderer.setAnimationLoop(null);active=false;}else{last=-Infinity;invalidate();}};
 document.addEventListener('visibilitychange',visibility);
 const lost=(e:Event)=>{e.preventDefault();renderer.setAnimationLoop(null);active=false;onError('A cena 3D foi interrompida. Recarregue para restaurar o modelo; a viagem e as fontes continuam disponíveis.');};canvas.addEventListener('webglcontextlost',lost);
 loadModel(abort.signal).then(value=>{if(disposed){value.dispose();return;}model=value;scene.add(model.root);onReady(model.parts);size();home();}).catch(()=>{if(!disposed)onError('Não foi possível carregar o modelo. Confira a conexão e tente novamente. Você pode explorar a viagem e consultar as fontes.');});
 size();
 return {
  update(next){const wasIsolated=state.isolated;state=next;controls.enabled=state.visible;
   if(model){model.parts.forEach(p=>p.group.visible=!state.isolated||p.id===state.selected);model.root.traverse(o=>{if(o instanceof T.Mesh)for(const material of materialsOf(o))if(material instanceof T.MeshStandardMaterial)material.wireframe=state.wireframe;});ghosting(true);
    if(!wasIsolated&&state.isolated){previousPose={position:camera.position.clone(),target:controls.target.clone()};reframe();}
    if(wasIsolated&&!state.isolated&&previousPose){camera.position.copy(previousPose.position);controls.target.copy(previousPose.target);controls.update();previousPose=null;}
   }if(state.visible)size();visibility();invalidate();
  },home,reframe,
  focus(id){if(!model)return;controls.target.copy(fitPoints(camera,points(id),id==='record'?new T.Vector3(1,.05,.2):direction));controls.update();framed=true;invalidate();},
  zoom(factor){camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);controls.update();invalidate();},
  capture(portrait=false){if(!model)return;saveSceneImage(renderer,scene,camera,shown(),portrait,()=>{ghosting(false);return()=>ghosting(true);});invalidate();},
  dispose(){disposed=true;abort.abort();renderer.setAnimationLoop(null);observer.disconnect();host.removeEventListener('wheel',wheel,{capture:true});controls.removeEventListener('change',invalidate);controls.dispose();canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointerup',pointerUp);canvas.removeEventListener('pointercancel',pointerCancel);canvas.removeEventListener('webglcontextlost',lost);document.removeEventListener('visibilitychange',visibility);model?.dispose();env.dispose();starsGeometry.dispose();starsMaterial.dispose();renderer.dispose();canvas.remove();}
 };
}
