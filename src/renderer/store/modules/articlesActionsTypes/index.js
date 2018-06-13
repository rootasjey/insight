// ~~~~~~~~~~~~~~~~~~~~
// articlesActionsTypes
// ~~~~~~~~~~~~~~~~~~~~

/**
 * Change Vuex's store state by commiting mutations.
 * Actions can contains async operations
 */
export const actionTypes = {
  ADD_ITEM_ACTION: 'ADD_ITEM_ACTION',
  CLEAR_ITEMS_ACTION: 'CLEAR_ITEMS_ACTION',
  SET_SELECTED_ARTICLE_ACTION: 'SET_SELECTED_ARTICLE_ACTION'
}

/**
 * Returns partial store's state
 */
export const getterTypes = {
  GET_ITEMS: 'GET_ITEMS',
  GET_SELECTED_ARTICLE: 'GET_SELECTED_ARTICLE'
}

/**
 * The only way to change Vuex's store state.
 */
export const mutationTypes = {
  ADD_ITEM_MUTATION: 'ADD_ITEM_MUTATION',
  CLEAR_ITEMS_MUTATION: 'CLEAR_ITEMS_MUTATION',
  SET_SELECTED_ARTICLE_MUTATION: 'SET_SELECTED_ARTICLE_MUTATION'
}
