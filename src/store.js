import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const backend = api => process.env.VUE_APP_FUNCTIONS + api;

export default new Vuex.Store({
  state: {
    cards: [],
    boards: [],
    columns: [],
    loadProgress: false
  },
  getters: {
    boards: state => {
      return state.boards;
    },
    columns: state => {
      return state.columns;
    },
    cards: state => {
      return state.cards;
    },
    getloadProgress: state => {
      return state.loadProgress;
    }
  },
  mutations: {
    setBoards(state, payload) {
      state.boards = payload;
    },
    setColumns(state, payload) {
      state.columns = payload;
    },
    addColumn(state, payload) {
      state.columns.push(payload);
    },
    setProgress(state, payload) {
      state.loadProgress = payload;
    },
    setCards(state, payload) {
      state.cards = payload;
    },
    addCard(state, payload) {
      state.cards.push(payload);
    }
  },

  actions: {
    getBoards({ dispatch, commit }) {
      Vue.axios
        .get(backend("/api/boards"))
        .then(boards => {
          commit("setBoards", boards.data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    getColumns({ dispatch, commit }, boardId) {
      commit("setProgress", true);
      Vue.axios
        .get(backend(`/api/columns/${boardId}`))
        .then(columns => {
          commit("setProgress", false);
          commit("setColumns", columns.data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    addNewColumn({ dispatch, commit }, column) {
      return Vue.axios
        .post(backend("/api/add-column"), column)
        .then(response => {
          commit("addColumn", response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    updateColumn({ dispatch, commit, state }, data) {
      Vue.axios
        .patch(backend("/api/update-column"), data)
        .then(response => {
          let updatedColumns = state.columns.map(item =>
            item.id === response.data.id ? (item = response.data) : item
          );

          commit("setColumns", updatedColumns);
        })
        .catch(error => {
          console.error(error);
        });
    },

    deleteColumn({ dispatch, commit, state }, data) {
      Vue.axios
        .delete(backend(`/api/delete-column/${data.boardId}/${data.columnId}`))
        .then(response => {
          let updatedColumns = state.columns.filter(
            obj => obj.id !== data.columnId
          );

          commit("setColumns", updatedColumns);
        })
        .catch(error => {
          console.error(error);
        });
    },

    getCards({ dispatch, commit }, boardId) {
      Vue.axios
        .get(backend(`/api/cards/${boardId}`))
        .then(cards => {
          commit("setCards", cards.data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    updateCard({ dispatch, commit, state }, data) {
      Vue.axios
        .patch(backend("/api/update-card"), data)
        .then(response => response)
        .catch(error => {
          console.error(error);
        });
    },

    addNewCard({ dispatch, commit }, column) {
      return Vue.axios
        .post(backend("/api/add-card"), column)
        .then(response => {
          commit("addCard", response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    deleteCard({ dispatch, commit, state }, data) {
      Vue.axios
        .delete(backend(`/api/delete-card/${data.boardId}/${data.cardId}`))
        .then(response => {
          let updatedCards = state.cards.filter(obj => obj.id !== data.cardId);

          commit("setCards", updatedCards);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
});
