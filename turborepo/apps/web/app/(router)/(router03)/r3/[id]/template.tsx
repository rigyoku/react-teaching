import { ReactNode } from "react"

export default ({ children, params }: { children: ReactNode, params: { id: string } }) => {
    return <>
        template3
        <br />
        {`template3 id : ${params}`}
        {children}
    </>
}