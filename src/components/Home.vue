<template>
  <div class="hello">
    <h1>insight {{ type }}</h1>
    <md-field class="search__input md-elevation-2">
      <md-input v-model="type"></md-input>
    </md-field>
    <li v-for="item in GET_ITEMS">
       <md-card class="md-primary">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{item.title}}</div>
              <div class="md-subhead">
                <md-content class="md-scrollbar">
                  {{item.snippet}}
                </md-content>
              </div>
          </md-card-header-text>
          
          <md-card-media md-medium>
            <img src="" alt="Avatar"/>
          </md-card-media>
        </md-card-header>
        <md-button @click.stop="alertCustom(item.pageId)" class="md-fab md-primary md-alignment-bottom-right">
          <md-icon>add</md-icon>
        </md-button>
      </md-card>
    </li>
  </div>
</template>

<script>
import Wikimedia from '../services/wikimedia'
import { mapGetters, mapActions } from 'vuex'
import { GET_ITEMS } from '../types/getter-types'
import { ADD_ITEM_ACTION } from '../types/action-types'

export default {
  name: 'Home',
  data () {
    return {
      type: '',
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
        results.query.search.map((item) => {
          this.addItem({'snippet': item.snippet, 'pageId': item.pageid, 'title': item.title})
        })
      })
    },
    alertCustom: (arg) => {
      alert('Page id of this item: ' + arg)
    },
    ...mapActions({
      addItem: ADD_ITEM_ACTION
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card{
    height: 300px;
    margin-bottom: 30px;
}
.md-scrollbar{
  max-width: 250px;
  max-height: 150px;
  overflow: auto;
}
.search__input {
  width: 400px;
  margin: auto;
  margin-top: 70px;
  margin-bottom: 70px;
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
