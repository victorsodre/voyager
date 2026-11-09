import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from './catalog.ts';
test('only the two instruments NASA lists as still on (17/04/2026) are marked on',()=>{
 const on=catalog.filter(p=>'status' in p&&p.status.on).map(p=>p.id).sort();
 assert.deepEqual(on,['magnetometer','plasma']);
 for(const p of catalog)if('status' in p){assert.match(p.status.source,/^https:\/\/science\.nasa\.gov\//);assert.match(p.status.detail,/Segundo a NASA/);}
 assert.ok(!catalog.some(p=>/painéis solares/.test(p.note)),'the probe never had solar panels; do not suggest it');
});
