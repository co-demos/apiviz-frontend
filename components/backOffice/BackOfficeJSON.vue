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
          {{ configCollection }} > {{ docConfigField }} > {{ confEdit.subfield }}
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
          configCollection : <code>{{ configCollection }}</code></br>
          docId : <code>{{ docId }}</code></br>
          docConfigField : <code>{{ docConfigField }}</code></br>
          confEdit : <code>{{ confEdit }}</code></br>
          confToEdit  : <br><pre><code>{{ JSON.stringify(confToEdit, null, 1) }}</code></pre></br>

        </div>

      </div>

    </div>
    <br />

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
    'docId',
    'docConfigField',
    'confEdit',
    'confToEdit'
  ],

  data: function () {

    return {
      isOpen : false,
      customformError : '',

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
  },

  methods : {
    
    toggleContent() {
      this.isOpen = !this.isOpen
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