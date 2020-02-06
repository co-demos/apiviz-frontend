<template>

  <div class="navbar-brand" :title="brand">

      <nuxt-link 	
        v-if="logo.url"
        id="logo_home"
        class="navbar-item navbar-item-hov" 
        :to="logoTo">
        <img 
          id="navbar-logo" 
          :src="logo.url"
          :alt="brand.content"
        ></img>
      </nuxt-link>

      <div
        v-if="brand.is_in_navbar"
        :class="`navbar-item has-text-weight-medium is-size-6-touch is-size-5-desktop is-family-primary ${ brand.title_color ? 'has-text-'+brand.title_color+'-c' : '' }`">
        <!-- {{ brand.content }} -->
        {{ translate( brand, 'content_text' ) }}
      </div>

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
      // this.log && console.log('\nC-Brand / beforeMount...')
    },

    computed: {
      
      ...mapState({
        log : state => state.log, 
        locale: state => state.locale,
        showNav : state => state.showNav
      }),

      ...mapGetters({
        logo : 'config/getNavbarLogo',
        brand : 'config/getNavbarBrand' 
      }),

    },

    methods : {
      triggerBurger(){
        this.$store.commit('switchNavbarMenu')
      },
      translate( textsToTranslate, listField ) {
        let listTexts = textsToTranslate[listField]
        return this.$Translate( listTexts, this.locale, 'text')
      },
    }

  }
</script>
