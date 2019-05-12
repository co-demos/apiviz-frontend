<template>
  <div>

    <h1 class="title">
      apiviz-nuxt
    </h1>
    <h2 class="subtitle">
      Migrating apiviz frontend as SPA Nuxt project
    </h2>

    <!-- DEBUGGING -->
    <hr>
    <div>
      runMode : <code>{{ runMode }}</code><br>
      apivizFrontUUID : <code>{{ apivizFrontUUID }}</code><br>
      rootUrlBackend : <code>{{ rootUrlBackend }}</code><br>
      rootUrlAuth : <code>{{ rootUrlAuth }}</code><br>
      locale : <code>{{ locale }}</code><br>
      <hr>
      localRouteConfig : <br><code>{{ localRouteConfig }}</code><br>
      config.socials.app_facebook : <br><code>{{ config.socials.app_facebook }}</code><br>
      <hr>
      jwt : <br><code>{{ jwt }}</code><br>
      user : <br><code>{{ user }}</code><br>
      <hr>
      has_footer : <code>{{ has_footer }}</code><br>
      <hr>
      <!-- search : <br><code>{{ search }}</code><hr> -->
    </div>


  <!-- FOOTERS -->
  <Footer 
    v-if="has_footer"
    :footerConfig="footerConfig" 
    :appSocials="socialsConfig" 
  ></Footer>

  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

// import Logo from '~/components/Logo.vue'

// import NavBar from '~/components/dynamicUx/NavBar.vue';
import Footer from '~/components/dynamicUx/Footer.vue';

// import DynamicBanner     from '~/components/dynamicUX/DynamicBanner.vue';
// import DynamicStatic     from '~/components/dynamicUX/DynamicStatic.vue';
// import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue';
// import DynamicStaticTest from '~/components/dynamicUX/DynamicStaticTest.vue';

// import DynamicList       from '~/components/dynamicData/DynamicList.vue';
// import DynamicMap        from '~/components/dynamicData/DynamicMap.vue';
// import DynamicDetail     from '~/components/dynamicData/DynamicDetail.vue';

export default {
  
  components: {

    // NavBar, 
    Footer, 

    // DynamicBanner,
    // DynamicStatic, 
    // DynamicStaticRaw,
    // DynamicStaticTest,
    // DynamicList, 
    // DynamicMap, 
    // DynamicDetail,

    // LoginScreen,
    // LogoutScreen,
    // RegisterScreen,

    // BackOfficeScreen
  },

  middleware : [
    'getRouteConfig',
  ],

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

      apivizFrontUUID : state => state.apivizFrontUUID,
      runMode : state => state.runMode ,
      rootUrlBackend : state => state.rootUrlBackend,
      rootUrlAuth : state => state.rootUrlAuth,
      locale : state => state.locale,

      config : state => state.config.config,
      localRouteConfig : state => state.config.localRouteConfig,

      search : state => state.search.search,

      user : state => state.user.user,
      jwt : state => state.user.jwt

    }),

    ...mapGetters({
      has_footer : 'config/hasFooter',
      footerConfig : 'config/getFooterConfig',
      socialsConfig : 'config/getSocialsConfig',
    }),

    // // SWITCHERS
    // has_footer(){      
    //   return (this.localRouteConfig) ? this.localRouteConfig.has_footer : undefined 
    // },
    // footerConfig(){
    //   return this.$store.getters.getFooterConfig
    // },

  },

  methods: {



  }

}
</script>

<style>

</style>
