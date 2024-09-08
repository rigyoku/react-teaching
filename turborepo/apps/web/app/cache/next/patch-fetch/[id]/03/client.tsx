'use client';
import { useEffect, useState } from "react";
import { action } from "./action";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";

export default ({ id }: { id: string }) => {
    const [time, setTime] = useState(new Date(0));
    const [text, setText] = useState('');
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    });
    const router = useRouter();
    return <div>
        {time.toLocaleString('zh', { timeZone: 'Asia/Shanghai' })}
        <hr />

        <form action={formdata => action(id, formdata)}>
            <input type="text" name="name" value={text} onChange={e => setText(e.target.value)}/>
            <button type="submit">submit</button>
        </form>

        <button onClick={() => fetch(`/cache/next/patch-fetch/api?id=${id}&name=${text}`)}>call api</button>
        <br />
        <button onClick={router.refresh}>refresh</button>
        <br />
        <button onClick={() => revalidateTag(text)}>revalidateTag</button>
        
    </div>
}