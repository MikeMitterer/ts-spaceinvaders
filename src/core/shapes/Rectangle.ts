import { Point } from '@/core/shapes/Point';

export class Rectangle {
    public static ZERO: Rectangle = new Rectangle(0, 0, 0, 0);
    public static ONE: Rectangle = new Rectangle(0, 0, 1, 1);

    public readonly x: number;
    public readonly y: number;
    public readonly width: number;
    public readonly height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public static fromPoints(a: Point, b: Point): Rectangle {
        const left = Math.min(a.x, b.x);
        const width = Math.max(a.x, b.x) - left;

        const top = Math.min(a.y, b.y);
        const height = Math.max(a.y, b.y) - top;

        return new Rectangle(left, top, width, height);
    }

    public get right(): number {
        return this.x + this.width;
    }

    public get bottom(): number {
        return this.y + this.height;
    }

    /**
     * Computes the intersection of `this` and [other].
     *
     * The intersection of two axis-aligned rectangles, if any, is always another
     * axis-aligned rectangle.
     *
     * Returns the intersection of this and `other`, or `null` if they don't
     * intersect.
     */
    public intersection(other: Rectangle): Rectangle | undefined {
        const x0 = Math.max(this.x, other.x);
        const x1 = Math.min(this.x + this.width, other.x + other.width);

        if (x0 <= x1) {
            const y0 = Math.max(this.y, other.y);
            const y1 = Math.min(this.y + this.height, other.y + other.height);

            if (y0 <= y1) {
                return new Rectangle(x0, y0, x1 - x0, y1 - y0);
            }
        }
        return undefined;
    }

    /**
     * Returns a new rectangle which completely contains `this` and [other].
     */
    public boundingBox(other: Rectangle): Rectangle {
        const right = Math.max(this.right, other.right);
        const bottom = Math.max(this.bottom, other.bottom);

        const left = Math.min(this.x, other.x);
        const top = Math.min(this.y, other.y);

        return new Rectangle(left, top, right - left, bottom - top);
    }

    /**
     * Returns true if `this` intersects [[other]].
     */
    public intersects(other: Rectangle): boolean {
        return (
            this.x <= other.x + other.width &&
            other.x <= this.x + this.width &&
            this.y <= other.y + other.height &&
            other.y <= this.y + this.height
        );
    }

    public contains(left: number, top: number): boolean {
        return left >= this.x && left < this.right && top >= this.y && top < this.bottom;
    }

    public equals(rect: Rectangle): boolean {
        return (
            this.x === rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height
        );
    }

    public area(): number {
        return this.width * this.height;
    }

    public center(): Point {
        return new Point(this.x + Math.round(this.width / 2), this.y + Math.round(this.height / 2));
    }

    public toString(): string {
        return 'Rect[' + this.x + ', ' + this.y + ', ' + this.right + ', ' + this.height + ']';
    }
}
