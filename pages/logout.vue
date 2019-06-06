<template>
  <div>

    <!-- NAVBAR -->
    <Navbar 
      v-if="has_navbar"
    ></Navbar>
    
    <!-- LOGOUT ROUTES -->
    <LogoutScreen 
    ></LogoutScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LogoutScreen from '~/components/userUX/LogoutScreen.vue';
import Navbar from '~/components/dynamicUX/Navbar.vue';

export default {
  
  components: {

    LogoutScreen,
    Navbar, 
  },

  middleware : [
    'getRouteConfig',
  ],

  beforeMount : function(){
    // this.log && console.log('\nP-logout.vue / beforeMount...')
  },

  data () {
    return {
    }
  },

  computed: {

    ...mapState({

    }),

    ...mapGetters({
      has_navbar : 'config/hasNavbar',
    }),

  },

  methods: {

  }

}
</script>

<style>

</style>
