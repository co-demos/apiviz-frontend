var cookieparser = require('cookieparser')

export default function ({ store, route, redirect }) {
  console.log('\n-- getConfig...')

  // based on DynamicRoutes in legacy apiviz

  // CHECK IF config.global is undefined yet
  if ( typeof store.state.config.global === 'undefined' ) {
    console.log("... getConfig / store.state.config.global is undefined ...")
    store.dispatch('config/getConfigAll')
    .then(() => {
      const runMode = store.getters.getRunMode
      console.log("... getConfig / after getConfigAll ... runMode : ", runMode);
      let authUrlRoots = store.getters['config/getEndpointConfigAuthSpecific']('auth_root')
      console.log("... getConfig / authUrlRoots : ", authUrlRoots);
      // const authUrlRoot = authUrlRoots.root_url[runMode]
      // console.log("... getConfig / authUrlRoot : ", authUrlRoot);
      // store.commit('setAuthUrlRoot', authUrlRoot)
    })
    .catch(() => {
      console.log( 'getConfig / error...')
    })
  }

}