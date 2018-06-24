<template>
  <v-card width="400" height="500" color="indigo lighten-2" dark>
    <v-card-title>
      <h1 class="headline mb-3">
        Overview
      </h1>

      <div v-html="GET_SELECTED_ARTICLE.extract">
      </div>
      <v-btn fab dark color="indigo" v-if="buttonMore" v-on:click="getSelectedArticleDetails">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>

// Vuex
import { mapGetters, mapActions } from 'vuex'

// Services
import Wikimedia from '../../services/wikimedia'

import { getterTypes, actionTypes } from '../../store/modules/articlesActionsTypes'

const { SET_SELECTED_ARTICLE_ACTION } = actionTypes

const { GET_SELECTED_ARTICLE } = getterTypes

export default {
  name: 'WikiIntro',

  data () {
    return {
      buttonMore: true
    }
  },

  computed: {
    ...mapGetters([
      GET_SELECTED_ARTICLE
    ])
  },

  methods: {
    /**
     * Speech to text the article's title & description
     */
    previewSpeech () {
      const synth = window.speechSynthesis
      synth.cancel()

      const textSpeech = `${this.GET_SELECTED_ARTICLE.title} is ${this.GET_SELECTED_ARTICLE.terms.description.join('. ')}`

      if (!synth || textSpeech.length === 0) return

      const speech = new SpeechSynthesisUtterance(textSpeech)
      speech.voice = synth.getVoices()[32]

      synth.speak(speech)
    },

    /**
     *  Fetch more detail for presentation
     */
    getSelectedArticleDetails () {
      Wikimedia.details(this.GET_SELECTED_ARTICLE.pageid)
        .then(this._fetchSelectedArticleDetails)
    },

    // Vuex Store actions
    ...mapActions({
      setSelectedArticle: SET_SELECTED_ARTICLE_ACTION
    }),

    /**
     * update store with new extract
     */
    _fetchSelectedArticleDetails (result) {
      // maybe move _isValidResult to be able to call it here, but we can suppose if you're on this page so article exist and there is no reason (except for a bug) to not be able to get a valid result
      const updatedArticle = Object.assign({}, {...this.GET_SELECTED_ARTICLE}, {extract: result.query.pages[0].extract})
      this.setSelectedArticle(updatedArticle)
      this.buttonMore = false
    }
  }
}
</script>
