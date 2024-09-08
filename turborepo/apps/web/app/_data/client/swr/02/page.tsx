'use client';

import { useState } from "react";
import useSWR, { SWRConfig, useSWRConfig } from "swr";

export default () => {
    return <SWRConfig value={{
        fetcher: (url: string) => {
            return 'top';
        }
    }}>
        <SWRConfig value={{
            fallback: {a:1, b:2},
            // fetcher: (url: string) => {
            //     return 'mid';
            // }
        }}>
            <Child1 />
            {/* <SWRConfig value={parent => {
                console.log(parent?.fetcher);
                return {};
            }}> */}
            <SWRConfig value={{
                fallback: { a: 3 },
                // fetcher: (url: string) => {
                //     return 'mid';
                // },
                // provider: () => new Map(),
            }}>
                <Child2 />
            </SWRConfig>
        </SWRConfig>
    </SWRConfig>
}

const Child1 = () => {
    const { data } = useSWR('child1', {
        // fetcher: (url: string) => {
        //     return 'child1';
        // },
    });
    return <div>Child1: {data}</div>
}

const Child2 = () => {
    const { cache, mutate, fallback } = useSWRConfig();
    const [state, setState] = useState(new Map() as any);
    // console.log(cache);
    // console.log(fallback);
    return <div>
        <button onClick={() => setState(cache) }>show cache</button>
        {state.size > 0 ? state.get('child1').data : 'default'}
        <br />

        <button onClick={() => mutate('child1', 123, {
            revalidate: false,
        })}>update child1</button>
    </div>
}
