/**
 * Abstracts the size of [Screen].
 *
 * It should not be necessary to pass [Screen] around if
 * only the [ScreenSize] is needed.
 *
 *     init(frameHandler,screensize,spritefactory);
 */
import { Painter } from '@/core/painter';
import * as validate from '@mmit/validate';

export interface ScreenSize {
    width: number;
    height: number;
}

/**
 * Abstracted canvas class useful in games.
 *
 * Implemented as Singleton so that we can "construct" it multiple times
 *
 *     main() {
 *         final Screen screen = new Screen()..create();
 *         final SpriteFactory spritefactory = new SpriteFactory()..create();
 *         ...
 *         void loop() {
 *             ...
 *             render(screen,spritefactory);
 *         }
 *     }
 */
export class Screen {
    private static _screenInstance: Screen | undefined;

    private readonly width: number;
    private readonly height: number;

    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    /** Every [ScreenObject] draws on this [Painter] */
    public readonly painter: Painter;

    public static getInstance(): Screen {
        if (!this._screenInstance) {
            return Screen.create();
        }
        return this._screenInstance;
    }

    public static create(size: ScreenSize = { width: 500, height: 600 }): Screen {
        validate.isTrue(
            !this._screenInstance,
            () => 'Screen was already created. Only one instance is allowed!',
        );

        return new Screen(size);
    }

    private constructor(size: ScreenSize = { width: 500, height: 500 }) {
        this.width = size.width;
        this.height = size.height;

        // this.canvas = new HTMLCanvasElement();
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.context = validate.notNull(this.canvas.getContext('2d'), () => '2D Context was null!');

        const game = document.getElementById('game');
        if (game) {
            game.appendChild(this.canvas);
        } else {
            document.body.appendChild(this.canvas);
        }

        this.painter = new Painter(this.context);
    }

    /**
     * Clears the drawing context
     *
     *     void render(final Screen screen,final SpriteFactory spritefactory) {
     *         screen.clear()
     *     }
     */
    public clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
