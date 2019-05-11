export const state = () => ({

  // USER-RELATED
  user : {
    infos: undefined,
    role: undefined,
    isLoggedin: false
  },
  jwt : undefined,

})

export const getters = {

}

export const mutations = {

  setTokens (state, {tokens} ) {
    console.log('tokens : ', tokens)
    // state.jwt = (tokens && tokens.access_token && tokens.refresh_token) ? tokens : undefined
    state.jwt = tokens
    console.log('state.jwt : ', state.jwt)
  },
  setInfos (state, {infos}) {
    state.user.infos = (infos && infos.email) ? infos : undefined
    state.user.isLoggedin = (infos && infos.email) ? true : false
  },
  setRole (state, {role}) {
    state.user.role = (typeof role === 'string') ? role : undefined
  },
  
}

export const actions = {

}