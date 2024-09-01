'use client';

import useSWR, { preload } from 'swr';

export const dynamic = 'force-dynamic';

preload(`/docs/api?time=3`, (...args) => {
    console.log('preload...')
    return fetch(...args).then(res => res.json());
});

export default () => {

    const { data, isLoading, error } = useSWR(`/docs/api?time=3`, (...args) => fetch(...args).then(res => res.json()));

    if (isLoading) {
        return <div>
            preload loading...
        </div>
    }
    if (data) {
        return <div>
            preload data: {data}
        </div>
    }
    if (error) {
        return <div>
            preload error: {error.message}
        </div>
    }
}