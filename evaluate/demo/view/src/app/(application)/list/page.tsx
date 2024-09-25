import { unstable_cache } from "next/cache";
import { cachedUserIdAndName, cachedUserItems } from "../server";
import { CONSTANT } from "@view/constants/const";
import Link from "next/link";
import { PATH } from "@view/constants/path";
import { AddItem } from "./client";
import { addItem } from "./server";

export default async () => {
    const { id } = await cachedUserIdAndName();
    const getItems = unstable_cache(async () => await cachedUserItems(id!), [CONSTANT.APPLICATION.LIST.ITEMS_TAG], {
        tags: [CONSTANT.APPLICATION.LIST.ITEMS_TAG],
        revalidate: 10 * 60,
    });
    const items = await getItems();
    return <div>
        <div className="h-14 border-b-2 mb-4">
            <AddItem addItem={addItem} id={id!} />
        </div>
        <div>
        {
                items?.map(({ id: itemId, name }) => <Link key={itemId} href={`${PATH.LIST}/${id}/item/${itemId}`}>
                    <div className="w-64 bg-bg.normalBtn view-border mb-4 text-center">{name}</div>
                </Link>)
        }
        </div>
    </div>
};