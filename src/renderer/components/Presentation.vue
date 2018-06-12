// ~~~~~~~~~~~~~~~~~~~~~~
// Presentation component
// ~~~~~~~~~~~~~~~~~~~~~~

<template>
  <v-container fluid grid-list-sm
    class="presentation-container"
    v-if="presentationType === 'any'">

    <navbar></navbar>

    <v-layout row wrap>
      <introduction
        v-bind:initialMatch="this.match">
      </introduction>

      <wiki-intro
        v-bind:initialMatch="this.match">
      </wiki-intro>
    </v-layout>
  </v-container>
</template>

<script>
  import Navbar from './Navbar'
  import Introduction from './Presentation/Introduction'
  import WikiIntro from './Presentation/WikiIntro'

  export default {
    name: 'Presentation',

    components: { Navbar, Introduction, WikiIntro },

    data () {
      return {
        match: null,
        presentationType: null
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
        this.match = {...this.$route.params}

        if (!this.match || !this.match.title) {
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
