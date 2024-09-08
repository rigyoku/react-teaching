'use server';

// import { formActioin } from "./action";
import { ClientChild } from "./client";


const formActioin = async (formdata: FormData) => {
    'use server';
    console.log(`action env: ${process.env.DATABASE_URL}`);
    console.log(`action formdata: ${formdata.get('name')}`);
    console.log(`action formdata: ${formdata.get('append')}`);
    // throw new Error('error cookie');
    return {
        type: 'form',
    }
}

export default async () => {
    return <div>
        <form action={formActioin}>
            <input type="text" name="name" />
            <input type="hidden" name="append" defaultValue={'append'} />
            <button type="submit">server submit</button>
        </form>
        <ClientChild action={formActioin} />
    </div>
}