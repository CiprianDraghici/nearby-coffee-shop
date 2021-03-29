import {CoffeeShopModel} from "../models/coffee-shop.model";
import {DataPointModel} from "../models/data-point.model";
import {SeriesPoint} from "../services/x-y-chart.service";

export interface ChartServiceContract {
    getData: () => Promise<CoffeeShopModel[]>;
    getUserDataPoint: (userLocation: SeriesPoint, customProps?: object) => DataPointModel;
    buildDataPoint: (coffeeShopModel: DataPointModel, customProps?: object) => DataPointModel;
}