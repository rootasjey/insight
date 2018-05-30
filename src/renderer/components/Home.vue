<template>
  <v-container>
    <h1 v-if="exactMatch === null" class="main-default-title">insight</h1>

    <div v-if="exactMatch" v-bind:style="heroImageStyle" class="hero-container">
      <div class="hero-caption">
        <v-icon class="play-button" v-on:click="previewSpeech">play_circle_filled</v-icon>
        <div class="hero-title-container">
            <h1>{{exactMatch.title}}</h1>
        </div>

        <div class="hero-description-container" v-if="exactMatch.terms">
          <h3>{{exactMatch.terms.description.join('. ')}}</h3>
        </div>
      </div>
    </div>

    <v-select
      autocomplete
      autofocus
      class="search__input"
      :items="suggestions"
      label="Type your search here..."
      :loading="loadingSuggestions"
      :search-input.sync="type"
      >
    </v-select>

    <div class="spell-checker-component" v-if="GET_ITEMS.length">
      <h3>Did you mean ?</h3>

      <v-list>
        <template v-for="(item, index) in GET_ITEMS">
          <v-chip :key="index" v-on:click="selectMatch(item)" class="chip-motion">
            <v-avatar v-if="item.thumbnail">
              <img v-bind:src="item.thumbnail.source" :alt="item.title">
            </v-avatar>

            {{item.title}}
          </v-chip>
        </template>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import Wikimedia from '../services/wikimedia'
import { mapGetters, mapActions } from 'vuex'

import { actionTypes, getterTypes } from '../store/modules/articlesActionsTypes'

const { ADD_ITEM_ACTION, CLEAR_ITEMS_ACTION } = actionTypes
const { GET_ITEMS } = getterTypes

export default {
  name: 'Home',
  data () {
    return {
      exactMatch: null,
      heroImageStyle: {},
      loadingSuggestions: false,
      suggestions: [],
      timer: null,
      type: ''
    }
  },
  computed: {
    ...mapGetters([
      GET_ITEMS
    ])
  },
  watch: {
    type: function (keywords) {
      if (!keywords) return

      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.getResults()
        this.loadingSuggestions = true
      }, 1000)
    }
  },
  methods: {
    getResults: function () {
      Wikimedia.search(this.type)
        .then((results) => {
          if (!results.query ||
              !results.query.pages.length) {
            return
          }

          const firstMatch = results.query.pages[0]

          if (!firstMatch.terms ||
              !firstMatch.terms.description ||
              firstMatch.terms.description[0]
                .indexOf('Wikimedia disambiguation page') !== -1) {
            return
          }

          this.exactMatch = firstMatch

          const heroImageUrl = this.exactMatch.thumbnail
            ? this.exactMatch.thumbnail.source : ''

          this.heroImageStyle.backgroundImage = `url("${heroImageUrl}")`

          return firstMatch
        })
        .then((match) => {
          if (!match) return
          console.log(match)

          const imagesTitles = match.images.map((image) => image.title).join('|')
          console.log(imagesTitles)

          Wikimedia.queryImages(imagesTitles)
            .then((imagesResults) => {
              console.log(imagesResults)
            })
        })

      Wikimedia.approximativeMatches(this.type)
        .then((results) => {
          this.loadingSuggestions = false
          this.clearItems()

          if (!results.query) return

          this.suggestions = []

          results.query.pages.map((item) => {
            this.addItem(item)
            this.suggestions.push(item.title)
          })

          return results
        })
        .then((results) => {
          if (!this.exactMatch ||
              !this.exactMatch.missing ||
              !results.query.pages.length) {
            return
          }

          this.exactMatch = results.query.pages[0]

          const heroImageUrl = this.exactMatch.thumbnail
            ? this.exactMatch.thumbnail.source : ''

          this.heroImageStyle.backgroundImage = `url("${heroImageUrl}")`
        })
    },
    previewSpeech: function () {
      const synth = window.speechSynthesis
      synth.cancel()

      let textSpeech = ''

      if (this.exactMatch.terms && this.exactMatch.terms.description) {
        textSpeech = `${this.exactMatch.title} is a ${this.exactMatch.terms.description.join('. ')}`
      }

      if (!synth || textSpeech.length === 0) return

      const speech = new SpeechSynthesisUtterance(textSpeech)
      speech.voice = synth.getVoices()[32]

      synth.speak(speech)
    },

    selectMatch: function (match) {
      this.exactMatch = match

      const heroImageUrl = match.thumbnail
        ? match.thumbnail.source : ''

      this.heroImageStyle.backgroundImage = `url("${heroImageUrl}")`
    },

    alertCustom: (arg) => {
      alert('Page id of this item: ' + arg)
    },
    ...mapActions({
      addItem: ADD_ITEM_ACTION,
      clearItems: CLEAR_ITEMS_ACTION
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hero-title-container {
  padding: 0 5px;
  background: rgba(0, 0, 0, .5);
  display: inline-block;
}

.hero-description-container {
  padding: 2px;
  background: rgba(0, 0, 0, .5);
  margin: 3px;
}

.play-button {
  font-size: 70px;
  cursor: pointer;
  opacity: .7;
  display: block;
}

.play-button:hover {
  font-size: 80px;
  opacity: 1;
  color: #97d639;
}

.main-default-title {
  font-size: 4em;
  margin-top: 200px;
  position: relative;
  text-align: center;
}

.search__input {
  max-height: 74px;
  width: 400px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 70px;
}

.heroImage {
  width: 100%;
  height: 100%;

  background-size: cover;
}

.hero-container {
  height: 100%;
  min-height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  background-position: center 20%;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}

.hero-caption {
  color: white;
  display: inline-block;
  position: relative;
  top: 10%;
  width: auto;
  margin: auto;
}

/* .chip-motion {
  opacity: .6;
} */

.spell-checker-component {
  text-align: center;
}

.chip-motion:hover {
  color: dodgerblue;
}

</style>
