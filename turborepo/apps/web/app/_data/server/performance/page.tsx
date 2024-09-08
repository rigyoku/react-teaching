import { Suspense } from "react";
import Child, { getChildInfo } from "./child";

export const dynamic = 'force-dynamic';

export default async () => {
    getChildInfo();
    // await fetch('http://localhost:3001/api?time=3');

    const [res1, res2] = await Promise.all(
        [
            (
                await fetch('http://localhost:3001/api?time=2')
            ).json(),
            (
                await fetch('http://localhost:3001/api?name=1')
            ).json()
        ]
    );
    return <div>Parent
        <br />
        {/* <Suspense fallback={<div>fallback...</div>}>
            <Child />
        </Suspense> */}
        <br />
        res1: {res1}
        <br />
        res2: {res2}
    </div>
}

