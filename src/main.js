import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/routes';
import store from './store/store';
import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
