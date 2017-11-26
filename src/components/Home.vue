<template>
  <div class="hello">
    <h1>insight {{ type }}</h1>
    <md-field class="search__input md-elevation-2">
      <md-input v-model="type"></md-input>
    </md-field>
  </div>
</template>

<script>
import Wikimedia from '../services/wikimedia'

export default {
  name: 'Home',
  data () {
    return {
      type: '',
      timer: null
    }
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
        console.log(results)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search__input {
  width: 400px;
  margin: auto;
  margin-top: 70px;
  padding: 10px;
  min-height: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
