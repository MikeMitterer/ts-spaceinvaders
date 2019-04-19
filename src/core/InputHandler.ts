import { loggerFactory } from '@/config/ConfigLog4j';
import * as validate from '@mmit/validate';

export enum KeyCode {
    Left = 37,
    Right = 39,

    Up = 38,
    Down = 40,

    Space = '32',
}

type OnStateChangeCallback = () => void;
type OnKeyboardEventCallback = (event: KeyboardEvent) => void;

enum Events {
    KeyUp = 'keyup',
    KeyDown = 'keydown',
}

export class InputHandler {
    private static _instance: InputHandler | undefined;

    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.core.InputHandler');

    private readonly down = new Map<KeyCode, boolean>();
    private readonly pressed = new Map<KeyCode, boolean>();

    private readonly stringToKeyCode = new Map<string, KeyCode>();

    private onKeyUpCallback?: OnKeyboardEventCallback;
    private onKeyDownCallback?: OnKeyboardEventCallback;

    /**
     * remember the callbacks - maybe we need it in [[reset]]
     */
    private constructor() {
        this.stringToKeyCode.set('ArrowLeft', KeyCode.Left);
        this.stringToKeyCode.set('ArrowRight', KeyCode.Right);
        this.stringToKeyCode.set('ArrowUp', KeyCode.Up);
        this.stringToKeyCode.set('ArrowDown', KeyCode.Down);
        this.stringToKeyCode.set(' ', KeyCode.Space);
    }

    public static get instance(): InputHandler | never {
        return validate.notNull(
            InputHandler._instance,
            () => 'InputHandler must be initialized before it can be used!',
        );
    }

    public static init(onStateChanged: OnStateChangeCallback): InputHandler {
        validate.isTrue(!InputHandler._instance, () => 'Please call InputHandler#init only once!');

        InputHandler._instance = new InputHandler();
        const inputHandler = InputHandler._instance;

        inputHandler.onKeyDownCallback = inputHandler.onKeyDown(onStateChanged);
        inputHandler.onKeyUpCallback = inputHandler.onKeyUp(onStateChanged);

        window.addEventListener(Events.KeyDown, inputHandler.onKeyDownCallback);
        window.addEventListener(Events.KeyUp, inputHandler.onKeyUpCallback);

        return inputHandler;
    }

    /**
     * Cleanup EventListeners and sets the instance to undefined
     */
    public static reset(): void {
        const inputHandler = InputHandler._instance;

        if (inputHandler && inputHandler.onKeyDownCallback && inputHandler.onKeyUpCallback) {
            window.removeEventListener(Events.KeyDown, inputHandler.onKeyDownCallback);
            window.removeEventListener(Events.KeyUp, inputHandler.onKeyUpCallback);

            // Just to make sure everything is undefined and can be destroyed by the GC
            inputHandler.onKeyDownCallback = undefined;
            inputHandler.onKeyUpCallback = undefined;
        }
        InputHandler._instance = undefined;
    }

    /** Always returns the current [KeyCode] status */
    public static isDown(key: KeyCode): boolean {
        return InputHandler.instance.down.get(key) === true;
    }

    /**
     * Forces the user to press and release this [KeyCode] for example the
     * space bare for firing
     */
    public static isPressed(key: KeyCode): boolean {
        const inputHandler = InputHandler.instance;

        if (inputHandler.pressed.has(key)) {
            const status = inputHandler.pressed.get(key);

            inputHandler.pressed.set(key, false);
            return status === true;
        }
        return false;
    }

    private readonly onKeyDown = (onStateChanged: OnStateChangeCallback): OnKeyboardEventCallback => {
        return (event: KeyboardEvent): void => {
            const key = this.stringToKeyCode.get(event.key);

            if (key) {
                // this.logger.info(`KeyDown '${event.key}'`);

                this.down.set(key, true);
                this.pressed.set(key, true);

                onStateChanged();
            }
        };
    };

    private readonly onKeyUp = (onStateChanged: OnStateChangeCallback): OnKeyboardEventCallback => {
        return (event: KeyboardEvent): void => {
            const key = this.stringToKeyCode.get(event.key);
            if (key) {
                // this.logger.info(`KeyUP '${event.key}'`);

                this.down.set(key, false);
                this.pressed.set(key, false);

                onStateChanged();
            }
        };
    };
}
