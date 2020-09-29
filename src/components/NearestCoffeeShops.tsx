import React, {useEffect, useState} from "react";
import {XYChartService} from "../services/x-y-chart.service";
import Chart from "./Chart";
import {CoffeeShopModel} from "../models/coffee-shop.model";
import {ChartService} from "../services/chart.service";
import {UserGeolocation} from "../hooks/useGeolocation";

interface NearestCoffeeShopsProps {
    userGeoLocation: UserGeolocation;
}

const NearestCoffeeShops: React.FC<NearestCoffeeShopsProps> = (props) => {
    const [remoteData, setRemoteData] = useState<CoffeeShopModel[] | null>(null);
    const [chartData, setChartData] = useState<CoffeeShopModel[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDataAsync();
    }, []);

    useEffect(() => {
        const chartService: ChartService = new ChartService();
        const xyChartService: XYChartService = new XYChartService();

        const result = xyChartService.getNearestPoints({x: props.userGeoLocation.longitude, y: props.userGeoLocation.latitude}, remoteData || [], 3);

        setChartData(result.map(x => chartService.buildDataPoint(x, {size: 20})));
    }, [props.userGeoLocation, remoteData]);

    const getDataAsync = async () => {
        const chartService: ChartService = new ChartService();

        try {
            const data = await chartService.getData();
            setRemoteData(data);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {
                error
            }
            {
                !remoteData && !error && "Loading..."
            }
            {
                remoteData && !error &&
                <Chart data={[...chartData]} />
            }
        </>
    )
}

export default NearestCoffeeShops;