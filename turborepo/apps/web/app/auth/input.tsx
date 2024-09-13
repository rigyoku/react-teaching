import { useMemo, useState } from "react"

export const useInput = ({ type = 'text', name }: { type?: InputType, name: string }) => {
    // TODO 检查数据格式
    const [state, setState] = useState('');
    const input = useMemo(() => <>
        <label htmlFor={name}>{name}</label>
        <input id={name} name={name} type={type} onChange={e => setState(e.target.value)} value={state} />
        <br />
    </>, [type, name, state]);
    // const input = <>
    //     <label htmlFor={name}>{name}</label>
    //     <input id={name} name={name} type={type} onChange={e => setState(e.target.value)} value={state} />
    //     <br />
    // </>;
    return [state, input];
}