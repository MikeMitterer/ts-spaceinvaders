/// GameState indicator
import { init } from '@/app/init';
import { render } from '@/app/render';
import { update } from '@/app/update';
import { FrameHandler } from '@/core/FrameHandler';
import { GameState } from '@/core/GameState';
import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';
import { LoggerFactory } from '@mmit/logging';
import gameModule from '../store/modules/GameModule';

const MAX_NUMBER_OF_TANKS = 4;

/**
 * Game-Loop!
 * This is where everything happens.
 *
 * Init, update, render
 */
export function run(withState: GameState = GameState.Continue): GameState {
    const logger = LoggerFactory.getLogger('mmit.spaceinvaders.app.gameloop.run');

    const frameHandler = new FrameHandler();
    const spriteFactory = SpriteFactory.getInstance();
    const screen = Screen.getInstance();

    init(frameHandler, screen.size, spriteFactory);
    gameModule.setNumberOfTanks(MAX_NUMBER_OF_TANKS);
    gameModule.setGameState(withState);

    let initState = checkGameState(spriteFactory);

    let requestID = 0;
    const _gameLoop = (state: GameState): void => {
        if (gameModule.gameState === GameState.Continue) {
            update(frameHandler, spriteFactory, screen);
            render(screen, spriteFactory);
        }

        state = checkGameState(spriteFactory);
        if (state !== initState) {
            logger.info(`State: ${GameState[state]} / ${GameState[initState]}`);
            initState = state;
        }

        if (state !== GameState.Continue && state !== gameModule.gameState) {
            logger.info(`Final state: ${GameState[state]}`);
            window.cancelAnimationFrame(requestID);
            gameModule.setGameState(state);
        } else {
            // Continue the _gameLoop
            requestID = window.requestAnimationFrame(() => _gameLoop(state));
        }
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
