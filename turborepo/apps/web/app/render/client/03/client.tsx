'use client';

import { Suspense } from "react";
import { S1 } from "./server";

export const C1 = () => <div>
    <button onClick={() => alert('c1')}>c1</button>
    <br />
    <C2 />
    <br />
    <S1 />
</div>

export const C2 = () => <div>
    <button onClick={() => alert('c2')}>c2</button>
    <br />
    {/* <S1 /> */}
</div>