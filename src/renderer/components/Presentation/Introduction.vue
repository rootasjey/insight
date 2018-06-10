<template>
  <v-container>
    <v-card width="400">
      <v-card-media
        :src="match.thumbnail.source"
        height="400px">
      </v-card-media>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            {{match.title}}
          </h3>

          <div>{{match.terms.description.join('. ')}}</div>
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Introduction',

  props: ['initialMatch'],

  mounted () {
    this.previewSpeech()
  },

  data () {
    return {
      match: this.initialMatch
    }
  },

  methods: {
    previewSpeech () {
      const synth = window.speechSynthesis
      synth.cancel()

      const textSpeech = `${this.initialMatch.title} is ${this.initialMatch.terms.description.join('. ')}`

      if (!synth || textSpeech.length === 0) return

      const speech = new SpeechSynthesisUtterance(textSpeech)
      speech.voice = synth.getVoices()[32]

      synth.speak(speech)
    }
  }
}
</script>

<style>

</style>
