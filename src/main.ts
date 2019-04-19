import '@/assets/styles/main.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// prettier-ignore
new Vue({
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

    // tslint:disable-next-line:typedef
    render: (h) => h(App),
}).$mount('#app');
