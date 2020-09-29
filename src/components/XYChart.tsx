import React from "react";
import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    CustomSVGSeries,
    MarkSeries,
    LabelSeries,
    DiscreteColorLegend
} from "react-vis";
import {SeriesPoint} from "../services/x-y-chart.service";

interface XYChartProps {
    data: SeriesPoint[];
    userDataPoint: SeriesPoint;

    onValueMouseOverCallback?: (dataPoint: SeriesPoint, target: SVGGraphicsElement) => void;
    onValueMouseOutCallback?: (e: any) => void;
    onValueClickCallback?: (dataPoint: SeriesPoint | null) => void;
}

const XYChart: React.FC<XYChartProps> = (props) => {
    const onValueClick = (datapoint: SeriesPoint, e: any) => {
        e.event.stopPropagation();

        if(!props.onValueClickCallback) { return; }
        props.onValueClickCallback(datapoint);
    }

    const onValueMouseOver = (datapoint: SeriesPoint, e: any) => {
        e.event.stopPropagation();

        if(!props.onValueMouseOverCallback) { return; }
        props.onValueMouseOverCallback(datapoint, e.event.target);
    }

    const onUserMouseOver = (datapoint: SeriesPoint, e: any) => {
        e.event.stopPropagation();

        const customSvgSeries = document.querySelector("g.custom-svg-series-anchor") as SVGGraphicsElement;
        if(!customSvgSeries) { return; }

        if(!props.onValueMouseOverCallback) { return; }
        props.onValueMouseOverCallback(datapoint, customSvgSeries);
    }

    const onValueMouseOut = (datapoint: SeriesPoint, e: any) => {
        e.event.stopPropagation();

        if(!props.onValueMouseOutCallback) { return; }
        props.onValueMouseOutCallback(e);
    }

    const onClick = () => {
        if(!props.onValueClickCallback) { return; }
        props.onValueClickCallback(null);
    }

    const getLegend = () => {
        return [
            {
                title: "User",
                color: "red"
            },
            {
                title: "Coffee Shops",
                color: "rgb(18 147 154)"
            }
        ];
    }

    return (
        <div data-testid={"XY-Chart"}>
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
                    className="mark-series-overrides"
                    data={props.data}
                    onValueClick={onValueClick}
                    onValueMouseOver={onValueMouseOver}
                    onValueMouseOut={onValueMouseOut}
                />
                <LabelSeries allowOffsetToBeReversed={true} data={[...props.data, props.userDataPoint] as any[]} />
                <CustomSVGSeries className={"custom-svg-series-anchor"} data={[props.userDataPoint] as any[]} onValueMouseOver={onUserMouseOver} onValueMouseOut={onValueMouseOut} />

                {props.children}
            </XYPlot>
            <DiscreteColorLegend items={getLegend()} orientation={"horizontal"} />
        </div>
    )
}

export default XYChart;