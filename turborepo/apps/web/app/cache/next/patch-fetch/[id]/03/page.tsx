import { Suspense } from "react";
import Client from "./client";
import { Server } from "./server";

export default async ({ params }: { params: { id: string } }) => <div>
    <Suspense fallback={'Loading...'}>
        <Server />
    </Suspense>
    <hr />
    <Client id={params.id} />
    <hr />
</div>