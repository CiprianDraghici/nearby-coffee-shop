import {XYChartService} from "./x-y-chart.service";

describe("XYChartService", () => {
    describe("computeDistance method", () => {
        it("should return the distance (equals to 0) between 2 points which contains the same x/y coordinates", () => {
            const xyChartService = new XYChartService();
            const expectedValue = 0;

            const value = xyChartService.computeDistance({x: 24.1532928, y: 45.776896}, {x: 24.1532928, y: 45.776896})

            expect(value).toEqual(expectedValue);
        });

        it("should return the correct distance (in meters) between 2 points which contains different x/y coordinates", () => {
            const xyChartService = new XYChartService();
            const expectedValue = 1095.056258509918;

            const value = xyChartService.computeDistance({x: 10.00, y: 10.00}, {x: 10.01, y: 10.00})

            expect(value).toEqual(expectedValue);
        })
    });

    describe("getNearestPoints method", () => {
        it(`should return "data" parameter when the "data" length is less than "amount" parameter`, () => {
            const xyChartService = new XYChartService();
            const userLocation = {x: 10, y: 10};
            const data = [
                {x: 10, y: 10},
                {x: 11, y: 11}
            ]

            const result = xyChartService.getNearestPoints(userLocation, data, 3);

            expect(result.length).toEqual(2);
        });

        it(`should return the "amount" of closest points`, () => {
            const xyChartService = new XYChartService();
            const userLocation = {x: 10, y: 10};
            const data = [
                {x: 15, y: 10},
                {x: 13, y: 10},
                {x: 17, y: 10},
                {x: 12, y: 10},
                {x: 11, y: 10},
            ]
            const amount = 3;

            const expectedValue = [
                {x: 11, y: 10},
                {x: 12, y: 10},
                {x: 13, y: 10}
            ]

            const value = xyChartService.getNearestPoints(userLocation, data, amount);

            expect(value.length).toEqual(amount);
            expect(value).toEqual(expectedValue);
        });
    });
});