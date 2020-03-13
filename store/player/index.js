import state from './playerState'
import getters from './playerGetters'
import actions from './playerActions'
import mutations from './playerMutations'
import { playerService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ playerService })
}
