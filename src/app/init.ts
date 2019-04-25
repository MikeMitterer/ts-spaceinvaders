/**
 * Initializes the game - means sets the initial values for [FrameHandler] and so forth.
 * Defines the base-positions for all the [Drawables] like [Tank], [Swarm]...
 */
import { FrameHandler } from '@/core/FrameHandler';
import { ScreenSize } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';

export function init(frameHandler: FrameHandler, screensize: ScreenSize, spritefactory: SpriteFactory): void {
    frameHandler.updateFrequency = 30;

    const _resetGameState = (): void => {
        spritefactory.tank.hits = 0;

        spritefactory.swarm.width = screensize.width;
        spritefactory.swarm.reVitalize();
        spritefactory.swarm.y = 0;

        spritefactory.cities.buildCycle = 0;
    };

    _resetGameState();

    // Start at pos 20 and at the bottom of the screen
    spritefactory.tank.x = 20;
    spritefactory.tank.y = screensize.height - spritefactory.tank.height * 2;

    spritefactory.cities.y = spritefactory.tank.y - spritefactory.cities.height * 2;
    spritefactory.cities.width = screensize.width - 40;

    spritefactory.swarm.x = 20;
    spritefactory.swarm.width = Math.round(screensize.width * 0.666);
}
