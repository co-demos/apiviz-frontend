// var cookieparser = require('cookieparser')
import { noCheckRoutePaths, loginRoutes } from '~/config/noCheckRoutes.js'

export default function ({ store, route, redirect }) {

  const log = store.state.log 
  
  log && console.log('\n-M2- getAppConfig...')

  let path = route.path
  log && console.log('-M2- getAppConfig / path :', path)

  // route needs the apivviz instance configuration
  let needAppConfig = !noCheckRoutePaths.includes(route.path)
  log && console.log('-M2- getAppConfig / needAppConfig : ', needAppConfig)

  let isConfigComplete = store.getters['config/getIsConfigComplete']
  log && console.log('-M2- getAppConfig / isConfigComplete : ', isConfigComplete)

  let userAccessToken = store.getters['user/getAccessToken'] !== '' 
  log && console.log('-M2- getAppConfig / userAccessToken : ', userAccessToken)

  let isLoginRoutePath = loginRoutes.includes(route.path)
  log && console.log('-M2- getAppConfig / isLoginRoutePath : ', isLoginRoutePath)


  if(needAppConfig) {

    // set up a promise array
    let isConfigUndefined = typeof store.getters['config/getGlobalConfig'] === 'undefined'
    // let isLoginRoute = ( isLoginRoutePath && !isConfigUndefined ) ? isLoginRoutePath : false

    let promiseArrayUuidAuth = []
    let promiseArrayconfigs = []
    
    // check if config.global is undefined yet or incomplete
    if ( isConfigUndefined || !isConfigComplete ) {

      // FIRST PUSH IN ARRAY 'config/checkUuidAuth' to get uuid auth level and infos
      promiseArrayUuidAuth.push(

        store.dispatch('config/checkUuidAuth')
        .then( resp => {

          log && console.log("-M2- getAppConfig / after checkUuidAuth ... resp : \n", resp)
          const UuidAuthDoc = resp.uuid_auth_doc
          store.commit('config/setUuidAuth', UuidAuthDoc)

          const isUuidAuthorized = UuidAuthDoc.uuid_is_authorized
          log && console.log("-M2- getAppConfig / after checkUuidAuth ... isUuidAuthorized : ", isUuidAuthorized)

          const isUuidPrivate = UuidAuthDoc.private_instance
          log && console.log("-M2- getAppConfig / after checkUuidAuth ... isUuidPrivate : ", isUuidPrivate)

          if (isUuidAuthorized) {
            
            // this apiviz instance is not locked 
            log && console.log("-M2- getAppConfig / isUuidAuthorized ")

            if (!isUuidPrivate || isLoginRoutePath || userAccessToken) {

              // this Apiviz instance is a not private one user doesn't need to log first
              // or
              // this route is a login route (e.g /login, /logout, /register)
              // => so need to load the config
              log && console.log("-M2- getAppConfig / !isUuidPrivate || isLoginRoutePath ")

              promiseArrayconfigs.push(
                // store.dispatch('config/getConfigAll', isLoginRoute)
                store.dispatch('config/getConfigAll', isLoginRoutePath)
                .then( resp => {
        
                  // log && console.log("-M2- getAppConfig / after getConfigAll ... resp : \n", resp);

                  store.commit('config/setIsConfigComplete', !isLoginRoutePath)

                  const authMode = store.getters.getAuthMode
                  // log && console.log("-M2- getAppConfig / after getConfigAll ... authMode : ", authMode);
        
                  let authUrlRoots = store.getters['config/getEndpointConfigAuthSpecific']('auth_root')
                  // log && console.log("-M2- getAppConfig / authUrlRoots : ", authUrlRoots);
        
                  const authUrlRoot = authUrlRoots.root_url[authMode]
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
              // LAUNCH 'config/getConfigAll' from within the promiseArrayUuidAuth after it's finished (then)
              return Promise.all(promiseArrayconfigs)
            
            } // end of : if (!isUuidPrivate || isLoginRoutePath) 
            else {
              log && console.log("-M2- getAppConfig / isUuidPrivate && !isLoginRoutePath")
              // redirect to login : the uuid exists but is protected
              return redirect('/login')
            } // end of : else (of : if (!isUuidPrivate || isLoginRoutePath) )

          } 
          else {
            // redirect to uuid-is-locked page : the uuid exists but is locked
            redirect('/uuid-is-locked')
          } // end of : else (of : if (isUuidAuthorized) )


        })
        .catch( error => {
          log && console.log( '-M2- getAppConfig / error getting uuid auth from backend...')
          log && console.log( '-M2- getAppConfig / error : \n', error)
          redirect('/new-apiviz-instance')
        })

      ) // end of promiseArrayUuidAuth

      // LAUNCH CHAINED PROMISES BEGINNING WITH AUTH UUID
      return Promise.all(promiseArrayUuidAuth)

    } // end of : if(needAppConfig)

  }





}