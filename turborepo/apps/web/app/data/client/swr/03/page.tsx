'use client';

import { useState } from "react";
import useSWR, { SWRConfig } from "swr";

export default () => <SWRConfig value={{
    onError(err, key, config) {
        console.log('top error');
    },
}}>
    <Child/>
</SWRConfig>


const Child = () => {
    const [state, setState] = useState('');
    const { data, error, isLoading } = useSWR(`/docs/api?time=${state}`, async (url: string) => {
        // throw new Error('error info');
        return (await fetch(url)).json();
    }, {
        // onSuccess(data, key, config) {
        //     console.log(`
        //         onSuccess ${new Date()}.
        //         data: ${data}
        //         key: ${key}
        //         config: ${JSON.stringify(config)}
        //     `);
        // },

        // fallback: {
        //     '/docs/api?time=2' : 999
        // },

        // refreshInterval: 3000,
        // revalidateOnFocus: false,
        // focusThrottleInterval: 10000,
        // revalidateOnReconnect: false,
        // revalidateIfStale: false,
        // dedupingInterval: 8000,

        // onError(error, key, config) {
        //     console.log(`
        //         onError ${new Date()}.
        //         error: ${error}
        //         key: ${key}
        //         config: ${JSON.stringify(config)}
        //     `);
        // },
        // shouldRetryOnError: false,
        // errorRetryInterval: 1000,
        // errorRetryCount: 1,

        // loadingTimeout: 2000,
        // onLoadingSlow: (key, config) => {
        //     console.log(`key: ${key} config: ${JSON.stringify(config)}`);
        //     alert('你这网不行啊');
        // }
        
    });


    const [isShow, setIsShow] = useState(false);

    return <div>
        <input type="text" value={state} onChange={e => setState(e.target.value)} />
        data: {
            data ?? null
        }
        <br />
        error: {
            error ? error.message : null
        }
        <br />
        {
            isLoading ? 'loading...' : null
        }
        <button id="btn" onClick={() => setIsShow(!isShow)}>show child1</button>
        {
            isShow ? <Child1/> : null
        }
    </div>
}

const Child1 = () => {
    useSWR(`/docs/api?time=3`, async (url: string) => {
        return (await fetch(url)).json();
    })
    return <div>Child1</div>
}