import Vue from "vue";
//import VueUI from '@vue/ui';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import elementUi from './plugins/element.js'
//import '@vue/ui/dist/vue-ui.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  elementUi,
  render: h => h(App)
}).$mount("#app");

//vue.use(VueUI);
//vue.use(vuetify);
vue.use(router)