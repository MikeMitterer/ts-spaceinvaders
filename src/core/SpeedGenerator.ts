export class SpeedGenerator {
    /** Min + Max included */
    public static getSpeed(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
