import { PerspectiveCamera, Vector3 } from 'three';

/**
 * Center and camera distance that frame the actual vertices seen from `direction`.
 * A long diagonal boom leaves large empty corners in an axis-aligned box, so the box is never used.
 */
export function frameFor(fov:number,aspect:number,points:Vector3[],direction:Vector3){
 const forward=direction.clone().normalize();
 const vertical=Math.abs(forward.y)>.99?new Vector3(0,0,1):new Vector3(0,1,0);
 const right=vertical.cross(forward).normalize(),up=forward.clone().cross(right).normalize();
 const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
 for(const p of points){const values=[p.dot(right),p.dot(up),p.dot(forward)];values.forEach((v,i)=>{low[i]=Math.min(low[i],v);high[i]=Math.max(high[i],v);});}
 const center=points.length?right.clone().multiplyScalar((low[0]+high[0])/2).addScaledVector(up,(low[1]+high[1])/2).addScaledVector(forward,(low[2]+high[2])/2):new Vector3();
 const tanV=Math.tan(fov*Math.PI/360),tanH=tanV*Math.max(.1,aspect);let distance=1;
 const relative=new Vector3();
 for(const p of points){relative.copy(p).sub(center);const depth=relative.dot(forward);distance=Math.max(distance,Math.abs(relative.dot(right))/tanH+depth,Math.abs(relative.dot(up))/tanV+depth);}
 return {center,distance:distance*1.08};
}

/** Place the camera so the points fill the view from `direction`; returns the new orbit target. */
export function fitPoints(camera:PerspectiveCamera,points:Vector3[],direction:Vector3){
 const {center,distance}=frameFor(camera.fov,camera.aspect,points,direction);
 camera.position.copy(center).addScaledVector(direction.clone().normalize(),distance);camera.lookAt(center);camera.updateProjectionMatrix();return center;
}

/**
 * After the viewport proportion changes (resize, fullscreen, rotation), keep the user's orbit:
 * same target and viewing direction, distance scaled by how much the fit changed with the new aspect.
 */
export function keepOrbit(camera:PerspectiveCamera,target:Vector3,points:Vector3[],previousAspect:number){
 const offset=camera.position.clone().sub(target);
 if(!points.length||offset.lengthSq()===0)return;
 const before=frameFor(camera.fov,previousAspect,points,offset).distance,after=frameFor(camera.fov,camera.aspect,points,offset).distance;
 camera.position.copy(target).addScaledVector(offset,after/before);camera.lookAt(target);camera.updateProjectionMatrix();
}
