
export default function ({ store, route }) {

  const log = store.state.log 

  log && console.log('\n-M1- --- SetAppMode ---')
  // console.log('-- setAppMode...')

  if ( typeof(store.getters.getApivizFrontUUID) === 'undefined' ){

    // log && console.log('-- setAppMode / setting apivizFrontUUID')
    // log && console.log('--M1-- setAppMode / process.env.ApivizUUID : ', process.env.ApivizUUID )
    store.commit('setApivizFrontUUID', process.env.ApivizUUID )
    // log && console.log('--M1-- setAppMode / store.state.apivizFrontUUID : ', store.state.apivizFrontUUID )
  }

  if ( typeof(store.getters.getRunMode) === 'undefined' ){
    // log && console.log('-- setAppMode / setting runMode')
    // log && console.log('--M1-- setAppMode / process.env.BackendMode : ', process.env.BackendMode )
    store.commit('setRunMode', process.env.BackendMode )
    // log && console.log('--M1-- setAppMode / store.state.runMode : ', store.state.runMode )
  }

}