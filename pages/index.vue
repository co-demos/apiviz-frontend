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
                  <input type="search" name="text" class="input is-large" placeholder="Cherchez un lieu de médiation numérique">
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
                <img src="https://www.enthic.fr/favicon.ico" alt="Placeholder image">
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
                  <a href="https://www.enthic.fr"><img src="https://www.enthic.fr/favicon.ico" alt="logo Enthic"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                <a href="https://codefor.fr/"><img src="https://fork.osp.cat/uploads/decidim/organization/logo/1/medium_logo-code-for-france-alpha-gray.png" alt="logo Code For France"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                  <a href="https://apiviz.io/"><img src="https://raw.githubusercontent.com/co-demos/apiviz-frontend/master/static/logos/logo_apiviz_15.png" alt="Logo ApiViz"></a>
                </figure>
              </div>

              <div class="column is-3 content is-horizontal-center">
                <figure class="image img-mini is-inline-block">
                  <a href="https://wexample.com/"><img src="https://wexample.com/wp-content/uploads/2019/08/header-site-web-v3.png" alt="Logo Wexample"></a>
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

    <!-- <span class="is-primary is-primary-c">
      COLOR TEST
    </span> -->
<!--
    <div>
      breakpoint : <code>{{ breakpoint }}</code>
    </div> -->

    <!-- FOOTERS -->
    <Footer
      v-if="has_footer && !onlyIframe"
    ></Footer>

    <!-- PROJECT's PARTNERS FOOTER -->
    <DynamicStaticRaw
      v-if="has_credits_footer && !onlyIframe"
      :templateURL="footerConfig.credits_footer_url"
    ></DynamicStaticRaw>

    <!-- DEBUGGING -->
    <!-- <section class="container"> -->
      <!-- <div class="container"> -->

        <!-- <br><br><br> -->

        <!-- <hr> -->
        <!-- <div> -->

          <!-- (console) log : <code>{{ log }}</code><br> -->
          <!-- runMode : <code>{{ runMode }}</code><br> -->
          <!-- apivizFrontUUID : <code>{{ apivizFrontUUID }}</code><br> -->
          <!-- rootUrlBackend : <code>{{ rootUrlBackend }}</code><br> -->
          <!-- rootUrlAuth : <code>{{ rootUrlAuth }}</code><br> -->
          <!-- locale : <code>{{ locale }}</code><br> -->
          <!-- <hr> -->
          <!-- has_navbar : <code>{{ has_navbar }}</code><br> -->
          <!-- globalConfig.app_logo : <br><code>{{ globalConfig.app_logo }}</code><br> -->
          <!-- has_banner : <code>{{ has_banner }}</code><br> -->
          <!-- <hr> -->
          <!-- navbarConfig : <br><code>{{ navbarConfig }}</code><br> -->
          <!-- navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br> -->
          <!-- navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br> -->
          <!-- config.socials.app_facebook : <br><code>{{ config.socials.app_facebook }}</code><br> -->
          <!-- localRouteConfig.field : <code>{{ localRouteConfig.field }}</code><br>  -->
          <!-- localRouteConfig.dynamic_template : <code>{{ localRouteConfig.dynamic_template }}</code><br>  -->
          <!-- localRouteConfig : <br><code>{{ localRouteConfig }}</code><br>  -->

          <!-- <hr> -->

          <!-- currentDatasetURI : <code>{{ currentDatasetURI }}</code><br>  -->
          <!-- localEndpointConfig : <code>{{ localEndpointConfig }}</code><br>  -->
          <!-- localFiltersConfig : <br><pre><code>{{ JSON.stringify(localFiltersConfig, null, 1) }}</code></pre><br>  -->

          <!-- <hr> -->

          <!-- datasetFilters : <br><pre><code>{{ JSON.stringify(datasetFilters, null, 1) }}</code></pre><br> -->

          <!-- filterDescriptions : <br><pre><code>{{ JSON.stringify(filterDescriptions, null, 1) }}</code></pre><br> -->
          <!-- search.dataset_uri : <code>{{ search.dataset_uri }}</code><br>  -->
          <!-- search.endpoint_type : <code>{{ search.endpoint_type }}</code><br>  -->
          <!-- search.endpoint : <br><pre><code>{{ JSON.stringify(search.endpoint, null, 1) }}</code></pre><br>  -->


          <!-- search.config : <br><pre><code>{{ JSON.stringify(search.config, null, 1) }}</code></pre><br> -->
          <!-- search.question : <br><pre><code>{{ JSON.stringify(search.question, null, 1) }}</code></pre><br> -->
          <!-- search.answer.result.total : <code>{{ search.answer.result ? search.answer.result.total : "nothing yet" }}</code><br> -->
          <!-- search.answer : <br><pre><code>{{ JSON.stringify(search.answer, null, 1) }}</code></pre><br> -->

          <!-- <hr> -->

          <!-- jwt : <br><code>{{ jwt }}</code><br> -->
          <!-- user : <br><code>{{ user }}</code><br> -->
          <!-- <hr> -->
          <!-- has_footer : <code>{{ has_footer }}</code><br> -->
          <!-- has_credits_footer : <code>{{ has_credits_footer }}</code><br> -->
          <!-- <hr> -->
          <!-- search : <br><code>{{ search }}</code><hr> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </section> -->



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
