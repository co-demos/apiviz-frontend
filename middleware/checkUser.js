export default function ({ store, route, redirect }) {
  const log = store.state.log
  // log && console.log('\n-M7- checkUser...')

  const user = store.getters['user/getUser']
  // log && console.log('\n-M7- checkUser / user : ', user)

  if (!user.infos) {
    redirect('/login')
  }
}
