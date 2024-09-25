import { cachedUserItem } from "@view/app/(application)/server"

export default async ({params}: {params: {
    id: string,
    itemId: string,
}
}) => {
    const { itemId } = params;
    const { id, user_id, name } = await cachedUserItem(parseInt(itemId)) ?? {};
    return <div>
        <div>id: {id}</div>
        <div>user_id: {user_id}</div>
        <div>name: {name}</div>
    </div>;
}