<template>
  <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">

    <div class="container">
        
      <Brand 
        :logo="logo" 
        :logoTo="navbarConfig.logo_to"
        :brand="brand"
      ></Brand>

      <!-- DEBUGGING -->
      <!-- navbarConfig : <code>{{ navbarConfig }}</code> -->
      <!-- currentRouteConfig : <code>{{ currentRouteConfig.field }}</code> -->
    
      <NavBarContent 
        :NavbarLinks="navbarConfig.links_options"
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
  ]
}
</script>

<style>
nav {
  height: 60px;
  z-index: 10;
}
</style>