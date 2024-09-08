export const generateStaticParams = async () => {
    return [
        {
            id: '1',
        },
        {
            id: '2',
        },
    ];
};

export default async () => {
    const res = await (await fetch('http://localhost:3001/api?time=1')).json();
    return <div className="build-test">{res}</div>
}