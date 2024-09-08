import { unstable_cache } from "next/cache"

export default async () => {
    const f = unstable_cache(async () => {
        console.log('unstable_cache f')
        return new Date().toLocaleString('zh', { timeZone: 'Asia/Shanghai' });
    });
    const f1 = unstable_cache(async () => {
        console.log('unstable_cache f1')
        return new Date().toLocaleString('zh', { timeZone: 'Asia/Shanghai' });
    }, undefined, {
        revalidate: 10,
        tags: ['1'],
    });
    return <div>
        Data: {await f()}
        <br />
        Data: {await f1()}
    </div>
}