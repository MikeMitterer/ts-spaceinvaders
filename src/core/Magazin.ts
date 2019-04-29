import { Alien, Bullet, Cities, Tank } from '@/core/drawables';
import { Painter } from '@/core/painter';
import { Rectangle } from '@/core/shapes/Rectangle';

enum Continue {
    Yes,
    No,
}

export class Magazin {
    // private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.core.Magazin');
    private bullets: Bullet[] = [];

    public addBullet(bullet: Bullet): void {
        this.bullets.push(bullet);
    }

    // remove bullets outside of the canvas
    public removeFailedBullets(maxHeight: number): void {
        this.bullets = this.bullets.filter((bullet: Bullet) => {
            return bullet.y <= maxHeight || bullet.y < 0;
        });
    }

    public fire(): void {
        this.bullets.forEach((bullet: Bullet) => bullet.move());
    }

    public draw(painter: Painter): void {
        painter.save();
        this.bullets.forEach((bullet) => bullet.draw(painter));
        painter.restore();
    }

    public checkIfAlienIsHit(aliens: readonly Alien[]): void {
        aliens
            .filter((alien) => alien.IsAlive)
            .forEach((alien) => {
                const rectAlien = new Rectangle(alien.x, alien.y, alien.width, alien.height);
                // const rectAlien = alien.rect;

                for (let index = 0; index < this.bullets.length; index++) {
                    const bullet = this.bullets[index];
                    const rectBullet = new Rectangle(bullet.x, bullet.y, bullet.width, bullet.height);
                    // const rectBullet = bullet.rect;
                    if (rectAlien.intersects(rectBullet)) {
                        // this.logger.info('HIT!');
                        alien.die();
                        this.bullets.splice(index, 1);
                        break;
                    } else {
                        // tslint:disable-next-line
                        // new Promise((resolve) => {
                        //     this.logger.info(
                        //         `Rect-Alien ${rectAlien} does not intersect with Rect-Bullet ${rectBullet}`,
                        //     );
                        //     resolve();
                        // });
                    }
                }
            });
    }

    public checkIfCityIsHit(cities: Cities): void {
        for (let index = 0; index < this.bullets.length; index++) {
            const bullet = this.bullets[index];
            if (cities.destroyCityIfItIsHit(bullet)) {
                this.bullets.splice(index, 1);
                break;
            }
        }
    }

    public checkIfTankIsHit(tank: Tank): void {
        this.forEachBullet(
            (bullet, index): Continue => {
                if (tank.collidesWith(bullet)) {
                    tank.hits++;
                    this.bullets.splice(index, 1);
                    return Continue.No;
                }
                return Continue.Yes;
            },
        );
    }

    private forEachBullet(callback: (bullet: Bullet, index: number) => Continue): void {
        for (let index = 0; index < this.bullets.length; index++) {
            const bullet = this.bullets[index];
            if (callback(bullet, index) === Continue.No) {
                break;
            }
        }
    }
}
