'use client';

import { useEffect, useState } from "react";

export const useData = (url: string) => {
    const [state, setState] = useState<Array<{ id: number }>>([]);
    useEffect(() => {
        const fetchUrl = async () => {
            console.log(`Client Env: ${process.env.NEXT_PUBLIC_NAME}`);
            const res = await (await fetch(url)).json();
            setState(res);
        }
        fetchUrl();
    }, [url]);
    return state;
}