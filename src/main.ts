import '@/assets/styles/main.scss';
import { KeyChangedEvent } from '@/core/events/KeyChangedEvent';
import { InputHandler } from '@/core/InputHandler';
import { ActionBus } from '@mmit/communication/lib/actionbus';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    store,

    created: (): void => {
        InputHandler.init(() => {
            const actionBus = ActionBus.getInstance();

            // tslint:disable-next-line:no-console
            actionBus.fire(new KeyChangedEvent());
        });
    },

    // tslint:disable-next-line:typedef
    render: (h) => h(App),
}).$mount('#app');
