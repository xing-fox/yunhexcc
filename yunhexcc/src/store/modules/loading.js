'user strict'
let state = {
  LoadingState: true
}
const actions = {
  LoadingingStatus ({ commit }, status) {
    commit('Loadinging', status)
  }
}
const mutations = {
  Loadinging (state, status) {
    state.LoadingState = status
  }
}
const getters = {
}
export default {
  state,
  getters,
  actions,
  mutations
}
