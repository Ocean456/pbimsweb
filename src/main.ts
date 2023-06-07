import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from "./router";
import store from "./store";
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// noinspection JSIgnoredPromiseFromCall
store.dispatch('checkLogin');
createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
