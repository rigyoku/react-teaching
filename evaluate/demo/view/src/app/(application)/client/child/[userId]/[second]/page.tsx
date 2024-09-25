import { unstable_cache } from "next/cache";
import { UserInfo } from "../../server";
import { cachedUsers } from "@view/app/(application)/server";
import { CONSTANT } from "@view/constants/const";

export const generateStaticParams = async () => {
    const getUser = unstable_cache(async () => await cachedUsers(), [CONSTANT.APPLICATION.CLIENT.CHILD.TAG], {
        tags: [CONSTANT.APPLICATION.CLIENT.CHILD.TAG],
        revalidate: false,
    });
    const users = await getUser();
    const response = users?.flatMap(({ id }) => {
        const res = [];
        for (let i = 0; i < 60; i++) {
            res.push({
                userId: id.toString(),
                second: i.toString(),
            });
        }
        return res;
    }) ?? [];
    // console.log(`response: ${JSON.stringify(response)}`);
    return response;
};

export const dynamicParams = false;

export default ({ params }: { params: { userId: string, second: string } }) => <div>
    <UserInfo />
</div>