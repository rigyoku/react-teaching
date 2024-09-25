import { ReactNode, useMemo, useState } from "react"

export const useMousePop = ({ pop, content, wrapClass }: {
    pop: ReactNode,
    content: ReactNode,
    wrapClass?: string,
}) => {
    
    const [showPop, setShowPop] = useState(false);

    const node = useMemo(() => <div className={wrapClass} onMouseOver={() => setShowPop(true)} onMouseOut={() => setShowPop(false)}>
        <div className={`${showPop || 'hidden'} absolute top-72 right-10 bg-bg.pop`}>
            {pop}
        </div>
        {content}
    </div>, [showPop, setShowPop, pop, content]);
    return {
        showPop,
        node,
    };
};