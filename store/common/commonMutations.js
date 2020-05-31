import * as types from './commonTypes'

export default {
  [types.SET_HEADER] (state, header) {
    state.header = header
  },

  [types.SET_INTERACTIVE_MODE] (state, interactiveMode) {
    state.interactiveMode = interactiveMode
  }
}
