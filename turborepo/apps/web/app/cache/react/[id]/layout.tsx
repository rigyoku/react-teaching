import { ReactNode } from "react";
import { f1 } from "./cache";
import Count from "./count";

export default ({ children }: { children: ReactNode }) => {
    return <div>
        Layout
        <br />
        {f1('Layout')}
        <br />
        <Count/>
        <hr />
        {children}
    </div>;
}