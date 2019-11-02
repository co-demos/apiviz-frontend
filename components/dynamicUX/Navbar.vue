<template>
  <nav 
    :class="`navbar is-fixed-top ${ navbarConfig.ui_options.background_color.bulma_color ? 'is-'+navbarConfig.ui_options.background_color.bulma_color : 'is-white'} has-bottom-border `"
    role="navigation" 
    aria-label="main navigation"
    >
        
    <Brand 
      :logoTo="navbarConfig.logo_to"
    ></Brand>

    <!-- DEBUGGING -->
    <!-- navbarConfig : <code>{{ navbarConfig }}</code> -->
    <!-- currentRouteConfig : <code>{{ currentRouteConfig.field }}</code> -->
  
      <!-- :NavbarConfig="navbarConfig" -->
    <NavbarContent 
      :localRouteConfig="localRouteConfig"
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

  data () {
    return {
    }
  },

  computed: {

    ...mapState({
      // localRouteConfig : state => state.config.localRouteConfig,
      log : state => state.log, 
      breakpoint : state => state.breakpoint,
      // user: state => state.user.user
    }),

    ...mapGetters({
      navbarConfig : 'config/getNavbarConfig',
      localRouteConfig : 'config/getLocalRouteConfig',
    }),
    
  },

}
</script>

<style>
nav {
  height: 60px;
  z-index: 10;
}
</style>