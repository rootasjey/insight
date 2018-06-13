// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// MainIllustration component
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

<template>
  <v-card width="400" height="500">
      <v-card-media
        :src="selectedArticle.thumbnail.source"
        height="400px">
      </v-card-media>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            {{selectedArticle.title}}
          </h3>

          <div>{{selectedArticle.terms.description.join('. ')}}</div>
        </div>
      </v-card-title>
    </v-card>
</template>

<script>
export default {
  name: 'MainIllustration',

  data () {
    return {
      selectedArticle: this.$store.state.Articles.selectedArticle
    }
  }
}
</script>
