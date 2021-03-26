<template>

  <div
    id="mainIndexPage"
    >
    <!-- :class="`${ onlyIframe ? 'iframe' : '' }`" -->

    <!-- NAVBAR -->
    <Navbar
      v-if="has_navbar && !onlyIframe"
    ></Navbar>

    <!-- BANNER -->
    <DynamicBanner
      v-if="has_banner && !onlyIframe"
      :dynamicTemplate="localRouteConfig.dynamic_template"
    ></DynamicBanner>

    <!-- TABS -->
    <DynamicTabs
      v-if="has_tabs"
      :skipNavbar="has_navbar"
      :tabsUri="localRouteConfig.tabs_uri"
    ></DynamicTabs>


    <!-- REMOTE STATICS -->
    <div v-if="localRouteConfig.dynamic_template == 'DynamicStatic' "><style>

      .img-mini{
        max-width: 120px;
        height: auto;
      }
      .img-medium{
        max-width: 250px;
        height: auto;
      }
      .img-large{
        max-width: 400px;
        height: auto;
      }
      figure {
        margin: auto;
      }
      .is-horizontal-center {
        justify-content: center;
      }

      .top-section{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:5em 0 3em 0 ;
      }

    </style>

    <main id="home">
      <!-- TITLE + SEARCH FORM -->
      <section id="top" class="hero primary-bg">
        <div class="background columns is-centered top-section">
          <div class="column is-8">
            <br>
            <h1 class="title is-1 has-text-centered">
              Explorez les données financières des entreprises françaises
            </h1>
            <form action="/recherche" method="GET" class="columns">
              <div class="column is-9">
                <div class="control has-icons-left is-large">
                  <input type="search" name="text" class="input is-large" placeholder="Cherchez une entreprise par son nom">
                  <span class="icon is-left">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
              <div class="column is-3 is-hidden-mobile">
                <button class="button is-fullwidth is-primary is-primary-b is-outlined is-large" style="padding-left: 0;" type="submit">
                  <span class="is-hidden-touch" style="padding-left:0.7em;">
                    Rechercher
                  </span>
                  <span class="icon is-hidden-desktop">
                    <i class="fas fa-search"></i>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- TEXTS -->
      <section class="container">

        <div class="columns is-centered">
          <div class="column is-8 content">
            <div class="has-text-centered content is-horizontal-center">
              <figure class="image img-large is-inline-block">
                <img src="/favicon.ico" alt="Main logo" style="width:50%">
              </figure>
            </div>
            <p>
              <a href="/">OpenCompaniesData</a> est un outil de datavisualisation de la base de données <a href="https://www.enthic.fr">Enthic</a> qui contient des données sur plus de 1,6 millions d'entreprises françaises : bénéfice, chiffre d'affaires, salaire, cotisations sociales, prime participation, effectif, impôt, et plus encore (tous les détails d'un compte de résultat en fait).
            </p>
            <p>
              Nous avons monté ce projet libre et ouvert, et nous le réalisons bénévolement sur notre temps libre, car nous pensons que ces données doivent être facilement accessible et compréhensible par tous, pour mieux comprendre qui crée la richesse en France, qui touche des subventions de la France, qui paye des impôts en France, et d'autres question de ce genre que plein de citoyen⋅nes et consommateur/rices français⋅ses se posent.
            </p>
          </div>
        </div>
      </section>

      <!-- LOGOS PARTNERS -->
      <section class="container">
        <div class="columns is-centered">
          <div class="column is-10 content">
            <h2 class="has-text-centered">
              L'écosystème
            </h2>
            <hr>
            <div class="columns is-centered is-multiline">
              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                  <a href="https://www.enthic.fr"><img src="/favicon.ico" alt="logo Enthic" style="width:50%"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                <a href="https://dataforgood.fr/"><img src="https://dataforgood.fr/img/logo-white.png" alt="logo Data for Good" style="width:50%"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                <a href="https://www.latitudes.cc/"><img src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1127947/94d0886c-2247-43ea-9bc2-857fb3299d69_yd1kkl.png" alt="logo Latitudes" style="width:70%"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                <a href="https://codefor.fr/"><img src="https://fork.osp.cat/uploads/decidim/organization/logo/1/medium_logo-code-for-france-alpha-gray.png" alt="logo Code For France"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                  <a href="https://wexample.com/"><img src="https://wexample.com/wp-content/uploads/2019/08/header-site-web-v3.png" alt="Logo Wexample"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                  <a href="https://apiviz.io/"><img src="https://raw.githubusercontent.com/co-demos/apiviz-frontend/master/static/logos/logo_apiviz_15.png" alt="Logo ApiViz"></a>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main></div>
    <!-- LOCAL TEST STATIC -->
    <!-- <DynamicStaticTest
      v-if="localRouteConfig.dynamic_template == 'DynamicStaticTest' "
    ></DynamicStaticTest> -->


    <!-- DATA VISUALISATION -->
    <DynamicTable
      v-if="localRouteConfig.dynamic_template == 'DynamicTable' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicTable>

    <DynamicList
      v-if="localRouteConfig.dynamic_template == 'DynamicList' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicList>

    <DynamicMap
      v-if="localRouteConfig.dynamic_template == 'DynamicMap' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicMap>

    <DynamicDetail
      v-if="localRouteConfig.dynamic_template == 'DynamicDetail' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></DynamicDetail>

    <DynamicStats
      v-if="localRouteConfig.dynamic_template == 'DynamicStats' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></DynamicStats>

    <DynamicCalendar
      v-if="localRouteConfig.dynamic_template == 'DynamicCalendar' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicCalendar>

    <!-- FOOTERS -->
    <Footer
      v-if="has_footer && !onlyIframe"
    ></Footer>

    <!-- PROJECT's PARTNERS FOOTER -->
    <DynamicStaticRaw
      v-if="has_credits_footer && !onlyIframe"
      :templateURL="footerConfig.credits_footer_url"
    ></DynamicStaticRaw>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import Navbar from '~/components/dynamicUX/Navbar.vue'
import Footer from '~/components/dynamicUX/Footer.vue'

import DynamicTabs       from '~/components/dynamicUX/DynamicTabs.vue'

import DynamicBanner     from '~/components/dynamicUX/DynamicBanner.vue'
import DynamicStatic     from '~/components/dynamicUX/DynamicStatic.vue'
import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'
// import DynamicStaticTest from '~/components/dynamicUX/DynamicStaticTest.vue'

import DynamicTable      from '~/components/dynamicData/DynamicTable.vue';
import DynamicList       from '~/components/dynamicData/DynamicList.vue';
import DynamicDetail     from '~/components/dynamicData/DynamicDetail.vue';
import DynamicMap        from '~/components/dynamicData/DynamicMap.vue';
import DynamicStats      from '~/components/dynamicData/DynamicStats.vue';
import DynamicCalendar   from '~/components/dynamicData/DynamicCalendar.vue';

import { responsiveBreakpoint, findBulmaBreakpointByWidth } from "~/config/constants.js"


export default {

  head(){

    let global = this.globalConfig

    return {
      title: global.app_title.content,
      // meta: [

      // ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: global.app_favicon.url },
        { rel: 'icon', href: global.app_favicon.url, sizes: '32x32' },
      ],
    }
  },

  components: {

    Navbar,
    Footer,

    DynamicTabs,

    DynamicBanner,
    DynamicStatic,
    DynamicStaticRaw,
    // DynamicStaticTest,

    DynamicTable,
    DynamicList,
    DynamicDetail,
    DynamicMap,
    DynamicStats,
    DynamicCalendar,

  },

  middleware : [
    // 'getRouteConfig',
  ],

  // created() {
  //   window.addEventListener("resize", this.winBreakpoint)
  //   this.winBreakpoint()
  // },

  // destroyed() {
  //   window.removeEventListener("resize", this.winBreakpoint)
  // },


  beforeMount : function(){
    // this.log && console.log('\nP-index.vue / beforeMount...')
    // this.log && console.log('P-index.vue / beforeMount / this.globalConfig : ', this.globalConfig)
    // this.log && console.log('P-index.vue / beforeMount / this.localRouteConfig : ', this.localRouteConfig)

    // this.log && console.log(" - - DynamicDetail / mounted / this.$nuxt.$route : ", this.$nuxt.$route )
    if (this.$nuxt.$route.query.iframing) {
      this.onlyIframe = true
    }

  },

  data () {
    return {
      // windowBreakpoint : undefined,
      onlyIframe : false,
    }
  },

  computed: {

    ...mapState({

      log : state => state.log,

      apivizFrontUUID : state => state.apivizFrontUUID,
      runMode : state => state.runMode,
      rootUrlBackend : state => state.rootUrlBackend,
      rootUrlAuth : state => state.rootUrlAuth,
      locale : state => state.locale,

      breakpoint : state => state.breakpoint,

      // config : state => state.config.config,
      localRouteConfig : state => state.config.localRouteConfig,
      // globalConfig : state => state.config.global,

      search : state => state.search.search,
      filterDescriptions : state => state.search.filterDescriptions,
      datasetFilters : state => state.search.datasetFilters,

      user : state => state.user.user,
      jwt : state => state.user.jwt

    }),

    ...mapGetters({

      globalConfig : 'config/getGlobalConfig',

      localEndpointConfig : 'config/getLocalEndpointConfig',
      localFiltersConfig : 'config/getLocalFiltersConfig',
      currentDatasetURI : 'config/getCurrentDatasetURI',

      footerConfig : 'config/getFooterConfig',

      has_navbar : 'config/hasNavbar',
      has_footer : 'config/hasFooter',
      has_credits_footer : 'config/hasCreditsFooter',
      has_banner : 'config/hasBanner',
      has_tabs : 'config/hasTabs',

    }),

    // winBreakpoint() {
    //   var w = window.innerWidth
    //   return findBulmaBreakpointByWidth(w)
    // },

  },

  methods: {

    // winWidth() {
    //   var w = window.innerWidth
    //   if (w < responsiveBreakpoint) {
    //     this.smallButtons = true
    //   } else {
    //     this.smallButtons = false
    //   }
    // },

    // winBreakpoint() {
    //   var w = window.innerWidth
    //   let breakpoint = findBulmaBreakpointByWidth(w)
    //   // this.windowBreakpoint = breakpoint
    //   this.$store.commit('setBreakpoint', breakpoint)
    // },


  }

}
</script>

<style>

</style>
