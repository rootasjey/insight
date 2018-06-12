// ~~~~~~~~~~~~~~~~
// Navbar component
// ~~~~~~~~~~~~~~~~

<template>
  <v-flex>
      <v-tooltip bottom>
        <v-btn flat icon color="pink" slot="activator" @click="goToHome">
          <v-icon>home</v-icon>
        </v-btn>

        <span>home</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn flat icon color="pink" slot="activator" @click="dialogSettings = true">
          <v-icon>settings</v-icon>
        </v-btn>

        <span>settings</span>
      </v-tooltip>
    </v-flex>
</template>

<script>
export default {
  name: 'Navbar',

  data () {
    return {
      dialogSettings: false
    }
  },

  methods: {
    goToHome () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>
