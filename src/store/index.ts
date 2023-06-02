import {createStore} from 'vuex';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export default createStore({
    state: {
        loggedIn: false,
        user: null,
        menu: false,
        authority: 0,
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
        },
        setAuthority(state, authority) {
            state.authority = authority;
        }
    },
    actions: {
        login({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                api.post('/login', {username, password})
                    .then(response => {
                        const user = response.data;
                        const authority = response.data;
                        commit('setLoggedIn', true);
                        commit('setUser', user);
                        resolve(user);
                        commit('setMenu', true);
                        commit('setAuthority', authority);
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('authority', JSON.stringify(authority));
                        document.body.style.backgroundImage='none'
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
            const authority = localStorage.getItem('authority');
            if (user) {
                commit('setLoggedIn', true);
                commit('setUser', JSON.parse(user));
                commit('setMenu', true)
                commit('setAuthority', authority)
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
