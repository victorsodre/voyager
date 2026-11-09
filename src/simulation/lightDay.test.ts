import test from 'node:test';
import assert from 'node:assert/strict';
import { LIGHT_DAY_AT,lightDayCopy,lightDayPassed } from './lightDay.ts';
test('light-day instant is 18/11/2026 05:16:07 EST as published by NASA',()=>{
 assert.equal(new Date(LIGHT_DAY_AT).toISOString(),'2026-11-18T10:16:07.000Z');
 assert.equal(lightDayPassed(new Date(LIGHT_DAY_AT-1)),false);assert.equal(lightDayPassed(new Date(LIGHT_DAY_AT)),true);
});
test('copy never invents a day: before it is a forecast, after it is "por volta de" the NASA date',()=>{
 const before=lightDayCopy(new Date('2026-11-17T23:59:00-03:00')),after=lightDayCopy(new Date('2027-03-01T00:00:00Z'));
 assert.equal(before.kind,'forecast');assert.match(before.headline,/previsão da NASA/);
 assert.equal(after.kind,'reached');assert.match(after.headline,/^Por volta de 18\/11\/2026, a Voyager 1 passou de um dia-luz/);
 for(const copy of [before,after])assert.match(copy.detail,/25,9 bilhões de km da Terra/);
});
