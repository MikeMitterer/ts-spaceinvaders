/**
 * Abstracts the size of [Screen].
 *
 * It should not be necessary to pass [Screen] around if
 * only the [ScreenSize] is needed.
 *
 *     init(frameHandler,screensize,spritefactory);
 */
import { Painter } from '@/core/painter';
import { loggerFactory } from '@mmit/communication/lib/config/ConfigLog4j';
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

    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.core.Screen');

    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    private readonly resizeCallback: () => void;

    private _width: number = 0;
    private _height: number = 0;

    /** Every [ScreenObject] draws on this [Painter] */
    public readonly painter: Painter;

    public static getInstance(): Screen {
        if (!this._screenInstance) {
            return Screen.create();
        }
        return this._screenInstance;
    }

    public static create(): Screen {
        validate.isTrue(
            !Screen._screenInstance,
            () => 'Screen was already created. Only one instance is allowed!',
        );

        Screen._screenInstance = new Screen();
        return Screen._screenInstance;
    }

    public static destroy(): void {
        Screen._screenInstance = undefined;
    }

    public get size(): ScreenSize {
        return { width: this._width, height: this._height };
    }

    private constructor() {
        // this.canvas = new HTMLCanvasElement();
        // this.canvas = document.createElement('canvas');
        // this.canvas.width = this.width;
        // this.canvas.height = this.height;
        //
        // this.context = validate.notNull(this.canvas.getContext('2d'), () => '2D Context was null!');

        const game = validate.notNull(
            this.gameElement,
            () => 'Could not find an element with id="game" - Strange!',
        );

        this.canvas = validate.notNull(
            game.querySelector<HTMLCanvasElement>('canvas'),
            () => 'No canvas! Check your template...',
        );

        this.resizeCallback = this.resizeCanvas(game, this.canvas);
        // window.removeEventListener('resize', this.resizeCallback);
        // window.addEventListener('resize', this.resizeCallback);
        // window.addEventListener('orientationchange', this.resizeCallback);

        let timerID = -1;
        timerID = setInterval(() => {
            const rect = game.getBoundingClientRect();

            this.logger.info(`Interval: ${rect.width}, ${rect.height}`);
            this._width = rect.width;
            this._height = rect.height;

            if (this._width !== 0 && this._height !== 0) {
                this.resizeCallback();
                clearInterval(timerID);
            }
        }, 300);

        this.resizeCallback();
        this.context = this.contextFromCanvas(this.canvas);
        this.canvas.width = this._width;
        this.canvas.height = this._height;

        this.painter = new Painter(this.context);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    /**
     * Clears the drawing context
     *
     *     void render(final Screen screen,final SpriteFactory spritefactory) {
     *         screen.clear()
     *     }
     */
    public clear(): void {
        this.context.clearRect(0, 0, this._width, this._height);
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

    private resizeCanvas(game: HTMLElement, canvas: HTMLCanvasElement): () => void {
        return (): void => {
            const rect = game.getBoundingClientRect();

            this.logger.info(`Resize: ${rect.width}, ${rect.height}`);

            canvas.width = rect.width;
            canvas.height = rect.height;
        };
    }
}
