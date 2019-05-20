<template>

  <section class="hero has-background-white-ter is-fullheight skip-navbar">

    <div class="hero-body">
      <div class="container has-text-centered">
       
        <!-- DEBUGGING -->
        <!-- user : <code>{{ user }}</code><br> -->
        <!-- jwt : <code>{{ jwt }}</code></br> -->
        
        <div class="columns is-mobile is-centered">

          <div class="column is-6" 
            v-if="!user.isLoggedin"
            >

            <p class="subtitle has-text-grey">
              {{ getText('is_account') }}
            </p>

            <!-- main login form -->
            <div class="box">
              <FormLogin/>
            </div>

            <div class="columns is-mobile is-centered">

              <div class="column is-6" >
                <p class="has-text-grey">
                  <nuxt-link :to="'/register'">
                    {{ getText('create_account') }}
                  </nuxt-link>
                </p>
              </div>

              <div class="column is-6" >
                <p class="has-text-grey">
                  <nuxt-link disabled :to="'/forgot-password'">
                    {{ getText('forgot_password') }}
                  </nuxt-link>
                </p>
              </div>

            </div>

            <br>
            <br>

          </div>

          <div class="column is-6" 
            v-if="user.isLoggedin"
            >
            <p class="subtitle has-text-grey">
              <!-- Bonjour  -->
              {{ getText('hello') }}
              {{ user.infos.name }}
            </p>

            <div class="box">
              <FormLogin/>
            </div>

          </div>

        </div>
      </div>
    </div>

  </section>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

import FormLogin from './LoginForm.vue';

export default {

  components: {
    FormLogin
  },

  props: [
  ],

  computed: mapState({
    log : state => state.log, 
    user: state => state.user.user,
    jwt: state => state.user.jwt,
  }),

  mounted(){
    // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
    const int = setInterval(() => {
      if(window.pageYOffset < 50){
        clearInterval(int)
      }
      else{
        window.scrollTo(0, 0)
      }
    }, 100);
  },

  methods: {

    getText(textCode) {
      return this.$store.getters['config/defaultText']({txt:textCode})
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }
  }

}
</script>
