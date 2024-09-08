'use client';
import { useEffect, useState } from "react";

export default () => {
    const [time, setTime] = useState(new Date(0));
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    })
    return <div>
        {time.toLocaleString('zh', { timeZone: 'Asia/Shanghai' })}
    </div>
}