import { milestones,type MilestoneSource } from '../content/journey.ts';
import { lightDayCopy } from './lightDay.ts';

export type Milestone=Omit<MilestoneSource,'kind'>&{kind:'history'|'forecast'|'reached';stamp:string;detail:string;tag:string|null};

/** Milestones with date-dependent copy resolved for `now`. */
export function resolveMilestones(now:Date=new Date()):Milestone[]{
 const light=lightDayCopy(now);
 return milestones.map(m=>m.kind==='lightday'?{...m,kind:light.kind,stamp:light.stamp,detail:light.detail,tag:light.tag}:{...m,tag:null});
}

const clamp=(p:number)=>Number.isFinite(p)?Math.max(0,Math.min(1,p)):0;
const last=milestones.length-1;
export const journeyIndex=(progress:number)=>Math.min(last,Math.floor(clamp(progress)*milestones.length));
/** Progress that lands inside milestone `index` (clamped to the existing ones). */
export const milestoneProgress=(index:number)=>Math.max(0,Math.min(last,index))/milestones.length+.001;
export function advanceJourney(progress:number,seconds:number,playing:boolean,visible:boolean){
 const dt=Number.isFinite(seconds)?Math.max(0,Math.min(.1,seconds)):0;
 return clamp(clamp(progress)+(playing&&visible?dt/24:0));
}
