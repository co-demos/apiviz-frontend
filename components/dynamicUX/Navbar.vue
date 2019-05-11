<template>
    <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">

      <div class="container">
          
        <Brand 
          :logo="logo" 
          :logoTo="this.navbarConfig.logo_to"
          :brand="brand"
        ></Brand>

        <!-- DEBUGGING -->
        <!-- currentRouteConfig : {{ currentRouteConfig.field }} -->
      
        <NavBarContent 
          :NavbarLinks="this.navbarConfig.links_options"
          :user="user"
          :localRouteConfig="localRouteConfig"
        ></NavBarContent>

      </div>

    </nav>
</template>

<script>
import Brand from './Brand.vue';
import NavBarContent from './NavbarContent.vue';

export default {
  components: {
    Brand,
    NavBarContent
  },
  props: [
    'navbarConfig',
    'appLocales',
    'logo', 
    'brand', 
    'localRouteConfig',

    'user'
  ]
}
</script>

<style>
nav {
  height: 60px;
  z-index: 10;
}
</style>