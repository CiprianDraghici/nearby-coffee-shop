import {useEffect, useState} from "react";

export const useGeolocation = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setCoordsCallback);
        navigator.geolocation.watchPosition(setCoordsCallback);
    }, []);

    const setCoordsCallback = (position: Position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    return {
        latitude,
        longitude
    }
}