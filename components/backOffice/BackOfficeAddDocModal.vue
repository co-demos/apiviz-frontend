<template>
  <div>

    <!-- BUTTON ADD DOC -->
    <div
      class="addButton has-text-centered" 
      >
      <a class="button is-primary is-primary-b"
        @click="toggleModal(docConfig)"
        >
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>
          {{ basicDict.bo_add[locale] }} 
          "{{ currentTab.title }}""
        </span>
      </a>
    </div>

    <!-- DIALOG MODAL INFOS-->
    <div :class="`modal ${isModalOpen ? 'is-active' : ''}`">

      <div class="columns is-vcentered is-gapless large-modal">

        <div class="modal-background"></div>
        
        <!-- ADD DOC CARD CONTENT -->
        <div class="modal-card no-margin">

          <!-- HEADER -->
          <header class="modal-card-head has-text-centered">
            <p class="modal-card-title">
              {{ basicDict.bo_duplicate_title[locale] }}
            </p>
            <button class="delete" 
              aria-label="close"
              @click="toggleModal()"
              >
            </button>
          </header>

          <!-- CONTENT -->
          <section class="modal-card-body more-padding">

            <!-- FIRST SECTION -->
            <div class="content has-text-centered">

              <!-- INTRO TEXT -->
              {{ basicDict.bo_duplicate_intro_1a[locale]}}
              <br>
              {{ basicDict.bo_duplicate_intro_1b[locale]}}

              <!-- CUSTOM DIVIDER -->
              <div class="is-divider" 
                :data-content="basicDict.bo_duplicate_select_helper[locale]">
              </div>

              <!-- SELECT A DOC -->
              <div class="columns is-centered">
                <div class="column is-half">

                  <div class="field is-block">

                    <div class="control">
                      <div class="select is-fullwidth is-primary is-primary-b ">
                        <select v-model="selectedDoc">

                          <option  
                            :value="undefined" disabled>
                            {{ basicDict.bo_duplicate_select_placeholder[locale]}}
                          </option>

                          <option 
                            v-for="(conf, index) in conf" 
                            :key="index"
                            :value="filterObjectOut( conf, subfieldsListOut )"
                            >
                            {{ conf.field }}
                          </option>

                        </select>
                      </div>
                    </div>
                  
                  </div>

                </div>
              </div>

            </div>

            <!-- DOC PREVIEW -->
            <div v-if="selectedDoc" class="content">

              <div class="is-divider" 
                :data-content="basicDict.bo_duplicate_edit_helper[locale]">
              </div>

              <!-- JSON EDITOR (scrollable) -->
              <vue-json-editor 
                class="is-scrollable"
                v-model="jsonData" 
                :show-btns="false" 
                @json-change="onChangeData">
              </vue-json-editor>

            </div>

            <br>
          </section>

          <!-- FOOTER -->
          <footer class="modal-card-foot no-padding">

            <!-- ADD / SAVE BTN -->
            <a class="card-footer-item button is-text no-decoration"
              :disabled="!jsonData"
              @click="sendDuplicateDoc()"
              >
              <span class="icon">
                <i 
                  :class="`${isLoading ? 'fas fa-spinner fa-pulse' : 'far fa-save'}`">
                </i>
              </span>
              <span v-show="!isLoading">
                <span v-if="jsonData">
                  {{ basicDict.bo_save[locale] }}
                </span>
                <span v-else>
                  {{ basicDict.bo_duplicate_select_placeholder[locale] }}
                </span>
              </span>
            </a>

            <!-- CANCEL BTN -->
            <a class="card-footer-item"
              @click="selectedDoc = undefined ; toggleModal()"
              >
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
              <span>
                {{ basicDict.bo_cancel[locale] }}
              </span>
            </a>

          </footer>

        </div>

      
      </div>
    </div>
  </div>
</template>


