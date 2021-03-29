import React from 'react';
import {SeriesPoint, XYChartService} from "../services/x-y-chart.service";

interface DisplayDistanceInfoProps {
    selectedDataPoint: SeriesPoint | null;
    userLocation: SeriesPoint;
}

const DisplayDistance: React.FC<DisplayDistanceInfoProps> = (props) => {
    const xyChartService: XYChartService = new XYChartService();

    const getDistanceInMeters = () => {
        return xyChartService.computeDistance(
            props.userLocation,
            props.selectedDataPoint!).toFixed(2);
    }

    const getDistanceInKm = () => {
        return (xyChartService.computeDistance(
            props.userLocation,
            props.selectedDataPoint!) / 1000).toFixed(2);
    }

    return (
        <text x={0} y={0}>
            <tspan x="-60" y="40">{`Distance [m]: ${getDistanceInMeters()}`}</tspan>
            <tspan x="-60" y="60">{`Distance [km]: ${getDistanceInKm()}`}</tspan>
        </text>
    );
}

export default DisplayDistance;
