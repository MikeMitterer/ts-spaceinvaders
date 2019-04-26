import { Point } from '@/core/shapes/Point';
import 'jest-extended';
// import { loggerFactory } from '../../main/config/ConfigLog4j';

describe('Point', () => {
    // const logger = loggerFactory.getLogger('test.Point');

    test('equal', () => {
        const point1 = new Point(1, 1);
        const point2 = new Point(1, 1);

        expect(point1.equals(point2)).toBeTrue();
    });
    test('add single value', () => {
        const point = new Point(1, 1);

        const point2 = point.add(1);
        expect(point2.x).toBe(2);
        expect(point2.y).toBe(2);
    });

    test('add another point', () => {
        const point = new Point(1, 1);

        const point2 = point.add(new Point(2, 3));
        expect(point2.x).toBe(3);
        expect(point2.y).toBe(4);
    });

    test('Euclidean distance', () => {
        const start = new Point(1, 7);
        const end = new Point(8, 6);
        const result = start.euclideanDistanceTo(end);

        expect(Math.round(result * 100) / 100).toBe(7.07);
    });

    test('Hamilton-Jacobi distance', () => {
        const start = new Point(1, 7);
        const end = new Point(8, 6);
        const result = start.hamiltonDistanceTo(end);

        expect(result).toBe(8);
    });
});