<script>

  import { mapState, mapGetters } from 'vuex'
  
  import { filterObjectByKey } from '~/plugins/utils.js'
  import { BasicDictionnary } from "~/config/basicDict.js" 

  export default {

    props : [
      'currentColl',
      'currentTab',
      'docConfig',
      'conf'
    ],

    data: function () {
      return {
        isModalOpen : false,
        isLoading : false,

        basicDict : BasicDictionnary, 

        selectedDoc : undefined,
        jsonData : undefined,
      }
    },

    watch : {
      selectedDoc(next, prev){
        this.jsonData = next
      }
    },

    computed : {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale, 
        jwt : state => state.user.jwt,
      }),

      ...mapGetters({
        apivizFrontUUID : 'getApivizFrontUUID',
        rootUrlBackend: 'getRootUrlBackend',
        displayableItem : 'search/getDisplayedProject'
      }),

      subfieldsListOut() {
        let subfieldsList = this.arrayFromObjectsArray(this.docConfig.fields_not_in_model, 'subfield')
        return subfieldsList
      },

    },

    methods : {

      toggleModal() {
        this.isModalOpen = !this.isModalOpen
      },

      onChangeData: function(data) {
        this.jsonData = data
      },

      arrayFromObjectsArray(objArray, property){
        // this.log && console.log("\nC-BackOfficeAddDocModal / arrayFromObjectsArray / this.docConfig :", this.docConfig)
        let array = objArray.map( a => a[property] )
        // this.log && console.log("C-BackOfficeAddDocModal / arrayFromObjectsArray / array \n :", array)
        return array
      },

      filterObjectOut(obj, notAllowedKeys){
        // this.log && console.log("\nC-BackOfficeAddDocModal / filterObjectOut / notAllowedKeys :", notAllowedKeys)
        let allowedKeys = Object.keys(obj).filter( k => !notAllowedKeys.includes(k))
        return filterObjectByKey(obj, allowedKeys)
      },

      sendDuplicateDoc() {

        this.log && console.log("--- --- ---")
        this.log && console.log('C-BackOfficeAddDocModal / sendDuplicateDoc / this.jsonData : \n', this.jsonData)

        this.isLoading = true
        this.customformError = ''

        let currentColl = this.currentColl

        // build payload
        let payload = {
          token : this.jwt.access_token,
          doc_coll : this.currentColl,
          doc_config : this.docConfig,
          doc_data : (this.jsonData ? this.jsonData : this.confToEdit )
        }
        this.log && console.log('C-BackOfficeAddDocModal / sendDuplicateDoc / payload : \n', payload)

        let duplicateRequest = {
          currentColl : currentColl,
          payload : payload,
        }

        this.$store.dispatch('config/addConfigDoc', duplicateRequest)
          .then( resp => {

            this.isLoading = false
            console.log('C-BackOfficeAddDocModal / sendDuplicateDoc / resp.data', resp.data)
            
            // retrieve back the config on 
            let needArgs = ['routes', 'tabs', 'endpoints']
            let dispatchConfig = {
              type : currentColl,    
              configTypeEndpoint : currentColl, 
              args : ( needArgs.includes(currentColl) ? '&as_list=true' : '' )
            }
            this.$store.dispatch('config/getConfigType', dispatchConfig )
            console.log('C-BackOfficeAddDocModal / sendDuplicateDoc / config/getConfigType END...')

            // close moodal
            this.toggleModal()
          })

      },

      // getText(textCode) {
      //   return this.$store.getters['config/defaultText']({txt:textCode})
      // },
      
    }

  }

</script>

<style scoped>
  .addButton {
    margin-bottom: 1rem;
  }
  .no-decoration{
    text-decoration : none;
  }
  .large-modal{
    width : 95%;
    height: 95%;
    /* margin : 40px; */
  }
  /* .is-vertical-center {
    display: flex;
    align-items: center;
  } */
  .modal-card-body.more-padding{
    padding : 2em ;
  }
  .no-margin{
    margin: auto;
  }
  .no-padding {
    padding : 0em;
  }
  .is-scrollable{
    max-height : 275px;
    overflow-y: auto;
  }
</style>