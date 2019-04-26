/// GameState indicator
import { init } from '@/app/init';
import { render } from '@/app/render';
import { update } from '@/app/update';
import { loggerFactory } from '@/config/ConfigLog4j';
import { FrameHandler } from '@/core/FrameHandler';
import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';

export enum GameState {
    Continue,
    YouLost,
    YouWon,
}

/**
 * Game-Loop!
 * This is where everything happens.
 *
 * Init, update, render
 */
export function run(): GameState {
    const logger = loggerFactory.getLogger('mmit.spaceinvaders.app.gameloop.run');

    const frameHandler = new FrameHandler();
    const spriteFactory = SpriteFactory.getInstance();
    const screen = Screen.getInstance();

    init(frameHandler, screen.size, spriteFactory);

    let initState = checkGameState(spriteFactory);

    const _gameLoop = (state: GameState): void => {
        update(frameHandler, spriteFactory, screen.size);
        render(screen, spriteFactory);

        state = checkGameState(spriteFactory);
        if (state !== initState) {
            logger.info(`State: ${GameState[state]} / ${GameState[initState]}`);
            initState = state;
        }

        if (state !== GameState.Continue) {
            logger.info(`Final state: ${GameState[state]}`);
            return;
        }
        window.requestAnimationFrame(() => _gameLoop(state));
    };

    _gameLoop(initState);

    return checkGameState(spriteFactory);
}

/**
 * Checks if game continuous, if you lost or if you won
 */
function checkGameState(spriteFactory: SpriteFactory): GameState {
    if (spriteFactory.swarm.aliensAlive.length === 0) {
        return GameState.YouWon;
    }

    if (spriteFactory.tank.hits >= 3) {
        return GameState.YouLost;
    }

    if (spriteFactory.swarm.closestAlien.collidesWith(spriteFactory.cities)) {
        return GameState.YouLost;
    }

    return GameState.Continue;
}
