import * as ab from '@mmit/communication/lib/actionbus';
import {
    toErrorMessage,
    toObject,
    validateEventName,
    validateJsonStructure,
} from '@mmit/communication/lib/events/utils';
import { FieldNode, node } from '@mmit/communication/lib/object/tree';
import { ArgumentError } from '@mmit/validate/lib/exception/ArgumentError';

// interface KeyChangedEventData {}

/**
 * [ApiKeyEvent] Type-Guard
 */
// prettier-ignore
// tslint:disable-next-line:no-any
function isKeyChangedEventEvent(object: any): object is ab.RawJsonEvent<{}> {
    return ab.isEvent(object)
        && KeyChangedEvent.EVENT.eventName === object.event
        ;
}

/**
 * Is fired wenn either Up, Down, Left, Right or Space is pressed
 */
export class KeyChangedEvent extends ab.JsonEvent<{}> {
    // noinspection SpellCheckingInspection
    public static readonly EVENT: ab.EventName = {
        eventName: 'keychangedevent',
    };

    constructor() {
        super(KeyChangedEvent.EVENT, {});
    }

    public static fromJson(json: string): KeyChangedEvent {
        const parsed = toObject(json);

        if (!isKeyChangedEventEvent(parsed)) {
            throw new ArgumentError(toErrorMessage(parsed, 'KeyChangedEvent'));
        }

        validateJsonStructure(parsed, struct);
        return new KeyChangedEvent();
    }
}

/**
 * Dient zum überprüfen der [JsonStructure] mit dem [basicValidator]
 */
// prettier-ignore
const struct: FieldNode = [
    node('event', {validator: validateEventName(KeyChangedEvent.EVENT)}),
];
