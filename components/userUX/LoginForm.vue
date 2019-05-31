<template>
  <div>

    <h5 class="title has-text-grey"
      v-if="!user.isLoggedin"
      >
      {{ getText('login') }}
    </h5>

    <form 
      v-if="!user.isLoggedin"
      v-on:submit.prevent="sendLoginForm" 
      name="form" 
      >
      <span>{{ this.customformError }}</span>

      <div class="field">
        <div class="control has-icons-left">
          <input class="input" 
            v-model="userEmail"
            v-validate="'required|email'" 
            name="userEmail" 
            :placeholder="getText('email')"
            type="email" 
            >
          <span>{{ errors.first('userEmail') }}</span>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input class="input" 
            v-validate="'required'" 
            v-model="userPassword"
            name="userPassword" 
            :placeholder="getText('password')"
            type="password" 
            >
          <span>{{ errors.first('userPassword') }}</span>
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <!-- <div class="control has-icons-left"> -->
          <input 
            class="checkbox" 
            name="userRememberMe" 
            type="checkbox" 
            value=""
          >
          <label for="checkbox">
            <!-- remember me -->
            {{ getText('remember_me') }}
          </label>
        <!-- </div> -->
      </div>

      <br>

      <button 
        class="button is-block is-primary is-primary-b is-fullwidth" 
        type="submit" 
        >
        <!-- @click="sendLoginForm" -->
        <span class="icon">
          <i class="fas fa-sign-in-alt"></i>
        </span>
        <span>
          {{ getText('connect') }}
        </span>
      </button>

    </form>


    <div
      v-if="isUserAdmin || isUserStaff" 
      >

      <button
        v-if="user.isLoggedin" 
        class="button is-block is-primary is-primary-b is-fullwidth" 
        @click="goBack"
        >
        <span class="icon">
          <i class="fas fa-arrow-left"></i>
        </span>
        <span>
          Back
        </span>
      </button>
      <br>

      <nuxt-link
        class="button is-block is-fullwidth is-primary is-primary-b" 
        :to="'/backoffice'"
        >
        <span class="icon">
          <i class="fas fa-cog"></i>
        </span>
        <span>
          Back office
        </span>
      </nuxt-link>
      <br>
      
    </div>

    <!-- <nuxt-link 
      v-if="user.isLoggedin" 
      class="button is-block is-primary is-primary-b is-fullwidth" 
      :to="'/'"
      >
      home
    </nuxt-link> -->

    <button 
      v-if="user.isLoggedin" 
      class="button is-block is-primary is-primary-b is-fullwidth" 
      type="submit" 
      @click="sendLogout"
      >
      <span class="icon">
        <i class="fas fa-sign-out-alt"></i>
      </span>
      <span>
        {{ getText('disconnect') }}
      </span>
    </button>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'

export default {

  name: 'LoginForm',

  data: function () {
    return {
      userEmail: '',
      userPassword: '',
      userRememberMe: true,
      customformError: ''
    }
  },

  // watch: {
  //   user(prev, next){
  //     this.log && console.log("C-LoginForm / next : ", next)
  //     if (next.role !== 'admin'){
  //       this.$router.push('/')
  //     }
  //     else if (next.role === 'admin'){
  //       this.$router.push('/backoffice')
  //     }
  //   }
  // },

  computed: {

    ...mapState({
      log : state => state.log, 
      user: state => state.user.user,
      jwt: state => state.user.jwt,
    }),

    isUserAdmin () {
      return this.$store.getters['user/getCheckUserRole']('admin')
    },
    
    isUserStaff () {
      return this.$store.getters['user/getCheckUserRole']('staff')
    },
  },
  methods: {

    getText(textCode) {
      return this.$store.getters['config/defaultText']({txt:textCode})
    },

    sendLoginForm(e){
      this.customformError = ''
      e.preventDefault()

      const urlAuthRoot = this.$store.getters['getRootUrlAuth']
      this.log && console.log("C-LoginForm / urlAuthRoot : ", urlAuthRoot)

      const urlAuthLogin = this.$store.getters['config/getEndpointConfigAuthSpecific']('login')
      const urlAuthLoginSuffix = urlAuthLogin.root_url
      this.log && console.log("C-LoginForm / urlAuthLoginSuffix : ", urlAuthLoginSuffix)

      let authUrl = urlAuthRoot + urlAuthLoginSuffix
      this.log && console.log("C-LoginForm / authUrl : ", authUrl)

      let payload = {
        email : this.userEmail,
        pwd : this.userPassword
      }
      this.log && console.log("C-LoginForm / payload : ", payload)

      axios
        .post( authUrl, payload )
        .catch( (error) => {
          console.log(error)
          this.customformError = 'Login failed'
        })
        .then( response => {
          this.log && console.log("C-LoginForm / response : ", response)
          this.$store.dispatch('user/saveLoginInfos',{APIresponse:response})
          
          let router = this.$router

          // if (this.user.role !== 'admin'){
          //   router.push('/')
          // }
          // else if (this.user.role === 'admin'){
          //   setInterval( function( ){ 
          //     router.push('/backoffice')
          //   }, 3000)
          // }
        })
      this.userPassword = ''
    },

    sendLogout(e){
      e.preventDefault()
      this.userEmail = ''
      this.userPassword = ''
      this.$store.dispatch('user/logout')

      let router = this.$router

      router.push('logout')

      // redirect after logout (3 seconds)
      // setInterval( function( ){ 
      //   router.push('/')
      // }, 3000)
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    },

  }
}
</script>
