<template>
  <div>

    <!-- NAVBAR -->
    <Navbar 
      v-if="has_navbar"
    ></Navbar>

    <!-- PREFERENCES ROUTES -->
    <PreferencesScreen 
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></PreferencesScreen>

    <!-- FOOTERS -->
    <Footer 
      v-if="has_footer"
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

import Navbar from '~/components/dynamicUX/Navbar.vue';
import Footer from '~/components/dynamicUX/Footer.vue';

import PreferencesScreen  from '~/components/userUX/PreferencesScreen.vue';
import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'


export default {

  components: {
    Navbar, 
    Footer, 
    PreferencesScreen,
    DynamicStaticRaw
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
      breakpoint : state => state.breakpoint,

      localRouteConfig : state => state.config.localRouteConfig,

      search : state => state.search.search,
      filterDescriptions : state => state.search.filterDescriptions,
      datasetFilters : state => state.search.datasetFilters,

      user : state => state.user.user,
      jwt : state => state.user.jwt

    }),

    ...mapGetters({

      // globalConfig : 'config/getGlobalConfig',

      localEndpointConfig : 'config/getLocalEndpointConfig',
      localFiltersConfig : 'config/getLocalFiltersConfig',
      currentDatasetURI : 'config/getCurrentDatasetURI',
      footerConfig : 'config/getFooterConfig',

      has_navbar : 'config/hasNavbar',
      has_footer : 'config/hasFooter',
      has_credits_footer : 'config/hasCreditsFooter',
      has_banner : 'config/hasBanner',

    }),

  },

  methods: {

  }

}
</script>

<style>

</style>
