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
        class="button is-block is-primary is-fullwidth" 
        type="submit" 
        >
        <!-- @click="sendLoginForm" -->
        {{ getText('connect') }}
      </button>

    </form>


    <div
      v-if="isUserAdmin || isUserStaff" 
      >
      <router-link
        class="button is-block is-primary is-fullwidth" 
        :to="'/backoffice'"
        >
        back office
      </router-link>
      <br>
    </div>

    <button 
      v-if="user.isLoggedin" 
      class="button is-block is-primary is-fullwidth" 
      type="submit" 
      @click="sendLogout"
      >
      {{ getText('disconnect') }}
    </button>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios';


export default {

  data: function () {
    return {
      userEmail: '',
      userPassword: '',
      userRememberMe: true,
      customformError: ''
    }
  },

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

      let payload = {
        email : this.userEmail,
        pwd : this.userPassword
      }
      this.log && console.log("C-LoginForm / payload : ", payload)

      let authUrl = urlAuthRoot + urlAuthLoginSuffix
      this.log && console.log("C-LoginForm / authUrl : ", authUrl)

      axios
        .post( authUrl, payload )
        .catch( (error) => {
          console.log(error)
          this.customformError = 'Login failed'
        })
        .then( response => {
          this.log && console.log("C-LoginForm / response : ", response)
          this.$store.dispatch('user/saveLoginInfos',{APIresponse:response})
        })
      this.userPassword = ''
    },

    sendLogout(e){
      e.preventDefault()
      this.userEmail = ''
      this.userPassword = ''
      this.$store.dispatch('user/logout')
      this.$router.push('logout')
    },

  }
}
</script>
