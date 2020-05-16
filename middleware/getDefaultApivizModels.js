export default function ({ req, store, route, redirect }) {
  const log = store.state.log
  // log && console.log('\n-M7- getApivizDefaultModels...')
  store.dispatch('config/getDefaultApivizModels')
}
