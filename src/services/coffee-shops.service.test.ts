import {HttpService, IHttpResponse} from "./http.service";
import {CoffeeShopsService} from "./coffee-shops.service";

const setHttpServiceMock = (mockedResponse: any, errorMessage?: string) => {
    return HttpService.getInstance = jest.fn().mockImplementation(() => ({
        HttpService: {
            getInstance: jest.fn().mockReturnThis()
        },
        get: jest.fn().mockReturnValue(Promise.resolve(mockedResponse)),
        handleRejection: jest.fn().mockImplementation(() => {
            throw new Error(errorMessage || "Generic error message");
        })
    }));
}

describe("CoffeeShopsService", () => {
    let sut: CoffeeShopsService;

    beforeEach(() => {
        sut = new CoffeeShopsService();
    });

    describe(`"getShops" method`, () => {
        it('should thrown error if the request response is not ok', async () => {
            const mockedResponse = {ok: false, statusText: "Unauthorized", parsedBody: undefined, status: 401} as IHttpResponse<Array<{x: number, y: number}>>;
            setHttpServiceMock(mockedResponse, mockedResponse.statusText);
            let error = undefined;

            try {
                await sut.getShops();
            }catch (e) {
                error = e;
            }

            expect(error).not.toBeUndefined();
            expect(error?.message).toEqual(mockedResponse.statusText);
        });

        it('should return empty array', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: undefined, status: 200} as IHttpResponse<Array<{x: number, y: number}>>;
            setHttpServiceMock(mockedResponse);

            const result = await sut.getShops();

            await expect(result).toEqual([]);

        });

        it('should return an array containing values', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: [{x: 1, y: 1}, {x: 2, y: 2}], status: 200} as IHttpResponse<Array<{x: number, y: number}>>;
            setHttpServiceMock(mockedResponse);

            const result = await sut.getShops();

            await expect(result).toEqual(mockedResponse.parsedBody);
        });
    });
});