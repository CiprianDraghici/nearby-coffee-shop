import {render, screen, act} from "@testing-library/react";
import React from "react";
import NearestCoffeeShops from "./NearestCoffeeShops";
import {HttpService} from "../services/http.service";
import {UserGeolocation} from "../hooks/useGeolocation";

describe("NearestCoffeeShops component", () => {
    const props = {
        userGeoLocation: { longitude: 9, latitude: 9 } as UserGeolocation,
    }
    const setHttpServiceMock = (mockedResponse: any, errorMessage?: string) => {
        HttpService.getInstance = jest.fn().mockImplementation(() => ({
            HttpService: {
                getInstance: jest.fn().mockReturnThis()
            },
            get: jest.fn().mockReturnValue(Promise.resolve(mockedResponse)),
            handleRejection: jest.fn().mockImplementation(() => {
                throw new Error(errorMessage || "Generic error message");
            })
        }));
    }

    it('renders Chart in DOM and prevent regression', () => {
        const sut = render(<NearestCoffeeShops {...props} />);

        expect(sut).toMatchSnapshot();
        expect(sut).toBeDefined();
    });

    it("renders an error message if something wrong happening fetching the data", async () => {
        const fakeResponse = {ok: false, statusText: "Unauthorized", parsedBody: undefined, status: 401};
        setHttpServiceMock(fakeResponse, fakeResponse.statusText);

        await act(async () => {
            render(<NearestCoffeeShops {...props} />);
            expect(screen.queryByText("Loading...")).toBeTruthy();
        });

        expect(screen.queryByText(`The screen can not be displayed. Reason: ${fakeResponse.statusText}.`)).toBeInTheDocument();
        expect(screen.queryByText("Loading...")).toBeFalsy();
        expect(screen.queryByTestId("XY-Chart")).not.toBeInTheDocument();
    });

    it(`displays text "Loading..." while fetching the data`, async () => {
        const { getByText } = render(<NearestCoffeeShops {...props} />);

        await act(async () => {
            expect(getByText("Loading...")).toBeTruthy();
        })
    })

    it("renders Chart and plot the data", async () => {
        const fakeResponse = {ok: true, statusText: "Done", parsedBody: [{id: 1, x: 10, y: 11, name: "test", label: "test"}], status: 200};
        setHttpServiceMock(fakeResponse);

        await act(async () => {
            render(<NearestCoffeeShops {...props} />);
            expect(screen.queryByText("Loading...")).toBeTruthy();
        });

        expect(screen.queryByText("Loading...")).toBeFalsy();
        expect(screen.queryByTestId("XY-Chart")).toBeInTheDocument();
    });


});