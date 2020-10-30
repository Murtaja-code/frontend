import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueShowdown } from 'vue-showdown'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.config.devtools = false;

// const plugin 
// Vue.mixin
Vue.component('VueShowdown', VueShowdown)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
