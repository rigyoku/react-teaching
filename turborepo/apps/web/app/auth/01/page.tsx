'use client';
export default () => {
    const getData = async () => {
        const data = await (await fetch('/auth/api', {
            headers: [['token', localStorage.getItem('token') ?? '']],
        })).json();
        alert(data);
    }
    return <div>
        <button onClick={getData}>click</button>
    </div>
}