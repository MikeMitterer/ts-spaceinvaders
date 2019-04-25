import { Rectangle } from '@/core/shapes/Rectangle';
import 'jest-extended';
// import { loggerFactory } from '../../main/config/ConfigLog4j';

describe('Rectangle', () => {
    // const logger = loggerFactory.getLogger('test.Rectangle');

    test('Intersects', () => {
        const rect1 = new Rectangle(0, 0, 10, 10);
        const rect2 = new Rectangle(1, 1, 9, 9);

        expect(rect1.intersects(rect2)).toBeTrue();
        expect(rect2.intersects(rect1)).toBeTrue();
    });
});
