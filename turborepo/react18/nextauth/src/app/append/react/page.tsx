'use client';

import { useEffect, useState } from "react";

export default () => {
    const [state, setState] = useState(0);
    useEffect(() => {
        console.log(state);
    }, [state]);
    return <div>
        <button onClick={() => setState(state => state + 1)}></button>
    </div>
}