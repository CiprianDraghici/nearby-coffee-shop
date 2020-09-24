import {MarkSeriesPoint} from "react-vis";

export class XYChartService {
    /**
     * @Reference: https://www.movable-type.co.uk/scripts/latlong.html
     */
    public computeDistance = (point1: MarkSeriesPoint, point2: MarkSeriesPoint) => {
        const lat1 = Number(point1.y);
        const lat2 = Number(point2.y);
        const lon1 = Number(point1.x);
        const lon2 = Number(point2.x);

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c; // in metres
    }

    public getNearest3Points = (userLocation: MarkSeriesPoint, data: MarkSeriesPoint[]) => {
        const sorted = data.sort( (a, b) => {
            const distance1 = this.computeDistance(userLocation, a);
            const distance2 = this.computeDistance(userLocation, b);
            return distance1 - distance2;
        });
        return sorted.slice(0, 3);
    }
}