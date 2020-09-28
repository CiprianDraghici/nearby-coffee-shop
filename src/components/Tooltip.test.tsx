import {render} from "@testing-library/react";
import Tooltip from "./Tooltip";
import React from "react";

describe("Tooltip component", () => {
    const tooltipProps = {
        show: true,
        position: { x: 10, y: 11 },
        content: () => <span>"Tooltip text"</span>
    }

    it('renders tooltip content in DOM and prevent regression', () => {
        const sut = render(<Tooltip {...tooltipProps} />);
        const textElement = sut.container.querySelector(`span`);

        expect(sut).toMatchSnapshot();
        expect(textElement).toBeInTheDocument();
        expect(textElement?.innerHTML).toEqual(`"Tooltip text"`);
    });

    it(`display the content in the correct top-left position`, () => {
        const {container} = render(<Tooltip {...tooltipProps} />);

        const containerStyle = window.getComputedStyle(container.children[0]);

        expect(containerStyle.position).toEqual(`absolute`);
        expect(containerStyle.left).toEqual(`${tooltipProps.position.x}px`);
        expect(containerStyle.top).toEqual(`${tooltipProps.position.y}px`);
    });

    it(`do not renders the tooltip content since the component visibility do not permit this`, () => {
        const props = {
            ...tooltipProps,
            show: false,
        }

        const {container} = render(<Tooltip {...props} />);
        const textElement = container.querySelector(`span`);

        expect(textElement).not.toBeInTheDocument();
    });
});