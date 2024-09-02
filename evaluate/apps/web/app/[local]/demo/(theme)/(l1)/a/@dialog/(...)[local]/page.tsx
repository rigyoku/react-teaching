'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default () => {
    const router = useRouter();
    return <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#abc9',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    }}>
        <Image src={`/af/next.svg`} alt="null" width={200} height={200} priority />
        <button onClick={() => router.back()}>Back</button>
    </div>
}