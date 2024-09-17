'use client';
import { useEffect, useMemo, useState } from 'react';
import useSWRMutation from 'swr/mutation';

export default () => {

    const [state, setState] = useState(0);

    const { trigger, data, isMutating, reset } = useSWRMutation('/f1', async (key: string) => {
        await new Promise((res) => setTimeout(() => res(null), 3000));
        return {
            key,
            state,
        };
    });

    useEffect(() => {
        if (state != 0) {
            trigger();
        }
    }, [state]);

    // const loading = useMemo(() => state == 0 || isMutating, [state, isMutating]);
    const loading = useMemo(() => state == 0 || !data, [state, data]);
    console.log(`loading: ${loading} state: ${state} isMutating: ${isMutating} data: ${JSON.stringify(data)}`);

    useEffect(() => {
        setTimeout(() => {
            setState(1);
        }, 1000);
    }, []);

    return <div>
        {loading ? 'loading...' : ''}
        <button onClick={() => {
            setState(0);
            reset();
            setTimeout(() => {
                setState(2);
            }, 1000);
        }}>update</button>
    </div>
}