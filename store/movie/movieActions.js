import * as types from './movieTypes'

export default ({ movieService }) => ({
  async [types.FETCH_MOVIE] ({ commit }, query = {}) {
    commit(types.FETCH_MOVIE)

    try {
      const data = await movieService.get(query)

      commit(types.FETCH_MOVIE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_MOVIE_ERROR, error)
    }
  },

  async [types.FETCH_LATEST_MOVIE] ({ commit }, query = {}) {
    commit(types.FETCH_LATEST_MOVIE)

    try {
      const data = await movieService.get(query)

      commit(types.FETCH_LATEST_MOVIE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_LATEST_MOVIE_ERROR, error)
    }
  },

  async [types.FETCH_MOVIE_DETAIL] ({ commit }, { id, caller }) {
    commit(types.FETCH_MOVIE_DETAIL, caller)

    try {
      const data = await movieService.detail(id)

      commit(types.FETCH_MOVIE_DETAIL_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_MOVIE_DETAIL_ERROR, error)
    }
  },

  [types.RESET_MOVIE_DETAIL] ({ commit }) {
    commit(types.RESET_MOVIE_DETAIL)
  }
})
