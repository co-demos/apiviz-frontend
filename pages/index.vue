<template>
  <div>

    <!-- NAVBAR -->
    <NavBar 
      v-if="has_navbar"
    ></NavBar>

      <!-- :localRouteConfig="localRouteConfig" -->
      <!-- :logo="globalConfig.app_logo" -->
      <!-- :brand="globalConfig.app_title.content" -->
      <!-- :appLocales="globalConfig.app_languages"  -->
      <!-- :navbarConfig="navbarConfig"  -->



    <!-- BANNER -->
    <DynamicBanner 
      v-if="has_banner"
      :dynamicTemplate="localRouteConfig.dynamic_template"
    ></DynamicBanner> 
      <!-- :template_url="this.getCurrentBanner.template_url" -->


    <!-- REMOTE STATICS -->
    <DynamicStatic 
      v-if=" localRouteConfig.dynamic_template == 'DynamicStatic' "
    ></DynamicStatic>
      <!-- :routeConfig="localRouteConfig" -->

    <!-- LOCAL TEST STATIC -->
    <!-- <DynamicStaticTest 
      v-if="localRouteConfig.dynamic_template == 'DynamicStaticTest' "
    ></DynamicStaticTest> -->




    <!-- DATA VISUALISATION -->
    <DynamicList 
      v-if="localRouteConfig.dynamic_template == 'DynamicList' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicList>

    <!-- <DynamicMap 
      v-if="localRouteConfig.dynamic_template == 'DynamicMap' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicMap> -->

    <DynamicDetail 
      v-if="localRouteConfig.dynamic_template == 'DynamicDetail' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></DynamicDetail>





    <!-- LOGIN/LOGOUT/REGISTER ROUTES -->
    <!-- <LoginScreen 
      v-if="localRouteConfig.dynamic_template == 'Login' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></LoginScreen> -->

    <!-- <LogoutScreen 
      v-if="localRouteConfig.dynamic_template == 'Logout' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></LogoutScreen> -->

    <!-- <RegisterScreen 
      v-if="localRouteConfig.dynamic_template == 'Register' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></RegisterScreen> -->


    <!-- BACKOFFICE ROUTES -->
    <!-- <BackOfficeScreen 
      v-if="localRouteConfig.dynamic_template == 'BackOffice' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></BackOfficeScreen> -->



    <!-- FOOTERS -->
    <Footer 
      v-if="has_footer"
      :footerConfig="footerConfig" 
      :appSocials="socialsConfig" 
    ></Footer>

    <!-- PROJECT's PARTNERS FOOTER -->
    <DynamicStaticRaw 
      v-if="has_credits_footer"
      :templateURL="footerConfig.credits_footer_url"
    ></DynamicStaticRaw>



    <!-- DEBUGGING -->
    <section class="container">
      <div class="container">

        <br><br><br>

        <!-- <h1 class="title">
          apiviz-nuxt
        </h1>
        <h2 class="subtitle">
          Migrating apiviz frontend as SPA Nuxt project
        </h2> -->

        <hr>
        <div>
          (console) log : <code>{{ log }}</code><br>
          <!-- runMode : <code>{{ runMode }}</code><br> -->
          <!-- apivizFrontUUID : <code>{{ apivizFrontUUID }}</code><br> -->
          <!-- rootUrlBackend : <code>{{ rootUrlBackend }}</code><br> -->
          <!-- rootUrlAuth : <code>{{ rootUrlAuth }}</code><br> -->
          <!-- locale : <code>{{ locale }}</code><br> -->
          <!-- <hr> -->
          has_navbar : <code>{{ has_navbar }}</code><br>
          <!-- globalConfig.app_logo : <br><code>{{ globalConfig.app_logo }}</code><br> -->
          has_banner : <code>{{ has_banner }}</code><br>
          <hr>
          <!-- navbarConfig : <br><code>{{ navbarConfig }}</code><br> -->
          <!-- navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br> -->
          <!-- navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br> -->
          <!-- config.socials.app_facebook : <br><code>{{ config.socials.app_facebook }}</code><br> -->
          localRouteConfig.field : <code>{{ localRouteConfig.field }}</code><br> 
          localRouteConfig.dynamic_template : <code>{{ localRouteConfig.dynamic_template }}</code><br> 
          <!-- localRouteConfig : <br><code>{{ localRouteConfig }}</code><br>  -->
          <hr>
          currentDatasetURI : <code>{{ currentDatasetURI }}</code><br> 
          <!-- localEndpointConfig : <code>{{ localEndpointConfig }}</code><br>  -->
          <!-- localFiltersConfig : <br><pre><code>{{ JSON.stringify(localFiltersConfig, null, 1) }}</code></pre><br>  -->
          <hr>
          datasetFilters : <br><pre><code>{{ JSON.stringify(datasetFilters, null, 1) }}</code></pre><br>
          <!-- filterDescriptions : <br><pre><code>{{ JSON.stringify(filterDescriptions, null, 1) }}</code></pre><br> -->
          search.config : <br><pre><code>{{ JSON.stringify(search.config, null, 1) }}</code></pre><br>
          search.question : <br><pre><code>{{ JSON.stringify(search.question, null, 1) }}</code></pre><br>
          search.answer : <br><pre><code>{{ JSON.stringify(search.answer, null, 1) }}</code></pre><br>
          <hr>
          <!-- jwt : <br><code>{{ jwt }}</code><br> -->
          <!-- user : <br><code>{{ user }}</code><br> -->
          <!-- <hr> -->
          <!-- has_footer : <code>{{ has_footer }}</code><br> -->
          <!-- has_credits_footer : <code>{{ has_credits_footer }}</code><br> -->
          <!-- <hr> -->
          <!-- search : <br><code>{{ search }}</code><hr> -->
        </div>
      </div>
    </section>


  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// import Logo from '~/components/Logo.vue'

