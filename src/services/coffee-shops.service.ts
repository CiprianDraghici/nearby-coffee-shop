import {HttpService} from "./http.service";
import {SecurityService} from "./security.service";
import {CoffeeShopModel} from "../models/coffee-shop.model";

export class CoffeeShopsService {
    public async getShops() {
        const httpService: HttpService = HttpService.getInstance();
        const securityService: SecurityService = new SecurityService();

        const token = securityService.getToken();

        try {
            const response = await httpService.get<CoffeeShopModel[]>(`${httpService.baseUrl}/v1/coffee_shops?token=${token}`);

            if (response.status !== 200) {
                httpService.handleRejection(response);
            }

            return response.parsedBody as any[] || [];
        } catch (err) {
            httpService.handleRejection(err);
        }
    }
}