'use client';
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode } from "react"

export default ({ children, p1, p2, p3 }: { children: ReactNode, p1: ReactNode, p2: ReactNode, p3: ReactNode }) => {
    console.log(`p1 : ${useSelectedLayoutSegment('p1')}`);
    console.log(`p2 : ${useSelectedLayoutSegment('p2')}`);
    console.log(`p1 : ${useSelectedLayoutSegments('p1')}`);
    console.log(`p2 : ${useSelectedLayoutSegments('p2')}`);
    return <div>
        r4 Layout
        <br />
        {children}
        <br />
        {p1}
        <br />
        {p2}
        <br />
        {p3}
    </div>
}