<template>

  <div class="navbar-brand" :title="brand">

      <nuxt-link 	
        id="logo_home"
        class="navbar-item" 
        :to="logoTo">
        <img 
            id="navbar-logo" 
            :src="logo.url"
            :alt="'Logo ' + brand"
        ></img>
      </nuxt-link>

      <!-- cf : https://jsfiddle.net/tbonz/80jkq0Ls/ -->
      <div 
        :class="`navbar-burger ${ showNav ? 'is-active' : '' }`"
        @click="triggerBurger()" 
        aria-expanded="false" 
        data-target="navbar-main"
        >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {

  props: [
    'logoTo', 
  ],

  beforeMount : function(){
    this.log && console.log('\nC-Brand / beforeMount...')
  },

  computed: {
    
    ...mapState({
      log : state => state.log, 
      showNav : state => state.showNav
    }),
    
    // showNav() {
    //   return this.$store.getters.getNavbarVisibility
    // },

    ...mapGetters({
      logo : 'config/getNavbarLogo',
      brand : 'config/getNavbarBrand' 
    }),

  },

  methods : {
    triggerBurger(){
      this.$store.commit('switchNavbarMenu')
    }
  }

}
</script>
