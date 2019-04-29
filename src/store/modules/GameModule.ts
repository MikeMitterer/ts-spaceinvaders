import { GameState } from '@/core/GameState';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '../index';

@Module({ dynamic: true, namespaced: true, name: 'gameModule', store })
class GameModule extends VuexModule {
    /** Set in gameloop (init) */
    private _tanks = 0;

    private _gameState = GameState.Stopped;

    public get tanks(): number {
        return this._tanks;
    }

    public get gameState(): GameState {
        return this._gameState;
    }

    // action 'setNumberOfTanks' commits mutation '_setNumberOfTanks' when done with return value as payload
    @Action({ commit: '_setNumberOfTanks' })
    public async setNumberOfTanks(tanks: number): Promise<number> {
        return tanks;
    }

    // action 'toggleGameState' commits mutation '_toggleGameState' when done with return value as payload
    @Action({ commit: '_toggleGameState' })
    public async toggleGameState(): Promise<void> {
        return;
    }

    // action 'setGameState' commits mutation '_setGameState' when done with return value as payload
    @Action({ commit: '_setGameState' })
    public async setGameState(state: GameState): Promise<GameState> {
        return state;
    }

    // - Keep all the Mutations private - we don't want to call Mutations directly -----------------

    @Mutation
    private _setNumberOfTanks(tanks: number): void {
        this._tanks = tanks;
    }

    @Mutation
    private _toggleGameState(): void {
        if (this._gameState === GameState.Continue) {
            this._gameState = GameState.Stopped;
        } else {
            this._gameState = GameState.Continue;
        }
    }

    @Mutation
    private _setGameState(state: GameState): void {
        this._gameState = state;
    }
}

export default getModule(GameModule);
