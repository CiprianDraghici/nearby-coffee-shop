import {HttpService} from "./http.service";
import {SecurityService} from "./security.service";

export class CoffeeShopsService {
    public async getShops() {
        const httpService: HttpService = HttpService.getInstance();
        const securityService: SecurityService = new SecurityService();

        const token = securityService.getToken();

        try {
            const response = await httpService.get(`${HttpService.baseUrl}/v1/coffee_shops?token=${token}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response.parsedBody as any[] || [];
        } catch (error) {
            console.error(error);
        }
    }
}