import { unstable_noStore } from "next/cache";

export default async () => {
    unstable_noStore();
    const res = await (await fetch('http://localhost:3001/api?time=1')).json();
    return <div className="build-test">{res}</div>
}