<template>
  <div>

    <!-- NAVBAR -->
    <NavBar 
      v-if="has_navbar"
    ></NavBar>
    
    <!-- LOGOUT ROUTES -->
    <LogoutScreen 
    ></LogoutScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LogoutScreen from '~/components/userUX/LogoutScreen.vue';
import NavBar from '~/components/dynamicUx/NavBar.vue';

export default {
  
  components: {

    LogoutScreen,
    NavBar, 
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
