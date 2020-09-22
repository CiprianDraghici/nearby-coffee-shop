import React from 'react';
import {MarkSeriesPoint} from "react-vis";
import DisplayCurrentLocation from "./DisplayCurrentLocation";
import PinMarker from "./PinMarker";
import DisplayDistance from "./DisplayDistance";
import {UserGeolocation} from "../hooks/useGeolocation";

interface PinInfoProps {
    selectedDataPoint: MarkSeriesPoint | null;
    userLocation: UserGeolocation;
}

const PinInfo: React.FC<PinInfoProps> = (props) => {
    return (
        <>
            <PinMarker>
                {
                    props.selectedDataPoint &&
                    <DisplayDistance selectedDataPoint={props.selectedDataPoint} userLocation={props.userLocation}/>
                }
                {
                    !props.selectedDataPoint &&
                    <DisplayCurrentLocation userLocation={props.userLocation}/>
                }
            </PinMarker>
        </>
    );
}

export default PinInfo;
