'use client';
export const C1 = ({ s1, s2 }: { s1: JSX.Element, s2: JSX.Element }) => {
    return <div>
        client
        <hr />
        <button onClick={() => alert('123')}>click</button>
        <hr />
        {s1}
        <br />
        {s2}
    </div>
} 