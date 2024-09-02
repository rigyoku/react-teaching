'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default ({ children, left, right }:
    { children: ReactNode, left: ReactNode, right: ReactNode }) => {
    
    const path = usePathname();
    useEffect(() => {
        const listener = () => console.log(`path: ${path}`);
        document.body.addEventListener('click', listener);
        return () => document.body.removeEventListener('click', listener);
    }, [path]);
    return <div>
        {children}
        <div style={{ height: '5vh' }}>
            <div style={{ width: '40vw' }}>
                <Link href={'/demo/b/bb'}> to bb </Link>
            </div>
        </div>
        <div style={{ display: 'flex' }}>
            <div>{left}</div>
            <div>{right}</div>
        </div>
</div>
    
    
}
