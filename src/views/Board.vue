<template>
  <v-container mt-5>
    <v-btn fab dark color="green" @click="scrollToHorizontal()">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-layout
      id="horizontal-container"
      style=" height: 100%;  overflow-x: auto;"
    >
      <Columns :columns="columns" :boardId="boardId" />
      <div
        v-if="!progress && !columns.length"
        style="width: 100%; text-align: center"
      >
        <p>No Columns</p>
      </div>
    </v-layout>

    <div
      style="display: flex;
              align-items: center;
              justify-content: center;"
    >
      <v-progress-circular
        v-if="progress"
        :width="5"
        color="#80deea"
        :size="80"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import Columns from "@/components/Columns.vue";

export default {
  name: "board",
  components: {
    Columns
  },
  data: () => ({
    boardId: 0
  }),
  created() {
    this.boardId = this.$route.params.id;
    this.getColumns(this.boardId);
  },

  computed: {
    columns() {
      return this.$store.getters.columns;
    },
    progress() {
      return this.$store.getters.getloadProgress;
    }
  },

  methods: {
    getColumns(boardId) {
      this.$store.dispatch("getColumns", boardId);
    },

    scrollToHorizontal() {
      let column = {
        boardId: this.boardId,
        date: new Date(),
        title: "Column №5"
      };
      this.$store.dispatch("addNewColumn", column).then(res => {
        let scroll_container = document.getElementById("horizontal-container");
        scroll_container.scrollLeft = 9990;
      });
    }
  }
};
</script>
