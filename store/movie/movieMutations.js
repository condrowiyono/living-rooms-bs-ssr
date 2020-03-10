import * as types from './movieTypes'

export default {
  [types.FETCH_MOVIE] (state) {
    state.isFetching = true
    state.fetchingError = null
  },

  [types.FETCH_MOVIE_SUCCESS] (state, data) {
    state.isFetching = false
    state.movies = data.data
  },

  [types.FETCH_MOVIE_ERROR] (state, error) {
    state.isFetching = false
    state.fetchingError = error
  },

  [types.FETCH_LATEST_MOVIE] (state) {
    state.isFetching = true
    state.fetchingError = null
  },

  [types.FETCH_LATEST_MOVIE_SUCCESS] (state, data) {
    state.isFetching = false
    state.latestMovies = data.data
  },

  [types.FETCH_LATEST_MOVIE_ERROR] (state, error) {
    state.isFetching = false
    state.fetchingError = error
  },

  [types.FETCH_MOVIE_DETAIL] (state, caller) {
    state.isFetching = true
    state.fetchingError = null
    state.caller = caller
  },

  [types.FETCH_MOVIE_DETAIL_SUCCESS] (state, data) {
    state.isFetching = false
    state.movie = data.data
  },

  [types.FETCH_MOVIE_DETAIL_ERROR] (state, error) {
    state.isFetching = false
    state.fetchingError = error
  },

  [types.RESET_MOVIE_DETAIL] (state) {
    state.movie.data = {}
    state.caller = null
  }
}
