<template>
  <div style="display: flex" v-if="columns">
    <div v-for="(column, idx) in columns" :key="idx">
      <v-card
        v-if="columns"
        class="pa-3 ma-2"
        style="width: 250px; min-height: 300px"
      >
        <v-card-title primary-title>
          <div class="headline d-flex flex justify-center">
            {{ column.title }}
          </div>
        </v-card-title>
        <v-card class="pa-2">Card</v-card>
        <v-btn dark color="red" @click="deleteColumn(column.id)">
          <v-icon dark>delete</v-icon>
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    boardId: String
  },
  data: () => ({}),
  methods: {
    deleteColumn(columnId) {
      let data = {
        columnId: columnId,
        boardId: this.boardId
      };
      this.$store.dispatch("deleteColumn", data);
    }
  }
};
</script>

<style></style>
