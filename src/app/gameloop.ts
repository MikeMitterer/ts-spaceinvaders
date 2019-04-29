/// GameState indicator
import { GameState } from '@/app/GameState';
import { init } from '@/app/init';
import { render } from '@/app/render';
import { update } from '@/app/update';
import { loggerFactory } from '@/config/ConfigLog4j';
import { FrameHandler } from '@/core/FrameHandler';
import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';
import gameModule from '../store/modules/GameModule';

const MAX_NUMBER_OF_TANKS = 3;

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
    gameModule.resetGameState(MAX_NUMBER_OF_TANKS);

    let initState = checkGameState(spriteFactory);

    const _gameLoop = (state: GameState): void => {
        if (gameModule.gameState === GameState.Continue) {
            update(frameHandler, spriteFactory, screen.size);
            render(screen, spriteFactory);
        }

        state = checkGameState(spriteFactory);
        if (state !== initState) {
            logger.info(`State: ${GameState[state]} / ${GameState[initState]}`);
            initState = state;
        }

        if (state !== GameState.Continue && state !== gameModule.gameState) {
            logger.info(`Final state: ${GameState[state]}`);
            gameModule.setGameState(state);
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

    gameModule.setNumberOfTanks(MAX_NUMBER_OF_TANKS - spriteFactory.tank.hits);
    if (spriteFactory.tank.hits >= MAX_NUMBER_OF_TANKS) {
        return GameState.YouLost;
    }

    if (spriteFactory.swarm.closestAlien.collidesWith(spriteFactory.cities)) {
        return GameState.YouLost;
    }

    return GameState.Continue;
}
