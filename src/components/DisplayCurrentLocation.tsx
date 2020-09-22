import React from 'react';
import {useGeolocation} from "../hooks/useGeolocation";

const DisplayCurrentLocation: React.FC = () => {
    const {latitude, longitude} = useGeolocation();

    return (
        <div style={{position: "absolute", left: "60%", top: "50%"}}>
            <h1>Your location</h1>
            <div>Latitude: {latitude}</div>
            <div>Longitude: {longitude}</div>
        </div>
    );
}

export default DisplayCurrentLocation;
