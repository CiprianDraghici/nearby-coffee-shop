import React from 'react';
import {UserGeolocation} from "../hooks/useGeolocation";

interface DisplayCurrentLocationProps {
    userLocation: UserGeolocation;
}

const DisplayCurrentLocation: React.FC<DisplayCurrentLocationProps> = (props) => {
    return (
        <div style={{position: "absolute", left: "60%", top: "50%"}}>
            <h1>Your location</h1>
            <div>Latitude: {props.userLocation.latitude}</div>
            <div>Longitude: {props.userLocation.longitude}</div>
        </div>
    );
}

export default DisplayCurrentLocation;
