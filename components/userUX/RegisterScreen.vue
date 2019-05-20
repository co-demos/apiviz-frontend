<template>
    <!-- <div> -->
        <!-- <NavBar :logo="logo" :brand="brand"/> -->

  <section class="hero has-background-white-ter is-fullheight skip-navbar">

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-mobile is-centered">


          <div class="column is-6" v-if="!user.isLoggedin">

            <p class="subtitle has-text-grey">
              <!-- Vous n'avez pas encore de compte ? -->
              {{ getText('no_account') }}
            </p>
            <!-- <h3 class="title has-text-grey">S'enregistrer</h3> -->

            <div class="box">
              <FormRegister/>
            </div>

            <p class="has-text-grey">              
              <router-link :to="'/login'">
                <!-- créer un compte -->
                {{ getText('connect') }}
              </router-link>
            </p>

          </div>

          <div class="column is-6" v-if="user.isLoggedin">
            <p class="subtitle has-text-grey">
              <!-- Bonjour  -->
              {{ getText('hello') }}
              {{user.infos.email}}, 
              <!-- vous êtes déjà enregistré.e -->
              {{ getText('is_registered') }}
            </p>

          </div>

        </div>
      </div>
    </div>
  </section>

        <!-- <Footer/>
    </div> -->
</template>

<script>
import {mapState} from 'vuex'

// import NavBar from '../NavBar.vue';
// import Footer from '../Footer.vue';
import FormRegister from '../FormRegister.vue';

export default {
  components: {
    // NavBar, 
    // Footer, 
    FormRegister
  },
  props: [
    // 'logo', 
    // 'brand'
  ],

  computed: {
    ...mapState({
      log : state => state.log, 
      user: 'user'
    })
  },

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
