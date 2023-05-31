import {createStore} from 'vuex';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default createStore({
    state: {
        loggedIn: false,
        user: null,
        menu: false,
    },
    mutations: {
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        },
        setUser(state, user) {
            state.user = user;
        },
        setMenu(state, menu) {
            state.menu = menu;
        }
    },
    actions: {
        login({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                api
                    .post('/login', {username, password})
                    .then(response => {
                        const user = response.data;
                        commit('setLoggedIn', true);
                        commit('setUser', user);
                        localStorage.setItem('user', JSON.stringify(user));
                        resolve(user);
                        commit('setMenu', true);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        logout({commit}) {
            localStorage.removeItem('user');
            commit('setLoggedIn', false);
            commit('setUser', null);
            commit('setMenu', false)
        },
        checkLogin({commit}) {
            const user = localStorage.getItem('user');
            if (user) {
                commit('setLoggedIn', true);
                commit('setUser', JSON.parse(user));
                commit('setMenu',true)
            }
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.loggedIn;
        },
        currentUser(state) {
            return state.user;
        },
        MenuUI(state) {
            return state.menu;
        }
    }
});
