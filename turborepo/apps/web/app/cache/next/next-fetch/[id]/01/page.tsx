export default async () => {
    fetch('http://localhost:3001/api?name=1', {
        headers: {
            'A': 'B'
        }
    });
    fetch('http://localhost:3001/api?name=1', {
        headers: {
            'A': 'B'
        }
    });
    await fetch('http://localhost:3001/api?name=1');
    await (await fetch('http://localhost:3001/api?name=1')).json();
    return <div>
        01
    </div>
}