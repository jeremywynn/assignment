export const state = () => ({
  status: 'initial',
})

export const mutations = {
  EDIT_STATUS(state, status) {
    state.status = status
  },
}

export const actions = {
  editStatus({ commit }, payload) {
    commit('EDIT_STATUS', payload)
  },
}