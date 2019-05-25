<template>

  <div>

    <div 
      class="card"
      >
      
      <!-- CARD HEADER -->
      <div class="card-header">
        <a 
          class="card-header-title"
          @click="toggleContent"
          >
          <!-- TO DO : translate field code -->
          {{ docConfig.title }}
        </a>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </div>

      <div 
        v-show="isOpen"
        class="card-content"
        >

        <div class="content">

          <!-- DEBUGGING -->
            rootUrlBackend : <code>{{ rootUrlBackend }}</code><br>
            <!-- jwt : <code>{{ jwt }}</code><br> -->
            jwt.access_token : <code>{{ jwt.access_token }}</code><br>
            <!-- jwt['access_token'] : <code>{{ jwt['access_token'] }}</code><br> -->

            configCollection : <code>{{ configCollection }}</code><br>
            currentTab : <code>{{ currentTab }}</code><br>
            <!-- docConfig : <code>{{ docConfig }}</code><br> -->
            <!-- docConfig.edit : <br><pre><code>{{ JSON.stringify(docConfig.edit, null, 1) }}</code></pre><br> -->
            <!-- config[docConfig.field] : <code>{{ config[docConfig.field] }}</code><br> -->
            <!-- <hr> -->
            <!-- configBloc : <br><pre><code>{{ JSON.stringify(configBloc, null, 1) }}</code></pre><code> -->
          <hr>

            <!-- v-if="docConfig.type == 'bloc'" -->
          <form 
            v-on:submit.prevent="sendConfigModif" 
            name="formConfig" 
            >
            
            <!-- LOOP EDIT FIELDS LIST -->
            <div
              v-for="(editConf, index) in docConfig.edit" 
              :key="index"
              >

              <!-- DEBUGGING -->
              <!-- editConf : <code>{{ editConf }}</code><br> -->
              editConf in docConfig.edit: <br><pre><code>{{ JSON.stringify(editConf, null, 1) }}</code></pre><br>
              configToEdit(editConf.subfield) : <br><pre><code>{{ JSON.stringify( configToEdit(editConf.subfield), null, 1) }}</code></pre><br>

              <!-- CREATE FIELDS TO EDIT IF ANY -->
              <div
                v-for="conf in getDocSubfieldsToEdit(editConf)" 
                :key="conf.subfield"
              >

                  <!-- text field -->
                  <div
                    v-if="conf.type === 'text'" 
                    class="field">
                    <label class="label">{{conf.subfield}}</label>
                    <div class="control">
                      <input 
                        :value="configBloc[conf.subfield]"
                        class="input" 
                        type="text" 
                        placeholder="Text input"
                        >
                    </div>
                    <p class="help">
                      {{ configBloc['help'] }}
                    </p>
                  </div>

                  <!-- select field -->
                  <div
                    v-if="conf.type === 'select'" 
                    class="field">
                    <label class="label">Subject</label>
                    <div class="control">
                      <div class="select">
                        <select>
                          <option>Select dropdown</option>
                          <option>With options</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- textarea field -->
                  <div
                    v-if="conf.type === 'textarea'" 
                    class="field">
                    <label class="label">Message</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="Textarea"></textarea>
                    </div>
                  </div>

                  <!-- check field -->
                  <div
                    v-if="conf.type === 'check'" 
                    class="field">
                    <div class="control">
                      <label class="checkbox">
                        <input 
                          type="checkbox"
                        >
                        I agree to the <a href="#">terms and conditions</a>
                      </label>
                    </div>
                  </div>

                  <!-- radio field -->
                  <div
                    v-if="conf.type === 'bool'" 
                    class="field">
                    <div class="control">
                      <label class="radio">
                        <input type="radio" name="question">
                        Yes
                      </label>
                      <label class="radio">
                        <input type="radio" name="question">
                        No
                      </label>
                    </div>
                  </div>

              </div>


              <br> 
            </div>
            
            <hr>

            <!-- IS_DEFAULT radio field -->
            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input 
                    type="checkbox"
                    :value="isDefault"
                    :checked="isDefault"
                    >
                  is default value (will be reset if server restarts)
                </label>
              </div>
            </div>

            <hr>

            <!-- SUBMIT -->
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">
                  Test
                </button>
              </div>
              <div class="control">
                <button class="button is-link">
                  Submit
                </button>
              </div>
              <div class="control">
                <button class="button is-text">
                  Cancel
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>

    </div>
    <br />

  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import axios from 'axios';

import { getObjectDataFromPath } from '~/plugins/utils.js'

export default {

  components: {
  },

  props: [
    'configCollection',
    'currentTab',
    'docConfig',
    'config'
  ],

  data: function () {

    return {
      isOpen : false,
      customformError : '',

      configBloc : undefined,
      docId : undefined,

      isDefault : undefined,
    }
  },
  computed : {

    ...mapState({
      log : state => state.log, 
      jwt : state => state.user.jwt,
    }),

    ...mapGetters({
      apivizFrontUUID : 'getApivizFrontUUID',
      rootUrlBackend: 'getRootUrlBackend',
      displayableItem : 'search/getDisplayedProject'
    })
  },

  beforeMount(){
    let configBloc = this.config[this.docConfig.field]
    this.configBloc = configBloc
    this.isDefault = configBloc['is_default']
    this.docId = configBloc._id
  },

  methods : {
    
    toggleContent() {
      this.isOpen = !this.isOpen
    },

    configToEdit(subfield){
      return getObjectDataFromPath(this.configBloc, subfield, '.')
    },
    getDocSubfieldsToEdit(editConf){
      this.log && console.log('C-BackOfficeForm / editConf : ', editConf)
      if (editConf.type === 'sublist' ){
        let tempEdit = editConf.object_model
        return tempEdit
      } else {
        return editConf.edit
      }
    },

    getText(textCode) {
      return this.$store.getters['config/defaultText']({txt:textCode})
    },

    sendConfigModif(e){

      let currentColl = this.configCollection
      let argsConfig = ''
      if (currentColl === 'routes' || currentColl === 'endpoints'){
        argsConfig = '&as_list=true'
      } 

      this.customformError = ''
      e.preventDefault()

      let payload = {
        // TO DO 
        test : 'test payload',
        token : this.jwt.access_token,
        // uuid : this.apivizFrontUUID,
        doc_id : this.docId,
        // doc_data : this.configBloc
      }

      // build request URL
      let requestUrl = this.rootUrlBackend+'/config/'+currentColl+"?uuid="+this.apivizFrontUUID
      this.log && console.log('requestUrl : ', requestUrl)

      // post request
      axios
        .post( requestUrl, payload )
        .catch( (error) => {
          this.log && console.log(error)
          this.customformError = 'Modif failed'
        })
        .then(response => 
          this.$store.dispatch('config/getConfigType',{type:currentColl, configTypeEndpoint:currentColl, args:argsConfig}) 
        )

    }
  }
}
</script>

<style>

</style>