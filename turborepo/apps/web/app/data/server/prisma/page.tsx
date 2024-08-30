import { PrismaClient } from '@prisma/client'
import { unstable_noStore } from 'next/cache';

// export const dynamic = 'force-dynamic';
export default async () => {
    // unstable_noStore();
    // console.log('===========prisma build===========');
    const prisma = new PrismaClient()
    const res = await prisma.people.findMany();
    return <div>
        {
            res.map(item => (<div key={item.id}>
                name:{item.name}
                <br />
                age:{item.age}
            </div>))
        }
    </div>;
}