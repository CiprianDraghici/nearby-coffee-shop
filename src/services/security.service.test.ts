import {SecurityService} from "./security.service";

describe("SecurityService", () => {
    let sut: SecurityService;

    beforeEach(() => {
        sut = new SecurityService();
    });

    describe("getToken method", () => {
        it("should return null if the token is not stored in sessionStorage or localStorage", () => {
            const value = sut.getToken();
            expect(value).toEqual(null);
        });

        it("should return the token stored in sessionStorage or localStorage", () => {
            sessionStorage["accessToken"] = "123456789";
            localStorage["accessToken"] = "123456789";

            const expectedValue = "123456789";

            const value = sut.getToken();

            expect(value).toEqual(expectedValue);
        });
    });
});