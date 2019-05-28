<template>

  <div>

    <!-- SIMPLE BLOC EDIT / f.i app_languages doc -->
    <div v-if="docConfig.type === 'blocs' " 
      >
      <BackOfficeJSON
        :configCollection="activeMenu"
        :currentTab="currentTab"
        :docId="conf._id"
        :docHelp="conf.help"

        :docConfig="docConfig"

        :confEditSubfield="docConfig.field"
        :confEditTitle="docConfig.title"
        :confEdit="docConfig"

        :confToEdit="filterObject( conf, subfieldsList )"
        >
      </BackOfficeJSON>
    </div>

    <!-- DEPRECATED (FOR NOW) // SUBFIELDS LIST / f.i. navbar links in app_navbar doc -->
    <div v-if="docConfig.type === 'blocs_list' "  
      >

      <!-- LOOP DOCCONFIG EDIT -->
      <div v-for="confEdit in docConfig.edit"
        :key="confEdit.subfield"
        >
        <div
          v-for="(subConf, index) in configToEdit(conf, confEdit.subfield )"
          :key="index"
          >
          <BackOfficeJSON
            :configCollection="activeMenu"
            :currentTab="currentTab"
            :docId="conf._id"
            :docHelp="subConf[docConfig.help_field]"

            :docConfig="docConfig"

            :confEditSubfield="confEdit.subfield"
            :confEditTitle="confEdit.subfield + '.' + index"
            :confEdit="confEdit.object_model"

            :confToEdit="subConf"
            >
          </BackOfficeJSON>
        </div>
      </div>

    </div>

    <!-- DOCS LIST / f.i. endpoints docs in endpoints collection -->
    <div v-if="docConfig.type === 'docs_list' " 
      > 

      <!-- LOOP CONF DOCS -->
      <div v-for="(docConf, index) in conf"
        :key="index"
        >
        <BackOfficeJSON
          :configCollection="activeMenu"
          :currentTab="currentTab"
          :docId="docConf._id"
          :docHelp="docConf[docConfig.help_field]"

          :docConfig="docConfig"

          :confEditSubfield="docConf.field"
          :confEditTitle="undefined"
          :confEdit="docConfig.fields_not_in_model"

          :confToEdit="filterObjectOut( docConf, subfieldsListOut )"
          >
        </BackOfficeJSON>
      </div>
      
    </div>


    <!-- ADD ELEMENT BTN -->
    <div v-if="docConfig.add_delete"
      class="addButton has-text-centered" 
      >
      <a class="button is-primary"
        @click="addElement(docConfig)"
        >
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>
          Add {{ currentTab.title }}
        </span>
      </a>
    </div>

  </div>

</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import { getObjectDataFromPath, filterObjectByKey } from '~/plugins/utils.js'

  import BackOfficeJSON from './BackOfficeJSON.vue';

  export default {

    components: {
      BackOfficeJSON
    },

    props: [
      'activeMenu',
      'docConfig',
      'currentTab',
      'conf'
    ],

    data: function () {
      return {
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        user : state => state.user.user,
        config: state => state.config.config,
      }),

      ...mapGetters({
      }),

      subfieldsList() {
        let subfieldsList = this.arrayFromObjectsArray(this.docConfig.edit, 'subfield')
        return subfieldsList
      },
      subfieldsListOut() {
        let subfieldsList = this.arrayFromObjectsArray(this.docConfig.fields_not_in_model, 'subfield')
        return subfieldsList
      },
    },

    beforeMount : function(){

    },

    mounted(){

    },

    methods: {

      arrayFromObjectsArray(objArray, property){
        // this.log && console.log("\nC-BackOfficeDispatch / arrayFromObjectsArray / this.docConfig :", this.docConfig)
        let array = objArray.map( a => a[property] )
        // this.log && console.log("C-BackOfficeDispatch / arrayFromObjectsArray / array \n :", array)
        return array
      },

      getConfigDoc(field){
        return this.config[this.activeMenu][field]
      },
      getConfigDocsList(list_filters){
        let allDocs = this.config[this.activeMenu]
        return allDocs
      },

      filterObject(obj, allowedKeys){
        // this.log && console.log("\nC-BackOfficeDispatch / filterObject / allowedKeys :", allowedKeys)
        return filterObjectByKey(obj, allowedKeys)
      },

      filterObjectOut(obj, notAllowedKeys){
        // this.log && console.log("\nC-BackOfficeDispatch / filterObjectOut / notAllowedKeys :", notAllowedKeys)
        let allowedKeys = Object.keys(obj).filter( k => !notAllowedKeys.includes(k))
        return filterObjectByKey(obj, allowedKeys)
      },

      configToEdit(conf, subfield, ){
        return getObjectDataFromPath(conf, subfield, '.')
      },

      addElement(docConfig){
        // TO DO 
        this.log && console.log("\nC-BackOfficeDispatch / addElement / docConfig :", docConfig)
      },
    }

  }
</script>

<style scoped>
  .addButton {
    margin-bottom: 1rem;
  }
</style>