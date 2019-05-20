<template>
  <div>

    <!-- LOGOUT ROUTES -->
    <LogoutScreen 
    ></LogoutScreen>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LogoutScreen from '~/components/userUX/LogoutScreen.vue';

export default {
  
  components: {

    LogoutScreen,

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

    }),

  },

  methods: {

  }

}
</script>

<style>

</style>
