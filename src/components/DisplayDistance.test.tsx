import React from "react";
import { render } from '@testing-library/react';
import DisplayDistance from "./DisplayDistance";

jest.mock('../services/x-y-chart.service', () => {
    return {
        XYChartService: jest.fn().mockImplementation(() => {
            return {computeDistance: () => 10.12345};
        }),
    };
});

describe("DisplayDistance component", () => {
    it('renders correctly and avoid undesired regression', () => {
        const selectedDataPoint = {x: 10, y: 11};
        const userLocation = {x: 10, y: 11.05};
        const component = render(<DisplayDistance selectedDataPoint={selectedDataPoint} userLocation={userLocation} />);

        expect(component).toMatchSnapshot();
    });

    it(`renders text in DOM`, () => {
        const selectedDataPoint = {x: 10, y: 11};
        const userLocation = {x: 10, y: 11.05};

        const {container} = render(<DisplayDistance selectedDataPoint={selectedDataPoint} userLocation={userLocation} />);
        const textElement = container.querySelector(`text`);

        expect(textElement).toBeInTheDocument();
    });

    it(`renders text in DOM`, () => {
        const selectedDataPoint = {x: 10, y: 11};
        const userLocation = {x: 10, y: 11.05};

        const {container} = render(<DisplayDistance selectedDataPoint={selectedDataPoint} userLocation={userLocation} />);
        const textElement = container.querySelector(`text`);

        expect(textElement).toBeInTheDocument();
    });

    it(`renders text with the distance in meters and km`, () => {
        const selectedDataPoint = {x: 10, y: 11};
        const userLocation = {x: 10, y: 11.05};

        const component = render(<DisplayDistance selectedDataPoint={selectedDataPoint} userLocation={userLocation} />);
        const textElement = component.container.querySelector(`text`);

        expect(textElement?.children.length).toEqual(2);
        expect(textElement?.children[0].innerHTML).toEqual("Distance [m]: 10.12");
        expect(textElement?.children[1].innerHTML).toEqual("Distance [km]: 0.01");
    });
});