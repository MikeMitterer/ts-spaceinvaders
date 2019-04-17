import { Point } from '@/core/shapes/Point';

export class Rectangle {
    public static ZERO: Rectangle = new Rectangle(0, 0, 0, 0);
    public static ONE: Rectangle = new Rectangle(0, 0, 1, 1);

    public readonly x: number;
    public readonly y: number;
    public readonly xHigh: number;
    public readonly yHigh: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.xHigh = x + width;
        this.yHigh = y + height;
    }

    public static fromXYWH(x: number, y: number, w: number, h: number = w): Rectangle {
        return new Rectangle(x, y, x + w, y + h);
    }

    public static fromPoints(topLeftPoint: Point, botRightPoint: Point): Rectangle {
        return new Rectangle(topLeftPoint.x, topLeftPoint.y, botRightPoint.x, botRightPoint.y);
    }

    public static fromPointsXYWH(topLeftPoint: Point, widthHeightPoint: Point): Rectangle {
        return Rectangle.fromXYWH(
            topLeftPoint.x,
            topLeftPoint.y,
            widthHeightPoint.x,
            widthHeightPoint.y,
        );
    }

    public static fromPointXYAndWH(topLeftPoint: Point, w: number, h: number = w): Rectangle {
        return Rectangle.fromXYWH(topLeftPoint.x, topLeftPoint.y, w, h);
    }

    public get width(): number {
        return this.xHigh - this.x;
    }

    public get height(): number {
        return this.yHigh - this.y;
    }

    public expand(wRadius: number, hRadius: number = wRadius): Rectangle {
        return new Rectangle(
            this.x - wRadius,
            this.y - hRadius,
            this.xHigh + wRadius,
            this.yHigh + hRadius,
        );
    }

    public shrink(wRadius: number, hRadius: number = wRadius): Rectangle {
        return new Rectangle(
            this.x + wRadius,
            this.y + hRadius,
            this.xHigh - wRadius,
            this.yHigh - hRadius,
        );
    }

    public multiply(n: number | Rectangle): Rectangle {
        if (n instanceof Rectangle) {
            const rect = n;
            return new Rectangle(
                this.x * rect.x,
                this.y * rect.y,
                this.xHigh * rect.xHigh,
                this.yHigh * rect.yHigh,
            );
        }
        return new Rectangle(this.x * n, this.y * n, this.xHigh * n, this.yHigh * n);
    }

    public divide(n: number): Rectangle {
        return new Rectangle(this.x / n, this.y / n, this.xHigh / n, this.yHigh / n);
    }

    public divideAndRoundOuter(n: number): Rectangle {
        return new Rectangle(
            Math.floor(this.x / n),
            Math.floor(this.y / n),
            Math.ceil(this.xHigh / n),
            Math.ceil(this.yHigh / n),
        );
    }

    public clampPoint(point: Point): Point {
        return new Point(
            Math.max(Math.min(point.x, this.xHigh), this.x),
            Math.max(Math.min(point.y, this.yHigh), this.y),
        );
    }

    public edgeDistanceToRectEdge(rect: Rectangle): number {
        let dx: number;
        if (this.xHigh < rect.x) {
            dx = rect.x - this.xHigh;
        } else if (this.x > rect.xHigh) {
            dx = this.x - rect.xHigh;
        } else {
            dx = 0;
        }

        let dy: number;
        if (this.yHigh < rect.y) {
            dy = rect.y - this.yHigh;
        } else if (this.y > rect.yHigh) {
            dy = this.y - rect.yHigh;
        } else {
            return dx;
        }

        if (dx === 0) {
            return dy;
        }

        return Math.sqrt(dx * dx + dy * dy);
    }

    public edgeDistanceToPoint(point: Point): number {
        let dx: number;
        if (point.x < this.x) {
            dx = this.x - point.x;
        } else if (point.x > this.xHigh) {
            dx = point.x - this.xHigh;
        } else {
            dx = 0;
        }

        let dy: number;
        if (point.y < this.y) {
            dy = this.y - point.y;
        } else if (point.y > this.yHigh) {
            dy = point.y - this.yHigh;
        } else {
            return dx;
        }

        if (dx === 0) {
            return dy;
        }

        return Math.sqrt(dx * dx + dy * dy);
    }

    // public edgeDistanceToPoint(point:Point):number {
    // 	    return point.euclideanDistanceTo(this.clampPoint(point));
    // }

    public centerDistanceToPoint(point: Point): number {
        return point.euclideanDistanceTo(this.center());
    }

    public intersect(rect: Rectangle): Rectangle {
        if (!this.intersects(rect)) {
            return Rectangle.ZERO;
        }

        return new Rectangle(
            Math.max(this.x, rect.x),
            Math.max(this.y, rect.y),
            Math.min(this.xHigh, rect.xHigh),
            Math.min(this.yHigh, rect.yHigh),
        );
    }

    public unite(rect: Rectangle): Rectangle {
        return new Rectangle(
            Math.min(this.x, rect.x),
            Math.min(this.y, rect.y),
            Math.max(this.xHigh, rect.xHigh),
            Math.max(this.yHigh, rect.yHigh),
        );
    }

    public intersects(rect: Rectangle): boolean {
        return (
            this.x < rect.xHigh && this.xHigh > rect.x && this.y < rect.yHigh && this.yHigh > rect.y
        );
    }

    public contains(x: number, y: number): boolean {
        return x >= this.x && x < this.xHigh && y >= this.y && y < this.yHigh;
    }

    public equals(rect: Rectangle): boolean {
        return (
            this.x === rect.x &&
            this.y === rect.y &&
            this.xHigh === rect.xHigh &&
            this.yHigh === rect.yHigh
        );
    }

    public area(): number {
        return this.width * this.height;
    }

    public center(): Point {
        return new Point((this.x + this.xHigh) / 2, (this.y + this.yHigh) / 2);
    }

    public toString(): string {
        return 'Rect[' + this.x + ', ' + this.y + ', ' + this.xHigh + ', ' + this.yHigh + ']';
    }
}
