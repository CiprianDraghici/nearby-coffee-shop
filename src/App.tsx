import React, {useState} from 'react';
import './App.css';
import XYChart from "./components/XYChart";
import {useGeolocation} from "./hooks/useGeolocation";
import {XYChartService} from "./services/x-y-chart.service";

function App() {
    const xyChartService: XYChartService = new XYChartService();

    const {latitude, longitude} = useGeolocation();
    const [selectedDataPoint, setSelectedDataPoint] = useState<{id: string, name: string, x: string | number, y: string | number} | null>( null);

    const getDistanceInMeters = () => {
        return Math.round(
            (xyChartService.computeDistance(
                latitude,
                Number(selectedDataPoint!.y),
                longitude,
                Number(selectedDataPoint!.x))
                + Number.EPSILON) * 100) / 100;
    }

    const getDistanceInKm = () => {
        return ((Math.round(
            (xyChartService.computeDistance(
                latitude,
                Number(selectedDataPoint!.y),
                longitude,
                Number(selectedDataPoint!.x))
                + Number.EPSILON) * 100) / 100) / 1000).toFixed(1);
    }

    const onSelectedDataPoint = (dataPoint: {id: string, name: string, x: string | number, y: string | number} | null) => {
        setSelectedDataPoint(dataPoint);
    }

    const onClick = () => {
        setSelectedDataPoint(null);
    }

    return (
        <div className="App" onClick={onClick}>
            <div className="row">
                <div className="col">
                    <XYChart selectedDataPointCallback={onSelectedDataPoint} />
                </div>
                <div className="col">
                    <div className="marker"/>
                    <span className="beacon"/>
                    {
                        selectedDataPoint &&
                        <div style={{position: "absolute", left: "60%", top: "50%"}}>
                            <div>
                                {`Distance in meters = ${getDistanceInMeters()}`}
                            </div>
                            <div>
                                {`Distance in km = ${getDistanceInKm()}`}
                            </div>
                        </div>
                    }
                    {
                        !selectedDataPoint &&
                        <div style={{position: "absolute", left: "60%", top: "50%"}}>
                            <h1>Your location</h1>
                            <div>Latitude: {latitude}</div>
                            <div>Longitude: {longitude}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
