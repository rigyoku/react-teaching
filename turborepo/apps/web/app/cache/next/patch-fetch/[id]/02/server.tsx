export const Server = async () => {

    const f = await fetch('http://localhost:3001/api?time=2', {
        // cache: 'no-store',
        next: {
            revalidate: 10,
        },
    });
    const j = await f.json();
    
    console.log('patch-fetch 02 server render');

    return <div>
        Fetch: {j}
        <br />
        Date : {new Date().toLocaleString('zh', { timeZone: 'Asia/Shanghai' })}
    </div>
}