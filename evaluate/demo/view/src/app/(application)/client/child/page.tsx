import { Suspense } from "react";
import { PageContent } from "./client";
import { ServerLink } from "./server";
import { CONSTANT } from "@view/constants/const";

export default async () => {
    return <PageContent>
        <Suspense fallback={CONSTANT.GLOBAL.LOADING}>
            <ServerLink/>
        </Suspense>
    </PageContent>
};