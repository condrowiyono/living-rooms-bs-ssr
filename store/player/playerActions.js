import * as types from './playerTypes'

export default ({ playerService }) => ({
  async [types.FETCH_PLAYER_DETAIL] ({ commit }, { id, type }) {
    commit(types.FETCH_PLAYER_DETAIL)

    try {
      const data = await playerService.detail({ id, type })

      commit(types.FETCH_PLAYER_DETAIL_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_PLAYER_DETAIL_ERROR, error)
    }
  }
})
