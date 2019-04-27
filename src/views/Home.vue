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
  }
};
</script>
