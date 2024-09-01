'use client';

import useSWR from 'swr';
export default ({ name }: { name: string }) => {
    const { data, isLoading, error } = useSWR({
        url: '/docs/api?time=',
        name,
    },
    async ({ url, name }: { url: string, name: string }) => {
        console.log(`c4 fetcher`);
        return (await fetch(`${url}${name}`, { cache: 'no-cache' })).json();
    });
    // useSWR(data, () => {
    //     console.log('c4 after wait');
    // });
    // useSWR(data!.toFixed(), () => {
    //     console.log('c4 after wait');
    // })
    useSWR(() => (data!.toFixed()), () => {
        console.log('c4 after wait');
    })
    if (isLoading) {
        return <div>
            c4 loading...
        </div>
    }
    if (data) {
        return <div>
            c4 data: {data}
        </div>
    }
    if (error) {
        return <div>
            c4 error: {error.message}
        </div>
    }
}