export const dynamic = 'force-dynamic';

export const getChildInfo = () => fetch('http://localhost:3001/api?time=4');

export default async () => {
    await fetch('http://localhost:3001/api?time=4');
    return <div>Child</div>
}