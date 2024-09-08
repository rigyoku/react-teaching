export default async ({ searchParams }: { searchParams: { name: string } }) => {
    const {name} = searchParams;
    const res = await (await fetch('http://localhost:3001/api?time=1')).json();
    return <div className="build-test">{res}</div>
}