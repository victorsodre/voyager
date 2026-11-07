import * as T from 'three';
/** Copy whole triangles and only referenced vertices; never cut faces by an arbitrary clipping box. */
export function subsetGeometry(source:T.BufferGeometry, triangles:number[], matrix:T.Matrix4) {
 const original=source.index;if(!original)throw Error('O modelo deve possuir índices.');
 const oldToNew=new Map<number,number>(),vertices:number[]=[],indices:number[]=[];
 for(const triangle of triangles)for(let j=0;j<3;j++){
  const old=original.getX(triangle*3+j);
  if(!oldToNew.has(old)){oldToNew.set(old,vertices.length);vertices.push(old);}
  indices.push(oldToNew.get(old)!);
 }
 const geometry=new T.BufferGeometry();
 for(const [key,attribute] of Object.entries(source.attributes)){
  const data=new Float32Array(vertices.length*attribute.itemSize);
  vertices.forEach((old,i)=>{for(let j=0;j<attribute.itemSize;j++)data[i*attribute.itemSize+j]=attribute.getComponent(old,j);});
  geometry.setAttribute(key,new T.Float32BufferAttribute(data,attribute.itemSize));
 }
 geometry.setIndex(indices);geometry.applyMatrix4(matrix);geometry.computeBoundingBox();geometry.computeBoundingSphere();return geometry;
}
