import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import XYChart from "./XYChart";

describe("XYChart component", () => {
    const chartProps = {
        data: [ {id: 1, name: "cs1", label: "cs1", x: 10, y: 11}, {id: 2, name: "cs2", label: "cs2", x: 10, y: 12}, {id: 3, name: "cs3", label: "cs3", x: 10, y: 13} ],
        userDataPoint: { id: 1, name: "cs1", label: "cs1", x: 9, y: 9 },
        selectedDataPointCallback: jest.fn()
    }

    it(`renders data series in DOM`, () => {
        const {container} = render(<XYChart {...chartProps} />);

        const seriesElement = container.querySelector(`g.mark-series-overrides`);

        expect(seriesElement).toBeInTheDocument();
        expect(seriesElement?.children.length).toEqual(chartProps.data.length);
    });

    it(`renders user series in DOM`, () => {
        const {container} = render(<XYChart {...chartProps} />);

        const seriesElement = container.querySelector(`g.custom-svg-series-anchor`);

        expect(seriesElement).toBeInTheDocument();
        expect(seriesElement?.children.length).toEqual(1);
    });

    describe("MarkSeries component", () => {
        it(`display a tooltip text with the point coordinates on hover event and hide the tooltip on unhover`, () => {
            const {container} = render(<XYChart {...chartProps} />);
            const pointIndex = 1;
            const seriesContainer = container.querySelector(`g.mark-series-overrides`) as SVGGElement;
            const seriesElement = seriesContainer?.children[pointIndex] as SVGCircleElement
            seriesElement.getBBox = () => chartProps.data[pointIndex] as any;

            userEvent.hover(seriesElement);

            expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
            expect(screen.getByTestId("tooltip-content").children[0].innerHTML).toEqual(`Latitude: ${chartProps.data[pointIndex].y}`);
            expect(screen.getByTestId("tooltip-content").children[1].innerHTML).toEqual(`Longitude: ${chartProps.data[pointIndex].x}`);

            userEvent.unhover(seriesElement);
            expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
        })

        it(`call props.selectedDataPointCallback on value click`, () => {
            const {container} = render(<XYChart {...chartProps} />);
            const pointIndex = 1;
            const seriesContainer = container.querySelector(`g.mark-series-overrides`) as SVGGElement;
            const seriesElement = seriesContainer?.children[pointIndex] as SVGCircleElement
            seriesElement.getBBox = () => chartProps.data[pointIndex] as any;

            userEvent.click(seriesElement);

            expect(chartProps.selectedDataPointCallback).toHaveBeenCalled();
        });
    });

    describe("CustomSVGSeries component", () => {
        it(`display a tooltip text with the point coordinates on hover event and hide the tooltip on unhover`, () => {
            const {container} = render(<XYChart {...chartProps} />);
            const userSeriesContainer = container.querySelector(`g.custom-svg-series-anchor`) as SVGGElement;
            userSeriesContainer.getBBox = () => chartProps.data[0] as any;
            const userSeriesElement = userSeriesContainer?.children[0]! as SVGCircleElement;

            userEvent.hover(userSeriesElement);

            expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
            expect(screen.getByTestId("tooltip-content").children[0].innerHTML).toEqual(`Latitude: ${chartProps.userDataPoint.y}`);
            expect(screen.getByTestId("tooltip-content").children[1].innerHTML).toEqual(`Longitude: ${chartProps.userDataPoint.x}`);

            userEvent.unhover(userSeriesElement);
            expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
        });
    })
});