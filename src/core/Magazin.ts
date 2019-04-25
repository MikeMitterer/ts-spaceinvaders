import { Alien, Bullet, Cities, Tank } from '@/core/drawables';
import { Painter } from '@/core/painter';
import { Rectangle } from '@/core/shapes/Rectangle';

enum Continue {
    Yes,
    No,
}

export class Magazin {
    private readonly bullets: Bullet[] = [];

    public addBullet(bullet: Bullet): void {
        this.bullets.push(bullet);
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
                const rectAlient = new Rectangle(alien.x, alien.y, alien.width, alien.height);

                for (let index = 0; index < this.bullets.length; index++) {
                    const bullet = this.bullets[index];
                    const rectBullet = new Rectangle(bullet.x, bullet.y, bullet.width, bullet.height);
                    if (rectAlient.intersects(rectBullet)) {
                        this.bullets.splice(index, 1);
                        break;
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
