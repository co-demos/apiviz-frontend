<template>
  <div>

    <!-- NAVBAR -->
    <NavBar 
      v-if="has_navbar"
    ></NavBar>


    <!-- BACKOFFICE ROUTES -->
      <!-- v-if="localRouteConfig.dynamic_template == 'Preferences' " -->
    <PreferencesScreen 
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></PreferencesScreen>


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



  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// default nuxt boilerplate ....
// import Logo from '~/components/Logo.vue'

import NavBar from '~/components/dynamicUx/NavBar.vue';
import Footer from '~/components/dynamicUx/Footer.vue';

import PreferencesScreen  from '~/components/UserUX/PreferencesScreen.vue';


export default {
  
  components: {
    NavBar, 
    Footer, 
    PreferencesScreen
  },

  middleware : [
    'getRouteConfig',
    'checkUser',
  ],

  beforeMount : function(){
    // this.log && console.log('\nP-Preferences-index.vue / beforeMount...')
    // this.log && console.log('P-Preferences-index.vue / beforeMount / this.globalConfig : ', this.globalConfig)
    // this.log && console.log('P-Preferences-index.vue / beforeMount / this.localRouteConfig : ', this.localRouteConfig)
  },

  data () {
    return {
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
