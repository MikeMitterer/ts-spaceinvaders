import '@/assets/styles/main.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// prettier-ignore
const app = new Vue({
    router,
    store,

    // created: (): void => {
    //     InputHandler.init(() => {
    //         const actionBus = ActionBus.getInstance();
    //
    //         // tslint:disable-next-line:no-console
    //         actionBus.fire(new KeyChangedEvent());
    //     });
    // },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render: (h) => h(App),
})
app.$mount('#app');
