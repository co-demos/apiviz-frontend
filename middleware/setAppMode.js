
export default function ({ store }) {
  console.log('\n-- setAppMode...')

  console.log('\n-- setAppMode / process.env.ApivizUUID : ', process.env.ApivizUUID )
  if ( typeof(store.state.apivizFrontUUID) === 'undefined' ){
    // console.log('-- setAppMode / setting apivizFrontUUID')
    store.commit('setApivizFrontUUID', process.env.ApivizUUID )
    console.log('-- setAppMode / store.state.apivizFrontUUID : ', store.state.apivizFrontUUID )
  }

  console.log('\n-- setAppMode / process.env.BackendMode : ', process.env.BackendMode )
  if ( typeof(store.state.runMode) === 'undefined' ){
    // console.log('-- setAppMode / setting runMode')
    store.commit('setRunMode', process.env.BackendMode )
    console.log('-- setAppMode / store.state.runMode : ', store.state.runMode )
  }

}