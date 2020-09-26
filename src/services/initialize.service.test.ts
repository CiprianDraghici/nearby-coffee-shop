import {HttpService, IHttpResponse} from "./http.service";
import {InitializeService} from "./initialize.service";

const setHttpServiceMock = (postMockedResponse: any) => {
    HttpService.getInstance = jest.fn().mockImplementation(() => ({
        HttpService: {
            getInstance: jest.fn().mockReturnThis()
        },
        post: jest.fn().mockReturnValue(Promise.resolve(postMockedResponse))
    }));
}

describe("InitializeService", () => {
    let sut: InitializeService;

    beforeEach(() => {
        sut = InitializeService.getInstance();
    });

    describe(`"init" method`, () => {
        it('should thrown error if the request response is not ok', async () => {
            const mockedResponse = {ok: false, statusText: "Error occurred", parsedBody: undefined} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            let error = undefined;

            try {
                await sut.init();
            }catch (e) {
                error = e;
            }

            expect(error).not.toBeUndefined();
            expect(error?.message).toEqual(mockedResponse.statusText);
        });

        it('should not update sessionStorage with a token if the request response.parsedBody does not exists', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: undefined} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            await sut.init();

            await expect(sessionStorage["accessToken"]).toBeUndefined();
        });

        it('should not update sessionStorage with a token if the request response.parsedBody does not contains "token" property', async () => {
            const mockedResponse = {ok: true, statusText: "Done", parsedBody: {}} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            await sut.init();

            await expect(sessionStorage["accessToken"]).toBeUndefined();
        });

        it('should set the sessionStorage with the token given from request response', async () => {
            const token =  "123456789";
            const mockedResponse = { ok: true, parsedBody: {token}} as IHttpResponse<{ token: string }>;
            setHttpServiceMock(mockedResponse);

            await sut.init();

            expect(sessionStorage.accessToken).toEqual(token);
        });
    });
});