<template>
  <v-card width="400" height="500">
    <v-card-title>
      <h3 class="headline mb-0">
        Overview
      </h3>

      <div v-html="match.extract">
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'WikiIntro',

  props: ['initialMatch'],

  data () {
    return {
      match: this.initialMatch
    }
  }
}
</script>
