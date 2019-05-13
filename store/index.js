import { apiBackendConfigs } from '~/config/apiBackends.js'

export const state = () => ({

  // APIVIZ FRONTEND UUID
  apivizFrontUUID : undefined,

  // APP MODE : default | preprod | prod
  runMode : undefined,
  rootUrlBackend : undefined,
  rootUrlAuth : undefined,

  // UX OPTIONS
  showNav : false,
  bannerVisible : true,

  // FOR TRANSLATIONS
  locale: 'fr',
    
})

export const getters = {

  // GLOBAL APP GETTERS
  // - - - - - - - - - - - - - - - //
    getApivizFrontUUID : state => {
      // console.log( "...I'm you, I dee... ", state.apivizFrontUUID )
      return state.apivizFrontUUID
    },
    getRunMode : state => {
      // console.log( "...I'm on a run mode... ", state.runMode )
      return state.runMode
    },
    getRootUrlBackend : state => {
      // console.log( "...I'm roooot... ", state.rootUrlBackend )
      return state.rootUrlBackend
    },
    getRootUrlAuth : state => {
      // console.log( "...I'm roooot auth... ", state.rootUrlAuth )
      return state.rootUrlAuth
    },

  // UX GETTERS
    getNavbarVisibility : state => {
      return state.showNav
    },

  // FOR TRANSLATIONS
  // - - - - - - - - - - - - - - - //
    // getTranslation : (state) => (textsData) => {
    //   console.log("store / textsData : ", textsData)
    //   const textField = 'text'
    //   // return textFromLocale( textsData.texts, locale, textField )
    //   return this.$Translate( textsData.texts, state.locale, textField )
    // },




}

export const mutations = {

  // APP CONDITIONS- RELATED
    setApivizFrontUUID (state, apivizFrontUUID){
      state.apivizFrontUUID = apivizFrontUUID
    },
    setRunMode( state, runMode ){
      state.runMode = runMode
      const roots = apiBackendConfigs[runMode]
      state.rootUrlBackend = roots.rootURL
    },
    setAuthUrlRoot( state, urlRoot ){
      state.rootUrlAuth = urlRoot
    },

  // UX OPTIONS-RELATED
    disableBanners(state){
      state.bannerVisible = false
    },
    switchNavbarMenu(state){
      state.showNav = !state.showNav
    },

}

export const actions = {

}