import NavBar from '~/components/dynamicUx/NavBar.vue';
import Footer from '~/components/dynamicUx/Footer.vue';

import DynamicBanner     from '~/components/dynamicUX/DynamicBanner.vue';
import DynamicStatic     from '~/components/dynamicUX/DynamicStatic.vue';
import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue';
// import DynamicStaticTest from '~/components/dynamicUX/DynamicStaticTest.vue';

import DynamicList       from '~/components/dynamicData/DynamicList.vue';
import DynamicDetail     from '~/components/dynamicData/DynamicDetail.vue';
// import DynamicMap        from '~/components/dynamicData/DynamicMap.vue';

export default {
  
  components: {

    NavBar, 
    Footer, 

    DynamicBanner,
    DynamicStatic, 
    DynamicStaticRaw,
    // DynamicStaticTest,

    DynamicList, 
    DynamicDetail,
    // DynamicMap, 

    // LoginScreen,
    // LogoutScreen,
    // RegisterScreen,

    // BackOfficeScreen
  },

  middleware : [
    'getRouteConfig',
  ],

  beforeMount : function(){
    // this.log && console.log('\nP-index.vue / beforeMount...')
    // this.log && console.log('P-index.vue / beforeMount / this.globalConfig : ', this.globalConfig)
    // this.log && console.log('P-index.vue / beforeMount / this.localRouteConfig : ', this.localRouteConfig)
  },

  data () {
    return {
      // localRouteConfig : undefined,
      // localEndpointConfig : undefined,
      // localFiltersConfig : undefined,
      // currentDatasetURI : undefined,
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

      has_navbar : 'config/hasNavbar',
      has_footer : 'config/hasFooter',
      has_credits_footer : 'config/hasCreditsFooter',
      has_banner : 'config/hasBanner',
      footerConfig : 'config/getFooterConfig',
      socialsConfig : 'config/getSocialsConfig',
    }),

  },

  methods: {

  }

}
</script>

<style>

</style>
