<style scoped>
  .add-margin-bottom{
    margin-bottom: 1em;
  }
  .more-padding{
    padding: 2.5em;
  }
</style>

<template>
  <div>
    <!-- WELCOME PAGE -->
    <section class="hero is-primary is-primary-b">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to Apiviz
          </h1>
          <h2 class="subtitle">
            select a model to create a brand new apiviz website 
          </h2>
        </div>
      </div>
    </section>

    <!-- SELECT MODEL FORM -->
    <section class="hero skip-navbar is-fullheight">
        <div class="container">
          <div class="columns is-vcentered is-centered">
            <div class="column is-two-thirds">

            <!-- APIVIZ LOGO -->
            <figure class="image">
              <img src="/logos/logo_apiviz_15.png">
            </figure>
            <br><br>

            <!-- INTRODUCTION -->
            <div class="notification is-primary is-primary-b has-text-centered more-padding">
              
              <p class="is-uppercase is-bold">
                Create a new data visualisation website <br>in a few clicks with Apiviz !<br>
              </p><br>
              <p>
                To do so you can start with an 
                <a href="#currentUUID">existing model</a>
                and then modify it from the back-office<br>
              </p><br>
              <p>
                Apiviz is an 
                <a href="https://github.com/co-demos/apiviz-frontend" target="_blank">
                open source project
                </a>
                <br> so you can also use the source code instead of the saas service
              </p><br>

              <div class="columns is-centered is-8">

                <!-- REPO -->
                <div class="column -is-half">
                  <a class="button is-primary is-primary-b is-outlined is-fullwidth"
                    href="https://github.com/co-demos/apiviz-frontend" 
                    target="/_blank"
                    >
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>
                      Check the repo
                    </span>
                  </a>
                </div>

                <!-- DOCS -->
                <div class="column -is-half">
                  <a class="button is-primary is-primary-b is-outlined is-fullwidth"
                    href="https://co-demos.github.io/apiviz-frontend" 
                    target="/_blank"
                    >
                    <span class="icon">
                      <i class="fas fa-book"></i>
                    </span>
                    <span>
                      Check the documentation
                    </span>
                  </a>
                </div>

              </div>
              
            </div>

            <br><br>
            <br id="currentUUID">
            
            <!-- FORM INTRO -->
            <!-- <h2 class="has-text-centered is-uppercase is-bold has-text-primary">
              create your datavisualisation website
            </h2> -->

            <!-- FEEDBACK CURRENT UUID -->
            <div class="is-divider" data-content="your current UUID"></div>
            <div class="content has-text-centered">
              <span>
                <code>{{ currentApivizFrontUUID }}</code>
              </span>
            </div>

            <!-- CUSTOM DIVIDER -->
            <div class="is-divider" data-content="create your datavisualisation website from a model"></div>
            <br><br>

            <!-- SELECT MODEL -->
            <div class="columns is-centered">
              
              <!-- DEFAULT MODELS -->
              <div class="column is-half">
                <div class="field is-block">
                  <label class="label has-text-centered">
                    select a default model <br>for your new apiviz website
                  </label>
                  <div class="control">
                    <div class="select is-fullwidth is-primary is-primary-b ">

                      <select v-model="selectedModel">

                        <option  
                          :value="null" disabled>
                          Please select a model
                        </option>

                        <option 
                          v-for="(model, index) in apivizModels.modelUuids" 
                          :key="index"
                          :value="model"
                          >
                          {{ model.name }}
                        </option>

                      </select>

                    </div>
                  </div>
                </div>
              </div>

              <div class="is-divider-vertical" data-content="OR"></div>

              <!-- ENTER UUID -->
              <div class="column is-half">
                <label class="label has-text-centered">
                  <span>
                    you already have <br> a model's UUID
                  </span>
                  <span class="icon tooltip" 
                    data-tooltip="f.i. Sonum website uuid: c5efafab-1733-4ad1-9eb8-d529bc87c481"
                    >
                    <i class="far fa-question-circle"></i>
                  </span>
                </label>

                <div class="field has-addons">
                  <p class="control is-expanded">
                    <input 
                      v-model="searchUuid"
                      class="input" 
                      type="text" 
                      placeholder="enter an UUID">
                  </p>
                  <p class="control">
                    <a :class="`${searchLoading ? 'is-loading' : ''} button is-primary is-primary-b is-outlined`"
                      :disabled="!searchUuid"
                      @click="getUUIDmodel()"
                      >
                      <!-- Search model -->
                      <span class="icon">
                        <i class="fas fa-search"></i>
                      </span>
                    </a>
                  </p>
                </div>
                <p v-show="invalidModel" class="help is-danger">
                  This model is invalid
                </p>

              </div>

            </div>

            <!-- FEEDBACK CHOICE -->
            <div class="content has-text-centered">
              model's name : 
              <span v-if="selectedModel">
                <code>{{ selectedModel.name }}</code>
              </span><br>
              model's UUID : 
              <span v-if="selectedModel">
                <code>{{ selectedModel.uuid }}</code>
              </span>
            </div

            <br>

            <!-- IMAGE PREVIEW OF SELECTED MODEL -->
            <div class="box">
              <div v-if="!selectedModel">
                <div class="has-text-centered">
                  ( preview of the selected model )
                </div>
              </div>
              <figure v-if="selectedModel" class="image">
                <img :src="selectedModel.preview">
              </figure>
            </div>

            <br>

            <!-- CHOOSE A TITLE -->
            <div class="field">
              <label class="label has-text-centered">
                Your new website title
              </label>
              <div class="control">
                <input 
                  class="input has-text-centered" 
                  v-model="new_title"
                  type="text" 
                  placeholder="The title of your new website"
                  >
              </div>
            </div>
            <br>

            <!-- CHOOSE A LOGO URL -->
            <label class="label has-text-centered">
              Your new website logo
            </label>
            <div class="columns">

              <!-- LOGO URL -->
              <div class="column is-half">
                <p class="has-text-centered" style="margin-bottom:0.5em">enter your logo url</p>
                <div class="field">
                  <div class="control">
                    <textarea 
                      class="textarea" 
                      v-model="new_logoUrl"
                      placeholder="the url of your logo's image"
                      >
                    </textarea>
                  </div>
                </div>
              </div>

              <!-- LOGO PREVIEW -->
              <div class="column is-half">
                <p class="has-text-centered" style="margin-bottom:0.5em">your logo preview</p>
                <div class="box">
                  <figure class="image">
                    <img 
                      :src="new_logoUrl">
                  </figure>
                </div>
              </div>

            </div>

            <br><br>

            <!-- CREATE BUTTON -->
            <div v-if="!isCreated" class="columns is-centered">
              <div class="column is-12">
                <a :disabled="!selectedModel"
                  :class="`${createLoading? 'is-loading' : ''} button is-primary is-primary-b is-rounded is-medium is-fullwidth`"
                  @click="createApivizInstance()"
                  >
                  <span class="icon">
                    <i class="fas fa-plus-circle"></i>
                  </span>
                  <span>
                    Create your new Apiviz website
                  </span>
                </a>
              </div>
            </div>


            <!-- SEEE NEW WEBSITE BUTTON -->
            <div v-if="isCreated" class="columns is-centered">
              <div class="column is-half">
                <a
                  :class="`button is-danger is-rounded is-medium is-fullwidth`"
                  @click="goToNewWebsite()"
                  >
                  <span class="icon">
                    <i class="fas fa-external-link-alt"></i>
                  </span>
                  <span>
                    See your new Apiviz website
                  </span>
                </a>
              </div>
            </div>


            <!-- DEBUGGING -->
            <br>
              <!-- (console) log : <code>{{ log }}</code><br> -->
              <!-- runMode : <code>{{ runMode }}</code><br> -->
              <!-- currentApivizFrontUUID : <code>{{ currentApivizFrontUUID }}</code><br> -->
              <!-- rootUrlBackend : <code>{{ rootUrlBackend }}</code><br> -->

              <!-- <hr> -->

              <!-- selectedModel : <code>{{ selectedModel }}</code><br> -->
              <!-- apivizModels : <pre><code>{{ JSON.stringify(apivizModels, null, 1) }}</code></pre><br> -->

              <!-- builtRequest : <code>{{ builtRequest }}</code><br> -->
              
              <!-- <hr> -->

          </div>
        </div>
      </div>
    </section>

    <br><br><br>
    <br><br><br>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    
    layout: 'basicLayout',

    components: {

    },

    middleware : [
      'getDefaultApivizModels'
    ],

    beforeMount : function(){
      // this.log && console.log('\nP-new-apiviz-instance.vue / beforeMount...')
    },

    data () {
      return {

        errorMessage : undefined,
        errorModalOpen : false,

        searchLoading : false,
        createLoading : false,
        invalidModel : false, 

        isCreated : false,

        selectedModel : null,
        searchUuid : undefined,
        new_title : 'my new Apiviz website',
        new_logoUrl : 'https://github.com/co-demos/carto-sonum/blob/master/logos/logo%2Bmarianne_typo%20sombre%404x.png?raw=true',
      }
    },

    computed: {

      ...mapState({
        log : state => state.log,
        currentApivizFrontUUID : state => state.apivizFrontUUID,
        runMode : state => state.runMode,
        rootUrlBackend : state => state.rootUrlBackend,
      }),

      ...mapGetters({
        apivizModels : 'config/getApivizModels',
      }),
      
      builtRequest() {
        return {
          modelUuid : (this.selectedModel ? this.selectedModel.uuid : ''),
          new_title : this.new_title,
          new_logoUrl : this.new_logoUrl,
        }
      },

    },

    methods: {

      // getDefaultApivizModels(){
        // as middleware
      //   this.log && console.log('\nP-new-apiviz-instance.vue / getDefaultApivizModels...')
      //   this.$store.dispatch('config/getDefaultApivizModels')
      // },

      getUUIDmodel(){
        // this.log && console.log('\nP-new-apiviz-instance.vue / getUUIDmodel...')

        this.errorMessage = undefined
        this.errorModalOpen = false,

        this.searchLoading = true

        let modelUUID = this.searchUuid.trim()
        // this.log && console.log('\nP-new-apiviz-instance.vue / getUUIDmodel / modelUUID : ', modelUUID)
        this.$store.dispatch('config/getModelFromUuid', modelUUID)
        .then( resp => {
          // this.log && console.log('\nP-new-apiviz-instance.vue / getUUIDmodel / resp.data \n : ', resp.data)
          
          let model = resp.data.model 
          // this.log && console.log('\nP-new-apiviz-instance.vue / getUUIDmodel / model \n : ',model)

          if (  model !== null ){
            this.selectedModel = {
              name : model.content,
              preview : model.image_preview,
              uuid : model.apiviz_front_uuid
            }
            this.invalidModel = false
          } else {
            this.invalidModel = true
          }
          this.searchLoading = false
        })
        .catch((error) =>{
          this.log && console.log('\nP-new-apiviz-instance.vue / getUUIDmodel / error : ', error)
          this.searchLoading = false
          this.errorMessage = error
        })

      },

      createApivizInstance(){
        // this.log && console.log('\nP-new-apiviz-instance.vue / createApivizInstance...')
        
        this.errorMessage = undefined
        this.errorModalOpen = false,

        this.createLoading = true

        let request = this.builtRequest
        // this.log && console.log('\nP-new-apiviz-instance.vue / createApivizInstance / request \n : ', request)
        this.$store.dispatch('config/createNewConfig', request)
        .then( resp => {
          // this.log && console.log('\nP-new-apiviz-instance.vue / createApivizInstance / resp.data \n : ', resp.data)
          this.createLoading = false
        })
        .catch((error) => {
          this.log && console.log('\nP-new-apiviz-instance.vue / createApivizInstance / error : ', error)
          this.createLoading = false
          this.errorMessage = error
        })

      },

      goToNewWebsite(){
        this.$nuxt.$router.push('/')
      },

    }

  }
</script>

<style>

</style>
