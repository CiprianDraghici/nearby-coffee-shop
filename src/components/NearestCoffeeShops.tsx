import React, {useEffect, useState} from "react";
import {UserGeolocation} from "../hooks/useGeolocation";
import {MarkSeriesPoint} from "react-vis";
import {HttpService} from "../services/http.service";
import {SecurityService} from "../services/security.service";
import {XYChartService} from "../services/x-y-chart.service";
import XYChart from "./XYChart";

interface NearestCoffeeShopsProps {
    selectedDataPointCallback: (dataPoint: MarkSeriesPoint | null) => void;
    userLocation: UserGeolocation;
}

const NearestCoffeeShops: React.FC<NearestCoffeeShopsProps> = (props) => {
    const [remoteData, setRemoteData] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const httpService: HttpService = HttpService.getInstance();
            const securityService: SecurityService = new SecurityService();

            const token = securityService.getToken();

            try {
                const response = await httpService.get(`${HttpService.baseUrl}/v1/coffee_shops?token=${token}`);
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                const result = response.parsedBody as any[] || [];
                setRemoteData(result.map(p => ({...p, x: Number(p.x), y: Number(p.y)})));
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        const xyChartService: XYChartService = new XYChartService();
        const result = xyChartService.getNearest3Points(props.userLocation.latitude, props.userLocation.longitude, remoteData);
        setChartData(result);
    }, [remoteData, props.userLocation])

    return (
        <XYChart
            data={[...chartData, {id: 0, name: "User", x: props.userLocation.longitude, y: props.userLocation.latitude}]}
            selectedDataPointCallback={props.selectedDataPointCallback}
        />
    )
}

export default NearestCoffeeShops;