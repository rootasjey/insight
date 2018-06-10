<template>
  <v-container>
    <v-container v-if="presentationType === 'any'">
      <introduction
        v-bind:initialMatch="this.match">
      </introduction>
    </v-container>
  </v-container>
</template>

<script>
  import Introduction from './Presentation/Introduction'

  export default {
    name: 'Presentation',

    props: ['initialMatch'],

    components: { Introduction },

    mounted () {
      this.choosePresentationType()
    },

    data () {
      return {
        match: this.initialMatch,
        presentationType: null
      }
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
      }
    }
}
</script>

<style>

</style>
