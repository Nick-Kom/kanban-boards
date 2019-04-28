<template>
  <div style="display: flex" v-if="columns">
    <div v-for="(column, index) in columns" :key="index">
      <v-card
        v-if="columns"
        class="pa-3 ma-2"
        style="width: 250px; min-height: 300px"
      >
        <v-card-title primary-title>
          <div class="pa-3 headline d-flex flex justify-center" v-if="false">
            {{ column.title }}
          </div>
          <v-form v-else>
            <v-text-field
              class="column-title-input ma-0"
              color="blue"
              v-model="column.title"
              :outline="!showColumnTitle[index]"
              :readonly="!showColumnTitle[index]"
              @blur="$set(showColumnTitle, index, false)"
              @click="$set(showColumnTitle, index, true)"
              @click:append="updateColumn(index, column.title, column)"
              :append-icon="showColumnTitle[index] ? 'save' : ''"
            ></v-text-field>
          </v-form>
          {{ columnTitle }}
        </v-card-title>
        <v-flex>
          <v-text-field value="Card" solo readonly></v-text-field>
        </v-flex>
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
  data: () => ({
    columnTitle: "",
    showColumnTitle: []
  }),

  created() {
    this.showColumnTitle = this.columns.map(item => false);
  },
  methods: {
    deleteColumn(columnId) {
      let data = {
        columnId: columnId,
        boardId: this.boardId
      };
      this.$store.dispatch("deleteColumn", data);
    },

    updateColumn(index, newTitle, column) {
      let data = {
        boardId: this.boardId,
        id: column.id,
        date: column.date,
        title: newTitle
      };
      this.$store.dispatch("updateColumn", data);
      this.$set(this.showColumnTitle, index, false);
    }
  }
};
</script>

<style scoped lang="scss">
.column-title-input {
  height: 70px;
}

.column-title-input.v-text-field {
  padding-top: 0 !important;
}

.column-title-input.v-input--is-readonly::v-deep {
  input {
    cursor: pointer;
  }
}

.column-title-input::v-deep {
  input {
    font-size: 24px;
    margin-top: 10px;
    text-align: center;
  }

  .v-input__control > .v-input__slot {
    border: none;

    &:hover {
      border: none !important;
    }

    .v-input__append-inner {
      margin-top: 14px;
    }
  }
}
</style>
