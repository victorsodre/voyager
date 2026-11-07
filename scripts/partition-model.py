import hashlib,json,sys
from pathlib import Path
# Component IDs apply only to this exact source and decoder topology.
expected='bd86ded828dd3f459293aee4ffc3cd0998d8db67439317c8299650a1174c3289'
assert hashlib.sha256(Path('public/models/voyager-nasa.glb').read_bytes()).hexdigest()==expected,'Source model changed; inspect and remap before regenerating.'
Path('output').mkdir(exist_ok=True)
meshes=json.loads(Path(sys.argv[1]).read_text());out=[]
for mi,m in enumerate(meshes):
 p=m['attributes']['position']['array'];idx=m['index'];n=len(p)//3;parents=list(range(n));pos={}
 def find(a):
  while parents[a]!=a:parents[a]=parents[parents[a]];a=parents[a]
  return a
 def union(a,b):
  a=find(a);b=find(b)
  if a!=b:parents[b]=a
 for i in range(n):
  key=tuple(round(p[i*3+j],4) for j in range(3))
  if key in pos:union(i,pos[key])
  else:pos[key]=i
 for i in range(0,len(idx),3):union(idx[i],idx[i+1]);union(idx[i],idx[i+2])
 groups={}
 for i in range(0,len(idx),3):groups.setdefault(find(idx[i]),[]).append(i//3)
 mat=m['matrix']
 def world(i):
  x,y,z=p[i*3:i*3+3];return [mat[j]*x+mat[j+4]*y+mat[j+8]*z+mat[j+12] for j in range(3)]
 for triangles in groups.values():
  points=[world(i) for t in triangles for i in idx[t*3:t*3+3]];lo=[min(q[j] for q in points) for j in range(3)];hi=[max(q[j] for q in points) for j in range(3)]
  out.append({'id':len(out),'mesh':mi,'name':m['name'],'triangles':triangles,'count':len(triangles),'min':lo,'max':hi,'center':[(a+b)/2 for a,b in zip(lo,hi)]})

ids=['antenna','bus','science','magnetometer','power','plasma','record']
def classify(a):
 i=a['id'];z=a['center'][2]
 if i==48:return 'record'
 if i in (66,67):return 'plasma'
 if a['max'][1]>4 or a['max'][2]>6 or i in (64,65):return 'magnetometer'
 if z>1.9 and a['max'][1]<1 or z>1.1 and a['max'][1]<.4:return 'power'
 if z < -1.1:return 'science'
 if i in (25,26,27,155) or 299<=i<=311:return 'antenna'
 return 'bus'
manifest={'sourceSha256':'bd86ded828dd3f459293aee4ffc3cd0998d8db67439317c8299650a1174c3289','parts':ids,'meshes':{}}
for m in meshes:manifest['meshes'][m['name']]=[-1]*(len(m['index'])//3)
for a in out:
 part=classify(a);a['part']=part
 for t in a['triangles']:manifest['meshes'][a['name']][t]=ids.index(part)
assert all(i>=0 for values in manifest['meshes'].values() for i in values)
Path('src/content/partition.json').write_text(json.dumps(manifest,separators=(',',':'))+'\n')
Path('output/components.json').write_text(json.dumps(out))
for part in ids:
 group=[a for a in out if a['part']==part];print(part,len(group),'components',sum(a['count'] for a in group),'triangles')
