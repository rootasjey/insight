import Vue from 'vue'
import Vuex from 'vuex'

import { GET_ITEMS } from '../types/getter-types'
import { ADD_ITEM_MUTATION, CLEAR_ITEMS_MUTATION } from '../types/mutation-types'
import { ADD_ITEM_ACTION, CLEAR_ITEMS_ACTION } from '../types/action-types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: []
  },
  getters: {
    [GET_ITEMS]: state => {
      return state.items
    }
  },
  mutations: {
    [ADD_ITEM_MUTATION] (state, item) {
      state.items = [...state.items, item]
    },
    [CLEAR_ITEMS_MUTATION] (state) {
      state.items = []
    }
  },
  actions: {
    [ADD_ITEM_ACTION] ({ commit }, item) {
      commit(ADD_ITEM_MUTATION, item)
    },
    [CLEAR_ITEMS_ACTION] ({ commit }) {
      commit(CLEAR_ITEMS_MUTATION)
    }
  }
})
