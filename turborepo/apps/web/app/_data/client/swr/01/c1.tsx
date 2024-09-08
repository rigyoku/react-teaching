'use client';

import useSWR from 'swr';
export default ({ name }: { name: string }) => {
    
    // const { data, isLoading, error } = useSWR(`/docs/api?name=${name}`, (...args) => fetch(...args).then(res => res.json()));

    const { data, isLoading, error } = useSWR(`/docs/api?name=${name}`, async (url: string) => {
        // console.log(`c1 fetcher`);
        throw new Error('fetcher error by c1!');
        return (await fetch(`${url}`)).json();
    });

    if (isLoading) {
        return <div>
            c1 loading...
        </div>
    }
    if (data) {
        return <div>
            c1 data: {data}
        </div>
    }
    if (error) {
        return <div>
            c1 error: {error.message}
        </div>
    }
}