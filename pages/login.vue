<template>
  <div>

    <!-- NAVBAR -->
    <Navbar 
      v-if="has_navbar"
    ></Navbar>

    <!-- LOGIN/LOGOUT/REGISTER ROUTES -->
    <LoginScreen 
    ></LoginScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LoginScreen from '~/components/userUX/LoginScreen.vue';
import Navbar from '~/components/dynamicUX/Navbar.vue';

export default {
  
  components: {

    LoginScreen,
    Navbar,

  },

  middleware : [
    'getRouteConfig',
  ],

  beforeMount : function(){
    // this.log && console.log('\nP-login.vue / beforeMount...')
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
