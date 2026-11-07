import { PerspectiveCamera, Vector3 } from 'three';

/** Frame actual vertices; a long diagonal boom leaves large empty corners in an axis-aligned box. */
export function fitPoints(camera:PerspectiveCamera,points:Vector3[],direction:Vector3){
 const forward=direction.clone().normalize();
 const vertical=Math.abs(forward.y)>.99?new Vector3(0,0,1):new Vector3(0,1,0);
 const right=vertical.cross(forward).normalize(),up=forward.clone().cross(right).normalize();
 const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
 for(const p of points){const values=[p.dot(right),p.dot(up),p.dot(forward)];values.forEach((v,i)=>{low[i]=Math.min(low[i],v);high[i]=Math.max(high[i],v);});}
 const center=points.length?right.clone().multiplyScalar((low[0]+high[0])/2).addScaledVector(up,(low[1]+high[1])/2).addScaledVector(forward,(low[2]+high[2])/2):new Vector3();
 const tanV=Math.tan(camera.fov*Math.PI/360),tanH=tanV*Math.max(.1,camera.aspect);let distance=1;
 for(const p of points){const relative=p.clone().sub(center),depth=relative.dot(forward);distance=Math.max(distance,Math.abs(relative.dot(right))/tanH+depth,Math.abs(relative.dot(up))/tanV+depth);}
 camera.position.copy(center).addScaledVector(forward,distance*1.08);camera.lookAt(center);camera.updateProjectionMatrix();return center;
}
