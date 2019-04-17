/**
 * Base class for all the drawable (paintable) objects on the screen.
 */
import { Painter } from '@/core/painter';
import { Point } from '@/core/shapes/Point';
import { Rectangle } from '@/core/shapes/Rectangle';
import { Sprite } from '@/core/sprite';

/**
 * Base class for all the drawable (paintable) objects on the screen.
 *
 * [Painter] uses this class for doing it's job
 */
export interface Drawable {
    /// The image that represents this [Drawable]
    sprite: Sprite;

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

    public readonly sprite: Sprite;

    protected constructor(sprite: Sprite, position: Point) {
        this.x = position.x;
        this.y = position.y;
        this.sprite = sprite;
    }

    public clear(painter: Painter): void {
        painter.clear(this);
    }

    public draw(painter: Painter): void {
        painter.draw(this);
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

abstract class VerticalMovableScreenObject extends ScreenObject implements MoveVertical {
    public moveUp(options: MoveOptions = { speed: 1 }): void {
        this.y -= options.speed;
    }

    public moveDown(options: MoveOptions = { speed: 1 }): void {
        this.y += options.speed;
    }
}

abstract class MovableScreenObject extends VerticalMovableScreenObject implements MoveHorizontale {
    public moveLeft(options: MoveOptions = { speed: 1 }): void {
        this.x -= options.speed;
    }

    public moveRight(options: MoveOptions = { speed: 1 }): void {
        this.x += options.speed;
    }
}

export class Tank extends MovableScreenObject {
    public hits: number = 0;

    public constructor(sprite: Sprite) {
        super(sprite, Point.ZERO);
    }
}
