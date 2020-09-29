import React, {useState} from "react";
import Tooltip from "./Tooltip";
import {SeriesPoint} from "../services/x-y-chart.service";
import XYChart from "./XYChart";

interface XYChartProps {
    data: SeriesPoint[];
    userDataPoint: SeriesPoint;
    selectedDataPointCallback: (dataPoint: SeriesPoint | null) => void;
}

const Chart: React.FC<XYChartProps> = (props) => {
    const [tooltipPosition, setTooltipPosition] = useState<{x: string | number, y: string | number, datapoint: SeriesPoint} | null>( null);

    const onValueClick = (datapoint: SeriesPoint | null) => {
        props.selectedDataPointCallback(datapoint);
    }

    const onValueMouseOver = (datapoint: any, targetElement: SVGGraphicsElement) => {
        setTooltipPosition({
            x: targetElement.getBBox().x + 50,
            y: targetElement.getBBox().y + 30,
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
            <XYChart data={props.data} userDataPoint={props.userDataPoint} onValueClickCallback={onValueClick} onValueMouseOverCallback={onValueMouseOver} onValueMouseOutCallback={onValueMouseOut}>
                <Tooltip show={!!tooltipPosition} position={{...tooltipPosition!}} content={TooltipContent} />
            </XYChart>
        </div>
    )
}

export default Chart;