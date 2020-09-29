import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import XYChart from "./XYChart";

describe("XYChart component", () => {
    const chartProps = {
        data: [{ id: 0, name: "user", label: "user", x: 9, y: 9 }, {id: 1, name: "cs1", label: "cs1", x: 10, y: 11}, {id: 2, name: "cs2", label: "cs2", x: 10, y: 12}, {id: 3, name: "cs3", label: "cs3", x: 10, y: 13} ],
        onValueClickCallback: jest.fn(),
        onValueMouseOverCallback: jest.fn(),
        onValueMouseOutCallback: jest.fn()
    }

    it('renders the xy chart in DOM and prevent regression', () => {
        const sut = render(<XYChart {...chartProps} />);

        expect(screen.getByTestId(/XY-Chart/)).toBeInTheDocument();
        expect(sut).toMatchSnapshot();
    });

    it(`renders data series in DOM`, async () => {
        const {container} = render(<XYChart {...chartProps} />);

        const seriesElement = container.querySelector(`g.mark-series-overrides`);

        expect(seriesElement).toBeInTheDocument();
        expect(seriesElement?.children.length).toEqual(chartProps.data.length - 1);
    });

    it(`renders user series in DOM`, () => {
        const {container} = render(<XYChart {...chartProps} />);

        const seriesElement = container.querySelector(`g.custom-svg-series-anchor`);

        expect(seriesElement).toBeInTheDocument();
        expect(seriesElement?.children.length).toEqual(1);
    });

    it(`pass the selected point coordinates to the parent element`, () => {
        const {container} = render(<XYChart {...chartProps} />);
        const pointIndex = 1;
        const seriesContainer = container.querySelector(`g.mark-series-overrides`) as SVGGElement;
        const seriesElement = seriesContainer?.children[pointIndex] as SVGCircleElement
        seriesElement.getBoundingClientRect = () => chartProps.data[pointIndex] as any;

        userEvent.click(seriesElement);

        expect(chartProps.onValueClickCallback).toHaveBeenCalled();
    });

    it(`pass the point coordinates and the target element to the parent component hovering a point`, () => {
        const {container} = render(<XYChart {...chartProps} />);
        const pointIndex = 1;
        const seriesContainer = container.querySelector(`g.mark-series-overrides`) as SVGGElement;
        const seriesElement = seriesContainer?.children[pointIndex] as SVGCircleElement
        seriesElement.getBoundingClientRect = () => chartProps.data[pointIndex] as any;

        userEvent.hover(seriesElement);

        expect(chartProps.onValueMouseOverCallback).toHaveBeenCalled();
    });

    it(`pass the event of the target element to the parent component unhovering a point`, () => {
        const {container} = render(<XYChart {...chartProps} />);
        const pointIndex = 1;
        const seriesContainer = container.querySelector(`g.mark-series-overrides`) as SVGGElement;
        const seriesElement = seriesContainer?.children[pointIndex] as SVGCircleElement
        seriesElement.getBoundingClientRect = () => chartProps.data[pointIndex] as any;

        userEvent.hover(seriesElement);
        userEvent.unhover(seriesElement);

        expect(chartProps.onValueMouseOutCallback).toHaveBeenCalled();
    });
});