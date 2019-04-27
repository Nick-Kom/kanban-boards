import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const backend = api =>
  "http://localhost:5000/kanban-boards-55/us-central1" + api;

export default new Vuex.Store({
  state: {
    boards: []
  },
  getters: {
    boards: (state, getters) => {
      return state.boards;
    }
  },
  mutations: {
    setBoards(state, payload) {
      state.boards = payload;
    }
  },
  actions: {
    getBoards({ dispatch, commit }) {
      return Vue.axios
        .get(backend(`/api/boards`))
        .then(boards => {
          console.log(boards.data);
          commit("setBoards", boards.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
});
