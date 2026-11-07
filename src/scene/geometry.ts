import * as T from 'three';

export function disposeTree(root: T.Object3D) {
  const geometries = new Set<T.BufferGeometry>(), mats = new Set<T.Material>();
  root.traverse(object => { if (object instanceof T.Mesh) {
    geometries.add(object.geometry);
    for (const m of Array.isArray(object.material) ? object.material : [object.material]) mats.add(m);
  }});
  for (const g of geometries) g.dispose();
  for (const m of mats) {
    for (const v of Object.values(m)) if (v instanceof T.Texture) v.dispose();
    m.dispose();
  }
}
