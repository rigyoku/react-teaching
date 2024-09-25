import { useEffect, useState } from "react";

export const useLoaction = () => {
    const [location, setLocation] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude}/${longitude}`);
        }, _ => {
            setLocation('');
        })
    }, []);
    return location;
}