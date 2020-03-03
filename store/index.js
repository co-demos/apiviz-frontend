import { apiBackendConfigs } from '~/config/apiBackends.js'
import { findBulmaBreakpointByWidth } from '~/config/constants.js'

export const state = () => ({

  // CONSOLE LOG ALLOWED
  log: process.env.ConsoleLog,

  // APIVIZ FRONTEND UUID
  apivizFrontUUID : undefined,

  // HTML FILES
  // staticHtmlMode : undefined,

  // APP MODE : default | preprod | prod
  runMode : undefined,
  authMode : undefined,
  rootUrlBackend : undefined,
  rootUrlAuth : undefined,

  // UX OPTIONS
  showNav : false,
  shrinkNav : false,
  shrinkOffset : 100,
  bannerVisible : true,
  breakpoint : undefined,

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
    getAuthMode : state => {
      // console.log( "...I'm on a auth mode... ", state.authMode )
      return state.authMode
    },
    getRootUrlBackend : state => {
      // console.log( "...I'm roooot url backend... ", state.rootUrlBackend )
      return state.rootUrlBackend
    },
    getRootUrlAuth : state => {
      // console.log( "...I'm roooot url auth... ", state.rootUrlAuth )
      return state.rootUrlAuth
    },
    // getStaticHtmlMode : state => {
    //   // console.log( "...I'm staticHtmlMode... ", state.staticHtmlMode )
    //   return state.staticHtmlMode
    // },

  // UX GETTERS
    getNavbarVisibility : state => {
      return state.showNav
    },
    getShrinkNav : state => {
      return state.shrinkNav
    },

    getBreakpoint : (state) => (width) => {
      let breakpoint = findBulmaBreakpointByWidth( width )
      return breakpoint
    },

  // FOR TRANSLATIONS
  // - - - - - - - - - - - - - - - //
    // getTranslation : (state) => (textsData) => {
    //   console.log("store / textsData : ", textsData)
    //   const textField = 'text'
    //   // return textFromLocale( textsData.texts, locale, textField )
    //   return this.$Translate( textsData.texts, state.locale, textField )
    // },
    getCurrentLocale : state => {
      // console.log( "...I'm locale... ", state.locale )
      return state.locale
    }
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
    setAuthMode( state, authMode ){
      state.authMode = authMode
    },
    setAuthUrlRoot( state, urlRoot ){
      state.rootUrlAuth = urlRoot
    },
    // setStaticHtmlMode( state, htmlMode ){
    //   state.staticHtmlMode = htmlMode
    // },

  // UX OPTIONS-RELATED
    disableBanners(state){
      state.bannerVisible = false
    },
    switchNavbarMenu(state){
      state.showNav = !state.showNav
    },
    setShowNavbar(state, value){
      state.showNav = value
    },
    setShrinkNav(state, value){
      state.shrinkNav = value
    },
    setBreakpoint(state, breakpoint){
      state.breakpoint = breakpoint
    },

    // INTERNATIONALIZATION
    setLocale(state, loc){
      // state.log && console.log("S-index-M-setLocale / loc :", loc )
      state.locale = loc
    },
}

export const actions = {

}
