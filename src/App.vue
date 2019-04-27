<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Kanban</span>
        <span class="font-weight-light">Boards</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Boards/>
    </v-content>
  </v-app>
</template>

<script>
import Boards from './components/Boards'

export default {
  name: 'App',
  components: {
    Boards
  },
  data () {
    return {
      //
    }
  }
}
</script>
