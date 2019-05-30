export default function ({ store, route, redirect }) {
  
  // const log = store.state.log 
  // log && console.log('\n-M6- checkBackOffice...')

  let authorizedRolesForBackOffice = ['admin', 'staff']

  let user = store.getters['user/getUser']
  // log && console.log('\n-M7- checkUser / user.infos : ', user.infos)
  // log && console.log('\n-M7- checkUser / user.role : ', user.role)

  if ( !authorizedRolesForBackOffice.includes(user.role) ) {
    redirect('/login')
  }

}