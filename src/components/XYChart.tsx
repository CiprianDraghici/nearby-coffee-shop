import React, {useState} from "react";
import {MarkSeries, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, MarkSeriesPoint} from "react-vis";
import Tooltip from "./Tooltip";

interface XYChartProps {
    data: MarkSeriesPoint[];
    selectedDataPointCallback: (dataPoint: MarkSeriesPoint | null) => void;
}

const XYChart: React.FC<XYChartProps> = (props) => {
    const [selectedDataPoint, setSelectedDataPoint] = useState<{id: string, name: string, x: string | number, y: string | number} | null>( null);
    const [tooltipPosition, setTooltipPosition] = useState<{x: string | number, y: string | number} | null>( null);

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
                data={props.data}
                onValueClick={onValueClick}
            />

            <Tooltip show={!!(selectedDataPoint && tooltipPosition)} position={{...tooltipPosition!}} content={TooltipContent} />
        </XYPlot>
    )
}

export default XYChart;