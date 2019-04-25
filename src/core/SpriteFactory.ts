// import invaders from "../assets/images/invaders.png";
import invaders from '@/assets/images/invaders.png';
import { Alien, Bullet, Cities, City, Swarm, Tank } from '@/core/drawables';
import { Magazin } from '@/core/Magazin';
import { SimpleSprite, ToggleSprite } from '@/core/sprite';
import * as validate from '@mmit/validate';

interface AlienSpriteFactory {
    blue: () => ToggleSprite;
    pink: () => ToggleSprite;
    lightBlue: () => ToggleSprite;
}

/**
 * Erzeugt die gewünschten Sprites
 */
export class SpriteFactory {
    private static instance: SpriteFactory;

    private readonly image: HTMLImageElement;
    private readonly alienSpriteFactory: Readonly<AlienSpriteFactory>;

    private _tank?: Tank;
    private _swarm?: Swarm;
    private _magazin?: Magazin;
    private _cities?: Cities;

    private constructor() {
        this.image = document.createElement('img');
        this.image.src = invaders;

        this.alienSpriteFactory = {
            blue: (): ToggleSprite =>
                new ToggleSprite([
                    new SimpleSprite(this.image, 0, 0, 22, 16),
                    new SimpleSprite(this.image, 0, 16, 22, 16),
                ]),
            pink: (): ToggleSprite =>
                new ToggleSprite([
                    new SimpleSprite(this.image, 22, 0, 16, 16),
                    new SimpleSprite(this.image, 22, 16, 16, 16),
                ]),
            lightBlue: (): ToggleSprite =>
                new ToggleSprite([
                    new SimpleSprite(this.image, 38, 0, 24, 16),
                    new SimpleSprite(this.image, 38, 16, 24, 16),
                ]),
        };
    }

    public static getInstance(): SpriteFactory {
        if (!SpriteFactory.instance) {
            SpriteFactory.instance = new SpriteFactory();
        }
        return SpriteFactory.instance;
    }

    public get tank(): Tank {
        if (!this._tank) {
            this._tank = new Tank(new SimpleSprite(this.image, 62, 0, 22, 16));
        }
        return this._tank;
    }

    public get swarm(): Swarm {
        if (!this._swarm) {
            this._swarm = new Swarm(this.createAliens());
        }
        return this._swarm;
    }

    public get bullet(): Bullet {
        return new Bullet(new SimpleSprite(this.image, 120, 0, 1, 10));
    }

    public get magazin(): Magazin {
        if (!this._magazin) {
            this._magazin = new Magazin();
        }
        return this._magazin;
    }

    public get cities(): Cities {
        if (!this._cities) {
            this._cities = new Cities(this.createCities());
        }
        return this._cities;
    }

    private createAliens(): readonly Alien[] {
        const aliens: Alien[] = [];

        // Alien-Rows in the swarm (see: create())
        //  pink (_alienSprites index 1)
        //  blue (_alienSprites index 0)
        //  blue (_alienSprites index 0)
        //  light-blue (_alienSprites index 2)
        //  light-blue (_alienSprites index 2)
        const spriteFactoryIndex = [
            this.alienSpriteFactory.pink,
            this.alienSpriteFactory.blue,
            this.alienSpriteFactory.blue,
            this.alienSpriteFactory.lightBlue,
            this.alienSpriteFactory.lightBlue,
        ];
        validate.isTrue(
            spriteFactoryIndex.length === Swarm.ROWS,
            () => `"Number of Swarm-Rows must be ${spriteFactoryIndex.length} but was ${Swarm.ROWS}"`,
        );

        for (let rows = 0; rows < Swarm.ROWS; rows++) {
            const factory = spriteFactoryIndex[rows];

            for (let cols = 0; cols < Swarm.COLS; cols++) {
                aliens.push(new Alien(factory()));
            }
        }

        return aliens;
    }

    private createCities(): readonly City[] {
        const cities: City[] = [];

        [1, 2, 3, 4].forEach((_) => {
            cities.push(new City(new SimpleSprite(this.image, 84, 8, 36, 24)));
        });

        return cities;
    }
}
