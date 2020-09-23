import React, {useState} from "react";
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, MarkSeriesPoint, CustomSVGSeries, MarkSeries, LabelSeries} from "react-vis";
import Tooltip from "./Tooltip";

interface XYChartProps {
    data: MarkSeriesPoint[];
    userDataPoint: MarkSeriesPoint;
    selectedDataPointCallback: (dataPoint: MarkSeriesPoint | null) => void;
}

const XYChart: React.FC<XYChartProps> = (props) => {
    const [tooltipPosition, setTooltipPosition] = useState<{x: string | number, y: string | number, datapoint: MarkSeriesPoint} | null>( null);

    const onValueClick = (datapoint: any, e: any) => {
        e.event.stopPropagation();
        props.selectedDataPointCallback(datapoint);
    }

    const onValueMouseOver = (datapoint: any, e: any) => {
        e.event.stopPropagation();

        setTooltipPosition({
            x: e.event.target.getBBox().x + 50,
            y: e.event.target.getBBox().y + 30,
            datapoint
        });
    }

    const onUserMouseOver = (datapoint: any, e: any) => {
        e.event.stopPropagation();

        setTooltipPosition({
            x: e.event.target.parentElement.parentElement.parentElement.parentElement.getBBox().x + 50,
            y: e.event.target.parentElement.parentElement.parentElement.parentElement.getBBox().y + 30,
            datapoint
        });
    }

    const onValueMouseOut = (datapoint: any, e: any) => {
        e.event.stopPropagation();
        setTooltipPosition(null);
    }

    const onClick = () => {
        props.selectedDataPointCallback(null);
    }

    const TooltipContent = () => {
        if(!tooltipPosition) { return <></>;}
        console.log(tooltipPosition!.datapoint);
        console.log(tooltipPosition);

        return (
            <div>
                <div style={{textAlign: "left"}}>{`Latitude: ${tooltipPosition!.datapoint.y}`}</div>
                <div style={{textAlign: "left"}}>{`Longitude: ${tooltipPosition!.datapoint.x}`}</div>
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
                onValueMouseOver={onValueMouseOver}
                onValueMouseOut={onValueMouseOut}
            />
            <LabelSeries animation allowOffsetToBeReversed data={[...props.data, props.userDataPoint] as any[]} />
            <CustomSVGSeries data={[props.userDataPoint] as any[]} onValueMouseOver={onUserMouseOver} onValueMouseOut={onValueMouseOut} />
            
            <Tooltip show={!!tooltipPosition} position={{...tooltipPosition!}} content={TooltipContent} />
            {/*<Tooltip show={true} position={{x: 300, y: 300}} content={TooltipContent} />*/}
        </XYPlot>
    )
}

export default XYChart;