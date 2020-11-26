import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import db from '../db.json';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage,
    reducer: state => ({
        liked: state.liked
    })
})

const store = new Vuex.Store({
    state: {
        track: 0,
        change: null,
        pending: [0],
        liked: [],
        db: db
    },
    getters: {
        track: (state) => {
            return state.track;
        },
        getChange: (state) => {
            return state.change;
        },
        getPending: (state) => {
            return state.pending;
        }
    },
    mutations: {
        setTrack(state, payload) {
            state.track = payload;
        },
        changeTrack(state, payload) {
            state.change = payload;
        },
        addTrack(state, payload) {
            state.pending.push(payload);
        },
        addLikedTrack(state, payload) {
            state.liked.push(payload);
        },
        deleteLikedTrack(state, index) {
            state.liked.splice(index, 1);
        }
    },
    actions: {
        async changeTrack({commit}, idTrack) {
            await commit('addTrack', idTrack);
            commit('changeTrack', idTrack);
        }
    },
    plugins: [vuexLocalStorage.plugin]
})

export default store;