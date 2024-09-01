'use client';

import useSWR from 'swr';
export default ({name}: {name: string}) => {
    const { data, isLoading, error, isValidating, mutate } = useSWR({
        url: '/docs/api?time=',
        name,
    }, async ({ url, name }: { url: string, name: string }) => {
        console.log(`c2 fetcher`);
        // throw new Error('fetcher error by c2!');
        return (await fetch(`${url}${name}`, {cache: 'no-cache'})).json();
    });
    // console.log(`c2 name: ${name} isLoading: ${isLoading} isValidating: ${isValidating}`);
    if (isLoading) {
        return <div>
            c2 loading...
        </div>
    }
    if (data) {
        return <div>
            c2 data: {data}
            <br />
            <button onClick={async () => {
                // mutate(888)
                
                // const res = mutate(() => 999);
                // console.log(`mutate: ${await res}`);

                const res = mutate(async () => await new Promise(res => setTimeout(() => res(111), 1000)), {
                    // revalidate: false,
                    optimisticData: 222,
                });
            }}>mutate</button>
        </div>
    }
    if (error) {
        return <div>
            c2 error: {error.message}
        </div>
    }
}