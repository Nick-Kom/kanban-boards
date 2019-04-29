<template>
  <div>
    <draggable
      v-model="columns"
      draggable=".drag-column"
      style="display: flex"
      v-if="columns"
    >
      <div v-for="(column, index) in columns" :key="index" class="drag-column">
        <v-card
          v-if="columns"
          class="pa-3 ma-2"
          style="width: 250px; min-height: 300px"
        >
          <div class="column-menu" style="position: relative">
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="deleteColumn(column.id)">
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
          <v-card-title primary-title class=" pt-0">
            <v-form>
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
          </v-card-title>
          <Cards :columnId="column.id" :boardId="boardId"></Cards>
        </v-card>
      </div>
      <div v-if="showNewColumn">
        <v-card class="pa-3 ma-2" style="width: 250px;">
          <v-card-title primary-title>
            <v-form>
              <v-text-field
                autofocus
                class="column-title-input ma-0"
                color="blue"
                v-model="newColumnTitle"
                @click:append="createColumn(newColumnTitle)"
                @blur="$emit('hide-column', false)"
                append-icon="save"
              ></v-text-field>
            </v-form>
          </v-card-title>
        </v-card>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Cards from "@/components/Cards.vue";
export default {
  components: {
    Cards,
    draggable
  },
  props: {
    boardId: String,
    showNewColumn: Boolean
  },
  data: () => ({
    newColumnTitle: "",
    showColumnTitle: []
  }),

  computed: {
    columns: {
      get() {
        return this.$store.getters.columns;
      },
      set(dragColumns) {
        let columnsWithNewPositions = dragColumns.map((column, index) => {
          column.position = index;
          column.boardId = this.boardId;

          this.$store.dispatch("updateColumn", column);
          return column;
        });
        this.$store.commit("setColumns", columnsWithNewPositions);
      }
    }
  },

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
        title: newTitle,
        position: column.position
      };
      this.$store.dispatch("updateColumn", data);
      this.$set(this.showColumnTitle, index, false);
    },

    createColumn(newTitle) {
      let newPosition;
      let lastColumnIndex = this.columns.length - 1;

      if (lastColumnIndex >= 0) {
        newPosition = lastColumnIndex + 1;
      } else {
        newPosition = 0;
      }

      let data = {
        boardId: this.boardId,
        date: new Date(),
        title: newTitle,
        position: newPosition
      };
      this.$store.dispatch("addNewColumn", data).then(res => {
        this.$emit("hide-column");
        let scroll_container = document.getElementById("horizontal-container");
        scroll_container.scrollLeft = 9990;
        this.newColumnTitle = "";
      });
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

.column-menu {
  display: flex;
}
</style>
