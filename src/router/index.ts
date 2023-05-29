import {createRouter, createWebHistory, RouteRecordRaw, Router} from "vue-router";
import Home from '../components/Home.vue'
import Setting from '../components/Setting.vue'
import Manage from "../components/Manage.vue";
import Analysis from "../components/Analysis.vue";
import Export from "../components/Export.vue";
import Login from '../components/Login.vue'
import store from "../store";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home},
    {path: '/setting', component: Setting, meta: {requiresAuth: true}},
    {path: '/manage', component: Manage, meta: {requiresAuth: true}},
    {path: '/analysis', component: Analysis, meta: {requiresAuth: true}},
    {path: '/export', component: Export, meta: {requiresAuth: true}},
    {path: '/login', component: Login, meta: {requiresAuth: false}},
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    const loggedIn = store.state.loggedIn;
    const requiresAuth = to.meta.requiresAuth;

    if (requiresAuth && !loggedIn) {
        ElMessage.warning("请先登录");
        next('/login');
    } else {
        next();
    }
});


export default router;
