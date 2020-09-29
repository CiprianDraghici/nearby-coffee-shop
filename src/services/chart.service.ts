import {CoffeeShopsService} from "./coffee-shops.service";
import {ChartServiceContract} from "../contracts/chart-service.contract";
import {DataPointModel} from "../models/data-point.model";
import {CoffeeShopModel} from "../models/coffee-shop.model";
import {SeriesPoint} from "./x-y-chart.service";

export class ChartService implements ChartServiceContract {
    public async getData(): Promise<CoffeeShopModel[]> {
        const coffeeShopsService: CoffeeShopsService = new CoffeeShopsService();

        try {
            const result = await coffeeShopsService.getShops();
            return result!.map(p => ({...p, x: Number(p.x), y: Number(p.y)}));
        } catch (err) {
            throw Error(`The screen can not be displayed. Reason: ${err.message}.`);
        }
    }

    public getUserDataPoint(userLocation: SeriesPoint, customProps?: object): DataPointModel {
        return {
            id: 0,
            name: "User",
            x: userLocation.x,
            y: userLocation.y,
            label: "User",
            ...customProps
        }
    }

    public buildDataPoint(model: DataPointModel, customProps?: object) {
        return {
            ...model,
            label: model.name,
            ...customProps
        }
    }
}