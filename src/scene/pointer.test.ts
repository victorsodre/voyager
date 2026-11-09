import test from 'node:test';
import assert from 'node:assert/strict';
import { isTap,pickOffsets } from './pointer.ts';
test('a drag is not a tap, and a finger gets more allowance than a mouse',()=>{
 assert.ok(isTap(3,3,'mouse'));assert.ok(!isTap(8,0,'mouse'));
 assert.ok(isTap(8,0,'touch'));assert.ok(!isTap(12,4,'touch'));
});
test('pick probes the exact point first, then rings ordered by distance',()=>{
 for(const type of ['mouse','touch']){
  const offsets=pickOffsets(type);assert.deepEqual(offsets[0],[0,0]);assert.equal(offsets.length,17);
  const radii=offsets.map(([x,y])=>Math.hypot(x,y));for(let i=1;i<radii.length;i++)assert.ok(radii[i]>=radii[i-1]-1e-3);
 }
 assert.ok(Math.max(...pickOffsets('touch').map(([x,y])=>Math.hypot(x,y)))>Math.max(...pickOffsets('mouse').map(([x,y])=>Math.hypot(x,y))));
});
