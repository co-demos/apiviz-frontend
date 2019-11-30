import pkg from './package'

require('dotenv').config()

// console.log('>>> nuxt.config.js / process.env :\n', process.env)
console.log('>>> nuxt.config.js / process.env.NUXT_APIVIZ_UUID : ', process.env.NUXT_APIVIZ_UUID)

const envBackendMode = process.env.NUXT_BACKEND_MODE || 'default'
console.log('>>> nuxt.config.js / process.env.NUXT_BACKEND_MODE : ', envBackendMode)

const envAuthMode = process.env.NUXT_AUTH_MODE || 'default'
console.log('>>> nuxt.config.js / process.env.NUXT_AUTH_MODE : ', envAuthMode)

// const htmlFilesMode = process.env.NUXT_HTML_FILES || 'distant'
// console.log('>>> nuxt.config.js / process.env.NUXT_HTML_FILES : ', htmlFilesMode)

const logAllowed = ['dev', 'preprod']
const consoleLogMode = process.env.NUXT_CONSOLELOG || 'prod'
console.log('>>> nuxt.config.js / process.env.NUXT_CONSOLELOG :', consoleLogMode)

// cf : https://nuxtjs.org/faq/github-pages/
const envApivizRepo = process.env.APIVIZ_REPO || undefined
console.log('>>> nuxt.config.js / process.env.APIVIZ_REPO :', envApivizRepo)
const envDeployEnv = process.env.DEPLOY_ENV || undefined
console.log('>>> nuxt.config.js / process.env.DEPLOY_ENV :', envDeployEnv)
const routerBase = envApivizRepo && envDeployEnv === 'GH_PAGES' ? {
  router: {
    base: envApivizRepo
  }
} : {}

export default {

  mode: 'spa',

  ...routerBase,

  // buildDir: 'src', // default : '.nuxt'

  server: {
    port: 3001, // default: 3000
    // host: 'localhost' // '0.0.0.0', // default: localhost
  },

  /* 
  ** ENV variables
  cf : https://nuxtjs.org/api/configuration-env/
  cf : https://samuelcoe.com/blog/nuxt-dotenv/
  */
  env: {
    // ApivizUUID : "c5efafab-1733-4ad1-9eb8-d529bc87c481", // config SONUM
    // ApivizUUID : "f0a482da-28be-4929-a443-f22ecb03ee68", // config APCIS
    ApivizUUID : process.env.NUXT_APIVIZ_UUID,
    BackendMode : envBackendMode,
    ConsoleLog: logAllowed.includes(consoleLogMode),
    AuthMode : envAuthMode,
    // HtmlFilesMode : htmlFilesMode,
  },

  /*
  ** Router config
  cf : https://nuxtjs.org/api/configuration-router
  */
  router: {
    middleware: [
      'setAppMode',
      'getAppConfig',
      'checkAuth',
      'collapseNavbar',
    ],
    // scrollBehavior: function (to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name + ' v.' + pkg.version,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // ]
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
    {src: '~plugins/vee-validate.js', ssr: false},
    // '~/plugins/axios',
    '~/plugins/translate',
    // '~/plugins/checkTokens',
    // '~/plugins/utils',
    '~/plugins/json-editor',
    // '~/plugins/turf-plugin',
    { src: '~/plugins/mapbox', mode: 'client' },
    { src: '~/plugins/apexCharts', mode: 'client' },
    // { src: '~plugins/full-calendar', ssr: false }
    { src: '~plugins/vue-event-calendar', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

    ['nuxt-validate', {
      // lang: 'es',
      // regular vee-validate options 
    }],

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

    extend(config, { isDev, isClient }) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    },

    vendors : [
      'axios',
      // 'vee-validate',
      'mapbox-gl',
      // 'turf'
    ],

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
