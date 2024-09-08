import { unstable_noStore } from "next/cache";


// unstable_noStore();
export const dynamic = 'force-dynamic';

export default async () => {
    // console.log('===========fetch before===========');
    await (await fetch('http://localhost:3001/api?name=af')).json();

    // unstable_noStore();

    // try {
    //     unstable_noStore();
    // } catch (error) {
    //     console.log(error);
    // }
    const res = await (await fetch('http://localhost:3001/api?name=parent')).json();
    // const res = await (await fetch('http://localhost:3001/api?name=parent', { cache: 'no-store'})).json();
    // console.log('===========fetch build===========');
    return <div>
        res: {res}
        <Child1 />
        <Child2 />
    </div>
}

const Child1 = async () => {
    // unstable_noStore();
    const res = await(await fetch('http://localhost:3001/api?name=child1')).json();
    // console.log('===========fetch build child 1===========');
    return <div>
        res: {res}
    </div>
}

const Child2 = async () => {
    const res = await (await fetch('http://localhost:3001/api?name=child2')).json();
    // const res = await (await fetch('http://localhost:3001/api?name=child2', { cache: 'no-store' })).json();
    // console.log('===========fetch build child 2===========');
    return <div>
        res: {res}
    </div>
}