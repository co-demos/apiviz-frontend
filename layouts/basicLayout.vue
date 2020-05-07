<template>
  <div>

    <nuxt />

    <DynamicStaticRaw 
      :templateURL="'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html'"
      >
    </DynamicStaticRaw>

  </div>
</template>



<script>

import { mapState, mapGetters } from 'vuex'

import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'

import { responsiveBreakpoint, findBulmaBreakpointByWidth } from "~/config/constants.js" 

export default {
  
  components: {
    DynamicStaticRaw,
  },

  head(){ 
    
    return {
      title: 'ApiViz',
      // meta: [

      // ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: global.app_favicon.url },
        { rel: 'icon', href: '/logos/logo_apiviz_icon_15.png', sizes: '21x32' },
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
    }
  },

  computed: {

    ...mapState({
      isIframe : state => state.isIframe,
    }),

    ...mapGetters({
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
