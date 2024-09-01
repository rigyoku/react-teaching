'use client';

import useSWR from 'swr';
export default ({ name }: { name: string }) => {
    const { data, isLoading, error } = useSWR({
        url: '/docs/api?time=',
        name,
    },
    async ({ url, name }: { url: string, name: string }) => {
        console.log(`c3 fetcher`);
    return (await fetch(`${url}${name}`, { cache: 'no-cache' })).json();
    },
    {
        // fetcher: async ({ url, name }: { url: string, name: string }) => {
        //     console.log(`c3 fetcher`);
        //     return await (await fetch(`${url}${name}`)).json();
        // },
        refreshInterval: 2000,
    });
    if (isLoading) {
        return <div>
            c3 loading...
        </div>
    }
    if (data) {
        return <div>
            c3 data: {data}
        </div>
    }
    if (error) {
        return <div>
            c3 error: {error.message}
        </div>
    }
}