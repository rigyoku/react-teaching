'use client';

import { usePathname, useRouter } from "next/navigation";
import Server from "./server";
import Client from "./client";


export default ({ searchParams }: { searchParams: { name: string } }) => {


    const router = useRouter();
    const path = usePathname();

    return <div>
        {path}
        ...
        {searchParams.name}
        <div style={{ height: '1000px' }}></div>
        <div id="bottom">bottom</div>

        

        <br />

        <Server />
        <Client/>
        <button onClick={() => router.push('/aaaa')}>push aaaa</button>
        <button onClick={() => router.replace('/aaaa')}>replace aaaa</button>
        <button onClick={() => router.forward()}>forward aaaa</button>
        <button onClick={() => router.back()}>back aaaa</button>
        <button onClick={() => router.prefetch('/aaaa')}>prefetch aaaa</button>
        <button onClick={() => router.refresh()}>refresh aaaa</button>
    </div>
}