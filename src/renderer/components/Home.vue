// ~~~~~~~~~~~~~~
// Home component
// ~~~~~~~~~~~~~~

<template>
  <v-container>
    <navbar></navbar>

    <!-- content -->
    <h1 v-if="exactMatch === null" class="main-default-title">insight</h1>

    <div v-if="exactMatch" v-bind:style="heroImageStyle" class="hero-container">
      <div class="hero-caption">
        <v-icon class="play-button" v-on:click="gotToPresentation">
          play_circle_filled
        </v-icon>

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
import Navbar from './Navbar'
import Wikimedia from '../services/wikimedia'

import { mapGetters, mapActions } from 'vuex'
import { actionTypes, getterTypes } from '../store/modules/articlesActionsTypes'

const { ADD_ITEM_ACTION, CLEAR_ITEMS_ACTION } = actionTypes
const { GET_ITEMS } = getterTypes

export default {
  name: 'Home',

  components: { Navbar },

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
    type (keywords) {
      if (!this._isValidKeywords(keywords)) return

      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.getResults()
        this.loadingSuggestions = true
      }, 1000)
    }
  },

  methods: {
    // --------------
    // PUBLIC METHODS
    // --------------
    //    |   |
    //  _|   |_
    // \      /
    //  \   /
    //   \/

    /**
     * Get wikipedia articles results from what the user typed
     */
    getResults () {
      this.exactMatch = null

      this._getExactResults()
      this._getApproximateResults()
    },

    gotToPresentation () {
      this.$router.push({name: 'presentation', params: this.exactMatch})
    },

    /**
     * Select a suggested article from chips
     */
    selectMatch (match) {
      this.exactMatch = match

      const heroImageUrl = match.thumbnail
        ? match.thumbnail.source : ''

      this.heroImageStyle.backgroundImage = `url("${heroImageUrl}")`
    },

    // Vuex Store actions
    ...mapActions({
      addItem: ADD_ITEM_ACTION,
      clearItems: CLEAR_ITEMS_ACTION
    }),

    // ---------------
    // PRIVATE METHODS
    // ---------------
    //    |   |
    //  _|   |_
    // \      /
    //  \   /
    //   \/

    /**
     * Check if the match is valid and set it as a prop
     */
    _checkAndSetMatch (match) {
      if (!match) throw new Error('No match found')

      this.exactMatch = match

      return this.exactMatch
    },

    /**
     * Extract 1st match from articles results
     */
    _extractFirstMatch (results) {
      if (!this._isValidResult(results)) return

      const query = results.query
      const firstMatch = query.pages[0]

      return this._isValidMatch(firstMatch) ? firstMatch : undefined
    },

    /**
     * Extract article's image from the 1st match
     */
    _extractMatchImage () {
      const localImage = this.exactMatch.thumbnail
        ? this.exactMatch.thumbnail.source : ''

      return localImage || this._queryNewMatchImage()
    },

    /**
     * Search Wikipedia for approximated articles
     */
    _getApproximateResults () {
      Wikimedia.approximativeMatches(this.type)
        .then(this._populateSuggestions)
        .then(this._setMatchFromSuggestionsIfAny)
        .then(this._extractMatchImage)
        .then(this._setMatchtBackgroundImage)
        .catch(this._notifyNoSuggestionFound)
    },

    /**
     * Search Wikipedia for exact article
     */
    _getExactResults () {
      Wikimedia.search(this.type)
        .then(this._extractFirstMatch)
        .then(this._checkAndSetMatch)
        .then(this._extractMatchImage)
        .then(this._setMatchtBackgroundImage)
        .catch(this._notifyNoMatchFound)
    },

    _isValidKeywords (keywords) {
      if (!keywords) return false
      if (!this.exactMatch || !this.exactMatch.title) return true

      return keywords.toLowerCase() !== this.exactMatch.title.toLowerCase()
    },

    /**
     * Check if the match has a correct description
     */
    _isValidMatch (match) {
      const emptyTerms = !match.terms

      if (emptyTerms) return false

      const description = match.terms.description

      const invalidDescription = !description ||
        description[0].indexOf('Wikimedia disambiguation page') !== -1

      return invalidDescription === false
    },

    /**
     * Check if the returned result is not empty
     */
    _isValidResult (results) {
      const query = results.query

      const emptyResult = typeof query === 'undefined' || !query.pages.length

      return emptyResult === false
    },

    _notifyNoMatchFound () {
      console.log('no match found')
    },

    _notifyNoSuggestionFound () {
      console.log('no sugestion found')
    },

    /**
     * Populate UI articles suggestions
     */
    _populateSuggestions (results) {
      this.loadingSuggestions = false
      this.clearItems()

      if (!results.query) return

      this.suggestions = []

      results.query.pages.map((item) => {
        this.addItem(item)
        this.suggestions.push(item.title)
      })

      return results
    },

    /**
     * Get a new article's image from Wikimedia
     */
    _queryNewMatchImage () {
      const match = this.exactMatch
      const keyword = match.title.split(' ')[0]
      const imagesTitles = match.images.map((image) => image.title).join('|')

      return Wikimedia.queryImages(imagesTitles)
        .then((imagesResults) => {
          const sortedImages = imagesResults.query.pages.sort((a, b) => {
            return a.title.indexOf(keyword) > -1 ? -1 : 1
          })

          const firstURL = sortedImages[0].imageinfo[0].url

          this.exactMatch.thumbnail = { ...this.exactMatch.thumbnail, source: firstURL }

          return firstURL
        })
    },

    /**
     * Set the article's background image
     * @param {String} imageUrl images' url
     */
    _setMatchtBackgroundImage (imageUrl) {
      this.heroImageStyle =
        {...this.heroImageStyle, backgroundImage: `url("${imageUrl}")`}
    },

    /**
     * If no exact match is found, set the 1st suggested match
     */
    _setMatchFromSuggestionsIfAny (results) {
      if (!this.exactMatch ||
          !this.exactMatch.missing ||
          !results.query.pages.length) {
        return
      }

      this.exactMatch = results.query.pages[0]
    }
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
