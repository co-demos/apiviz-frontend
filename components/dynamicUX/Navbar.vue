<template>
  <nav 
    :class="`navbar is-fixed-top ${ shrinkNav ? 'navbar--shrink' : '' } ${ navbarColor ? 'is-'+navbarColor + ' is-'+navbarColor+'-b-only' : 'is-white'} has-bottom-border `"
    role="navigation" 
    aria-label="main navigation"
    >
        
    <Brand 
    ></Brand>
      <!-- :logoTo="navbarConfig.logo_to" -->

    <!-- DEBUGGING -->
    <!-- navbarConfig : <code>{{ navbarConfig }}</code> -->
    <!-- currentRouteConfig : <code>{{ currentRouteConfig.field }}</code> -->
    <!-- <p> shrinkNav : {{shrinkNav }} </p> -->
  

    <!-- :NavbarConfig="navbarConfig" -->
    <NavbarContent 
      :localRouteConfig="localRouteConfig"
      :isDark="navbarConfig.ui_options.background_isdark"
    ></NavbarContent>

  </nav>
</template>

<script>
import Brand from './Brand.vue';
import NavbarContent from './NavbarContent.vue'
import { mapState, mapGetters } from 'vuex'

export default {

  name: 'Navbar',

  components: {
    Brand,
    NavbarContent
  },
  
  props: [
  ],

  beforeMount : function(){
    // this.log && console.log('\nC-Navbar / beforeMount...')
    // console.log('Navbar / beforeMount / this.navbarConfig : ', this.navbarConfig)
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },

  data () {
    return {
      shrinkNav : false,
      lastScrollPosition: 0
    }
  },

  computed: {

    ...mapState({
      // localRouteConfig : state => state.config.localRouteConfig,
      log : state => state.log, 
      breakpoint : state => state.breakpoint,
      shrinkOffset : state => state.shrinkOffset,
      // user: state => state.user.user
    }),

    ...mapGetters({
      navbarConfig : 'config/getNavbarConfig',
      localRouteConfig : 'config/getLocalRouteConfig',
    }),

    navbarColor(){
      return this.navbarConfig.ui_options.background_color.bulma_color
    },


  },


  methods: {

    onScroll () {

      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      
      if (currentScrollPosition < 0) {
        return
      }  // Stop executing this function if the difference between
      
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < this.shrinkOffset ) {
        return
      }
      
      this.shrinkNav = currentScrollPosition > this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition

      // set store value for other components to use
      this.$store.commit('setShrinkNav', this.shrinkNav )

    }
  },

}
</script>

<style lang="scss" scoped>

  @import '../../assets/css/apiviz-misc.scss';

  nav {
    max-height: $apiviz-navbar-height ;
    transition: max-height 0.4s ease-out;
    z-index: 10;
  }
  nav.navbar--shrink {
    min-height: $apiviz-navbar-min-height-shrink !important ;
    max-height: $apiviz-navbar-height-shrink !important ;
    transition: max-height 0.4s ease-out;
  }

</style>