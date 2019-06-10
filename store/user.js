import axios from 'axios'
import Cookie from 'js-cookie'

import {  
  getObjectDataFromPath,
} from '~/plugins/utils.js'

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

  getUser: state => {
    return state.user
  },

  getConfirmTokenConfig : (state, getters, rootState) => {
    return rootState.config.config.endpoints.find(function(r) {
      return r.field === 'app_data_API_user_auth'
    });
  },

  getCheckUserRole : (state, getters) => (roleToCheck) => {
    const user = state.user
    const userRole = user.role // role from auth confirm access response
    const authConfig = getters.getConfirmTokenConfig 
    const roleUserToCheck = authConfig.roles[roleToCheck]['resp_role'] // role corresponding to roleToCheck
    return roleUserToCheck === userRole
  },

}

export const mutations = {

  setTokens (state, {tokens} ) {
    // state.log && console.log('S-user-M-setTokens / tokens : ', tokens)
    // state.jwt = (tokens && tokens.access_token && tokens.refresh_token) ? tokens : undefined
    state.jwt = tokens
    // state.log && console.log('S-user-M-setTokens / state.jwt : ', state.jwt)
  },
  setInfos (state, {infos}) {
    state.log && console.log('S-user-M-setInfos / infos : ', infos)
    state.user.infos = (infos && infos.email) ? infos : undefined
    state.user.isLoggedin = (infos && infos.email) ? true : false
  },
  setRole (state, {role}) {
    state.user.role = (typeof role === 'string') ? role : undefined
  },

}

export const actions = {

  // set USER INFOS
  saveUserInfos({state, commit, getters}, response){

    const authConfig = getters.getConfirmTokenConfig
    // state.log && console.log("S-user-A-saveUserInfos / authConfig : ", authConfig )

    const userIdPath = authConfig.resp_fields.user_id.path
    const userNamePath = authConfig.resp_fields.user_name.path
    const userSurnamePath = authConfig.resp_fields.user_surname.path
    const userPseudoPath = authConfig.resp_fields.user_pseudo.path
    const userEmailPath = authConfig.resp_fields.user_email.path
    
    let infos = ( response && response.data ) ? {
      name    : getObjectDataFromPath(response.data, userNamePath), 
      surname : getObjectDataFromPath(response.data, userSurnamePath), 
      email   : getObjectDataFromPath(response.data, userEmailPath), 
      id      : getObjectDataFromPath(response.data, userIdPath), 
      pseudo  : getObjectDataFromPath(response.data, userPseudoPath), 
    } : undefined 
    // state.log && console.log("S-user-A-saveUserInfos / infos : ", infos )

    // set cookies
    Cookie.set("user_name", infos.name )
    Cookie.set("user_email", infos.email )

    // commit to store's state
    commit('setInfos',  { infos })
  },

  // set USER ROLE 
  saveUserRole({state, commit, getters}, response){

    const authConfig = getters.getConfirmTokenConfig
    const userRolePath = authConfig.resp_fields.user_role.path
    let role = ( response && response.data ) ? getObjectDataFromPath(response.data, userRolePath) : undefined
    // state.log && console.log("S-user-A-saveUserRole / role : ", role )
        
    // commit to store's state
    commit('setRole', {role})
  },

  // set USER TOKENS
  saveUserTokens({state, commit, getters}, response){

    const authConfig = getters.getConfirmTokenConfig
    // state.log && console.log("S-user-A-saveUserTokens / authConfig ", authConfig )

    const accessTokenPath = authConfig.resp_fields.access_token.path
    const refreshTokenPath = authConfig.resp_fields.refresh_token.path
    let tokens = (response && response.data ) ? { 
      access_token   : getObjectDataFromPath(response.data, accessTokenPath), 
      refresh_token : getObjectDataFromPath(response.data, refreshTokenPath), 
    } : undefined ;

    // state.log && console.log("S-user-A-saveUserTokens / tokens ", tokens )
    // set cookies
    Cookie.set("access_token",  tokens.access_token )
    Cookie.set("refresh_token", tokens.refresh_token )

    // commit to store's state
    commit('setTokens', {tokens})

  },

  // LOGIN USER
  saveLoginInfos({state, commit, getters, dispatch}, {APIresponse}){

    let r = APIresponse
    state.log && console.log("\nS-user-A-saveLoginInfos / r = APIresponse : \n", r )

    const authConfig = getters.getConfirmTokenConfig
    state.log && console.log("S-user-A-saveLoginInfos / authConfig ", authConfig )

    // tokens
    dispatch('saveUserTokens', r)
    // const accessTokenPath = authConfig.resp_fields.access_token.path
    // const refreshTokenPath = authConfig.resp_fields.refresh_token.path
    // let tokens = (r && r.data ) ? { 
    //   access_token   : getObjectDataFromPath(r.data, accessTokenPath), 
    //   refresh_token : getObjectDataFromPath(r.data, refreshTokenPath), 
    // } : undefined ;
    // state.log && console.log("S-user-A-saveLoginInfos / tokens ", tokens )
    // Cookie.set("access_token",  tokens.access_token )
    // Cookie.set("refresh_token", tokens.refresh_token )
    // commit('setTokens', {tokens})
    
    // infos
    dispatch('saveUserInfos', r)
    // const userNamePath = authConfig.resp_fields.user_name.path
    // const userSurnamePath = authConfig.resp_fields.user_surname.path
    // const userEmailPath = authConfig.resp_fields.user_email.path
    // const userPseudoPath = authConfig.resp_fields.user_pseudo.path
    // const userIdPath = authConfig.resp_fields.user_id.path
    // let infos = ( r && r.data ) ? {
    //   name    : getObjectDataFromPath(r.data, userNamePath), 
    //   surname : getObjectDataFromPath(r.data, userSurnamePath), 
    //   email   : getObjectDataFromPath(r.data, userEmailPath), 
    //   id      : getObjectDataFromPath(r.data, userIdPath), 
    //   pseudo  : getObjectDataFromPath(r.data, userPseudoPath), 
    // } : undefined ;
    // state.log && console.log("S-user-A-saveLoginInfos / infos ", infos )
    // Cookie.set("user_name", infos.name )
    // Cookie.set("user_email", infos.email )
    // commit('setInfos',  {infos})
    
    // role
    dispatch('saveUserRole', r)
    // const userRolePath = authConfig.resp_fields.user_role.path
    // let role = ( r && r.data ) ? getObjectDataFromPath(r.data, userRolePath) : undefined
    // commit('setRole',   {role})


    // test user role
    state.log && console.log('S-user-A-saveLoginInfos / then... getCheckUserRole - guest : ', getters.getCheckUserRole('guest'))
    state.log && console.log('S-user-A-saveLoginInfos / then... getCheckUserRole - admin : ', getters.getCheckUserRole('admin'))
  },
  
  logout({commit}){

    Cookie.remove('access_token');
    Cookie.remove('refresh_token');
    Cookie.remove('user_name');
    Cookie.remove("user_email");

    commit('setTokens', {})
    commit('setInfos',  {})
    commit('setRole',   {})
  },

}