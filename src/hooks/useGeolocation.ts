import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export interface UserGeolocation {
    latitude: number;
    longitude: number;
}

export const useGeolocation = () => {
    const [userGeoLocation, setUserGeoLocation] = useState<UserGeolocation>({
        latitude: 0,
        longitude: 0
    });
    const [errorGeoLocation, setErrorGeoLocation] = useState<PositionError |  {message: string} | null>();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(setCoordsCallback, geoErrorCallback, {timeout:10000});
        } else {
            const error = {message: "Geolocation is not supported by this browser."};
            handleError(error);
        }
    }, []);

    const setCoordsCallback = (position: Position) => {
        setUserGeoLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    const geoErrorCallback = (error: PositionError) => {
        handleError(error)
    }

    const handleError = (error: PositionError | {message: string} | null) => {
        console.error(error?.message);
        toast.error(error?.message);
        setErrorGeoLocation(error);
    }

    return {
        userGeoLocation,
        errorGeoLocation
    }
}