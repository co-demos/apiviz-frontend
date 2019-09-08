
export default function ({ store, route, redirect }) {

  const log = store.state.log 

  log && console.log('\n-M1- --- SetAppMode ---')

  if ( typeof(store.getters.getApivizFrontUUID) === 'undefined' ){

    log && console.log('-M1- setAppMode / setting apivizFrontUUID')
    // log && console.log('--M1-- setAppMode / process.env.ApivizUUID : ', process.env.ApivizUUID )
    store.commit('setApivizFrontUUID', process.env.ApivizUUID )
    // log && console.log('--M1-- setAppMode / store.state.apivizFrontUUID : ', store.state.apivizFrontUUID )
  }

  if ( typeof(store.getters.getRunMode) === 'undefined' ){
    log && console.log('-M1- setAppMode / setting runMode')
    // log && console.log('--M1-- setAppMode / process.env.BackendMode : ', process.env.BackendMode )
    store.commit('setRunMode', process.env.BackendMode )
    // log && console.log('--M1-- setAppMode / store.state.runMode : ', store.state.runMode )
  }

  if ( typeof(store.getters.getAuthMode) === 'undefined' ){
    log && console.log('-M1- setAppMode / setting authMode')
    // log && console.log('--M1-- setAppMode / process.env.AuthMode : ', process.env.AuthMode )
    store.commit('setAuthMode', process.env.AuthMode )
    // log && console.log('--M1-- setAppMode / store.state.authMode : ', store.state.authMode )
  }

  // if ( typeof(store.getters.getStaticHtmlMode) === 'undefined' ){
  //   log && console.log('-M1- setAppMode / setting staticHtmlMode')
  //   // log && console.log('--M1-- setAppMode / process.env.HtmlFilesMode : ', process.env.HtmlFilesMode )
  //   store.commit('setStaticHtmlMode', process.env.HtmlFilesMode )
  //   // log && console.log('--M1-- setAppMode / store.state.staticHtmlMode : ', store.state.staticHtmlMode )
  // }

}