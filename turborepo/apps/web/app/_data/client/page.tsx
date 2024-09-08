'use client';

import { useEffect, useState } from "react";

export default () => {
    const [state, setState] = useState('');
    const getInfo = async () => setState(await (await fetch('/docs/api?time=2')).json());
    useEffect(() => {
        getInfo();
    }, []);
    return <div>
        {
            state ? <>
                state: {state}
            </> : 'loading...'
        }
    </div>
}