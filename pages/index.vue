<template>
  <div>



    <!-- DEBUGGING -->
    <section class="container">
      <div class="container">
        <br><br><br>
        <h1 class="title">
          apiviz-nuxt
        </h1>
        <h2 class="subtitle">
          Migrating apiviz frontend as SPA Nuxt project
        </h2>

        <hr>
        <div>
          <!-- runMode : <code>{{ runMode }}</code><br> -->
          <!-- apivizFrontUUID : <code>{{ apivizFrontUUID }}</code><br> -->
          <!-- rootUrlBackend : <code>{{ rootUrlBackend }}</code><br> -->
          <!-- rootUrlAuth : <code>{{ rootUrlAuth }}</code><br> -->
          <!-- locale : <code>{{ locale }}</code><br> -->
          <hr>
          has_navbar : <code>{{ has_navbar }}</code><br>
          globalConfig.app_logo : <br><code>{{ globalConfig.app_logo }}</code><br>
          navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br>
          navbarConfig : <br><code>{{ navbarConfig }}</code><br>
          navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br>
          <!-- config.socials.app_facebook : <br><code>{{ config.socials.app_facebook }}</code><br> -->
          localRouteConfig : <br><code>{{ localRouteConfig }}</code><br> 
          <hr>
          <!-- jwt : <br><code>{{ jwt }}</code><br> -->
          <!-- user : <br><code>{{ user }}</code><br> -->
          <hr>
          <!-- has_footer : <code>{{ has_footer }}</code><br> -->
          <!-- has_credits_footer : <code>{{ has_credits_footer }}</code><br> -->
          <hr>
          <!-- search : <br><code>{{ search }}</code><hr> -->
        </div>
      </div>
    </section>


    <!-- NAVBAR -->
    <NavBar 
      v-if="has_navbar"
      :navbarConfig="navbarConfig" 
      :logo="globalConfig.app_logo"
      :brand="globalConfig.app_title.content"
      :appLocales="globalConfig.app_languages" 
      :localRouteConfig="localRouteConfig"
    ></NavBar>



    <!-- BANNER -->
    <!-- <DynamicBanner 
      v-if="has_banner"
      :template_url="this.getCurrentBanner.template_url"
      :dynamicTemplate="localRouteConfig.dynamic_template"
    ></DynamicBanner>  -->



    <!-- REMOTE STATICS -->
    <!-- <DynamicStatic 
      v-if="localRouteConfig.dynamic_template == 'DynamicStatic' "
      :routeConfig="localRouteConfig"
    ></DynamicStatic> -->

    <!-- LOCAL TEST STATIC -->
    <!-- <DynamicStaticTest 
      v-if="localRouteConfig.dynamic_template == 'DynamicStaticTest' "
    ></DynamicStaticTest> -->


    <!-- DATA VISUALISATION -->
    <!-- <DynamicList 
      v-if="localRouteConfig.dynamic_template == 'DynamicList' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicList> -->

    <!-- <DynamicMap 
      v-if="localRouteConfig.dynamic_template == 'DynamicMap' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicMap> -->

    <!-- <DynamicDetail 
      v-if="localRouteConfig.dynamic_template == 'DynamicDetail' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></DynamicDetail> -->



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

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// import Logo from '~/components/Logo.vue'

import NavBar from '~/components/dynamicUx/NavBar.vue';
import Footer from '~/components/dynamicUx/Footer.vue';

// import DynamicBanner     from '~/components/dynamicUX/DynamicBanner.vue';
// import DynamicStatic     from '~/components/dynamicUX/DynamicStatic.vue';
import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue';
// import DynamicStaticTest from '~/components/dynamicUX/DynamicStaticTest.vue';

// import DynamicList       from '~/components/dynamicData/DynamicList.vue';
// import DynamicMap        from '~/components/dynamicData/DynamicMap.vue';
// import DynamicDetail     from '~/components/dynamicData/DynamicDetail.vue';

export default {
  
  components: {

    NavBar, 
    Footer, 

    // DynamicBanner,
    // DynamicStatic, 
    DynamicStaticRaw,
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
  beforeMount : function(){
    console.log('beforeMount / this.globalConfig : ', this.globalConfig)
    console.log('beforeMount / this.localRouteConfig : ', this.localRouteConfig)
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

      apivizFrontUUID : state => state.apivizFrontUUID,
      runMode : state => state.runMode ,
      rootUrlBackend : state => state.rootUrlBackend,
      rootUrlAuth : state => state.rootUrlAuth,
      locale : state => state.locale,

      config : state => state.config.config,
      localRouteConfig : state => state.config.localRouteConfig,
      // globalConfig : state => state.config.global,

      search : state => state.search.search,

      user : state => state.user.user,
      jwt : state => state.user.jwt

    }),

    ...mapGetters({

      globalConfig : 'config/getGlobalConfig',

      has_navbar : 'config/hasNavbar',
      navbarConfig : 'config/getNavbarConfig',

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
