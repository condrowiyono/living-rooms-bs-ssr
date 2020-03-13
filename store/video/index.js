import state from './videoState'
import getters from './videoGetters'
import actions from './videoActions'
import mutations from './videoMutations'
import { videoService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ videoService })
}
