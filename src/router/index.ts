import {createRouter, createWebHistory, RouteRecordRaw, Router} from "vue-router";
import Home from '../components/Home.vue'
import Setting from '../components/Setting.vue'
import Manage from "../components/Identity.vue";
import Analysis from "../components/Analysis.vue";
import Export from "../components/Export.vue";
import Login from '../components/Login.vue'
import User from '../components/User.vue'
import Help from '../components/Help.vue'
import Register from "../components/Register.vue";
import Domicile from "../components/Domicile.vue";
import Search from "../components/Search.vue"
import Issue from "../components/Issue.vue";
import Population from "../components/Population.vue";
import Migrate from "../components/Migrate.vue";
import Certify from "../components/Certify.vue";
import Statistics from "../components/Statistics.vue";
import store from "../store";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home, meta: {requiresAuth: true}},
    {path: '/setting', component: Setting, meta: {requiresAuth: true}},
    {path: '/identity', component: Manage, meta: {requiresAuth: true}},
    {path: '/analysis', component: Analysis, meta: {requiresAuth: true}},
    {path: '/export', component: Export, meta: {requiresAuth: true}},
    {path: '/login', component: Login, meta: {requiresAuth: false}},
    {path: '/user', component: User, meta: {requiresAuth: true}},
    {path: '/help', component: Help, meta: {requiresAuth: true}},
    {path: '/register', component: Register, meta: {requiresAuth: false}},
    {path: '/domicile', component: Domicile, meta: {requiresAuth: true}},
    {path: '/issue', component: Issue, meta: {requiresAuth: true}},
    {path: '/population', component: Population, meta: {requiresAuth: true}},
    {path: '/migrate', component: Migrate, meta: {requiresAuth: true}},
    {path: '/search', component: Search, meta: {requiresAuth: true}},
    {path: '/certify', component: Certify, meta: {requiresAuth: true}},
    {path: '/statistics', component: Statistics, meta: {requiresAuth: true}},
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.state.loggedIn;
    const requiresAuth = to.meta.requiresAuth;
    const authority = store.state.user.authority;

    if (loggedIn && authority == 0 && to.fullPath != '/user') {
        next('/user')
    }

    if (authority == 1 && to.fullPath == '/user') {
        next('/')
    }
    if (loggedIn && to.fullPath == '/login') {
        ElMessage.info("您已登录")
        next('/');
    }
    if (requiresAuth && !loggedIn) {
        if (from.fullPath !== '/') {
            ElMessage.warning("请先登录");
        }
        next('/login');
    } else {
        next();
    }
});

export default router;
