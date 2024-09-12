'use server';

import { cookies } from "next/headers";
import { C2 } from "./client";

export const S1 = () => {
    cookies();
    return <div>
        S1
        <hr />
        {/* <C2/> */}
    </div>;
}