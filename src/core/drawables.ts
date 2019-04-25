/**
 * Base class for all the drawable (paintable) objects on the screen.
 */
import { loggerFactory } from '@/config/ConfigLog4j';
import NoMoreAliensException from '@/core/exeptions/NoMoreAliensException';
import { ImagePainter, Painter } from '@/core/painter';
import { Screen } from '@/core/screen';
import { Point } from '@/core/shapes/Point';
import { Rectangle } from '@/core/shapes/Rectangle';
import { Sprite, ToggleSprite } from '@/core/sprite';
import * as validate from '@mmit/validate';

/**
 * Base class for all the drawable (paintable) objects on the screen.
 *
 * [Painter] uses this class for doing it's job
 */
export interface Drawable {
    x: number;
    y: number;

    width: number;
    height: number;

    clear(painter: Painter): void;
    draw(painter: Painter): void;
}

// export class MoveHorizontale {
//     public x: number = 0;
//
//     public moveLeft({ speed = 1 }: { speed?: number }): void {
//         this.x -= speed;
//     }
//
//     public moveRight({ speed = 1 }: { speed?: number }): void {
//         this.x += speed;
//     }
// }
//
// export class MoveVertical {
//     public y: number = 0;
//
//     public moveUp({ speed = 1 }: { speed?: number }): void {
//         this.y -= speed;
//     }
//
//     public moveDown({ speed = 1 }: { speed?: number }): void {
//         this.y += speed;
//     }
// }

export interface MoveOptions {
    speed: number;
}

export interface MoveHorizontale {
    moveLeft(options?: MoveOptions): void;
    moveRight(options?: MoveOptions): void;
}

export interface MoveVertical {
    moveDown(options?: MoveOptions): void;
    moveUp(options?: MoveOptions): void;
}

/**
 * More or less a base implementation of [Drawable] plus
 * with + height.
 */
abstract class ScreenObject implements Drawable {
    public x: number;
    public y: number;

    /** The image that represents this [[Drawable]] */
    public readonly sprite: Sprite;

    protected constructor(sprite: Sprite, position: Point = Point.ZERO) {
        this.x = position.x;
        this.y = position.y;
        this.sprite = sprite;
    }

    public clear(painter: Painter): void {
        painter.clear(this);
    }

    public draw(painter: Painter): void {
        painter.draw(this.sprite, this);
    }

    get width(): number {
        return this.sprite.width;
    }
    get height(): number {
        return this.sprite.height;
    }

    /** Describes the [Drawable] as [Rectangle] */
    public get rect(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    /** Collision detection */
    public collidesWith(so: ScreenObject): boolean {
        return this.rect.intersects(so.rect);
    }
}

/** Kind of a [[ScreenObject]] but can be move by the user vertically */
abstract class VerticalMovableScreenObject extends ScreenObject implements MoveVertical {
    public moveUp(options: MoveOptions = { speed: 1 }): void {
        this.y -= options.speed;
    }

    public moveDown(options: MoveOptions = { speed: 1 }): void {
        this.y += options.speed;
    }
}

/** Kind of a [[ScreenObject]] but can be move up, down, x and right by the user */
abstract class MovableScreenObject extends VerticalMovableScreenObject implements MoveHorizontale {
    public moveLeft(options: MoveOptions = { speed: 1 }): void {
        this.x -= options.speed;
    }

    public moveRight(options: MoveOptions = { speed: 1 }): void {
        this.x += options.speed;
    }
}

/** The Tank can move x and right and shoots the [Alien]s */
export class Tank extends MovableScreenObject {
    public hits: number = 0;

    public constructor(sprite: Sprite) {
        super(sprite);
    }
}

/** The enemy - the Aliens are organized in a [Swarm] */
export class Alien extends ScreenObject {
    private killed: boolean = false;

    public constructor(sprite: ToggleSprite) {
        super(sprite);
    }

    public toggle(): void {
        (this.sprite as ToggleSprite).toggle();
    }

