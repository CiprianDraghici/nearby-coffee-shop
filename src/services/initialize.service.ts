import {HttpService} from "./http.service";

export class InitializeService {
    private static instance: InitializeService;

    public static getInstance(): InitializeService {
        if (!InitializeService.instance) {
            InitializeService.instance = new InitializeService();
        }

        return InitializeService.instance;
    }

    public async init() {
        const httpService = HttpService.getInstance();

        const response = await httpService.post<{token: string}>(`${HttpService.baseUrl}/v1/tokens`);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const result = response.parsedBody;
        if(!result || !result.token) { return; }

        localStorage.accessToken = result.token;
        sessionStorage.accessToken = localStorage.accessToken;
    }
}