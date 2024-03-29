import React, {useState} from "react";
import Tooltip from "./Tooltip";
import {SeriesPoint} from "../services/x-y-chart.service";
import XYChart from "./XYChart";
import {ChartService} from "../services/chart.service";
import DisplayDistance from "./DisplayDistance";
import {useGeolocation} from "../hooks/useGeolocation";

interface ChartProps {
    data: SeriesPoint[];
}

interface TooltipPosition {
    x: string | number;
    y: string | number;
    datapoint: SeriesPoint;
}

const Chart: React.FC<ChartProps> = (props) => {
    const chartService: ChartService = new ChartService();
    const {userGeoLocation} = useGeolocation();

    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>( null);
    const [selectedDataPoint, setSelectedDataPoint] = useState<SeriesPoint | null>( null);

    const userDataPoint = chartService.getUserDataPoint(
{x: userGeoLocation.longitude, y: userGeoLocation.latitude},
{
                customComponent: (row: any, positionInPixels: any) => {
                    return (
                            <g id={"user-pointer"} cx={positionInPixels.x} cy={positionInPixels.y}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill={"red"} d="M12 0c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm10.881-2.501c0-1.492-.739-2.83-1.902-3.748l.741-.752c1.395 1.101 2.28 2.706 2.28 4.5s-.885 3.4-2.28 4.501l-.741-.753c1.163-.917 1.902-2.256 1.902-3.748zm-3.381 2.249l.74.751c.931-.733 1.521-1.804 1.521-3 0-1.195-.59-2.267-1.521-3l-.74.751c.697.551 1.141 1.354 1.141 2.249s-.444 1.699-1.141 2.249zm-16.479 1.499l-.741.753c-1.395-1.101-2.28-2.707-2.28-4.501s.885-3.399 2.28-4.5l.741.752c-1.163.918-1.902 2.256-1.902 3.748s.739 2.831 1.902 3.748zm.338-3.748c0-.896.443-1.698 1.141-2.249l-.74-.751c-.931.733-1.521 1.805-1.521 3 0 1.196.59 2.267 1.521 3l.74-.751c-.697-.55-1.141-1.353-1.141-2.249zm16.641 14.501c0 2.209-3.581 4-8 4s-8-1.791-8-4c0-1.602 1.888-2.98 4.608-3.619l1.154 1.824c-.401.068-.806.135-1.178.242-3.312.949-3.453 2.109-.021 3.102 2.088.603 4.777.605 6.874-.001 3.619-1.047 3.164-2.275-.268-3.167-.296-.077-.621-.118-.936-.171l1.156-1.828c2.723.638 4.611 2.016 4.611 3.618z"/>
                                </svg>
                                {
                                    selectedDataPoint &&
                                    <DisplayDistance userLocation={{x: userGeoLocation.longitude, y: userGeoLocation.latitude}} selectedDataPoint={selectedDataPoint}/>
                                }
                            </g>
                        )
                    }
            }
    );

    const onValueClick = (datapoint: SeriesPoint | null) => {
        setSelectedDataPoint(datapoint);
    }

    const onValueMouseOver = (datapoint: any, targetElement: SVGGraphicsElement) => {
        setTooltipPosition({
            x: targetElement.getBoundingClientRect().x + 20,
            y: targetElement.getBoundingClientRect().y + 20,
            datapoint
        });
    }

    const onValueMouseOut = (e: any) => {
        setTooltipPosition(null);
    }

    const TooltipContent = () => {
        if (!tooltipPosition) {
            return <></>;
        }

        return (
            <div data-testid={"tooltip-content"}>
                <div style={{textAlign: "left"}}>{`Latitude: ${tooltipPosition!.datapoint.y}`}</div>
                <div style={{textAlign: "left"}}>{`Longitude: ${tooltipPosition!.datapoint.x}`}</div>
            </div>
        );
    }

    return (
        <div data-testid={"Chart"}>
            <XYChart data={[...props.data, userDataPoint]} onValueClickCallback={onValueClick} onValueMouseOverCallback={onValueMouseOver} onValueMouseOutCallback={onValueMouseOut}>
                <Tooltip show={!!tooltipPosition} position={{...tooltipPosition!}} content={TooltipContent} />
            </XYChart>
        </div>
    )
}

export default Chart;