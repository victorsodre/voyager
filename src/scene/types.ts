import type { Group, Vector3 } from 'three';
import type { PartId } from '../content/catalog.ts';
export type Part={id:PartId;label:string;detail:string;note:string;source:string;group:Group};
export type Assembly={root:Group;parts:Part[];points:Vector3[];dispose:()=>void};
export type ViewState={selected:string|null;isolated:boolean;wireframe:boolean;visible:boolean};
export type SceneHandle={update:(s:ViewState)=>void;home:()=>void;focus:(id:string)=>void;zoom:(factor:number)=>void;capture:(portrait?:boolean)=>void;dispose:()=>void};
