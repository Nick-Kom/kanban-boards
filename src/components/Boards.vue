<template>
  <v-container>
    <v-layout wrap justify-center>
        <v-card
          class="pa-3 ma-3"
          style="width: 200px"
          v-for="(board, idx) in boards"
          :key="idx"
        >
          <v-card-title primary-title>
              <div class="headline d-flex flex justify-center">
                {{ board.title }}
              </div>
          </v-card-title></v-card
        >
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
