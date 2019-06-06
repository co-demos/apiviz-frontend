<template>
  <div>

    <!-- NAVBAR -->
    <NavBar 
      v-if="has_navbar"
    ></NavBar>

    <!-- REGISTER ROUTES -->
    <RegisterScreen 
    ></RegisterScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import RegisterScreen from '~/components/userUX/RegisterScreen.vue';
import NavBar from '~/components/dynamicUX/Navbar.vue';

export default {
  
  components: {

    RegisterScreen,
    NavBar, 
    
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

    }),

  },

  methods: {

  }

}
</script>

<style>

</style>
