<template>
  <div>

    <!-- NAVBAR -->
    <Navbar 
      v-if="has_navbar"
    ></Navbar>

    <!-- REGISTER ROUTES -->
    <RegisterScreen 
    ></RegisterScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import RegisterScreen from '~/components/userUX/RegisterScreen.vue'
import Navbar from '~/components/dynamicUX/Navbar.vue'

export default {
  
  components: {

    RegisterScreen,
    Navbar, 
    
  },

  middleware : [
    'getRouteConfig',
  ],

  beforeMount : function(){
    // this.log && console.log('\nP-register.vue / beforeMount...')
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
