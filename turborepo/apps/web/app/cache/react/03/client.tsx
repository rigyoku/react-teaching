'use client';

import { useMemo, useState } from "react";
import { f1 } from "./cache";

export default ({ name }: { name: string }) => {
    const [state, setState] = useState(false);
    useMemo(() => {
        console.log(`name: ${name}`);
        return name;
    }, [name]);
    return <div>
        Client
        <br />
        {f1('Client')}
        <br />
        {f1('Client')}
        <br />
        {f1('Client')}
        <hr />
        {state}
        <button onClick={() => setState(state => !state)}>setState</button>
    </div>
}