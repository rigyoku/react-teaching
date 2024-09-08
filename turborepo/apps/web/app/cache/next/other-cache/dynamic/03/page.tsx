import { headers } from "next/headers";

export default async () => {
    headers().has('');
    const res = await (await fetch('http://localhost:3001/api?time=1')).json();
    return <div className="build-test">{res}</div>
}