<template>
  <div>

    <!-- NAVBAR -->
    <NavBar 
      v-if="has_navbar"
    ></NavBar>

    <!-- LOGIN/LOGOUT/REGISTER ROUTES -->
    <LoginScreen 
    ></LoginScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LoginScreen from '~/components/userUX/LoginScreen.vue';
import NavBar from '~/components/dynamicUx/NavBar.vue';

export default {
  
  components: {

    LoginScreen,
    NavBar,

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
