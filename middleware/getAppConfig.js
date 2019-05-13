var cookieparser = require('cookieparser')

export default function ({ store, route, redirect }) {

  const log = store.state.log 
  
  // based on DynamicRoutes in legacy apiviz
  let promiseArray = []
  
  // CHECK IF config.global is undefined yet
  // if ( typeof store.state.config.global === 'undefined' ) {
    if ( typeof store.getters['config/getGlobalConfig'] === 'undefined' ) {
    
    log && console.log('\n--M2-- getAppConfig...')

    log && console.log("--M2-- getAppConfig / store.state.config.global is undefined ...")
    promiseArray.push(

      store.dispatch('config/getConfigAll')
      .then(() => {

        const runMode = store.getters.getRunMode
        // log && console.log("--M2-- getAppConfig / after getConfigAll ... runMode : ", runMode);

        let authUrlRoots = store.getters['config/getEndpointConfigAuthSpecific']('auth_root')
        // log && console.log("--M2-- getAppConfig / authUrlRoots : ", authUrlRoots);

        const authUrlRoot = authUrlRoots.root_url[runMode]
        // log && console.log("--M2-- getAppConfig / authUrlRoot : ", authUrlRoot);
        store.commit('setAuthUrlRoot', authUrlRoot)
        
      })

      .catch(() => {
        log && console.log( '--M2-- getAppConfig / error getting app config from backend...')
      })

    )

  }

  return Promise.all(promiseArray)

}