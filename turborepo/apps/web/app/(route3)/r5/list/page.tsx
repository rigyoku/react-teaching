import Link from "next/link";

export default () => {
    const list = [1, 2, 3, 4, 5];
    return <div>
        {list.map(item => (
            <div key={item}>
                <Link href={`/r5/item/${item}`}>{item}</Link>
            </div>
        ))}
    </div>
}