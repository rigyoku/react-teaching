export default async () => {
    const ac = new AbortController();
    fetch('http://localhost:3001/api?time=5', {
        headers: {
            'A': 'B'
        },
        signal: ac.signal,
    }).then(() => {
        console.log('done');
    }, () => {
        console.log('err');
    });
    fetch('http://localhost:3001/api?time=5', {
        headers: {
            'A': 'B'
        },
        signal: ac.signal,
    }).then(() => {
        console.log('done');
    }, () => {
        console.log('err');
    });
    await fetch('http://localhost:3001/api?name=1');
    await (await fetch('http://localhost:3001/api?name=1')).json();
    ac.abort();
    return <div>
        03
    </div>
}