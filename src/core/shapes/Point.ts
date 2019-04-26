export class Point {
    public static ZERO: Point = new Point(0, 0);
    public static ONE: Point = new Point(1, 1);

    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
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

    /**
     * https://en.wikipedia.org/wiki/Hamilton%E2%80%93Jacobi_equation
     */
    public hamiltonDistanceTo(point: Point): number {
        return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
    }

    /**
     *  "ordinary" straight-line distance between two points in Euclidean space.
     *  With this distance, Euclidean space becomes a metric space.
     *  The associated norm is called the Euclidean norm.
     *  Older literature refers to the metric as the Pythagorean metric
     *
     * @param point
     */
    public euclideanDistanceTo(point: Point): number {
        const dx: number = point.x - this.x;
        const dy: number = point.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    public equals(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    public toString(): string {
        return 'Point[x: ' + this.x + ', y: ' + this.y + ']';
    }
}
