import { LOG_LEVEL } from '@/consts/enums';
import log from 'loglevel';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

log.setDefaultLevel(LOG_LEVEL);

log.info('Environment: ', import.meta.env.MODE);
log.info('BACKEND: ', globalThis.BACKEND_URL);
log.info('PATH_DAILY: ', globalThis.PATH_DAILY);
log.info('LOCALE: ', globalThis.LOCALE);
log.info('VUE_APP_LOCALE', globalThis.LOCALE);

class AdminApp {
  init() {
    const app = createApp(App);
    const pinia = createPinia();

    app.use(router);
    app.use(pinia);
    app.mount('#app');
  }
}

const adminApp = new AdminApp();
adminApp.init();
