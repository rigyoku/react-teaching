import { cachedUserItem } from "@view/app/(application)/server"
import { Dialog } from "./client";

export default async ({params}: {params: {
    id: string,
    itemId: string,
}
}) => {
    const { itemId } = params;
    const { id, user_id, name } = await cachedUserItem(parseInt(itemId)) ?? {};
    return <Dialog>
        <div className="text-left m-2 ml-5 mr-5">
            <div className="border-b-2">id: {id}</div>
            <div className="border-b-2">user_id: {user_id}</div>
            <div className="border-b-2">name: {name}</div>
        </div>
    </Dialog>;
}