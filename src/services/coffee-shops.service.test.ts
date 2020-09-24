import {HttpService, IHttpResponse} from "./http.service";
import {CoffeeShopsService} from "./coffee-shops.service";

const setHttpServiceMock = (getMockedResponse: any) => {
    return HttpService.getInstance = jest.fn().mockImplementation(() => ({
        HttpService: {
            getInstance: jest.fn().mockReturnThis()
        },
        get: jest.fn().mockReturnValue(Promise.resolve(getMockedResponse)),
    }));
}

describe("CoffeeShopsService", () => {
    let sut: CoffeeShopsService;

    beforeEach(() => {
        sut = new CoffeeShopsService();
    });

    describe(`"getShops" method`, () => {
        it('should thrown error if the request response is not ok', async () => {
            const mockedResponse = {ok: false, statusText: "Error occurred", parsedBody: undefined} as IHttpResponse<Array<{x: number, y: number}>>;
            setHttpServiceMock(mockedResponse);

            // const result = await sut.getShops();
            // await expect(result).rejects.toThrow();
        });

        it('should return empty array', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: undefined} as IHttpResponse<Array<{x: number, y: number}>>;
            setHttpServiceMock(mockedResponse);

            const result = await sut.getShops();

            await expect(result).toEqual([]);

        });

        it('should return an array containing values', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: [{x: 1, y: 1}, {x: 2, y: 2}]} as IHttpResponse<Array<{x: number, y: number}>>;
            setHttpServiceMock(mockedResponse);

            const result = await sut.getShops();

            await expect(result).toEqual(mockedResponse.parsedBody);
        });
    });
});