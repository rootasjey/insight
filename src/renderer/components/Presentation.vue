// ~~~~~~~~~~~~~~~~~~~~~~
// Presentation component
// ~~~~~~~~~~~~~~~~~~~~~~

<template>
  <v-container fluid grid-list-sm
    class="presentation-container"
    v-if="presentationType === 'any'">

    <navbar></navbar>

    <v-layout row wrap>
      <main-illustration></main-illustration>
      <wiki-intro></wiki-intro>
      <speech></speech>
    </v-layout>
  </v-container>
</template>

<script>
// Components
import Navbar from './Navbar'
import MainIllustration from './Presentation/MainIllustration'
import WikiIntro from './Presentation/WikiIntro'
import Speech from './Presentation/Speech'

export default {
  name: 'Presentation',

  components: { Navbar, MainIllustration, Speech, WikiIntro },

  data () {
    return {
      presentationType: null,
      selectedArticle: this.$store.state.Articles.selectedArticle
    }
  },

  mounted () {
    this.initialize()
    this.choosePresentationType()
  },

  methods: {
    /**
     * Choose layout according to data type
     * (data type can be: human, place, thing, ...)
     * NOTE: it may be a better way to load specific components
     * into the template
     */
    choosePresentationType () {
      this.presentationType = 'any'
    },

    initialize () {
      if (!this.selectedArticle.title) {
        this.$router.push({name: 'home'})
      }
    }
  }
}
</script>

<style>
.presentation-container .card {
  margin: 10px;
  overflow: auto;
}
</style>
