import React from 'react';
import {XYChartService} from "../services/x-y-chart.service";
import {MarkSeriesPoint} from "react-vis";
import {UserGeolocation} from "../hooks/useGeolocation";

interface DisplayDistanceInfoProps {
    selectedDataPoint: MarkSeriesPoint | null;
    userLocation: UserGeolocation;
}

const DisplayDistance: React.FC<DisplayDistanceInfoProps> = (props) => {
    const xyChartService: XYChartService = new XYChartService();

    const getDistanceInMeters = () => {
        return xyChartService.computeDistance(
            props.userLocation.latitude,
            Number(props.selectedDataPoint!.y),
            props.userLocation.longitude,
            Number(props.selectedDataPoint!.x)).toFixed(2);
    }

    const getDistanceInKm = () => {
        return (xyChartService.computeDistance(
            props.userLocation.latitude,
            Number(props.selectedDataPoint!.y),
            props.userLocation.longitude,
            Number(props.selectedDataPoint!.x)) / 1000).toFixed(2);
    }

    return (
        <div style={{position: "absolute", left: "60%", top: "50%"}}>
            <div>
                {`Distance in meters = ${getDistanceInMeters()}`}
            </div>
            <div>
                {`Distance in km = ${getDistanceInKm()}`}
            </div>
        </div>
    );
}

export default DisplayDistance;
