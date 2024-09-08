export const revalidate = 10;
export default async () => {
    const res = await (await fetch('http://localhost:3001/api?time=1', {
        next: {
            revalidate: 5,
        }
    })).json();
    
    return <div className="build-test">
        {res}
        <br />
        Date : {new Date().toLocaleString('zh', { timeZone: 'Asia/Shanghai' })}
    </div>
}