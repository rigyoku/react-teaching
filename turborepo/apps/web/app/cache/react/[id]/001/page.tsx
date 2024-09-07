import { revalidatePath } from "next/cache";
import { f1 } from "../cache";
import Client from "./client";

const serverAction = async (id: string) => {
    'use server';
    console.log('serverAction');
    revalidatePath(`/cache/react/${id}/001`);
    return 123;
}

export default ({ params }: { params: { id: string } }) => <div>
    {f1('Layout')}
    <br />
    {f1('Template')}
    <br />
    {f1('Page')}
    <br />
    001
    <hr />
    <form action={serverAction.bind(null, params.id)}>
        <button type="submit">submit</button>
    </form>
    <Client/>
</div>