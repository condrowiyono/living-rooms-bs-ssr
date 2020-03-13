import * as types from './playerTypes'

export default {
  [types.FETCH_PLAYER_DETAIL] (state) {
    state.isFetching = true
    state.fetchingError = null
  },

  [types.FETCH_PLAYER_DETAIL_SUCCESS] (state, data) {
    state.isFetching = false
    state.player = data.data
  },

  [types.FETCH_PLAYER_DETAIL_ERROR] (state, error) {
    state.isFetching = false
    state.fetchingError = error
  }
}
