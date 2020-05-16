export default function ({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    console.log('\n> > > plugin axios / Making request to : ' + config.method + ' -> ' + config.url)
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['Authorization'] = store.state.auth.access_token ;
    // config.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
    // config.headers['Access-Control-Allow-Credentials'] = true ;

    // console.log('> > > plugin axios / config : \n', config) ;
  })

  $axios.onResponse(response => {
    // console.log('\n> > > plugin axios / response     : ', response)
    // console.log('\n> > > plugin axios / response.status : ', response.status)
    // console.log('> > > plugin axios / typeof response.data  : ', typeof response.data)

    // console.log('> > > plugin axios / response.headers  : \n', response.headers)
    // console.log('> > > plugin axios / response.data     : \n', response.data)
    // console.log('> > > plugin axios / response.config : ', response.config )
    // console.log("\n")
  })

  //  cf : https://stackoverflow.com/questions/48402747/nuxt-js-vue-js-setting-axios-auth-token-in-vuex-store-resets-after-refresh
  // $axios.interceptors.request.use(request => {

  //     request.baseURL = 'https://api.com/api/'

  //     // Get token from auth.js store
  //     const token = store.state.token

  //     // Update token axios header
  //     if (token) {
  //       request.headers.common['Authorization'] = token
  //     }
  //     return request
  // })

  $axios.onError(error => {
    console.log('> > > plugin axios / error : ', error)
    const code = parseInt(error.response && error.response.status)
    console.log('\n> > > plugin axios / error - code : ', code)

    // if (code === 404) {
    //   redirect('/404')
    // }

    // if (code === 500) {
    //   redirect('/')
    // }

    // if (code === 401) {
    // redirect('/login')
    // }

    // else {
    // redirect('/login')
    // }
    // return error.response
  })
}
