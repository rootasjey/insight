<template>
  <v-card width="400" height="500" color="indigo lighten-2" dark>
    <v-card-title>
      <h1 class="headline mb-3">
        Overview
      </h1>

      <div v-html="selectedArticle.extract">
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'WikiIntro',

  data () {
    return {
      selectedArticle: this.$store.state.Articles.selectedArticle
    }
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
    }
  }
}
</script>
