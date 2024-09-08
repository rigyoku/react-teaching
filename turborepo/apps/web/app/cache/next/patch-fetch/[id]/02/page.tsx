import { Suspense } from "react";
import Client from "./client";
import { Server } from "./server";

export default async () => <div>
    <Suspense fallback={'Loading...'}>
        <Server />
    </Suspense>
    <hr />
    <Client />
</div>