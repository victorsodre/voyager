import test from 'node:test';
import assert from 'node:assert/strict';
import { milestones } from '../content/journey.ts';
import { advanceJourney,journeyIndex,milestoneProgress,resolveMilestones } from './journey.ts';
test('milestones are Voyager 1 chronology ending at the light-day milestone',()=>{
 for(let i=1;i<milestones.length;i++)assert.ok(milestones[i].date>milestones[i-1].date);
 assert.equal(milestones.at(-1)!.kind,'lightday');assert.equal(milestones.at(-1)!.date,'2026-11-18');
 assert.ok(!milestones.some(m=>['uranus','neptune'].includes(m.id)));
});
test('light-day milestone reads as forecast before the NASA date and as past after it',()=>{
 const before=resolveMilestones(new Date('2026-11-09T12:00:00Z')).at(-1)!,after=resolveMilestones(new Date('2026-12-01T12:00:00Z')).at(-1)!;
 assert.equal(before.kind,'forecast');assert.equal(before.tag,'PREVISTO');assert.match(before.detail,/previsto/);
 assert.equal(after.kind,'reached');assert.equal(after.tag,null);assert.match(after.detail,/^Por volta de 18\/11\/2026/);assert.doesNotMatch(after.detail+after.stamp,/previs/i);
 for(const m of resolveMilestones().slice(0,-1)){assert.equal(m.kind,'history');assert.ok(m.stamp&&m.detail);}
});
test('journey progression clamps, pauses and stops at last milestone',()=>{
 assert.equal(advanceJourney(.4,1,false,true),.4);assert.equal(advanceJourney(.4,1,true,false),.4);
 assert.equal(advanceJourney(1,.1,true,true),1);assert.ok(advanceJourney(.4,50,true,true)-.4<=.0051);
 assert.equal(journeyIndex(NaN),0);assert.equal(journeyIndex(1),5);assert.equal(journeyIndex(-1),0);
 for(let i=0;i<milestones.length;i++)assert.equal(journeyIndex(milestoneProgress(i)),i);
 assert.equal(journeyIndex(milestoneProgress(99)),5);assert.equal(journeyIndex(milestoneProgress(-3)),0);
});
