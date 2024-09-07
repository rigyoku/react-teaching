'use client';

import { useRouter } from "next/navigation";

export default () => {
    const router = useRouter();
    return <div>
        <button onClick={router.refresh}>refresh</button>
        <br />
        <button onClick={router.back}>back</button>
        <br />
        <button onClick={router.forward}>forward</button>
    </div>
}