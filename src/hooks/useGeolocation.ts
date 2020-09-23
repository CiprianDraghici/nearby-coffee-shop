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
    const [errorGeoLocation, setErrorGeoLocation] = useState<PositionError | null>();

    useEffect(() => {
        navigator.geolocation.watchPosition(setCoordsCallback, geoErrorCallback);
    }, []);

    const setCoordsCallback = (position: Position) => {
        setUserGeoLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    const geoErrorCallback = (error: PositionError) => {
        console.error(error);
        setErrorGeoLocation(error);
    }

    return {
        userGeoLocation,
        errorGeoLocation
    }
}