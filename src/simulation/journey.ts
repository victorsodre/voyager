const clamp=(p:number)=>Number.isFinite(p)?Math.max(0,Math.min(1,p)):0;
export const journeyIndex=(progress:number)=>Math.min(5,Math.floor(clamp(progress)*6));
export function advanceJourney(progress:number,seconds:number,playing:boolean,visible:boolean){
 const dt=Number.isFinite(seconds)?Math.max(0,Math.min(.1,seconds)):0;
 return clamp(clamp(progress)+(playing&&visible?dt/24:0));
}
