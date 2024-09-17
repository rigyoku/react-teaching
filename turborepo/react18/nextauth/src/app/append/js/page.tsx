'use client';
export default () => {
    const a = { a: 1, b: 2 };
    const { b, a: c } = a;
    console.log(b, c);

    const onClick = () => {
        const a = '123';
        const b = a ? a : 'xx';
        console.log(b);
        return;
    };

    console.log('' || '123');
    console.log(null || '123');
    console.log(undefined || '123');
    console.log(false || '123');
    console.log(0 || '123');


    console.log('' ?? '123');
    console.log(null ?? '123');
    console.log(undefined ?? '123');
    console.log(false ?? '123');
    console.log(0 ?? '123');

    return <div>
        <button onClick={onClick}>onClick</button>
    </div>
}