import { LoggerFactory } from '@mmit/logging';
import Vue from 'vue';
import Vuex, { ActionContext, ActionTree, MutationTree } from 'vuex';

// import gameModule from './modules/GameModule';

const logger = LoggerFactory.getLogger('mmit.spaceinvaders.store');

Vue.use(Vuex);

interface RootState {
    loaded: boolean;
}

const state: RootState = {
    loaded: false,
};

/**
 * Mutations are synchronous
 *
 *      context.commit('readyState', loadState);
 */
const mutations: MutationTree<RootState> = {
    readyState(status: RootState, payload): void {
        logger.info(`readyState - Mutation`);
        status.loaded = true;
    },
};

/**
 * Actions can be asynchronous.
 *
 * Make it a practice to never commit your Mutations directly.
 * Always use Actions to commit your mutations
 *
 *      this.$store.dispatch('readyState');
 */
const actions: ActionTree<RootState, RootState> = {
    async readyState(context: ActionContext<RootState, RootState>, payload: undefined): Promise<void> {
        // logger.info(`readyState - Action (${JSON.stringify(context)},${payload})`);
        logger.info(`readyState - Action`);

        const loadState = true;
        context.commit('readyState', loadState);
    },
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    // modules: {
    //     gameModule,
    // },
});

export default store;
