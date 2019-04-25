import { Direction, FrameHandler } from '@/core/FrameHandler';
import { InputHandler, KeyCode } from '@/core/InputHandler';
import { ScreenSize } from '@/core/screen';
import { SpeedGenerator } from '@/core/SpeedGenerator';
import { SpriteFactory } from '@/core/SpriteFactory';
import { loggerFactory } from '@mmit/communication/lib/config/ConfigLog4j';

// prettier-ignore
export function update(frameHandler: FrameHandler, spriteFactory: SpriteFactory, screenSize: ScreenSize): void {
    const logger = loggerFactory.getLogger('mmit.spaceinvaders.app.update');

    const tankSpeed = SpeedGenerator.getSpeed(2, 7);

    const swarmAutoMove = true;

    // Only for debugging
    const tankCanMoveVertically = false;

    // Only for debugging
    const swarmCanMoveUpAndDown = true && !tankCanMoveVertically;

    const tank = spriteFactory.tank;

    if (InputHandler.isDown(KeyCode.Left)) {
        tank.moveLeft({ speed: tankSpeed });
    } else if (InputHandler.isDown(KeyCode.Right)) {
        tank.moveRight({ speed: tankSpeed });
    } else if (InputHandler.isDown(KeyCode.Up) && tankCanMoveVertically) {
        tank.moveUp({ speed: tankSpeed });
    } else if (InputHandler.isDown(KeyCode.Down) && tankCanMoveVertically) {
        tank.moveDown({ speed: tankSpeed });
    }

    tank.x = Math.min(Math.max(tank.x, 0), screenSize.width - tank.width);
    tank.y = Math.min(Math.max(tank.y, 0), screenSize.height - tank.height);

    if (InputHandler.isPressed(KeyCode.Up) && swarmCanMoveUpAndDown) {
        spriteFactory.swarm.moveUp();
    } else if (InputHandler.isPressed(KeyCode.Down) && swarmCanMoveUpAndDown) {
        spriteFactory.swarm.moveDown();
    }

    if (InputHandler.isPressed(KeyCode.Space)) {
        const bullet = spriteFactory.bullet;

        bullet.x = spriteFactory.tank.x + Math.round(spriteFactory.tank.width / 2);
        bullet.y = spriteFactory.tank.y - Math.round(bullet.height * 1.1);
        bullet.velocity = SpeedGenerator.getSpeed(2, 8);

        spriteFactory.magazin.addBullet(bullet);
    }

    const _chooseRandomAlien = (max: number): number => {
        const min = 0;
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const _chooseAlienToFire = (): void => {
        const aliensInFront = spriteFactory.swarm.frontAliens;

        if (aliensInFront.length === 0) {
            return;
        }

        let randomAlien = 0;
        if (aliensInFront.length > 1) {
            randomAlien = _chooseRandomAlien(aliensInFront.length);
        }
        const alien = aliensInFront[randomAlien];
        const bullet = spriteFactory.bullet;

        bullet.x = alien.x + Math.round(alien.width / 2);
        bullet.y = alien.y + Math.round(bullet.height * 1.5);
        bullet.velocity = SpeedGenerator.getSpeed(2, 4) * -1;

        spriteFactory.magazin.addBullet(bullet);
    };

    const _changeDirection = (direction: Direction): void => {
        if (swarmAutoMove) {
            spriteFactory.swarm.moveDown();
        }

        frameHandler.toggleDirection();

        // Make sure we move straight down! (undo the previous horizontal movement)
        direction === Direction.Right ? spriteFactory.swarm.moveLeft() : spriteFactory.swarm.moveRight();

        if (swarmAutoMove) {
            frameHandler.updateFrequency = frameHandler.updateFrequency - 1;
        }
    };

    // Moves the sprites down (toggle)
    // The frequency is defined in "init"
    frameHandler.update((direction) => {
        spriteFactory.swarm.toggle();

        direction === Direction.Left ? spriteFactory.swarm.moveLeft() : spriteFactory.swarm.moveRight();

        if (spriteFactory.swarm.x + spriteFactory.swarm.width >= 500 - 10) {
            _changeDirection(direction);
        } else if (spriteFactory.swarm.x <= 10) {
            _changeDirection(direction);
        }

        logger.info(`UF ${frameHandler}`);
        _chooseAlienToFire();
    });

    spriteFactory.magazin.checkIfTankIsHit(spriteFactory.tank);

    // Looks more realistic if this check is before the next "fire" command
    spriteFactory.magazin.checkIfCityIsHit(spriteFactory.cities);

    spriteFactory.magazin.fire();

    spriteFactory.magazin.checkIfAlienIsHit(spriteFactory.swarm.aliens);

    spriteFactory.magazin.removeFailedBullets(screenSize.height);
}
