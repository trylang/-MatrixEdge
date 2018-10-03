import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './icons' // icon
//  reset CSS
import "normalize.css/normalize.css";

import ElementUI from "element-ui";
import * as filter from './utils/filter';
import {$message} from './utils/message';
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css"
import '@/styles/index.scss' // global css

import '@/permission' // permission control

import api from './api'
Vue.prototype.$api = api
Vue.prototype.$msg = $message

Vue.use(ElementUI);
Vue.config.productionTip = false;
Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

