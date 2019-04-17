// import invaders from "../assets/images/invaders.png";
import invaders from '@/assets/images/invaders.png';
import { Tank } from '@/core/drawables';
import { SimpleSprite } from '@/core/sprite';

export class SpriteFactory {
    private readonly image: HTMLImageElement;

    private _tank?: Tank;

    constructor() {
        this.image = document.createElement('img');
        this.image.src = invaders;
    }

    public get tank(): Tank {
        if (!this._tank) {
            this._tank = new Tank(new SimpleSprite(this.image, 62, 0, 22, 16));
        }
        return this._tank;
    }
}
