// ~~~~~~~~~~~~~~~~~~~~~
// Articles Store module
// ~~~~~~~~~~~~~~~~~~~~~

import { actionTypes, getterTypes, mutationTypes } from './articlesActionsTypes'

// Actions
const
  {
    ADD_ITEM_ACTION,
    CLEAR_ITEMS_ACTION,
    CLEAR_SELECTED_ARTICLE_ACTION,
    SET_SELECTED_ARTICLE_ACTION
  } = actionTypes

// Getters
const { GET_ITEMS, GET_SELECTED_ARTICLE } = getterTypes

// Mutations
const
  {
    ADD_ITEM_MUTATION,
    CLEAR_ITEMS_MUTATION,
    CLEAR_SELECTED_ARTICLE_MUTATION,
    SET_SELECTED_ARTICLE_MUTATION
  } = mutationTypes

/**
 * Articles' store state
 */
const state = {
  items: [],
  selectedArticle: {},
  textToSpeech: {
    isActive: false,
    speeches: []
  }
}

const getters = {
  [GET_ITEMS]: state => state.items,
  [GET_SELECTED_ARTICLE]: state => state.selectedArticle
}

const mutations = {
  [ADD_ITEM_MUTATION] (state, item) {
    state.items = [...state.items, item]
  },

  [CLEAR_ITEMS_MUTATION] (state) {
    state.items = []
  },

  [CLEAR_SELECTED_ARTICLE_MUTATION] (state) {
    state.selectedArticle = {}
  },

  [SET_SELECTED_ARTICLE_MUTATION] (state, selectedArticle) {
    state.selectedArticle = {...selectedArticle}
  }
}

const actions = {
  [ADD_ITEM_ACTION] ({ commit }, item) {
    commit(ADD_ITEM_MUTATION, item)
  },

  [CLEAR_ITEMS_ACTION] ({ commit }) {
    commit(CLEAR_ITEMS_MUTATION)
  },

  [CLEAR_SELECTED_ARTICLE_ACTION] ({ commit }) {
    commit(CLEAR_SELECTED_ARTICLE_MUTATION)
  },

  [SET_SELECTED_ARTICLE_ACTION] ({ commit }, selectedArticle) {
    commit(SET_SELECTED_ARTICLE_MUTATION, selectedArticle)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
