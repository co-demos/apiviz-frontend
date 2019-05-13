var cookieparser = require('cookieparser')

export default function ({ store, route, redirect }) {

  
  // based on DynamicRoutes in legacy apiviz
  let promiseArray = []
  
  // CHECK IF config.global is undefined yet
  // if ( typeof store.state.config.global === 'undefined' ) {
    if ( typeof store.getters['config/getGlobalConfig'] === 'undefined' ) {
    
    console.log('\n-- getAppConfig...')

    console.log("-- getAppConfig / store.state.config.global is undefined ...")
    promiseArray.push(

      store.dispatch('config/getConfigAll')
      .then(() => {

        const runMode = store.getters.getRunMode
        // console.log("-- getAppConfig / after getConfigAll ... runMode : ", runMode);

        let authUrlRoots = store.getters['config/getEndpointConfigAuthSpecific']('auth_root')
        // console.log("-- getAppConfig / authUrlRoots : ", authUrlRoots);

        const authUrlRoot = authUrlRoots.root_url[runMode]
        // console.log("-- getAppConfig / authUrlRoot : ", authUrlRoot);
        store.commit('setAuthUrlRoot', authUrlRoot)
        
      })

      .catch(() => {
        console.log( 'getAppConfig / error getting app config from backend...')
      })

    )

  }

  return Promise.all(promiseArray)

}