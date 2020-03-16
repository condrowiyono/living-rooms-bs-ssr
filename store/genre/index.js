import state from './genreState'
import getters from './genreGetters'
import actions from './genreActions'
import mutations from './genreMutations'
import { genreService } from '@/services'

export default {
  state,
  getters,
  mutations,
  actions: actions({ genreService })
}
