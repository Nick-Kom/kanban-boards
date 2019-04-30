<template>
  <v-container>
    <v-layout wrap justify-center>
      <v-card
        v-if="boards"
        :to="'board/' + board.id"
        class="pa-3 ma-3"
        style="width: 200px"
        v-for="(board, idx) in boards"
        :key="idx"
      >
        <v-card-title primary-title>
          <div class="headline d-flex flex justify-center">
            {{ board.title }}
          </div>
        </v-card-title>
      </v-card>

      <v-progress-circular
        v-if="!boards.length"
        :width="5"
        color="#80deea"
        :size="80"
        indeterminate
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),

  created() {
    this.$store.dispatch("getBoards");
  },

  computed: {
    boards() {
      return this.$store.getters.boards;
    }
  }
};
</script>

<style></style>
