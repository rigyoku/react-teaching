'use client';

import { useRouter } from "next/navigation";

export default ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    const router = useRouter();

    return <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        margin: '30px',
        backgroundColor: '#abc6'
    }}>
        r5 list dialog {params.id}
        <br />
        <button onClick={() => router.back()}>back</button>
    </div>
}