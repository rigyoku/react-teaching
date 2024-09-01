'use client';

import { useState } from "react"
import C1 from "./c1";
import C2 from "./c2";
import C3 from "./c3";
import C4 from "./c4";
import Link from "next/link";

export default () => {
    const [name, setName] = useState('');
    const [isShow, setIsShow] = useState(false);
    return <div>
        Name: <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        <br />
        <button onClick={() => setIsShow(!isShow)}>change child show</button>
        <C1 name={name} />
        <C2 name={name} />
        {
            isShow ? <>
                <C3 name={name} />
            </> : null
        }
        <C4 name={name} />
        <br />
        <Link href={'/data/client/swr/01/preload'}>to preload</Link>
    </div>
}