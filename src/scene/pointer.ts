/** Tap vs. drag on the canvas: a finger wobbles more than a mouse, so touch gets a larger allowance. */
export const tapSlop=(pointerType:string)=>pointerType==='mouse'?5:10;

export const isTap=(dx:number,dy:number,pointerType:string)=>Math.hypot(dx,dy)<=tapSlop(pointerType);

/**
 * Screen offsets (CSS px) probed after a direct miss, nearest first. Thin parts such as the
 * plasma antennas have few triangles and are hard to hit exactly with a finger.
 */
export function pickOffsets(pointerType:string):[number,number][]{
 const radius=pointerType==='mouse'?6:16,out:[number,number][]=[[0,0]];
 for(const r of [radius/2,radius])for(let i=0;i<8;i++){const a=i*Math.PI/4;out.push([Math.cos(a)*r,Math.sin(a)*r]);}
 return out;
}
