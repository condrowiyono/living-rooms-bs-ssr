import * as types from './genreTypes'

export default {
  [types.FETCH_GENRE] (state) {
    state.isFetching = true
    state.fetchingError = null
  },

  [types.FETCH_GENRE_SUCCESS] (state, data) {
    state.isFetching = false
    state.genres = data.data
  },

  [types.FETCH_GENRE_ERROR] (state, error) {
    state.isFetching = false
    state.fetchingError = error
  }
}
