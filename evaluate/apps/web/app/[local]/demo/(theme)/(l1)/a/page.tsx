'use client';

import { useRouter } from "next/navigation";
import { useData } from "../../../../../hook/useData";

export default () => {
    const data = useData('/af/api/list');
    const router = useRouter();
    return <>
        {
            data.map(item => (
                <div key={item.id} onClick={() => {
                    if (item.id % 2 == 0) {
                        console.log('click')
                        router.push('/');
                    }
                }} style={{backgroundColor: '#abc', width: '20vh', margin: '1px'}}>
                    {item.id}
                </div>
            ))
        }
    </>
}