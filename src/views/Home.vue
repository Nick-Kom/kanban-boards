<template>
  <div class="home">
    <v-content>
      <Boards />
    </v-content>
  </div>
</template>

<script>
import Boards from "@/components/Boards.vue";

export default {
  name: "home",
  components: {
    Boards
  },
  created() {
    if ((this.boardId = this.$route.path === "/")) {
      this.$store.commit("setColumns", []);
    }
  }
};
</script>
