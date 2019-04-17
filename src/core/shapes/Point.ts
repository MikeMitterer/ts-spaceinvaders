export class Point {
    public static ZERO: Point = new Point(0, 0);
    public static ONE: Point = new Point(1, 1);

    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        /*if (x != Math.floor(x) || y != Math.floor(y)) {
            throw new Error("Point values must be integers");
        }*/
        this.x = x;
        this.y = y;
    }

    public add(x: number | Point, y?: number): Point {
        if (x instanceof Point) {
            const point = x;
            return new Point(this.x + point.x, this.y + point.y);
        }
        return new Point(this.x + x, this.y + (y ? y : x));
    }

    public subtract(x: number | Point, y?: number): Point {
        if (x instanceof Point) {
            const point = x;
            return new Point(this.x - point.x, this.y - point.y);
        }
        return new Point(this.x - x, this.y - (y ? y : x));
    }

    public multiply(x: number, y?: number): Point {
        return new Point(this.x * x, this.y * (y ? y : x));
    }

    public divide(x: number, y?: number): Point {
        return new Point(this.x / x, this.y / (y ? y : x));
    }

    public center(): Point {
        return new Point(this.x / 2, this.y / 2);
    }

    public divideAndFloor(x: number, y?: number): Point {
        return new Point(Math.floor(this.x / x), Math.floor(this.y / (y ? y : x)));
    }

    public divideAndRound(x: number, y?: number): Point {
        return new Point(Math.round(this.x / x), Math.round(this.y / (y ? y : x)));
    }

    public round(): Point {
        return new Point(Math.round(this.x), Math.round(this.y));
    }

    public floor(): Point {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }

    public modulo(xModulo: number, yModulo?: number): Point {
        return new Point(this.x % xModulo, this.y % (yModulo ? yModulo : xModulo));
    }

    public negative(): Point {
        return new Point(-this.x, -this.y);
    }

    public hamiltonDistanceTo(point: Point): number {
        return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
    }

    public euclideanDistanceTo(point: Point): number {
        const dx: number = point.x - this.x;
        const dy: number = point.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public area(): number {
        return this.x * this.y;
    }

    public flatten(width: number): number {
        return this.y * width + this.x;
    }

    public equals(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    public toString(): string {
        return 'Point[x: ' + this.x + ', y: ' + this.y + ']';
    }
}
