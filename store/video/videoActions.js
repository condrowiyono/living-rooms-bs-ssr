import * as types from './videoTypes'

export default ({ videoService }) => ({
  async [types.FETCH_VIDEO_DETAIL] ({ commit }, { id, type }) {
    commit(types.FETCH_VIDEO_DETAIL)

    try {
      const data = await videoService.detail({ id, type })

      commit(types.FETCH_VIDEO_DETAIL_SUCCESS, data)

      return data
    } catch (error) {
      commit(types.FETCH_VIDEO_DETAIL_ERROR, error)
    }
  }
})
