import test from 'node:test';
import assert from 'node:assert/strict';
import { milestones } from '../content/journey.ts';
import { advanceJourney,journeyIndex } from './journey.ts';
test('milestones are Voyager 1 chronology with the future milestone identified',()=>{
 for(let i=1;i<milestones.length;i++)assert.ok(milestones[i].date>milestones[i-1].date);
 assert.equal(milestones.at(-1)!.kind,'forecast');assert.equal(milestones.at(-1)!.date,'2026-11-18');
 assert.ok(!milestones.some(m=>['uranus','neptune'].includes(m.id)));
});
test('journey progression clamps, pauses and stops at last milestone',()=>{
 assert.equal(advanceJourney(.4,1,false,true),.4);assert.equal(advanceJourney(.4,1,true,false),.4);
 assert.equal(advanceJourney(1,.1,true,true),1);assert.ok(advanceJourney(.4,50,true,true)-.4<=.0051);
 assert.equal(journeyIndex(NaN),0);assert.equal(journeyIndex(1),5);assert.equal(journeyIndex(-1),0);
});
