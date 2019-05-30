
export default function ({ store, route, redirect }) {
  
  // const log = store.state.log 
  // log && console.log('\n-M5- collapseNavbar...')

  store.commit('setShowNavbar', false)

}