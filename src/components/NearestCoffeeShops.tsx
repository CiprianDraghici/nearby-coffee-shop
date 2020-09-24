import React, {useEffect, useState} from "react";
import {MarkSeriesPoint} from "react-vis";
import {XYChartService} from "../services/x-y-chart.service";
import XYChart from "./XYChart";
import {CoffeeShopsService} from "../services/coffee-shops.service";
import DisplayDistance from "./DisplayDistance";

interface NearestCoffeeShopsProps {
    userLocation: MarkSeriesPoint;
}

const NearestCoffeeShops: React.FC<NearestCoffeeShopsProps> = (props) => {
    const [remoteData, setRemoteData] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [selectedDataPoint, setSelectedDataPoint] = useState< MarkSeriesPoint | null>( null);

    const userDataPoint = {
        id: 0,
        name: "User",
        x: props.userLocation.x,
        y: props.userLocation.y,
        label: "User",
        customComponent: (row: any, positionInPixels: any) => {
            return (
                <g cx={props.userLocation.longitude} cy={props.userLocation.latitude} className="inner-component">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill={"red"} d="M12 0c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm10.881-2.501c0-1.492-.739-2.83-1.902-3.748l.741-.752c1.395 1.101 2.28 2.706 2.28 4.5s-.885 3.4-2.28 4.501l-.741-.753c1.163-.917 1.902-2.256 1.902-3.748zm-3.381 2.249l.74.751c.931-.733 1.521-1.804 1.521-3 0-1.195-.59-2.267-1.521-3l-.74.751c.697.551 1.141 1.354 1.141 2.249s-.444 1.699-1.141 2.249zm-16.479 1.499l-.741.753c-1.395-1.101-2.28-2.707-2.28-4.501s.885-3.399 2.28-4.5l.741.752c-1.163.918-1.902 2.256-1.902 3.748s.739 2.831 1.902 3.748zm.338-3.748c0-.896.443-1.698 1.141-2.249l-.74-.751c-.931.733-1.521 1.805-1.521 3 0 1.196.59 2.267 1.521 3l.74-.751c-.697-.55-1.141-1.353-1.141-2.249zm16.641 14.501c0 2.209-3.581 4-8 4s-8-1.791-8-4c0-1.602 1.888-2.98 4.608-3.619l1.154 1.824c-.401.068-.806.135-1.178.242-3.312.949-3.453 2.109-.021 3.102 2.088.603 4.777.605 6.874-.001 3.619-1.047 3.164-2.275-.268-3.167-.296-.077-.621-.118-.936-.171l1.156-1.828c2.723.638 4.611 2.016 4.611 3.618z"/>
                    </svg>
                    {
                        selectedDataPoint &&
                        <DisplayDistance userLocation={props.userLocation} selectedDataPoint={selectedDataPoint}/>
                    }
                </g>
            )
        }
    };

    const onSelectedDataPoint = (dataPoint: MarkSeriesPoint | null) => {
        setSelectedDataPoint(dataPoint);
    }

    useEffect(() => {
        getDataAsync();
    }, []);

    useEffect(() => {
        const xyChartService: XYChartService = new XYChartService();
        const result = xyChartService.getNearest3Points(props.userLocation, remoteData);
        setChartData(result.map(x => ({...x, label: x.name, size: 20, customComponent: "circle"})));
    }, [props.userLocation, remoteData])

    const getDataAsync = async () => {
        const coffeeShopsService: CoffeeShopsService = new CoffeeShopsService();
        const result = await coffeeShopsService.getShops();

        if(!result) { return; }

        setRemoteData(result.map(p => ({...p, x: Number(p.x), y: Number(p.y)})));
    }

    return (
        <XYChart
            data={[...chartData]}
            userDataPoint={userDataPoint}
            selectedDataPointCallback={onSelectedDataPoint}
        />
    )
}

export default NearestCoffeeShops;