import {HttpService} from "./http.service";

describe('HttpService', () => {
    let sut: HttpService;

    beforeEach(() => {
        sut = new HttpService();
    });

    describe("GET method", () => {
        it('should be called', async () => {
            const url = "test/link";
            sut.get = jest.fn();

            await sut.get(url);

            expect(sut.get).toHaveBeenCalled();
        });

        it('should be called with parameters', async () => {
            const url = "test/link";
            const headers = {
                "content-type": "application/json"
            } as HeadersInit;
            sut.get = jest.fn();

            await sut.get(url, {headers});

            expect(sut.get).toBeCalledWith(url, {headers});
        });
    })

    describe("POST method", () => {
        it('should be called', async () => {
            const url = "test/link";
            sut.post = jest.fn();

            await sut.post(url);

            expect(sut.post).toHaveBeenCalled();
        });

        it('should be called with parameters', async () => {
            const url = "test/link";
            const body = {
                "username": "test_user"
            };
            const headers = {
                "content-type": "application/json"
            } as HeadersInit;
            sut.post = jest.fn();

            await sut.post(url, body as any, {headers});

            expect(sut.post).toBeCalledWith(url, body, {headers});
        });
    })
});
