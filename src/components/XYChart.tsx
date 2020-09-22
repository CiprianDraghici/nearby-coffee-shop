import React, {useEffect, useState} from "react";
import {useGeolocation} from "../hooks/useGeolocation";
import {MarkSeries, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from "react-vis";
import Tooltip from "./Tooltip";
import {HttpService} from "../services/http.service";
import {SecurityService} from "../services/security.service";
import {XYChartService} from "../services/x-y-chart.service";

interface XYChartProps {
    selectedDataPointCallback: (dataPoint: {id: string, name: string, x: string | number, y: string | number} | null) => void;
}

const XYChart: React.FC<XYChartProps> = (props) => {
    const {latitude, longitude} = useGeolocation();

    const [selectedDataPoint, setSelectedDataPoint] = useState<{id: string, name: string, x: string | number, y: string | number} | null>( null);
    const [tooltipPosition, setTooltipPosition] = useState<{x: string | number, y: string | number} | null>( null);
    const [remoteData, setRemoteData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);

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
        const result = xyChartService.getNearest3Points(latitude, longitude, remoteData);
        setData(result);
    }, [remoteData, latitude, longitude])

    const onValueClick = (datapoint: any, e: any) => {
        e.event.stopPropagation();

        setSelectedDataPoint(datapoint);
        setTooltipPosition({
            x: e.event.target.getBBox().x + 50,
            y: e.event.target.getBBox().y + 30
        });

        props.selectedDataPointCallback(datapoint);
    }

    const onClick = () => {
        setSelectedDataPoint(null);
        setTooltipPosition(null);
        props.selectedDataPointCallback(null);
    }

    const TooltipContent = () => {
        return (
            <div>
                <h5>{selectedDataPoint!.name}</h5>
                <div style={{textAlign: "left"}}>{`Latitude: ${selectedDataPoint!.y}`}</div>
                <div style={{textAlign: "left"}}>{`Longitude: ${selectedDataPoint!.x}`}</div>
            </div>
        );
    }

    return (
        <XYPlot
            width={600}
            height={600}
            style={{position: "absolute"}}
            onClick={onClick}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries
                className="mark-series-example"
                data={[...data, {id: 0, name: "User", x: longitude, y: latitude}]}
                onValueClick={onValueClick}
            />

            <Tooltip show={!!(selectedDataPoint && tooltipPosition)} position={{...tooltipPosition!}} content={TooltipContent} />
        </XYPlot>
    )
}

export default XYChart;