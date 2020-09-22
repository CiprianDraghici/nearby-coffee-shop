import {useEffect, useState} from "react";

export interface UserGeolocation {
    latitude: number;
    longitude: number;
}

export const useGeolocation = () => {
    const [userGeoLocation, setUserGeoLocation] = useState<UserGeolocation>({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setCoordsCallback);
        navigator.geolocation.watchPosition(setCoordsCallback);
    }, []);

    const setCoordsCallback = (position: Position) => {
        setUserGeoLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    return {
        userGeoLocation
    }
}