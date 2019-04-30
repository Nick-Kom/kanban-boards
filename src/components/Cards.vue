<template>
  <div>
    <draggable
      :key="columnId"
      v-model="cards"
      v-bind="dragOptions"
      handle=".drag-card"
      @change="changeCardPosition($event, columnId)"
    >
      <v-flex
        class="card mt-1 mb-1 drag-card"
        v-for="(card, index) in cards"
        :key="card.id"
        style="position: relative"
      >
        <v-btn
          v-if="!showCardTitle[index]"
          small
          class="ma-0 card-delete"
          icon
          @click="deleteCard(card.id)"
        >
          <v-icon small>clear</v-icon>
        </v-btn>
        <v-textarea
          v-model="card.title"
          solo
          auto-grow
          rows="1"
          color="green"
          :readonly="!showCardTitle[index]"
          @click="$set(showCardTitle, index, true)"
          @blur="$set(showCardTitle, index, false)"
          @click:append="updateCard(index, card.title, card)"
          :append-icon="showCardTitle[index] ? 'save' : ''"
        >
        </v-textarea>
      </v-flex>
      <v-flex v-if="showNewCard" class="card mt-1 mb-1">
        <v-textarea
          v-model="newCardTitle"
          solo
          auto-grow
          rows="1"
          color="green"
          autofocus
          @click:append="createCard(newCardTitle)"
          @blur="showNewCard = false"
          append-icon="save"
        >
        </v-textarea>
      </v-flex>
    </draggable>

    <v-btn
      slot="footer"
      small
      fab
      dark
      color="green"
      class="ma-0 mt-1"
      @click="showNewCard = true"
    >
      <v-icon dark>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  props: {
    columnId: String,
    boardId: String
  },
  data: () => ({
    showCardTitle: [],
    showNewCard: false,
    newCardTitle: ""
  }),

  computed: {
    dragOptions() {
      return {
        group: "column-cards",
        animation: 200
      };
    },

    cards: {
      get() {
        return this.$store.getters.cards.filter(
          card => card.columnId === this.columnId
        );
      },
      set(dragCards) {
        let anotherCards = this.$store.getters.cards.filter(
          card => card.columnId !== this.columnId
        );
        let cardsWithNewPositions = dragCards.map((card, index) => {
          card.position = index;
          card.boardId = this.boardId;
          return card;
        });

        let allCards = cardsWithNewPositions.concat(anotherCards);
        this.$store.commit("setCards", allCards);
      }
    }
  },

  created() {
    this.getCards(this.boardId);
  },
  methods: {
    changeCardPosition(event, colId) {
      if (Object.keys(event)[0] === "added") {
        let addedCard = event.added.element;
        let data = {
          boardId: this.boardId,
          id: addedCard.id,
          columnId: colId,
          position: event.added.newIndex,
          title: addedCard.title
        };
        this.$store.dispatch("addNewCard", data);
      } else if (Object.keys(event)[0] === "removed") {
        let removedCard = event.removed.element;

        this.deleteCard(removedCard.id);
      } else {
        let dragCards = this.$store.getters.cards.filter(
          card => card.columnId === this.columnId
        );

        dragCards.map((card, index) => {
          card.position = index;
          card.boardId = this.boardId;

          this.$store.dispatch("updateCard", card);
          return card;
        });
      }
    },

    getCards(boardId) {
      this.$store.dispatch("getCards", boardId);
    },

    updateCard(index, newTitle, сard) {
      let data = {
        boardId: this.boardId,
        id: сard.id,
        columnId: this.columnId,
        position: сard.position,
        title: newTitle
      };
      this.$store.dispatch("updateCard", data);
      this.$set(this.showCardTitle, index, false);
    },

    createCard(newTitle) {
      let newPosition;
      let lastCardIndex = this.cards.length - 1;
      if (lastCardIndex >= 0) {
        newPosition = lastCardIndex + 1;
      } else {
        newPosition = 0;
      }

      let data = {
        boardId: this.boardId,
        columnId: this.columnId,
        position: newPosition,
        title: newTitle
      };
      this.$store.dispatch("addNewCard", data).then(res => {
        this.showNewCard = false;
        this.newCardTitle = "";
      });
    },

    deleteCard(cardId) {
      let data = {
        cardId: cardId,
        boardId: this.boardId
      };
      this.$store.dispatch("deleteCard", data);
    }
  }
};
</script>

<style scoped lang="scss">
.card::v-deep {
  position: relative;

  .v-input__icon {
    cursor: pointer;
  }
  .v-text-field__details {
    display: none;
  }
  .card-delete {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 11;
  }
}
</style>
