import {render, screen} from "@testing-library/react";
import React from "react";
import Chart from "./Chart";
import userEvent from "@testing-library/user-event";

describe("Chart component", () => {
    const chartProps = {
        data: [ { id: 0, name: "user", label: "user", x: 9, y: 9 }, {id: 1, name: "cs1", label: "cs1", x: 10, y: 11}, {id: 2, name: "cs2", label: "cs2", x: 10, y: 12}, {id: 3, name: "cs3", label: "cs3", x: 10, y: 13} ],
        selectedDataPointCallback: jest.fn()
    }

    it('renders the chart in DOM and prevent regression', () => {
        const sut = render(<Chart {...chartProps} />);

        expect(screen.getByTestId("Chart")).toBeInTheDocument();
        expect(sut).toMatchSnapshot();
    });

    it(`display a tooltip (with the point coordinates) hovering a point and hide it when the point is not hovering any more`, () => {
        const {container} = render(<Chart {...chartProps} />);
        const pointIndex = 1;
        const seriesContainer = container.querySelector(`g.mark-series-overrides`) as SVGGElement;
        const seriesElement = seriesContainer?.children[pointIndex] as SVGCircleElement
        seriesElement.getBoundingClientRect = () => chartProps.data[pointIndex] as any;

        userEvent.hover(seriesElement);

        expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
        expect(screen.getByTestId("tooltip-content").children[0].innerHTML).toEqual(`Latitude: ${chartProps.data[pointIndex + 1].y}`);
        expect(screen.getByTestId("tooltip-content").children[1].innerHTML).toEqual(`Longitude: ${chartProps.data[pointIndex + 1].x}`);

        userEvent.unhover(seriesElement);
        expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
    })

    it(`display a tooltip (with the point coordinates) hovering user point and hide it when the point is not hovering any more`, () => {
        const {container} = render(<Chart {...chartProps} />);
        const userSeriesContainer = container.querySelector(`g.custom-svg-series-anchor`) as SVGGElement;
        userSeriesContainer.getBoundingClientRect = () => chartProps.data[0] as any;
        const userSeriesElement = userSeriesContainer?.children[0]! as SVGCircleElement;

        userEvent.hover(userSeriesElement);

        expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
        expect(screen.getByTestId("tooltip-content").children[0].innerHTML).toEqual(`Latitude: ${chartProps.data[0].y}`);
        expect(screen.getByTestId("tooltip-content").children[1].innerHTML).toEqual(`Longitude: ${chartProps.data[0].x}`);

        userEvent.unhover(userSeriesElement);
        expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
    });
});