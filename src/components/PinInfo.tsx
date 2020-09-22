import React from 'react';
import {MarkSeriesPoint} from "react-vis";
import DisplayCurrentLocation from "./DisplayCurrentLocation";
import PinMarker from "./PinMarker";
import DisplayDistance from "./DisplayDistance";

interface PinInfoProps {
    selectedDataPoint: MarkSeriesPoint | null;
}

const PinInfo: React.FC<PinInfoProps> = (props) => {
    return (
        <>
            <PinMarker>
                {
                    props.selectedDataPoint &&
                    <DisplayDistance selectedDataPoint={props.selectedDataPoint}/>
                }
                {
                    !props.selectedDataPoint &&
                    <DisplayCurrentLocation/>
                }
            </PinMarker>
        </>
    );
}

export default PinInfo;
