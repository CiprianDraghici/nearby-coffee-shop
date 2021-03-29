import { renderHook } from '@testing-library/react-hooks'
import {useGeolocation} from "./useGeolocation";

describe("useGeolocation hook", () => {
    beforeAll(() => {
        global.navigator.geolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn()
        };
    })

    it("should set userGeoLocation with the correct user coordinates", () => {
        const expectedValue = {latitude: 9, longitude: 10};
        global.navigator.geolocation.watchPosition = jest.fn().mockImplementationOnce((success, error) => Promise.resolve(success({
                coords: { ...expectedValue }
            }, error({message: "Can not access location."}))
        ));

        const { result } = renderHook(() => useGeolocation())

        expect(result.current.userGeoLocation).toEqual(expectedValue);
    });

    it("should display an error if something is wrong and the location can not be accessed", () => {
        const expectedValue = {latitude: 0, longitude: 0};
        const errorMessage = "Can not access location.";
        global.navigator.geolocation.watchPosition = jest.fn().mockImplementationOnce((success, error) => Promise.resolve(error({message: errorMessage})));
        jest.spyOn(global.console, 'error');

        const { result } = renderHook(() => useGeolocation())

        expect(console.error).toHaveBeenCalledWith(errorMessage);
        expect(result.current.userGeoLocation).toEqual(expectedValue);
    });

    it("should set errorGeoLocation with the error object from the error callback ", () => {
        const errorMessage = "Can not access location.";
        global.navigator.geolocation.watchPosition = jest.fn().mockImplementationOnce((success, error) => Promise.resolve(error({message: "Can not access location."})));

        const { result } = renderHook(() => useGeolocation())

        expect(result.current.errorGeoLocation).toEqual({message: errorMessage});
    });
});