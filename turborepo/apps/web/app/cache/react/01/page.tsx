import { cache } from "react";

const f1 = cache((name: string) => {
    const res = `${name} call f1. random: ${Math.random()}`;
    console.log(res);
    return res;
});

const f3 = cache(({ name }: { name: string }) => {
    const res = `${name} call f3. random: ${Math.random()}`;
    console.log(res);
    return res;
});

const f4 = cache((name: string) => {
    const res = `${name} call f4. random: ${Math.random()}`;
    throw new Error(res);
});

export default () => {

    return <div>
        Page: {f1('A')}
        <br />
        <Child1 name="A" />
        <Child2 name="A" />
        <hr />
        <Child1 name="B" />
        <Child2 name="B" />
        <hr />
        <Child3 name="A" />
        <Child3 name="A" />
        <hr />
        <Child4 name="A" />
        <Child4 name="A" />
    </div>
}

const Child1 = ({ name }: { name: string }) => <div>Child1:{f1(name)}</div>
const Child2 = async ({ name }: { name: string }) => {
    await new Promise(res => setTimeout(() => res(null), 1000));
    return <div>Child2:{f1(name)}</div>;
}
const Child3 = (props: { name: string }) => <div>Child3:{f3(props)}</div>
const Child4 = ({ name }: { name: string }) => {
    try {
        f4(name);
        return;
    } catch (error: any) {
        return <div>Child4:{error.message}</div>
    }
}