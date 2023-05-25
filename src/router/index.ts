import {createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import Home from '../components/Home.vue'
import Setting from '../components/Setting.vue'
import Manage from "../components/Manage.vue";
import Analysis from "../components/Analysis.vue";
import Export from "../components/Export.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home},
    {path: '/setting', component: Setting},
    {path: '/manage', component: Manage},
    {path: '/analysis', component: Analysis},
    {path: '/export', component: Export}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
