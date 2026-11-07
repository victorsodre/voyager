import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { loadModel } from './model.ts';
import { fitPoints } from './camera.ts';
import { saveSceneImage } from './capture.ts';
import type { Assembly,Part,SceneHandle,ViewState } from './types.ts';
export function createScene(host:HTMLElement,onSelect:(id:string|null)=>void,onReady:(parts:Part[])=>void,onError:(message:string)=>void):SceneHandle{
 const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 renderer.domElement.setAttribute('aria-label','Voyager 1 em 3D. Arraste para girar; selecione um conjunto para explorar.');host.append(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.01,800),controls=new OrbitControls(camera,renderer.domElement);
 controls.enableDamping=false;controls.minDistance=.25;controls.maxDistance=100;
 const room=new RoomEnvironment(),pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.7;room.dispose();pmrem.dispose();
 scene.add(new T.HemisphereLight('#c8ddff','#2d3041',1.35));const light=new T.DirectionalLight('#ffefd5',2.6);light.position.set(6,10,12);scene.add(light);
 const positions=new Float32Array(720*3);let seed=7;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<720;i++){const angle=random()*Math.PI*2,z=random()*2-1,r=Math.sqrt(1-z*z);positions.set([r*Math.cos(angle)*160,z*160,r*Math.sin(angle)*160],i*3);}
 const starsGeometry=new T.BufferGeometry();starsGeometry.setAttribute('position',new T.BufferAttribute(positions,3));const starsMaterial=new T.PointsMaterial({color:'#8d9ab9',size:.14,transparent:true,opacity:.55});scene.add(new T.Points(starsGeometry,starsMaterial));
 const highlight=new T.BoxHelper(new T.Object3D(),'#ffd21f');highlight.visible=false;scene.add(highlight);
 const abort=new AbortController(),direction=new T.Vector3(1,.5,1);let model:Assembly|undefined,disposed=false,active=false,last=-Infinity;
 let state:ViewState={selected:null,isolated:false,wireframe:false,visible:true};
 let previousPose:{position:T.Vector3;target:T.Vector3}|null=null;
 const points=(id?:string)=>{if(!model)return [];if(!id)return model.points;const group=model.parts.find(p=>p.id===id)?.group,out:T.Vector3[]=[];group?.traverse(o=>{if(o instanceof T.Mesh){const a=o.geometry.getAttribute('position');for(let i=0;i<a.count;i++)out.push(new T.Vector3().fromBufferAttribute(a,i));}});return out;};
 const invalidate=()=>{if(disposed||!state.visible||document.hidden||active)return;active=true;renderer.setAnimationLoop(frame);};
 function frame(time:number){if(time-last<1000/30)return;last=time;const moved=controls.update();renderer.render(scene,camera);const data=renderer.domElement.dataset;data.renderCount=String(Number(data.renderCount??0)+1);data.drawCalls=String(renderer.info.render.calls);data.triangles=String(renderer.info.render.triangles);data.cameraPose=JSON.stringify([...camera.position.toArray(),...controls.target.toArray()]);if(!moved){renderer.setAnimationLoop(null);active=false;}}
 const home=()=>{if(!model)return;controls.target.copy(fitPoints(camera,points(state.isolated?state.selected??undefined:undefined),direction));controls.update();invalidate();};
 const size=()=>{if(!state.visible||host.closest('.journey-mode'))return;const {width,height}=host.getBoundingClientRect();if(width<1||height<1)return;const aspect=width/height,changed=Math.abs(aspect-camera.aspect)>.0001;const currentSize=renderer.getSize(new T.Vector2());if(currentSize.x!==width||currentSize.y!==height)renderer.setSize(width,height);camera.aspect=aspect;camera.updateProjectionMatrix();if(changed)home();invalidate();};
 const observer=new ResizeObserver(size);observer.observe(host);controls.addEventListener('change',invalidate);
 const down=new T.Vector2();const pointerDown=(e:PointerEvent)=>down.set(e.clientX,e.clientY);
 const pointerUp=(e:PointerEvent)=>{if(!model||down.distanceTo(new T.Vector2(e.clientX,e.clientY))>6)return;const rect=renderer.domElement.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const meshes:T.Mesh[]=[];model.root.traverseVisible(o=>{if(o instanceof T.Mesh)meshes.push(o);});let current:T.Object3D|undefined=ray.intersectObjects(meshes,false)[0]?.object;while(current&&!current.userData.partId)current=current.parent??undefined;onSelect(current?.userData.partId??null);};
 renderer.domElement.addEventListener('pointerdown',pointerDown);renderer.domElement.addEventListener('pointerup',pointerUp);
 const visibility=()=>{if(document.hidden||!state.visible){renderer.setAnimationLoop(null);active=false;}else{last=-Infinity;invalidate();}};
 document.addEventListener('visibilitychange',visibility);
 const lost=(e:Event)=>{e.preventDefault();renderer.setAnimationLoop(null);active=false;onError('A cena 3D foi interrompida. Recarregue para restaurar o modelo; a viagem e as fontes continuam disponíveis.');};renderer.domElement.addEventListener('webglcontextlost',lost);
 loadModel(abort.signal).then(value=>{if(disposed){value.dispose();return;}model=value;scene.add(model.root);onReady(model.parts);size();home();}).catch(()=>{if(!disposed)onError('Não foi possível carregar o modelo. Confira a conexão e tente novamente. Você pode explorar a viagem e consultar as fontes.');});
 size();
 return {
  update(next){const wasIsolated=state.isolated;state=next;controls.enabled=state.visible;
   if(model){model.parts.forEach(p=>p.group.visible=!state.isolated||p.id===state.selected);model.root.traverse(o=>{if(o instanceof T.Mesh){for(const material of Array.isArray(o.material)?o.material:[o.material])if(material instanceof T.MeshStandardMaterial)material.wireframe=state.wireframe;}});const selected=model.parts.find(p=>p.id===state.selected);highlight.visible=Boolean(selected)&&!state.isolated;if(selected)highlight.setFromObject(selected.group);
    if(!wasIsolated&&state.isolated){previousPose={position:camera.position.clone(),target:controls.target.clone()};home();}
    if(wasIsolated&&!state.isolated&&previousPose){camera.position.copy(previousPose.position);controls.target.copy(previousPose.target);controls.update();previousPose=null;}
   }if(state.visible)size();visibility();invalidate();
  },home,focus(id){if(!model)return;controls.target.copy(fitPoints(camera,points(id),id==='record'?new T.Vector3(1,.05,.2):direction));controls.update();invalidate();},
  zoom(factor){camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);controls.update();invalidate();},
  capture(portrait=false){if(!model)return;saveSceneImage(renderer,scene,camera,points(state.isolated?state.selected??undefined:undefined),portrait);invalidate();},
  dispose(){disposed=true;abort.abort();renderer.setAnimationLoop(null);observer.disconnect();controls.removeEventListener('change',invalidate);controls.dispose();renderer.domElement.removeEventListener('pointerdown',pointerDown);renderer.domElement.removeEventListener('pointerup',pointerUp);renderer.domElement.removeEventListener('webglcontextlost',lost);document.removeEventListener('visibilitychange',visibility);model?.dispose();env.dispose();starsGeometry.dispose();starsMaterial.dispose();highlight.geometry.dispose();(highlight.material as T.Material).dispose();renderer.dispose();renderer.domElement.remove();}
 };
}
