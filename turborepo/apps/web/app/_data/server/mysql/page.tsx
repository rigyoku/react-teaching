import { unstable_noStore } from "next/cache";
import { getConnection, select } from "./mysqlUtil";

// export const dynamic = 'force-dynamic';

export default async () => {
    // unstable_noStore();
    // console.log('===========mysql build===========');
    const con = getConnection();
    try {
        const rows = await select<Array<{id: string, name: string}>>(con, 'select * from people');
        return <div>
            {rows.map(item => (<div key={item.id}>
                {item.name}
            </div>))}
        </div>
    } catch (error) {
        console.log(error)
        return <div>error</div>
    }
}