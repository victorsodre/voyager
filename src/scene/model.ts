import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader,DRACO_GLTF_CONFIG } from 'three/addons/loaders/DRACOLoader.js';
import manifest from '../content/partition.json';
import { catalog } from '../content/catalog.ts';
import { subsetGeometry } from './partition.ts';
import { disposeTree } from './geometry.ts';
import type { Assembly } from './types.ts';

export async function loadModel(signal:AbortSignal):Promise<Assembly>{
 const root=new T.Group(),parts=catalog.map(info=>({...info,group:new T.Group()}));
 parts.forEach(p=>{p.group.name=p.id;p.group.userData.partId=p.id;root.add(p.group);});
 const decoder=new DRACOLoader();decoder.setDecoderPath(DRACO_GLTF_CONFIG);decoder.setWorkerLimit(1);
 const loader=new GLTFLoader();loader.setDRACOLoader(decoder);
 let original:T.Group|undefined;
 // One material clone per part (textures stay shared) so a selection can dim the other parts.
 const clones=new Map<string,T.Material>();
 const partMaterial=(part:number,material:T.Material)=>{const key=`${part}:${material.uuid}`;let clone=clones.get(key);if(!clone){clone=material.clone();clones.set(key,clone);}return clone;};
 try{
  const response=await fetch(`${import.meta.env.BASE_URL}models/voyager-nasa.glb`,{signal:AbortSignal.any([signal,AbortSignal.timeout(20000)])});
  if(!response.ok)throw Error('Não foi possível carregar o modelo oficial.');
  const gltf=await loader.parseAsync(await response.arrayBuffer(),'');original=gltf.scene;signal.throwIfAborted();original.updateMatrixWorld(true);
  const sources:T.Mesh[]=[];original.traverse(o=>{if(o instanceof T.Mesh)sources.push(o);});
  const meshes=manifest.meshes as Record<string,number[]>;
  for(const source of sources){
   const assignment=meshes[source.name];if(!assignment||assignment.length!==source.geometry.index!.count/3)throw Error('Modelo e catálogo incompatíveis.');
   parts.forEach((p,i)=>{
    const triangles=assignment.flatMap((id,t)=>id===i?[t]:[]);if(!triangles.length)return;
    const mesh=new T.Mesh(subsetGeometry(source.geometry,triangles,source.matrixWorld),partMaterial(i,source.material as T.Material));p.group.add(mesh);
   });
  }
  // Textures are shared with the clones and owned by the resulting model; dispose only source geometries and materials.
  for(const source of sources){source.geometry.dispose();(source.material as T.Material).dispose();}
  const points:T.Vector3[]=[];root.traverse(o=>{if(o instanceof T.Mesh){const a=o.geometry.getAttribute('position');for(let i=0;i<a.count;i++)points.push(new T.Vector3().fromBufferAttribute(a,i));}});
  return {root,parts,points,dispose:()=>disposeTree(root)};
 }catch(error){if(original)disposeTree(original);disposeTree(root);throw error;}
 finally{decoder.dispose();}
}
