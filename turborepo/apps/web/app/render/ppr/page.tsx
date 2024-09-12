import { cookies } from "next/headers"
import { Child } from "../server"
import { Suspense } from "react"

export const experimental_ppr = true;
export default () => {



    return <div>
        {process.env.NAME}
        <br />
        {/* {cookies().get('_ga')?.value} */}
        <Suspense fallback='loading...'>
            <Child />
        </Suspense>
    </div>
}
