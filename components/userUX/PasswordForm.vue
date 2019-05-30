<template>
  <div>

    <!-- PASSWORD -->
    <div class="field">
      <label class="label">
        {{ getText('password_new') }}
      </label>
      <div class="control has-icons-left">
        <input 
          class="input" 
          v-validate="'required'" 
          name="userPassword" 
          type="password" 
          :placeholder="getText('password')" 
          ref="userPassword" 
          v-model="userPassword"
          >
        <span>{{ errors.first('userPassword') }}</span>
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <br>
    
    <!-- CONFIRM PASSWORD -->
    <div class="field">
      <label class="label">
        {{ getText('password_confirm') }}
      </label>
      <div class="control has-icons-left">
        <input 
          class="input" 
          v-validate="'required|confirmed:userPassword'" 
          name="userConfirmPassword" 
          type="password" 
          data-vv-as="userPassword" 
          :placeholder="getText('password_bis')"
          >
        <span>{{ errors.first('userConfirmPassword') }}</span>
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>


    <br>

    <!-- SEND NEW PASSWORD -->
    <button class="button is-block is-primary is-fullwidth " 
      :disabled="!enableBtn" 
      @click="sendNewPassword()"
      >
      <span class="icon">
        <i class="far fa-save"></i>
      </span>
      <span>
        {{ getText('password_send') }}
      </span>
    </button>

  </div>
</template>


<script>

  import { mapState, mapGetters } from 'vuex'
  import axios from 'axios'


  export default {

    name: 'PasswordForm',

    data: function () {
      return {
        userPassword: '',
        customformError: ''
      }
    },

  computed: {

      ...mapState({
        log : state => state.log, 
        user: state => state.user.user,
        jwt: state => state.user.jwt,
      }),

      enableBtn() {
        return (this.errors.all().length === 0) ? true : false
      }

    },


    methods: {

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },

      sendNewPassword(){

      },
    }
  
  }


</script>