import '@/assets/styles/main.scss';
import { InputHandler } from '@/core/InputHandler';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    store,

    created: (): void => {
        InputHandler.init();
    },

    // tslint:disable-next-line:typedef
    render: (h) => h(App),
}).$mount('#app');
