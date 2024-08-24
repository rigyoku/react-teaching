import Link from "next/link"
import PageServer from "./pageServer"
import { Suspense } from "react"
import PageClient from "./pageClient"

export default ({ searchParams }: { searchParams: { name: string}}) => {

    console.log(searchParams.name)
    return <div>
        router page
        <PageClient/>
        <Suspense fallback={<p>pppppppppppp</p>}>
            <PageServer />
        </Suspense>
        <br />
        <Link href={'/router/a'}>to router/a</Link>
    </div>
}