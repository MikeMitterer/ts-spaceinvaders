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

    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    public readonly width: number;
    public readonly height: number;

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
            !Screen._screenInstance,
            () => 'Screen was already created. Only one instance is allowed!',
        );

        Screen._screenInstance = new Screen(size);
        return Screen._screenInstance;
    }

    public static destroy(): void {
        Screen._screenInstance = undefined;
    }

    public get size(): ScreenSize {
        return { width: this.width, height: this.height };
    }

    private constructor(size: ScreenSize = { width: 500, height: 500 }) {
        this.width = size.width;
        this.height = size.height;

        // this.canvas = new HTMLCanvasElement();
        // this.canvas = document.createElement('canvas');
        // this.canvas.width = this.width;
        // this.canvas.height = this.height;
        //
        // this.context = validate.notNull(this.canvas.getContext('2d'), () => '2D Context was null!');

        const game = this.gameElement;
        if (game) {
            const canvas = game.querySelector<HTMLCanvasElement>('canvas');
            let canvasCreated = false;

            if (canvas) {
                this.canvas = canvas;
            } else {
                this.canvas = document.createElement('canvas');
                canvasCreated = true;
            }
            this.context = this.contextFromCanvas(this.canvas);
            this.canvas.width = this.width;
            this.canvas.height = this.height;

            if (canvasCreated) {
                game.appendChild(this.canvas);
            }
        } else {
            this.canvas = document.createElement('canvas');
            this.context = this.contextFromCanvas(this.canvas);

            this.canvas.width = this.width;
            this.canvas.height = this.height;
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

    /**
     * Shortcut - gibt das entsprechende HTMLElement zurück
     */
    private get gameElement(): HTMLElement | null {
        return document.getElementById('game');
    }

    private contextFromCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        return validate.notNull(canvas.getContext('2d'), () => '2D Context was null!');
    }
}
