import {HttpService, IHttpResponse} from "./http.service";
import {InitializeService} from "./initializeService";

describe("InitializeService", () => {
    let sut: InitializeService;

    beforeEach(() => {
        sut = InitializeService.getInstance();
    });

    const setHttpServiceMock = (postMockedResponse: any) => {
        return  HttpService.getInstance = jest.fn().mockImplementation(() => ({
            HttpService: {
                getInstance: jest.fn().mockReturnThis()
            },
            post: jest.fn().mockReturnValue(postMockedResponse)
        }));
    }

    describe(`"init" method`, () => {
        it('should thrown error if the request response is not ok', async () => {
            const mockedResponse = {ok: false, statusText: "Error occurred", parsedBody: undefined} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            //  initializeService = InitializeService.getInstance();

            // const result = initializeService.init();
            // await expect(result).rejects.toBeTruthy();

            // await expect(initializeService.init()).rejects.toBeTruthy();
        });

        it('should not update localStorage and sessionStorage with a token if the request response.parsedBody does not exists', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: undefined} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            await sut.init();

            await expect(localStorage["accessToken"]).toBeUndefined();
            await expect(sessionStorage["accessToken"]).toBeUndefined();
        });

        it('should not update localStorage and sessionStorage with a token if the request response.parsedBody does not contains "token" property', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: {}} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            await sut.init();

            await expect(localStorage["accessToken"]).toBeUndefined();
            await expect(sessionStorage["accessToken"]).toBeUndefined();
        });

        it('should return the token in the request response', async () => {
            const token =  "123456789";
            const mockedResponse = { ok: true, parsedBody: {token}} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            await sut.init();

            expect(localStorage.accessToken).toEqual(token);
            expect(sessionStorage.accessToken).toEqual(token);
        });
    });
});