    public draw(painter: Painter): void {
        if (!this.killed) {
            super.draw(painter);
        }
    }

    get isKilled(): boolean {
        return this.killed;
    }

    get IsAlive(): boolean {
        return !this.isKilled;
    }

    public die(): void {
        this.killed = true;
    }

    public reVitalize(): void {
        this.killed = false;
    }
}

/** Collection of [Alien]s */
export class Swarm implements Drawable, MoveHorizontale, MoveVertical {
    public static readonly ROWS = 5;
    public static readonly COLS = 10;

    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.core.Swarm');

    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 0;
    private _height: number = 0;

    constructor(public readonly aliens: readonly Alien[]) {
        validate.notEmpty(aliens, () => 'No aliens????');
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
        this.updatePosition();
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
        this.updatePosition();
    }

    public get width(): number {
        return this._width;
    }

    /** Must be set after initialisation */
    public set width(value: number) {
        this._width = value;
        this.updatePosition();
    }

    public get height(): number {
        return this._height;
    }

    public clear(painter: Painter): void {
        painter.clear(this);
    }

    public draw(painter: Painter): void {
        this.aliens.forEach((alien: Alien) => painter.draw(alien.sprite, alien));
    }

    public toggle(): void {
        this.aliens.forEach((alien: Alien) => alien.toggle());
    }

    public moveLeft(options?: MoveOptions): void {
        this._x -= this.moveWidth;
        this.updatePosition();
    }

    public moveRight(options?: MoveOptions): void {
        this._x += this.moveWidth;
        this.updatePosition();
    }

    public moveUp(options?: MoveOptions): void {
        this._y -= this.moveHeight;
        this.updatePosition();
    }

    public moveDown(options?: MoveOptions): void {
        this._y += this.moveHeight;
        this.updatePosition();
    }

    public reVitalize(): void {
        this.aliens.forEach((alien: Alien) => alien.reVitalize());
    }

    get frontAliens(): readonly Alien[] {
        const front: Alien[] = [];

        for (let colIndex = 0; colIndex < Swarm.COLS; colIndex++) {
            for (let rowIndex = Swarm.ROWS; rowIndex > 0; rowIndex--) {
                const indexAlien = colIndex + (rowIndex - 1) * Swarm.COLS;
                const alien = this.aliens[indexAlien];

                if (alien.IsAlive) {
                    front.push(alien);
                    break;
                }
            }
        }

        this.logger.info(`IA ${front.length}`);
        return front;
    }

    get aliensAlive(): readonly Alien[] {
        return this.aliens.filter((alien: Alien) => alien.IsAlive);
    }

    get closestAlien(): Alien | never {
        let closest: Alien | undefined;
        let yPos = 0;

        this.aliensAlive.forEach((alien: Alien) => {
            if (alien.y > yPos) {
                closest = alien;
                yPos = alien.y;
            }
        });

        if (typeof closest !== 'undefined') {
            return closest;
        }

        throw new NoMoreAliensException();
    }

    /** Updates x,y,width + height of the whole swarm */
    private updatePosition(): void {
        this._height = this.aliens[0].height * 1.5 * Swarm.ROWS;

        if (this.width === 0) {
            // tslint:disable-next-line:quotemark
            this.logger.warn("'width' not set for updatePostion! You must set the width for Swarm first.");
            return;
        }

        const sectionWidth = Math.round(this._width / Swarm.COLS);

        let index = 0;
        for (let rows = 0; rows < Swarm.ROWS; rows++) {
            for (let cols = 0; cols < Swarm.COLS; cols++) {
                const alien = this.aliens[index];
                const centerPos = sectionWidth / 2 - alien.width / 2;

                alien.x = Math.round(this.x + centerPos + cols * sectionWidth);
                alien.y = Math.round(this.y + rows * alien.height * 1.5 + 20);

                index++;
            }
        }
    }

    private get moveWidth(): number {
        return this.aliens[0].width;
    }

