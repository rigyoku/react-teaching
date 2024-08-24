import { ReactNode } from "react"

export default ({ children, params }: { children: ReactNode, params: { id: string } }) => {
    return <>
        layout3
        <br />
        {`layout id : ${params.id}`}
        {children}
    </>
}