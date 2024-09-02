'use client';
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { themeContext } from "../../../context/theme/theme";

export default ({ children }: { children: ReactNode }) => {
    const { color } = useContext(themeContext);
    return <div style={{ height: '100vh' }}>
        <div style={{ height: '10vh', backgroundColor: color }}>DEMO</div>
        <div style={{
            display: 'flex', height: '100vh'
        }}>
            <div style={{ width: '10vh' }}>
                <Link href={'/demo/a'}>to a</Link>
                <br />
                <Link href={'/demo/b'}>to b</Link>
                <br />
                <Link href={'/demo/c'}>to c</Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    </div>
}