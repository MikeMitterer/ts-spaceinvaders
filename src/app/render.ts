import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';

/**
 * Draws all the [Drawables]. [Screen] returns a [Painter] that is used for
 * all the drawing operations
 */
export function render(screen: Screen, spriteFactory: SpriteFactory): void {
    screen.clear();

    const painter = screen.painter;

    spriteFactory.tank.draw(painter);

    spriteFactory.swarm.draw(painter);

    spriteFactory.cities.draw(painter);

    spriteFactory.magazin.draw(painter);
}
