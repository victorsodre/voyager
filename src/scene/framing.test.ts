import test from 'node:test';
import assert from 'node:assert/strict';
import { PerspectiveCamera,Vector3 } from 'three';
import { fitPoints } from './camera.ts';
test('asymmetric spacecraft fits its actual vertices in three viewport proportions',()=>{
 const points=[new Vector3(-2,0,-4),new Vector3(2,2,2),new Vector3(0,9,13),new Vector3(-4,-2,2),new Vector3(4,-2,2)];
 for(const aspect of [1.5,.46,2.16])for(const direction of [new Vector3(1,.5,1),new Vector3(.4,.7,1.5)]){
  const camera=new PerspectiveCamera(38,aspect,.01,1000);fitPoints(camera,points,direction);camera.updateMatrixWorld(true);
  for(const p of points){const q=p.clone().project(camera);assert.ok(Math.abs(q.x)<=1&&Math.abs(q.y)<=1&&q.z<1);}
 }
});
