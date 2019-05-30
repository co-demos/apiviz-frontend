<template>
  <div>
    
    <!-- INFOS -->
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">
          {{ getText('u_infos') }}
        </label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input 
              class="input" 
              v-validate="'required'" 
              name="userName"               
              type="text" 
              :placeholder="getText('name')" 
              v-model="userEdit.infos.name"
              >
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input 
              class="input" 
              v-validate="'required'" 
              name="userSurname" 
              type="text" 
              :placeholder="getText('surname')" 
              v-model="userEdit.infos.surname"
              >
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- CONTACT -->
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">
          {{ getText('u_contact') }}
        </label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left has-icons-right">
            <input 
              class="input" 
              name="userEmail" 
              type="email" 
              :placeholder="getText('email')"
              v-model="userEdit.infos.email"
              >
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <!-- <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span> -->
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="field is-horizontal">
      <div class="field-label"></div>
      <div class="field-body">
        <div class="field is-expanded">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                +44
              </a>
            </p>
            <p class="control is-expanded">
              <input class="input" type="tel" placeholder="Your phone number">
            </p>
          </div>
          <p class="help">Do not enter the first zero</p>
        </div>
      </div>
    </div> -->

    <!-- PROFILE -->
    <!-- <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">
          {{ getText('u_profile') }}
        </label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select>
                <option>Business development</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Already a member?</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="radio">
              <input type="radio" name="member">
              Yes
            </label>
            <label class="radio">
              <input type="radio" name="member">
              No
            </label>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Subject</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input is-danger" type="text" placeholder="e.g. Partnership opportunity">
          </div>
          <p class="help is-danger">
            This field is required
          </p>
        </div>
      </div>
    </div> -->

    <!-- MORE INFOS -->
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">
          {{ getText('u_about') }}
        </label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea 
              class="textarea" 
              :placeholder="getText('u_about_more')"
              >
            </textarea>
          </div>
        </div>
      </div>
    </div>


    <br>

    <!-- UPDATE INFOS // TO DO  -->
    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button class="button is-primary is-block is-fullwidth">
              <span class="icon">
                <i class="far fa-save"></i>
              </span>
              <span>
                {{ getText('u_infos_send') }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>


<script>
  import { mapState, mapGetters } from 'vuex'
  import axios from 'axios'


  export default {

    name: 'InfosForm',

    data: function () {
      return {
        userEdit: undefined,
        customformError: ''
      }
    },

    beforeMount : function(){
      // this.log && console.log('\nC-InfosForrm.vue / beforeMount...')
      this.userEdit = this.user
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
    }

  }


</script>