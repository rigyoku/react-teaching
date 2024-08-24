import Link from "next/link"

export default ({ searchParams }: { searchParams: { name: string } }) => {


    return <div>
        aaa
        <br />
        <div style={{ height: '1400px' }}></div>
        {new Date().toString()}
        <Link href={'/aaaa/bbb?name=liy#bottom'} scroll={false} prefetch={false}>bbb</Link>
    </div>
}