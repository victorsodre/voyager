import type { Group, Vector3 } from 'three';
import type { PartId, PartStatus } from '../content/catalog.ts';
export type Part={id:PartId;label:string;detail:string;note:string;source:string;status?:PartStatus;group:Group};
export type Assembly={root:Group;parts:Part[];points:Vector3[];dispose:()=>void};
export type ViewState={selected:string|null;isolated:boolean;wireframe:boolean;visible:boolean};
export type SceneHandle={
 update:(s:ViewState)=>void;
 /** Default view of the whole probe (initial view and experience reset). */
 home:()=>void;
 /** Fit what is shown again without changing the user's viewing direction. */
 reframe:()=>void;
 focus:(id:string)=>void;zoom:(factor:number)=>void;capture:(portrait?:boolean)=>void;dispose:()=>void;
};
