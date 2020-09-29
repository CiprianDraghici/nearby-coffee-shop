import {SeriesPoint} from "../services/x-y-chart.service";
import {CoffeeShopModel} from "./coffee-shop.model";

export interface DataPointModel extends SeriesPoint, CoffeeShopModel{
    name: string;
    label?: string;
    [key: string]: any;
}