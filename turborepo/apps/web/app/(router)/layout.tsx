import { ReactNode } from "react"

export default ({children}: {children: ReactNode}) => {
    return <>
        layout1
        {children}
    </>
}