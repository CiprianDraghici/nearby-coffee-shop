import {render, screen, waitForElement, waitFor, act, wait} from "@testing-library/react";
import React from "react";
import NearestCoffeeShops from "./NearestCoffeeShops";
import {HttpService} from "../services/http.service";

describe("NearestCoffeeShops component", () => {
    const props = {
        userLocation: { x: 9, y: 9 },
    }
    const setHttpServiceMock = (postMockedResponse: any) => {
        HttpService.getInstance = jest.fn().mockImplementation(() => ({
            HttpService: {
                getInstance: jest.fn().mockReturnThis()
            },
            get: jest.fn().mockReturnValue(Promise.resolve(postMockedResponse))
        }));
    }

    it(`renders XYChart in DOM`, () => {
        const sut = render(<NearestCoffeeShops {...props} />);
        expect(sut).toBeDefined();
    });

    it(`displays text "Loading..." while fetching coffee shops`, () => {
        const { getByText } = render(<NearestCoffeeShops {...props} />);

        expect(getByText("Loading...")).toBeTruthy();
    })

    it("renders XYChart and plot the data", async () => {
        const fakeResponse = {ok: true, statusText: "Done", parsedBody: [{id: 1, x: 10, y: 11, name: "test", label: "test"}]};
        setHttpServiceMock(fakeResponse);

        await act(async () => {
            render(<NearestCoffeeShops {...props} />);
            expect(screen.queryByText("Loading...")).toBeTruthy();
        });

        expect(screen.queryByText("Loading...")).toBeFalsy();
        expect(screen.queryByTestId("XY-Chart")).toBeInTheDocument();
    });
});