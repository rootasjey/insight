<template>
  <v-app>
    <h1 v-if="exactMatch === null" class="main-default-title">insight</h1>

    <v-parallax :src="heroImage" >
      <v-layout v-if="exactMatch" column align-center justify-center>
        <v-icon class="play-button" v-on:click="previewSpeech">play_circle_filled</v-icon>

        <div class="hero-title-container">
          <h1>{{exactMatch.title}}</h1>
        </div>

        <div class="hero-description-container" v-if="exactMatch.terms">
          <h3>{{exactMatch.terms.description.join('. ')}}</h3>
        </div>
      </v-layout>
    </v-parallax>

    <v-text-field
      v-model="type"
      autofocus
      class="search__input"
      name="input-1"
      label="Type your search here..."
      id="testing">
      </v-text-field>

    <div class="spell-checker-component" v-if="GET_ITEMS.length">
      <h3>Did you mean ?</h3>

      <v-list>
        <template v-for="(item, index) in GET_ITEMS">
          <v-chip :key="index" v-on:click="selectMatch(item)">
            <v-avatar v-if="item.thumbnail">
              <img v-bind:src="item.thumbnail.source" :alt="item.title">
            </v-avatar>

            {{item.title}}
          </v-chip>
        </template>
      </v-list>
    </div>
  </v-app>
</template>

<script>
import Wikimedia from '../services/wikimedia'
import { mapGetters, mapActions } from 'vuex'
import { GET_ITEMS } from '../types/getter-types'
import { ADD_ITEM_ACTION, CLEAR_ITEMS_ACTION } from '../types/action-types'

export default {
  name: 'Home',
  data () {
    return {
      type: '',
      exactMatch: null,
      heroImage: '',
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      GET_ITEMS
    ])
  },
  watch: {
    type: function (keywords) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.getResults()
      }, 1000)
    }
  },
  methods: {
    getResults: function () {
      Wikimedia.search(this.type)
      .then((results) => {
        if (!results.query) return

        if (results.query.pages.length) {
          this.exactMatch = results.query.pages[0]

          this.heroImage = this.exactMatch.thumbnail
            ? this.exactMatch.thumbnail.source : ''
        }
      })

      Wikimedia.approximativeMatches(this.type)
      .then((results) => {
        this.clearItems()

        if (!results.query) return

        results.query.pages.map(this.addItem)
      })
    },
    previewSpeech: function () {
      const synth = window.speechSynthesis
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
      this.heroImage = match.thumbnail
            ? match.thumbnail.source : ''
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
}

.play-button:hover {
  font-size: 80px;
  opacity: 1;
  color: #97d639;
}

.main-default-title {
  font-size: 4em;
  position: relative;
  top: 200px;
}

.search__input {
  width: 400px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 70px;
}
</style>
