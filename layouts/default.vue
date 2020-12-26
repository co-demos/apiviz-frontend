<template>
  <div>
    <!-- Page content -->
    <nuxt />

    <!-- Footer under the footer -->
    <footer class="footer extra-footer" style="padding:0px 0px 0px 0px">
      <div class="content has-text-centered has-text-white has-background-grey-dark" style="padding:7px 0px 7px 0px">
        <p>
          Propulsé par
          <strong><a href="https://www.enthic.fr/" style="text-decoration:underline; color:white">
            Enthic
          </a></strong>
        </p>
      </div>
    </footer>
    <DynamicCSS/>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import DynamicCSS  from '~/components/dynamicUX/DynamicCSS.vue'

import { responsiveBreakpoint, findBulmaBreakpointByWidth } from "~/config/constants.js"

export default {

  middleware : [
    'getRouteConfig',
  ] ,

  components: {
    DynamicCSS
  },

  head(){

    let global = this.globalConfig

    return {
      title: global.app_title.content || 'apiviz...',
      link: [
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

  computed: {

    ...mapState({
      // locale : state => state.locale,
    }),

    ...mapGetters({
      locale : 'getCurrentLocale',
      globalConfig : 'config/getGlobalConfig'
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

<style lang="css">
.extra-footer {
  color : #ffffff;
  padding-top : 10px ;
  padding-bottom : 10px;
  a {
    color : white;
  }
}
</style>
