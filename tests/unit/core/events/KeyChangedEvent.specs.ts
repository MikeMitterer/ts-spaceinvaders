import { KeyChangedEvent } from '@/core/events/KeyChangedEvent';
import { withoutSpace } from '@mmit/tdd';
import 'jest-extended';
import { loggerFactory } from '../../_tdd/ConfigLog4j';

describe('KeyChangedEvent', () => {
    const logger = loggerFactory.getLogger('mmit.spaceinvaders.tests.unit.core.events.KeyChangedEvent');

    const jsonToTest = `{
        "event": "keychangedevent"
    }`;

    test('Create', () => {
        const event = new KeyChangedEvent();
        const json = JSON.stringify(event);

        expect(json).toBe(withoutSpace(jsonToTest));
    });
});
