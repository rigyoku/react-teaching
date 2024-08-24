'use client';
import { usePathname } from "next/navigation";


export default () => {
    console.log(`path: ${usePathname()}`);

    return <div>
        router layout path
    </div>
}