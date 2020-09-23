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
        <text x={0} y={0}>
            <tspan x="-60" y="40">{`Distance [m]: ${getDistanceInMeters()}`}</tspan>
            <tspan x="-60" y="60">{`Distance [km]: ${getDistanceInKm()}`}</tspan>
        </text>
    );
}

export default DisplayDistance;
