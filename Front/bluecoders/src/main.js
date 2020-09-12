import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

axios.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        Authorization: "api_key"
      }
    };
  },
  error => Promise.reject(error)
);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
