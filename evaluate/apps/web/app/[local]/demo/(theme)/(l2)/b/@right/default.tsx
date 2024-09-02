'use client';

import { useContext, useLayoutEffect, useRef, useState } from "react";
import { themeContext } from "../../../../../../context/theme/theme";

export default () => {
    const { setColor } = useContext(themeContext);
    const [state, setState] = useState('');
    const ref = useRef(null);
    const [divInfo, setDivInfo] = useState({
        show: false,
        backgroundColor: 'green',
    });
    useLayoutEffect(() => {
        if (ref.current) {
            setDivInfo(state => ({
                ...state,
                backgroundColor: ((ref.current! as HTMLInputElement).offsetWidth ?? 0) > 40 ? 'red' : 'green'
            }))
        }
    }, [divInfo.show]);
    return <div style={{ height: '20vh', width: '20vw', }}>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)}/>
        <br />
        <button onClick={() => setDivInfo(state => ({
            ...state,
            show: !state.show
        }))}>btn1</button>
        <button onClick={() => setColor(state)}>btn2</button>
        {divInfo.show ? <span ref={ref} style={{
            backgroundColor: divInfo.backgroundColor,
        }}>{state}</span> : null}
    </div>;
}