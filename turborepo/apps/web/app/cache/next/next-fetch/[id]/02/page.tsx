'use client';
export default () => {
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
    fetch('http://localhost:3001/api?name=1');
    fetch('http://localhost:3001/api?name=1');
    return <div>
        02
    </div>
}