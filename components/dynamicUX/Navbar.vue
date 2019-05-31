<template>
  <nav 
    :class="`navbar is-fixed-top ${ navbarConfig.ui_options.background_color.bulma_color ? 'is-'+navbarConfig.ui_options.background_color.bulma_color : 'is-white'} has-bottom-border `"
    role="navigation" 
    aria-label="main navigation"
    >


    <div class="container">
        
      <Brand 
        :logoTo="navbarConfig.logo_to"
      ></Brand>

      <!-- DEBUGGING -->
      <!-- navbarConfig : <code>{{ navbarConfig }}</code> -->
      <!-- currentRouteConfig : <code>{{ currentRouteConfig.field }}</code> -->
    
        <!-- :NavbarConfig="navbarConfig" -->
      <NavBarContent 
        :localRouteConfig="localRouteConfig"
      ></NavBarContent>

    </div>


  </nav>
</template>

<script>
import Brand from './Brand.vue';
import NavBarContent from './NavbarContent.vue';
import { mapState, mapGetters } from 'vuex';

export default {

  components: {
    Brand,
    NavBarContent
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