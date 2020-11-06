import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      track: 0,
      change: null,
      pending: [0],
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
      setTrack (state, payload) {
        state.track = payload;
      },
      changeTrack (state, payload) {
        state.change = payload;
      },
      addTrack (state, payload) {
        state.pending.push(payload);
      }
    },
    actions: {
      async changeTrack({commit}, idTrack) {
        await commit('addTrack', idTrack);
        commit('changeTrack', idTrack);
      }
    }
  })

  export default store;