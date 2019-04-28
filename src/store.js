import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const backend = api =>
  "http://localhost:5000/kanban-boards-55/us-central1" + api;

export default new Vuex.Store({
  state: {
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
    deleteColumnById(state, columnId) {
      state.columns = state.columns.filter(obj => obj.id !== columnId);
    },
    updateColumn(state, newColumn) {
      state.columns = state.columns.map(item =>
        item.id === newColumn.id ? (item = newColumn) : item
      );
    },
    setProgress(state, payload) {
      state.loadProgress = payload;
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
    },

    getColumns({ dispatch, commit }, boardId) {
      commit("setProgress", true);
      return Vue.axios
        .get(backend(`/api/columns/${boardId}`))
        .then(columns => {
          console.log(columns.data);
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
          console.log("Col response.data", response.data);
          commit("addColumn", response.data);
          Promise.resolve(true);
        })
        .catch(error => {
          console.error(error);
        });
    },

    updateColumn({ dispatch, commit }, data) {
      return Vue.axios
        .patch(backend("/api/update-column"), data)
        .then(response => {
          console.log("Col response.data updated", response.data);
          commit("updateColumn", response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    deleteColumn({ dispatch, commit }, data) {
      Vue.axios
        .delete(backend(`/api/delete-column/${data.boardId}/${data.columnId}`))
        .then(response => {
          console.log("Col deleted data", response.data);
          commit("deleteColumnById", data.columnId);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
});
