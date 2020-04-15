<template>

  <div
    :class="`navbar-brand ${ shrinkNav ? 'navbar--shrink' : ''}`"
    :title="brand"
    >

      <nuxt-link
        id="logo_home"
        :class="`navbar-item navbar-item-hov`"
        :to="logoTo">
        <img
          id="navbar-logo"
          :class="`${shrinkNav ? 'navbar-logo-shrink': 'navbar-logo'} `"
          :src="logo.url"
          :alt="brand.content"
        ></img>
      </nuxt-link>

      <!-- cf : https://jsfiddle.net/tbonz/80jkq0Ls/ -->
      <div
        :class="`navbar-burger ${ shrinkNav ? 'navbar-burger-shrink' : ''} ${ showNav ? 'is-active' : '' }`"
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
        shrinkNav : 'getShrinkNav',
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

<style lang="scss" scoped>

  @import '../../assets/css/apiviz-misc.scss';

  .navbar-logo {
    max-height:$apiviz-navbar-logo-height ! important ;
    transition: max-height 0.4s ease-in;
  }

  .navbar-logo-shrink {
    max-height: $apiviz-navbar-logo-height-shrink ! important ;
    transition: max-height 0.4s ease-out;
  }

  .navbar-brand {
    max-height: $apiviz-navbar-height;
    z-index: 10;
  }
  .navbar-brand.navbar--shrink {
    min-height: $apiviz-navbar-min-height-shrink !important ;
    max-height: $apiviz-navbar-height-shrink !important ;
    transition: max-height 0.4s ease-out;
  }

  .navbar-burger-shrink {
    min-height: $apiviz-navbar-min-height-shrink !important ;
    max-height: $apiviz-navbar-height-shrink !important ;
    transition: max-height 0.4s ease-out;
  }

</style>
