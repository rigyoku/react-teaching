'use client';

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
const queryClient = new QueryClient();

export default () => <QueryClientProvider client={queryClient}>
    <Child/>
</QueryClientProvider>

const Child = () => {
    const [state, setState] = useState('');
    const { data, error, isLoading } = useQuery({
        queryKey: [`/docs/api?time=${state}`],
        queryFn: async ({ queryKey }) => {
            console.log(queryKey);
            // return 123;
            return (await fetch(queryKey[0] as string)).json();
        }
    });

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
    </div>
}