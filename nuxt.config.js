import pkg from './package'

require('dotenv').config()

// console.log('>>> nuxt.config.js / process.env :\n', process.env)
console.log('>>> nuxt.config.js / process.env.NUXT_APIVIZ_UUID :\n', process.env.NUXT_APIVIZ_UUID)
console.log('>>> nuxt.config.js / process.env.NUXT_BACKEND_MODE :\n', process.env.NUXT_BACKEND_MODE)

console.log('>>> nuxt.config.js / process.env.NUXT_CONSOLELOG :', process.env.NUXT_CONSOLELOG)
const consoleLogMode = process.env.NUXT_CONSOLELOG || 'prod'
const logAllowed = ['dev', 'preprod']
console.log('>>> nuxt.config.js / consoleLogMode :', consoleLogMode)

export default {
  mode: 'spa',

  // buildDir: 'src', // default : '.nuxt'

  server: {
    // port: 8800, // default: 3000
    // host: 'localhost' // '0.0.0.0', // default: localhost
  },

  /* 
  ** ENV variables
  cf : https://nuxtjs.org/api/configuration-env/
  cf : https://samuelcoe.com/blog/nuxt-dotenv/
  */
  env: {
    // c5efafab-1733-4ad1-9eb8-d529bc87c481 // config SONUM
    // f0a482da-28be-4929-a443-f22ecb03ee68 // config APCIS
    ApivizUUID : process.env.NUXT_APIVIZ_UUID,
    BackendMode : process.env.NUXT_BACKEND_MODE || 'default',
    ConsoleLog: logAllowed.includes(consoleLogMode),
  },

  /*
  ** Router config
  cf : https://nuxtjs.org/api/configuration-router
  */
  router: {
    middleware: [
      'setAppMode',
      'getAppConfig',
    ],
    // scrollBehavior: function (to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },


  /*
  ** Global CSS
  */
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    // 'bulma',
    // CSS file in the project
    // '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  cf : https://nuxtjs.org/api/configuration-plugins
  */
  plugins: [
    // '~/plugins/axios',
    '~/plugins/translate',
    // '~/plugins/checkTokens',
    // '~/plugins/utils',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    // to solve CORS problem
    // '@nuxtjs/proxy',

    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // 'nuxt-fontawesome',
    // 'nuxt-fontawesome', {
    //   imports: [
    //   {
    //     set: '@fortawesome/free-solid-svg-icons',
    //     icons: ['fas']
    //   },
    //   {
    //     set:'@fortawesome/free-brands-svg-icons',
    //     icons: ['fab']
    //   }
  ],

  /*
  ** Axios module configuration (@nuxt/axios)
  */
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  //   // baseURL: '',
  //   debug: true,
  //   retry: {
  //     retries: 0
  //   },
  //   // proxy : true,
  //   credentials: false,
  //   proxyHeaders: false
  // },

  /*
  ** Build configuration
  */
  build: {
    // vendors : [
    //   'axios'
    // ],

    extractCSS: true,
    // postcss: {
    //   preset: {
    //     features: {
    //       customProperties: false
    //     }
    //   }
    // },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
