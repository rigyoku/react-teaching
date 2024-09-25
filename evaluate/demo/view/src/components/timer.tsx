import { CONSTANT } from "@view/constants/const";
import { useEffect, useState } from "react";

export const Timer = ({ waitTime, text, callback }: { waitTime: number, text: string, callback?: () => void}) => {
    const [time, setTime] = useState(waitTime);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time => {
                if (time === 1) {
                    callback?.();
                    clearInterval(timer);
                }
                return time - 1;
            });
        }, 1000);
    }, [setTime]);
    return text.replace(CONSTANT.GLOBAL.TIMER_REPLACE, time.toString());
}