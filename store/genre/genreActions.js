import * as types from './genreTypes'

export default ({ genreService }) => ({
  async [types.FETCH_GENRE] ({ commit }, query) {
    commit(types.FETCH_GENRE)

    try {
      const data = await genreService.get(query)

      commit(types.FETCH_GENRE_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_GENRE_ERROR, error)
    }
  }
})
