<template>
  <div>


    <nuxt />

    <!-- CREDITS CODEMOS / REMOTE FOOTER -->
    <DynamicStaticRaw 
      :templateURL="codemosCreditsUrls[locale]"
    ></DynamicStaticRaw>


    <DynamicCSS/>


    <!-- DEBUGGING COLORS -->
    <!-- <span class="has-text-primary has-text-primary-c"> 
      COLOR TEST PRIMARY
    </span><br>
    <span class="has-text-info has-text-info-c"> 
      COLOR TEST INFO
    </span><br>
    <a> 
      COLOR TEST LINK
    </a><br>

    <a class="button is-primary is-primary-b">
      COLOR TEST BTN PRIMARY
    </a><br>

    <a class="button is-primary is-outlined is-primary-b">
      COLOR TEST BTN PRIMARY outlined
    </a><br> -->


  </div>
</template>



<script>

import { mapState, mapGetters } from 'vuex'

import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'
import DynamicCSS  from '~/components/dynamicUX/DynamicCSS.vue'

import { responsiveBreakpoint, findBulmaBreakpointByWidth } from "~/config/constants.js" 

export default {
  
  middleware : [
    'getRouteConfig',
  ] ,

  components: {
    DynamicStaticRaw,
    DynamicCSS
  },

  head(){ 
    
    let global = this.globalConfig

    return {
      title: global.app_title.content || 'apiviz...',
      // meta: [

      // ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: global.app_favicon.url },
        { rel: 'icon', href: global.app_favicon.url, sizes: '32x32' },
      ],
    }
  },

  created() {
    window.addEventListener("resize", this.winBreakpoint)
    this.winBreakpoint()
  },

  destroyed() {
    window.removeEventListener("resize", this.winBreakpoint)
  },

  data () {
    return {
      codemosCreditsUrls : {
        fr : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer.html',
        en : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
        es : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
        de : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
        tr : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
      },
    }
  },

  computed: {

    ...mapState({
      // locale : state => state.locale,
    }),

    ...mapGetters({
      locale : 'getCurrentLocale',
      globalConfig : 'config/getGlobalConfig',
      // styles : 'config/getStylesConfig',
      // appColors : 'config/getStylesConfigColors',
      // appTypoColors : 'config/getStylesConfigColorsTypo',

    })
  },

  methods: {

    winBreakpoint() {
      var w = window.innerWidth
      let breakpoint = findBulmaBreakpointByWidth(w)
      // this.windowBreakpoint = breakpoint
      this.$store.commit('setBreakpoint', breakpoint)
    },

  }

}

</script>




<style>

</style>
