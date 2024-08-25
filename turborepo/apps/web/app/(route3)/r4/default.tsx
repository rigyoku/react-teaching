'use client';
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
export default () => {
    console.log(`dp1 : ${useSelectedLayoutSegment('p1')}`);
    console.log(`dp2 : ${useSelectedLayoutSegment('p2')}`);
    console.log(`dp1 : ${useSelectedLayoutSegments('p1')}`);
    console.log(`dp2 : ${useSelectedLayoutSegments('p2')}`);
    return <div>top default</div>
}