/**
 * Paints on the Canvas
 *
 *     final Painter painter = screen.painter;
 *     spritefactory.tank.draw(painter);
 */
import { Sprite } from '@/core/sprite';
import * as validate from '@mmit/validate';
import { Drawable } from './drawables';

export class Painter {
    protected readonly context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    /**
     * Draws the given [Drawable]
     *
     * spritefactory.tank.draw(painter);
     *
     */
    public draw(sprite: Sprite, drawable: Drawable): void {
        this.context.drawImage(
            // source
            sprite.image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,

            // target
            drawable.x,
            drawable.y,
            sprite.width,
            sprite.height,
        );
    }

    public clear(drawable: Drawable): void {
        this.context.clearRect(drawable.x - 10, drawable.y - 10, drawable.width + 20, drawable.height + 20);
    }

    public drawImage(imagePainter: ImagePainter, destX: number, destY: number): void {
        this.context.drawImage(imagePainter.canvas, destX, destY);
    }

    public save(): void {
        this.context.save();
    }

    public restore(): void {
        this.context.restore();
    }
}

/**
 * Special form of [Painter]. It paints on its own canvas.
 *
 * [Cities] are painting on this [Painter].
 *
 *     class Cities {
 *         ...
 *         Cities() {
 *             _imagePainter = new ImagePainter(_width,_height);
 *         }
 *
 *         void draw(final Painter painter) {
 *             if(cycles < 1) {
 *
 *                 // Draw it only on the first few cycles. This makes sure that
 *                 // we can later on "damage" this layer
 *                 _cities.forEach((final City city) => city.draw(_imagePainter));
 *
 *                 cycles++;
 *             }
 *         painter.drawImage(_imagePainter,0,y);
 *         }
 *
 *     }
 */
export class ImagePainter extends Painter {
    public readonly canvas: HTMLCanvasElement;

    public static create(width: number, height: number): ImagePainter {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        return new ImagePainter(canvas);
    }

    private constructor(canvas: HTMLCanvasElement) {
        super(validate.notNull(canvas.getContext('2d'), () => '2D-Context must not be null!'));

        this.canvas = canvas;
    }

    public clearRect(x: number, y: number, width: number, height: number): void {
        this.context.clearRect(x, y, width, height);
    }

    public getImageData(x: number, y: number, width: number, height: number): ImageData {
        return this.context.getImageData(x, y, width, height);
    }
}
