export const Server = async () => {

    const f = await fetch('http://localhost:3001/api?time=1', {
        next: {
            revalidate: false,
            tags: ['1', '2',]
        },
    });
    const j = await f.json();

    console.log('patch-fetch 03 server render');

    return <div>
        Fetch: {j}
        <br />
        Date : {new Date().toLocaleString('zh', { timeZone: 'Asia/Shanghai' })}
    </div>
}