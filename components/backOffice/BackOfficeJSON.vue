<template>
  <div>

    <div class="card">
      
      <!-- CARD HEADER -->
      <div class="card-header">
        <a 
          class="card-header-title"
          @click="toggleContent"
          >
          <!-- TO DO : translate field code -->
          {{ configCollection }} > {{ docConfigField }} > {{ confEditTitle }}
        </a>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </div>

      <!-- CARD CONTENTS -->
      <div 
        v-show="isOpen"
        class="card-content is-paddingless"
        >

        <div class="content">

          <!-- DEBUGGING -->
          <div v-show="isDebug">
            <!-- configCollection : <code>{{ configCollection }}</code></br> -->
            
            <!-- docConfigType : <code>{{ docConfigType }}</code></br> -->
            
            <!-- docId : <code>{{ docId }}</code></br> -->
            <!-- docConfigField : <code>{{ docConfigField }}</code></br> -->
            
            <!-- confEdit : <code>{{ confEdit }}</code></br> -->
            <!-- confEditSubfield : <code>{{ confEditSubfield }}</code></br> -->
            <!-- confEditTitle : <code>{{ confEditTitle }}</code></br> -->

            <!-- confToEdit  : <br><pre><code>{{ JSON.stringify(confToEdit, null, 1) }}</code></pre></br> -->
            <!-- jsonData  : <br><pre><code>{{ JSON.stringify(jsonData, null, 1) }}</code></pre></br> -->
          </div>

          <!-- using vue-json-edit -->
          <!-- <JsonEditor 
            :objData="jsonData" 
            v-model="jsonData" 
            >
          </JsonEditor> -->

          <!-- using vue-json-tree -->
          <!-- <tree-view
           :data="jsonData" 
           :options="{ 
              maxDepth: 7, 
              rootObjectKey: confEditSubfield, 
              modifiable: true,
              link: false
            }"
            @change-data="onChangeData"
            >
          </tree-view> -->

          <!-- using vue-json-edit -->
          <!-- <json-editor 
            ref="JsonEditor" 
            :schema="schema" 
            v-model="testJsonData"
            > -->
              <!-- <button @click="submit">submit</button>
              <button @click="reset">Reset</button> -->
          <!-- </json-editor> -->

          <!-- using vue-json-editor-block -->
          <!-- <v-json-editor
            :data="jsonData"
            :editable="true"
            @change="onChangeData"
          ></v-json-editor> -->

          <!-- using vue-json-editor  ( + + ) -->
          <vue-json-editor 
            v-model="jsonData" 
            :show-btns="false" 
            @json-change="onChangeData">
          </vue-json-editor>


          <!-- using vue-edit-json  ( + + + ) BUT ERROR AT INSTALL/BUILD -->
          <!-- <JsonEditor 
            :is-edit="true" 
            v-model="jsonData">
          </JsonEditor> -->

          <!-- using vue-json-component ( + ) CLEAN BUT NO EDITING MODE -->
          <!-- <json-view 
            :data="jsonData" 
          /> -->


        </div>

      </div>

      <!-- CARD FOOTER / SUBMIT -->
      <footer 
        v-show="isOpen"
        class="card-footer"
        >

        <!-- TEST BTN-->
        <a 
          class="card-footer-item"
          >
          test
        </a>

        <!-- SUBMIT BTN-->
        <a 
          class="card-footer-item"
          @click="sendConfigModif()"
          >
          save
        </a>
  
        <!-- CANCEL BTN -->
        <a 
          class="card-footer-item"
          @click="toggleContent()"
          >
          cancel
        </a>

      </footer>

    </div>

    <br>

  </div>
</template>

<script>

const SCHEMA = {
  type: 'object',
  title: 'vue-json-editor demo',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
};

import { mapState, mapGetters } from 'vuex'
import axios from 'axios';

export default {

  components: {
  },

  props: [
    'configCollection',
    'docId',
    'docConfigType',
    'docConfigField',
    'confEdit',
    'confEditSubfield',
    'confEditTitle',
    'confToEdit'
  ],

  data: function () {

    return {
      isDebug : true, 

      isOpen : false,

      jsonData : undefined,

      schema: SCHEMA,
      testJsonData : {
        name: 'Yourtion',
      },

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
    this.jsonData = this.confToEdit
  },

  methods : {
    
    toggleContent() {
      this.isOpen = !this.isOpen
    },

    getText(textCode) {
      return this.$store.getters['config/defaultText']({txt:textCode})
    },

    onChangeData: function(data) {
      this.jsonData = data
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
        doc_id : this.docId,
        doc_subfield : this.confEditSubfield,
        doc_data : this.jsonData
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