<template>
  <div>

    <!-- DIALOG MODAL DELETE-->
    <div 
      v-if="docConfig.add_delete"
      :class="`modal ${isModalOpen ? 'is-active' : ''}`"
      >
      <div class="modal-background"></div>
      <div class="modal-card">

        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            Are you sure you want to delete this element ? 
          </p>
          <!-- <button 
            class="delete" 
            aria-label="close"
            @click="toggleModal()"
            >
          </button> -->
        </header>

        <!-- <section class="modal-card-body has-text-centered">
          <h2>
            Are you sure you want to delete this element ? 
          </h2>
        </section> -->

        <footer class="modal-card-foot">
          <a class="card-footer-item"
            @click="toggleModal()"
            >
            <span class="icon">
              <i class="fas fa-times"></i>
            </span>
            <span>cancel</span>
          </a>
          <a class="card-footer-item"
            @click="deleteElement()"
            >
            <span class="icon">
              <i class="fas fa-trash-alt"></i>
            </span>
            <span>delete</span>
          </a>
        </footer>

      </div>
    </div>

    <!-- CARD -->
    <div class="card">
      
      <!-- CARD HEADER -->
      <div class="card-header has-background-white-ter">

        <a 
          class="card-header-title"
          @click="toggleContent"
          >

          {{ configCollection }} 

          <!-- TO DO : translate field code -->
          <span v-if="!['blocs_list'].includes(docConfig.type)">
            &nbsp; > {{ confEditSubfield }} 
          </span>

          <span v-if="docConfig.type !== 'docs_list' && confEditTitle !== '' ">
            &nbsp; > {{ confEditTitle }} 
          </span>

        </a>


        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i :class="`fas fa-angle-${ isOpen ? 'up' : 'down'}`" aria-hidden="true"></i>
          </span>
        </a>
      </div>

      <!-- CARD CONTENTS -->
      <div 
        v-show="isOpen"
        >

        <!-- HELPER AND DEBUGGING -->
        <div class="card-content">

          <!-- FIELD'S HELP -->
          <p>
            <span class="icon">
              <i class="fas fa-info-circle"></i>
            </span>
            <span>{{ docHelp }}</span>
          </p>

          <!-- WARNINGS -->
          <hr>
          <p class="has-text-danger">
            <span class="icon">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
            <span>
              you can do the following (experimental) : 
            </span>
            <a class="button is-small is-rounded is-outlined is-danger"
              @click="isWarningOpen = !isWarningOpen"
              >
              <span class="icon">
                <i :class="`far fa-eye${isWarningOpen ? '-slash' : '' }`"></i>
              </span>
            </a>
          </p>
          <div 
            v-show="isWarningOpen" 
            class="content has-text-danger"
            >
            <ul>
              <li v-show="docConfig.add_delete">
                delete or duplicate this element
              </li>
              <li>
                modify the values
              </li>
              <li>
                check 'is_default' as False (experimental). This 
              </li>
              <li v-show="docConfig.canAddKeys">
                add new key(s) at your own risk
              </li>
              <li v-show="docConfig.canAddToList">
                add new entries to the lists (but beware to respect the format)
              </li>
              <li v-show="!docConfig.canModifKeys">
                modifying the keys will not be taken into accoun
              </li>
              <li v-show="docConfig.canModifKeys">
                modify the existing keys (at your own risk
              </li>
            </ul>
          </div>

        </div>

        <!-- JSON EDITOR -->
        <div 
          class="card-content is-paddingless"
          >

          <!-- using vue-json-editor  ( + + ) -->
          <vue-json-editor 
            v-model="jsonData" 
            :show-btns="false" 
            @json-change="onChangeData">
          </vue-json-editor>

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

        <!-- DEBUGGING -->
        <!-- <div v-show="isDebug" class="card-content"> -->
          <!-- apivizFrontUUID : <code>{{ apivizFrontUUID }}</code></br>             -->
          <!-- configCollection : <code>{{ configCollection }}</code></br>             -->
          <!-- docId : <code>{{ docId }}</code></br> -->
          <!-- docConfig.type : <code>{{ docConfig.type }}</code></br> -->
          <!-- confEditSubfield : <code>{{ confEditSubfield }}</code></br> -->
          <!-- docConfig : <br><pre><code>{{ JSON.stringify(docConfig, null, 1) }}</code></pre></br> -->
          <!-- confToEdit  : <br><pre><code>{{ JSON.stringify(confToEdit, null, 1) }}</code></pre></br> -->
          <!-- jsonData  : <br><pre><code>{{ JSON.stringify(jsonData, null, 1) }}</code></pre></br> -->
        <!-- </div> -->

      </div>

      <!-- CARD FOOTER / SUBMIT -->
      <footer 
        v-show="isOpen"
        class="card-footer"
        >

        <!-- DELETE BTN-->
        <a v-if="docConfig.add_delete"
          class="card-footer-item"
          @click="toggleModal()"
          >
          <span class="icon">
            <i class="fas fa-trash-alt"></i>
          </span>
          <span>delete</span>
        </a>

        <!-- TEST BTN-->
        <!-- <a 
          class="card-footer-item"
          @click="testConfigModif()"
          >
          <span class="icon">
            <i class="fas fa-eye"></i>
          </span>
          <span>test</span>
        </a> -->

        <!-- SUBMIT BTN-->
        <a 
          class="card-footer-item"
          @click="sendConfigModif()"
          >
          <span class="icon">
            <i 
              :class="`${isLoading ? 'fas fa-spinner fa-pulse' : 'far fa-save'}`">
            </i>
          </span>
          <span v-show="!isLoading">
            save
          </span>
        </a>
  
        <!-- CANCEL BTN -->
        <a 
          class="card-footer-item"
          @click="toggleContent()"
          >
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span>cancel</span>
        </a>

      </footer>

    </div>

    <br>

  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import axios from 'axios';

  export default {

    components: {
    },

    props: [
      'configCollection',
      'currentTab',
      'docId',
      'docHelp',

      'docConfig',

      'confEdit',
      'confEditSubfield',
      'confEditTitle',
      'confToEdit'
    ],

    data: function () {
      return {
        isDebug : true, 
        isOpen : false,
        isWarningOpen : false,
        jsonData : undefined,
        isModalOpen : false,
        isLoading : false,
      }
    },

    watch : {
      confToEdit(next, prev) {
        // this.log && console.log('C-BackOfficeJSON / watch / confToEdit / prev : \n', prev)
        // this.log && console.log('C-BackOfficeJSON / watch / confToEdit / next : \n', next)
        this.jsonData = next
      },
      currentTab(next, prev) {
        this.isOpen = false
      },
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
      // this.log && console.log('C-BackOfficeJSON / beforeMount / this.confToEdit : \n', this.confToEdit)
      this.jsonData = this.confToEdit
    },

    methods : {
      
      toggleContent() {
        this.isOpen = !this.isOpen
      },

      toggleModal() {
        this.isModalOpen = !this.isModalOpen
      },

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },

      onChangeData: function(data) {
        this.jsonData = data
      },

      // arrayFromObjectsArray(objArray, property){
      //   let array = objArray.map( a => a[property] )
      //   return array
      // },

      sendConfigModif(){

        this.log && console.log("--- --- ---")

        this.isLoading = true
        this.customformError = ''

        let currentColl = this.configCollection

        // remap docConfig
        // let editConfig = {
        //   editType : this.docConfig.type,
        // }

        // build payload
        let payload = {
          token : this.jwt.access_token,
          doc_coll : this.configCollection,
          // doc_uuid : this.apivizFrontUUID,
          doc_id : this.docId,
          // doc_subfield : this.confEditSubfield,
          doc_config : this.docConfig,
          doc_data : (this.jsonData ? this.jsonData : this.confToEdit )
        }
        this.log && console.log('C-BackOfficeJSON / sendConfigModif / payload : \n', payload)

        let updateRequest = {
          currentColl : currentColl,
          payload : payload,
        }

        this.$store.dispatch('config/editConfig', updateRequest)
          .then( resp => {

            this.isLoading = false
            // console.log('C-BackOfficeJSON / sendConfigModif / resp', resp)
            console.log('C-BackOfficeJSON / sendConfigModif / resp.data', resp.data)
            
            // retrieve back the config on 
            let needArgs = ['routes', 'tabs', 'endpoints']
            let dispatchConfig = {
              type : currentColl,    
              configTypeEndpoint : currentColl, 
              args : ( needArgs.includes(currentColl) ? '&as_list=true' : '' )
            }
            this.$store.dispatch('config/getConfigType', dispatchConfig )
            console.log('C-BackOfficeJSON / sendConfigModif / config/getConfigType END...')
          })
      },

      testConfigModif(){
        // TO DO 
        this.log && console.log("\nC-BackOfficeJSON / testConfigModif ... ")
      },

      deleteElement(){
        this.log && console.log("\nC-BackOfficeJSON / deleteElement ... ")
        // TO DO 
        // open confirm delete modal
        this.isLoading = true

        let currentColl = this.configCollection

        // build deleteRequest
        let deleteRequest = {
          currentColl : currentColl,
          doc_id : this.docId,
          token : this.jwt.access_token,
        }
        this.log && console.log('C-BackOfficeJSON / deleteElement / deleteRequest : \n', deleteRequest)

        this.$store.dispatch('config/deleteConfig', deleteRequest)
          .then( resp => {

            this.isLoading = false
            this.toggleModal()

            console.log('C-BackOfficeJSON / deleteElement / resp.data', resp.data)
            
            // retrieve back the config on 
            let needArgs = ['routes', 'tabs', 'endpoints']
            let dispatchConfig = {
              type : currentColl,    
              configTypeEndpoint : currentColl, 
              args : ( needArgs.includes(currentColl) ? '&as_list=true' : '' )
            }
            this.$store.dispatch('config/getConfigType', dispatchConfig )
            console.log('C-BackOfficeJSON / deleteElement / config/getConfigType END...')
          })


      },
    }
  }
</script>

<style>

</style>