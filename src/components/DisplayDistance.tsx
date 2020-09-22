import React from 'react';
import {useGeolocation} from "../hooks/useGeolocation";
import {XYChartService} from "../services/x-y-chart.service";
import {MarkSeriesPoint} from "react-vis";

interface DisplayDistanceInfoProps {
    selectedDataPoint: MarkSeriesPoint | null;
}

const DisplayDistance: React.FC<DisplayDistanceInfoProps> = (props) => {
    const xyChartService: XYChartService = new XYChartService();
    const {latitude, longitude} = useGeolocation();

    const getDistanceInMeters = () => {
        return xyChartService.computeDistance(
            latitude,
            Number(props.selectedDataPoint!.y),
            longitude,
            Number(props.selectedDataPoint!.x)).toFixed(2);
    }

    const getDistanceInKm = () => {
        return (xyChartService.computeDistance(
            latitude,
            Number(props.selectedDataPoint!.y),
            longitude,
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
