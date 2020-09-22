export class SecurityService {
    public getToken() {
        let token = sessionStorage.accessToken || localStorage.accessToken;

        if(token && token !== "undefined") {
            return token;
        } else {
            return null;
        }
    }
}