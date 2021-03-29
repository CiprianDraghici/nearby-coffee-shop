export interface CoffeeShopModel {
    id: number;
    x: number | string | Date;
    y: number | string | Date;
    name: string;
    created_at?: string;
    updated_at?: string;
}