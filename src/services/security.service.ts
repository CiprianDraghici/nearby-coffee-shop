export class SecurityService {
    public getToken() {
        let token = sessionStorage.accessToken || localStorage.accessToken;

        if(token && token !== "undefined") {
            return `Bearer ${token}`
        } else {
            return null;
        }
    }
}