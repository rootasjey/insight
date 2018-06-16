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

      <v-tooltip bottom v-if="isPresentationPlaying">
        <v-btn flat icon color="pink" slot="activator">
          <v-icon>stop</v-icon>
        </v-btn>

        <span>stop presentation</span>
      </v-tooltip>

      <v-tooltip bottom v-if="isPresentationPlaying === false">
        <v-btn flat icon color="pink" slot="activator">
          <v-icon>play_arrow</v-icon>
        </v-btn>

        <span>play presentation</span>
      </v-tooltip>
    </v-flex>
</template>

<script>

import { mapActions } from 'vuex'
import { actionTypes } from '../store/modules/articlesActionsTypes'

const { CLEAR_SELECTED_ARTICLE_ACTION } = actionTypes

export default {
  name: 'Navbar',

  data () {
    return {
      dialogSettings: false,
      isPresentationPlaying: false
    }
  },

  methods: {
    goToHome () {
      this.clearSelectedArticle()
      this.$router.push({name: 'home'})
    },

    playPresentation () {

    },

    stopPresentation () {

    },

    ...mapActions({
      clearSelectedArticle: CLEAR_SELECTED_ARTICLE_ACTION
    })
  }
}
</script>
