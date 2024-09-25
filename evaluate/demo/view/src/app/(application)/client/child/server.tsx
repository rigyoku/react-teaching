import { CONSTANT } from "@view/constants/const";
import { PATH } from "@view/constants/path";
import Link from "next/link";
import { cachedUserIdAndName } from "../../server";

export const ServerLink = async () => {
    const { id } = await cachedUserIdAndName();
    return <Link href={`${PATH.CLIENT_CHILD}/${id}/${new Date().getSeconds()}`}>
        <button className="view-border bg-bg.primaryBtn w-32">{ CONSTANT.APPLICATION.CLIENT.CHILD.TO_USER }</button>
    </Link>
}

export const UserInfo = async () => {
    const { id, username } = await cachedUserIdAndName();
    return <div>
        <div>id: {id}</div>
        <div>username: {username}</div>
    </div>
};