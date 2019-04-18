import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '../index';

@Module({ dynamic: true, namespaced: true, name: 'counterModule', store })
class CounterModule extends VuexModule {
    private _count = 150;

    public get count(): number {
        return this._count;
    }

    // action 'increment' commits mutation '_increment' when done with return value as payload
    @Action({ commit: '_increment' })
    public async increment(delta: number): Promise<number> {
        return delta;
    }

    // action 'decrement' commits mutation '_decrement' when done with return value as payload
    @Action({ commit: '_decrement' })
    public async decrement(delta: number): Promise<number> {
        return delta;
    }

    @Mutation
    private _increment(delta: number): void {
        this._count += delta;
    }

    @Mutation
    private _decrement(delta: number): void {
        this._count -= delta;
    }
}

export default getModule(CounterModule);
