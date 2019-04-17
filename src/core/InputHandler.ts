import { loggerFactory } from '@/config/ConfigLog4j';

export enum KeyCode {
    Left = 37,
    Right = 39,

    Up = 38,
    Down = 40,

    Space = '32',
}

export class InputHandler {
    private static _instance: InputHandler;

    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.core.InputHandler');

    private readonly down = new Map<KeyCode, boolean>();
    private readonly pressed = new Map<KeyCode, boolean>();

    private constructor() {}

    public static get instance(): InputHandler {
        if (!InputHandler._instance) {
            return InputHandler.init();
        }
        return InputHandler._instance;
    }

    public static new(): InputHandler {
        return InputHandler.instance;
    }

    public static init(): InputHandler {
        if (InputHandler._instance !== undefined) {
            return InputHandler._instance;
        }

        InputHandler._instance = new InputHandler();

        const inputHandler = InputHandler._instance;
        const mapStringToKeyCode = new Map<string, KeyCode>();

        mapStringToKeyCode.set('ArrowLeft', KeyCode.Left);
        mapStringToKeyCode.set('ArrowRight', KeyCode.Right);
        mapStringToKeyCode.set('ArrowUp', KeyCode.Up);
        mapStringToKeyCode.set('ArrowDown', KeyCode.Down);
        mapStringToKeyCode.set(' ', KeyCode.Space);

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            const key = mapStringToKeyCode.get(event.key);
            if (key) {
                inputHandler.logger.info(`KeyDown '${event.key}'`);

                inputHandler.down.set(key, true);
                inputHandler.pressed.set(key, true);
            }
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            const key = mapStringToKeyCode.get(event.key);
            if (key) {
                inputHandler.logger.info(`KeyUP '${event.key}'`);

                inputHandler.down.set(key, false);
                inputHandler.pressed.set(key, false);
            }
        });

        return inputHandler;
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
}
