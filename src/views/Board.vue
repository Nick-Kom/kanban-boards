<template>
  <v-container mt-5>
    <v-btn fab dark color="green" @click="showNewColumnForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-layout id="horizontal-container" class="columns-container">
      <Columns
        :boardId="boardId"
        :showNewColumn="showNewColumn"
        @hide-column="showNewColumn = false"
      />
      <div v-if="!progress && !columns.length" class="no-columns-message">
        <p>No Columns</p>
      </div>
    </v-layout>

    <div class="progress-wrap">
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
    boardId: 0,
    showNewColumn: false
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
      /*           setInterval(() => {
        this.$store.dispatch("getColumns", boardId);
      }, 3000)*/
    },

    showNewColumnForm() {
      this.showNewColumn = true;
      this.scrollToHorizontal();
    },

    scrollToHorizontal() {
      setTimeout(() => {
        let scroll_container = document.getElementById("horizontal-container");
        scroll_container.scrollLeft = 9990;
      }, 20);
    }
  }
};
</script>

<style scoped lang="scss">
.no-columns-message {
  width: 100%;
  text-align: center;
}
.progress-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.columns-container {
  height: 100%;
  overflow-x: auto;
}
</style>
