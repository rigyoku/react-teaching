import { cache } from "react";
import { f1 } from "./cache";

const outer = f1('A');
console.log(`outer: ${outer}`);

export default () => <div>
    outer: {outer}
    <Child1 name="A" />
    <Child1 name="A" />
    <Child2 name="A" />
    <Child2 name="A" />
</div>

const Child1 = ({ name }: { name: string }) => <div>Child1:{f1(name)}</div>

const Child2 = ({ name }: { name: string }) => {
    const f1 = cache((name: string) => {
        const res = `${name} call f1. random: ${Math.random()}`;
        console.log(res);
        return res;
    });
    return <div>
        Child2: {f1(name)}
    </div>
}