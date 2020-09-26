import {HttpService} from "./http.service";
import {SecurityService} from "./security.service";

export class CoffeeShopsService {
    public async getShops() {
        const httpService: HttpService = HttpService.getInstance();
        const securityService: SecurityService = new SecurityService();

        const token = securityService.getToken();

        const response = await httpService.get(`${httpService.baseUrl}/v1/coffee_shops?token=${token}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.parsedBody as any[] || [];
    }
}