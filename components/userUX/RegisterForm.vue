<template>
    <div>

      <h5 class="title has-text-grey">
        {{ getText('register') }}
      </h5>

      <form 
        v-on:submit.prevent="sendRegisterForm" 
        name="form" 
        v-if="!user.isLoggedin"
        >

        <span>{{ this.customformError }}</span>

        <!-- NAME -->
        <div class="field">
      		<div class="control has-icons-left">
            <input 
              class="input" 
              v-validate="'required'" 
              name="userName" 
              type="text" 
              :placeholder="getText('name')" 
              v-model="userName"
              >
            <span>{{ errors.first('userName') }}</span>
      			<span class="icon is-small is-left">
      				<i class="fas fa-user"></i>
      			</span>
      		</div>
      	</div>


        <!-- SURNAME -->
        <div class="field">
          <div class="control has-icons-left">
            <input 
              class="input" 
              v-validate="'required'" 
              name="userSurname" 
              type="text" 
              :placeholder="getText('surname')" 
              v-model="userSurname"
              >
            <span>{{ errors.first('userSurname') }}</span>
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>


        <!-- EMAIL -->
      	<div class="field">
      		<div class="control has-icons-left">
            <input 
              class="input" 
              v-validate="'required|email'" 
              name="userEmail" 
              type="email" 
              :placeholder="getText('email')"
              v-model="userEmail"
              >
            <span>{{ errors.first('userEmail') }}</span>
      			<span class="icon is-small is-left">
      				<i class="fas fa-envelope"></i>
      			</span>
      		</div>
      	</div>

        <!-- PASSWORD -->
      	<div class="field">
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

        <!-- CONFIRM PASSWORD -->
        <div class="field">
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


        <!-- CGU -->
        <div class="field">
          <div class="control has-icons-left">
            <input 
              class="checkbox" 
              v-validate="'required'" 
              name="userAcceptCGU" 
              type="checkbox" 
              v-model="userAcceptCGU"
            >
            <span>{{ errors.first('userAcceptCGU') }}</span>
            <label for="userAcceptCGU">

              <a class="modal-button has-text-primary has-text-primary-c" data-target="modal_legal" aria-haspopup="true">
                <!-- CGU BOX -->
                {{ getText('accept_cgu') }}
              </a>
            </label>
          </div>
        </div>


        <br>

        <!-- SUBMIT -->
      	<button class="button is-block is-primary is-primary-b is-fullwidth " 
          :disabled="!enableBtn" 
          type="submit"
          >
      		<!-- REGISTER -->
          <span class="icon">
            <i class="fas fa-sign-in-alt"></i>
          </span>
          <span>
            {{ getText('register') }}
          </span>
      	</button>

      </form>

      <p 
        class="button is-block is-primary is-primary-b is-fullwidth" 
        type="submit" 
        v-if="user.isLoggedin"
        >
        <!-- USER CONNECTED -->
        {{ getText('connected') }}
      </p>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios';

  export default {

    name: 'RegisterForm',

    data: function () {
      return {
        userName: '',
        userSurname: '',
        userEmail: '',
        userPassword: '',
        userAcceptCGU: '',
        customformError: ''
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        user: state => state.user.user,
      }),
      
      enableBtn() {
        return (this.errors.all().length === 0) ? true : false
      }
    },

    methods: {

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },

      sendRegisterForm(e){
        this.customformError = ''
        e.preventDefault()

        this.$validator.validate().then(boo => {
          // if some fields in the form aren't properly filled
          if (!boo) {
              this.customformError = 'Register failed - ' + this.errors.all();
          } else {

            // if the form looks good, we send it to the backend
            const urlAuthRoot = this.$store.getters['getRootUrlAuth']

            const urlAuthRegister = this.$store.getters['config/getEndpointConfigAuthSpecific']('register')
            const urlAuthRegisterSuffix = urlAuthRegister.root_url
            this.log && console.log("C-RegisterForm / urlAuthRegisterSuffix : ", urlAuthRegisterSuffix)

            let authUrl = urlAuthRoot + urlAuthLoginSuffix
            this.log && console.log("C-RegisterForm / authUrl : ", authUrl)

            let payload = {
              name: this.userName,
              surname: this.userSurname,
              email:this.userEmail,
              pwd:this.userPassword,
              lang: "fr",
              agreement: this.userAcceptCGU
            }
            axios
              .post( urlAuthRoot + urlAuthRegisterSuffix, payload)
              .then(response =>
              {
                // case where code is 200 => success
                this.$store.dispatch('user/saveLoginInfos',{APIresponse:response})
                this.$router.push('login')
              })
              .catch( error =>
              {
                // in case we catch something, let's display it for easier debug
                try {
                  let msg = (error.response && error.response.data && error.response.data.msg) ? ' - ' + error.response.data.msg : ''
                  switch (error.response.status) {
                    case 401:
                      this.customformError = 'Register failed' + msg
                      break;
                    default:
                      this.log && console.log('C-RegisterForm / error unkown',error,Object.keys(error));
                      this.customformError = 'Register failed - contact the webmaster'
                      break;
                  }
                } catch (e) {
                  this.log && console.log('C-RegisterForm / we cannot read the error message from the API',e);
                  this.customformError = 'Register failed'
                }
              })
              .then(() =>
                {
                  // in the end, if we need to do something
                  this.userPassword = ''
                  this.userConfirmPassword = ''
                }
              )
            }
          });
      }
    }
  }
</script>
