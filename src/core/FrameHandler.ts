export enum Direction {
    Left,
    Right,
}

/**
 * Calls the [update]-Function every x-frames.
 * The the intervall is defined via [updateFrequency]
 */
export class FrameHandler {
    private frames: number = 0;
    private _frequency: number = 30;

    private direction: Direction = Direction.Right;

    public reset(defaultFrequency: number = 30): void {
        this.direction = Direction.Right;
        this.updateFrequency = defaultFrequency;
    }

    public update(updater: (direction: Direction) => void): void {
        this.frames++;
        if (this.frames % this._frequency === 0) {
            this.frames = 0;
            updater(this.direction);
        }
    }

    public set updateFrequency(frequency: number) {
        this._frequency = Math.max(1, frequency);
    }

    public get updateFrequency(): number {
        return this._frequency;
    }

    public toggleDirection(): void {
        this.direction = this.direction === Direction.Left ? Direction.Right : Direction.Left;
    }
}
