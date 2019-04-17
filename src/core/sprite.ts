/**
 * [Sprite] represents the part of an [ImageElement] that can be drawn on the screen
 */
export interface Sprite {
    /** Holds all the Sprites */
    readonly image: HTMLImageElement;

    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

/**
 * "Normal" sprite. Graphic that can be displayed or moved on the screen (canvas)
 */
export class SimpleSprite implements Sprite {
    public readonly image: HTMLImageElement;
    public readonly x: number;
    public readonly y: number;
    public readonly width: number;
    public readonly height: number;

    constructor(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * This [Sprite] has two status - for example an [Alien] moving its arms up and down
 */
export class ToggleSprite implements Sprite {
    private activeSprite: 0 | 1 = 0;

    private sprites: [Sprite, Sprite];

    constructor(sprites: [Sprite, Sprite]) {
        this.sprites = sprites;
    }

    get image(): HTMLImageElement {
        return this.sprites[this.activeSprite].image;
    }

    get x(): number {
        return this.sprites[this.activeSprite].x;
    }

    get y(): number {
        return this.sprites[this.activeSprite].y;
    }

    get width(): number {
        return this.sprites[this.activeSprite].width;
    }

    get height(): number {
        return this.sprites[this.activeSprite].height;
    }
}
