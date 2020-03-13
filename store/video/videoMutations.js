import * as types from './videoTypes'

export default {
  [types.FETCH_VIDEO_DETAIL] (state) {
    state.isFetching = true
    state.fetchingError = null
  },

  [types.FETCH_VIDEO_DETAIL_SUCCESS] (state, data) {
    state.isFetching = false
    state.video = data.data
  },

  [types.FETCH_VIDEO_DETAIL_ERROR] (state, error) {
    state.isFetching = false
    state.fetchingError = error
  }
}
