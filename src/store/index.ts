import { createStore } from 'vuex';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default createStore({
    state: {
        loggedIn: false,
        user: null
    },
    mutations: {
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                api
                    .post('/login', { username, password })
                    .then(response => {
                        const user = response.data;
                        commit('setLoggedIn', true);
                        commit('setUser', user);
                        localStorage.setItem('user', JSON.stringify(user));
                        resolve(user);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        logout({ commit }) {
            localStorage.removeItem('user');
            commit('setLoggedIn', false);
            commit('setUser', null);
        },
        checkLogin({ commit }) {
            const user = localStorage.getItem('user');
            if (user) {
                commit('setLoggedIn', true);
                commit('setUser', JSON.parse(user));
            }
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.loggedIn;
        },
        currentUser(state) {
            return state.user;
        }
    }
});
