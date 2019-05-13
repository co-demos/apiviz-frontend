
export default function ({ store }) {

  console.log('\n---------------------')
  // console.log('-- setAppMode...')

  if ( typeof(store.getters.getApivizFrontUUID) === 'undefined' ){
    console.log('-- setAppMode / process.env.ApivizUUID : ', process.env.ApivizUUID )
      // console.log('-- setAppMode / setting apivizFrontUUID')
    store.commit('setApivizFrontUUID', process.env.ApivizUUID )
    console.log('-- setAppMode / store.state.apivizFrontUUID : ', store.state.apivizFrontUUID )
  }

  if ( typeof(store.getters.getRunMode) === 'undefined' ){
    console.log('-- setAppMode / process.env.BackendMode : ', process.env.BackendMode )
      // console.log('-- setAppMode / setting runMode')
    store.commit('setRunMode', process.env.BackendMode )
    console.log('-- setAppMode / store.state.runMode : ', store.state.runMode )
  }

}