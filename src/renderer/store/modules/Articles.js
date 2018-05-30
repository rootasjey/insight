import { actionTypes, getterTypes, mutationTypes } from './articlesActionsTypes'

const { ADD_ITEM_ACTION, CLEAR_ITEMS_ACTION } = actionTypes
const { GET_ITEMS } = getterTypes
const { ADD_ITEM_MUTATION, CLEAR_ITEMS_MUTATION } = mutationTypes

// Store definition
const state = {
  items: []
}

const getters = {
  [GET_ITEMS]: statte => state.items
}

const mutations = {
  [ADD_ITEM_MUTATION] (state, item) {
    state.items = [...state.items, item]
  },
  [CLEAR_ITEMS_MUTATION] (state) {
    state.items = []
  }
}

const actions = {
  [ADD_ITEM_ACTION] ({ commit }, item) {
    commit(ADD_ITEM_MUTATION, item)
  },
  [CLEAR_ITEMS_ACTION] ({ commit }) {
    commit(CLEAR_ITEMS_MUTATION)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
