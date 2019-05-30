// var cookieparser = require('cookieparser')
import { noCheckRoutePaths } from '~/config/noCheckRoutes.js';

export default function ({ store, route, redirect }) {

  const log = store.state.log 
  
  log && console.log('\n-M2- getAppConfig...')

  let needAppConfig = !noCheckRoutePaths.includes(route.path)
  // log && console.log('-M2- getAppConfig / needAppConfig : ', needAppConfig)

  if(needAppConfig) {  
    // based on DynamicRoutes in legacy apiviz
    let promiseArray = []
    
    // CHECK IF config.global is undefined yet
    if ( typeof store.getters['config/getGlobalConfig'] === 'undefined' ) {
      
      // log && console.log("-M2- getAppConfig / store.state.config.global is undefined ...")
      promiseArray.push(

        store.dispatch('config/getConfigAll')
        .then(() => {

          const runMode = store.getters.getRunMode
          // log && console.log("-M2- getAppConfig / after getConfigAll ... runMode : ", runMode);

          let authUrlRoots = store.getters['config/getEndpointConfigAuthSpecific']('auth_root')
          // log && console.log("-M2- getAppConfig / authUrlRoots : ", authUrlRoots);

          const authUrlRoot = authUrlRoots.root_url[runMode]
          // log && console.log("-M2- getAppConfig / authUrlRoot : ", authUrlRoot);
          store.commit('setAuthUrlRoot', authUrlRoot)

          // INTERNATIONALIZATION
          let appLocales = store.getters['config/getAppLocales']
          store.commit('setLocale', appLocales.locale)

        })

        .catch( (error) => {
          log && console.log( '-M2- getAppConfig / error getting app config from backend...')
          log && console.log( '-M2- getAppConfig / error : \n', error)
          log && console.log( '-M2- getAppConfig / redirecting to instance creator form ...')
          redirect('/new-apiviz-instance')
        })

      )
    }
    return Promise.all(promiseArray)
  }

}