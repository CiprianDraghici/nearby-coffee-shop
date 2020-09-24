export class SecurityService {
    public getToken() {
        let token = sessionStorage.accessToken || localStorage.accessToken;
        return token || null;
    }
}