    private get moveHeight(): number {
        return this.aliens[0].height;
    }
}

/**
 * Bullet fired either by an [Alien] or by the [[Tank]].
 * A [[Magazin]] is used to hold the [[Bullet]]s
 */
export class Bullet extends ScreenObject implements MoveVertical {
    public velocity = 10;

    constructor(sprite: Sprite) {
        super(sprite);
    }

    public moveDown(options: MoveOptions = { speed: 1 }): void {
        this.y += options.speed;
    }

    public moveUp(options: MoveOptions = { speed: 1 }): void {
        this.y -= options.speed;
    }

    public move(): void {
        this.moveUp({ speed: this.velocity });
    }
}

/**
 * City can be destroyed by [[Alien]]
 */
export class City extends ScreenObject {
    constructor(sprite: Sprite) {
        super(sprite);
    }
}

export class Cities implements Drawable {
    private _width: number = 0;

    private readonly imagePainter: ImagePainter;

    public x: number = 0;
    public y: number = 0;

    public readonly height: number = 0;

    public buildCycle = 0;

    constructor(private readonly cities: readonly City[]) {
        this.width = Screen.getInstance().width;
        this.height = cities[0].height;

        this.imagePainter = ImagePainter.create(this._width, this.height);
    }

    get length(): number {
        return this.cities.length;
    }

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
        this.updateCityPosition();
    }

    public clear(painter: Painter): void {
        painter.clear(this);
    }

    public draw(painter: Painter): void {
        if (this.buildCycle < 5) {
            painter.save();

            this.cities.forEach((city: City) => {
                city.draw(this.imagePainter);
            });

            painter.restore();
            this.buildCycle++;
        }

        painter.drawImage(this.imagePainter, 0, this.y);
    }

    // Create damage effect on city-canvas
    public damage(x: number, y: number): void {
        // round x, y position
        x = Math.round(x);
        y = Math.round(y);

        // draw damage effect to canvas
        this.imagePainter.clearRect(x - 2, y - 2, 4, 4);
        this.imagePainter.clearRect(x + 2, y - 4, 2, 4);
        this.imagePainter.clearRect(x + 4, y, 2, 2);
        this.imagePainter.clearRect(x + 2, y + 2, 2, 2);
        this.imagePainter.clearRect(x - 4, y + 2, 2, 2);
        this.imagePainter.clearRect(x - 6, y, 2, 2);
        this.imagePainter.clearRect(x - 4, y - 4, 2, 2);
        this.imagePainter.clearRect(x - 2, y - 6, 2, 2);

        // final ScreenSize size = (new Screen()).size;
        //
        // _context.setStrokeColorRgb(0,255,0);
        // _context.rect(x,y,6,6);
        // _context.stroke();
    }

    /**
     * Destroy parts of the city it it is hit.
     *
     * If it is hit it returns true, otherwise it returns false
     */
    public destroyCityIfItIsHit(bullet: Bullet): boolean {
        const canvasOffset = this.y;
        const rectBullet = new Rectangle(bullet.x, bullet.y, bullet.width, Math.round(bullet.height / 2));

        for (const city of this.cities) {
            const rectCity = new Rectangle(city.x, city.y + canvasOffset, city.width, city.height);
            if (rectCity.intersects(rectBullet)) {
                const data = this.imagePainter.getImageData(bullet.x, bullet.y - canvasOffset, 1, 1);
                if (data.data[3] !== 0) {
                    this.damage(bullet.x, bullet.y - canvasOffset);
                    return true;
                }
            }
        }
        return false;
    }

    private updateCityPosition(): void {
        // Every city has its on "section" or column
        const section = Math.round(this.width / this.cities.length);
        const cityYPos = 0;

        for (let cityIndex = 0; cityIndex < this.cities.length; cityIndex++) {
            this.cities[cityIndex].x = section * (cityIndex + 1) - Math.round(section / 2);
            this.cities[cityIndex].y = cityYPos;
        }
    }
}
