import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as T from 'three';
import { subsetGeometry } from './partition.ts';
const manifest=JSON.parse(readFileSync(new URL('../content/partition.json',import.meta.url),'utf8'));
test('partition belongs to exact NASA asset and assigns all 20390 triangles once',()=>{
 const source=readFileSync(new URL('../../public/models/voyager-nasa.glb',import.meta.url));
 assert.equal(createHash('sha256').update(source).digest('hex'),manifest.sourceSha256);
 const expected:Record<string,number>={_root:12,tex_01:17602,tex_02_AO:2320,tex_02_AO_dark:456};
 const used=new Set();for(const [name,ids] of Object.entries(manifest.meshes) as [string,number[]][]){assert.equal(ids.length,expected[name]);for(const id of ids){assert.ok(Number.isInteger(id)&&id>=0&&id<manifest.parts.length);used.add(id);}}
 assert.equal(used.size,7);
});
test('subset preserves selected topology, attributes and world pose without unused bounds',()=>{
 const g=new T.BoxGeometry(2,2,2);const matrix=new T.Matrix4().makeTranslation(5,3,-2);
 const s=subsetGeometry(g,[0,1],matrix);
 assert.equal(s.index!.count,6);assert.equal(s.getAttribute('position').count,4);assert.equal(s.getAttribute('uv').count,4);
 assert.equal(s.boundingBox!.min.x,6);assert.equal(s.boundingBox!.max.x,6);
 assert.equal(g.boundingBox,null);g.dispose();s.dispose();
});
