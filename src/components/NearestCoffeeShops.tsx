import React, {useEffect, useState} from "react";
import {UserGeolocation} from "../hooks/useGeolocation";
import {MarkSeriesPoint} from "react-vis";
import {XYChartService} from "../services/x-y-chart.service";
import XYChart from "./XYChart";
import {CoffeeShopsService} from "../services/coffee-shops.service";

interface NearestCoffeeShopsProps {
    selectedDataPointCallback: (dataPoint: MarkSeriesPoint | null) => void;
    userLocation: UserGeolocation;
}

const NearestCoffeeShops: React.FC<NearestCoffeeShopsProps> = (props) => {
    const [remoteData, setRemoteData] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        getDataAsync();
    }, []);

    useEffect(() => {
        const xyChartService: XYChartService = new XYChartService();
        const result = xyChartService.getNearest3Points(props.userLocation.latitude, props.userLocation.longitude, remoteData);
        setChartData(result);
    }, [remoteData, props.userLocation])

    const getDataAsync = async () => {
        const coffeeShopsService: CoffeeShopsService = new CoffeeShopsService();
        const result = await coffeeShopsService.getShops();

        if(!result) { return; }

        setRemoteData(result.map(p => ({...p, x: Number(p.x), y: Number(p.y)})));
    }

    return (
        <XYChart
            data={[...chartData, {id: 0, name: "User", x: props.userLocation.longitude, y: props.userLocation.latitude}]}
            selectedDataPointCallback={props.selectedDataPointCallback}
        />
    )
}

export default NearestCoffeeShops;