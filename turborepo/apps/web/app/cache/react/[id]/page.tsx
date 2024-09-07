import Link from "next/link";
import { f1 } from "./cache";

export default ({params}: {params: {id: string}}) => <div>
    {f1('Layout')}
    <br />
    {f1('Template')}
    <br />
    {f1('Page')}
    <br />
    <Link href={`/cache/react/${params.id}/001`}>
        to 001
    </Link>
</div>