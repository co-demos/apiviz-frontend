import axios from 'axios'

export const state = () => ({

  // CONSOLE LOG ALLOWED 
  log: process.env.ConsoleLog,

  // USER-RELATED
  user : {
    infos: undefined,
    role: undefined,
    isLoggedin: false
  },

  jwt : {
    access_token : undefined,
    refresh_token : undefined,
  },

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

  // USER-RELATED
  saveLoginInfos({commit, getters}, {APIresponse}){

    const authConfig = getters.getConfirmTokenConfig
    console.log("\n// authConfig : \n", authConfig )

    const accessTokenPath = authConfig.resp_fields.access_token.path
    const refreshTokenPath = authConfig.resp_fields.refresh_token.path
    const userRolePath = authConfig.resp_fields.user_role.path
    const userIdPath = authConfig.resp_fields.user_id.path
    const userNamePath = authConfig.resp_fields.user_name.path
    const userSurnamePath = authConfig.resp_fields.user_surname.path
    const userPseudoPath = authConfig.resp_fields.user_pseudo.path
    const userEmailPath = authConfig.resp_fields.user_email.path

    let r = APIresponse
    console.log("\n// r = APIresponse : \n", r )

    // let tokens = (r && r.data && r.data.data && r.data.data.tokens) ? r.data.data.tokens : undefined
    let tokens = (r && r.data ) ? { 
      access_token   : getObjectDataFromPath(r.data, accessTokenPath), 
      refresh_token : getObjectDataFromPath(r.data, refreshTokenPath), 
    } : undefined ;
    // console.log('tokens : \n', tokens)

    // let infos = (r && r.data && r.data.data && r.data.data.infos) ? r.data.data.infos : undefined
    let infos = ( r && r.data ) ? {
        name    : getObjectDataFromPath(r.data, userNamePath), 
        surname : getObjectDataFromPath(r.data, userSurnamePath), 
        email   : getObjectDataFromPath(r.data, userEmailPath), 
        id      : getObjectDataFromPath(r.data, userIdPath), 
        pseudo  : getObjectDataFromPath(r.data, userPseudoPath), 
    } : undefined ;
    // console.log('infos : \n', infos)

    // let role = (r && r.data && r.data.data && r.data.data.auth && r.data.data.auth.role) ? r.data.data.auth.role : undefined
    let role = ( r && r.data ) ? getObjectDataFromPath(r.data, userRolePath) : undefined

    commit('setTokens', {tokens})
    commit('setInfos',  {infos})
    commit('setRole',   {role})

    // test user role
    console.log('then... getCheckUserRole - guest : ', getters.getCheckUserRole('guest'))
    console.log('then... getCheckUserRole - admin : ', getters.getCheckUserRole('admin'))
  },
  logout({commit}){
    commit('setTokens', {})
    commit('setInfos',  {})
    commit('setRole',   {})
  },

}