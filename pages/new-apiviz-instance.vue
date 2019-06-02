<template>
  <div>

    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <a class="navbar-item" 
          href="#top">
          <img 
            src="/logos/logo_apiviz_icon_15.png" 
            height="28"
            >
        </a>

        <a 
          role="button" 
          :class="`navbar-burger ${ showNav ? 'is-active' : '' }`"
          aria-label="menu" 
          aria-expanded="false" 
          data-target="navbarNewInstance"
          @click="triggerBurger()" 
          >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>

      <div id="navbarNewInstance" 
        :class="`navbar-menu ${ showNav ? 'is-active' : '' }`"
        >

        <!-- NAV START -->
        <div class="navbar-start">
          <a class="navbar-item"
            href="#top">
            {{ basicDict.welcome_nav[locale] }}
          </a>
        </div> 

        <!-- NAV END -->
        <div class="navbar-end">

          <!-- QUICK START -->
          <a class="navbar-item is-uppercase"
            href="#currentUUID"
            >
            <span>
              {{ basicDict.quick_start[locale] }}
            </span>
          </a>

          <!-- LOCALES -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-uppercase">
              {{ locale }}
            </a>
            <div class="navbar-dropdown">
              <a v-for="(loc, index) in listLocales" class="navbar-item is-uppercase"
                :key="index"
                @click="locale = loc">
                {{ loc }}
              </a>
            </div>
          </div>

          <!-- DOCS LINK -->
          <a class="navbar-item tooltip is-tooltip-bottom"
            href="/https://co-demos.github.io/apiviz-frontend"
            :data-tooltip="basicDict.docs[locale]"
            >
            <span class="icon">
              <i class="fas fa-book"></i>
            </span>
          </a>

          <!-- REPO LINK -->
          <a class="navbar-item tooltip is-tooltip-bottom" 
            :data-tooltip="basicDict.repo[locale]"
            href="https://github.com/co-demos/apiviz-frontend"
            >
            <span class="icon">
              <i class="fab fa-github"></i>
            </span>
          </a>
        
        </div>

      </div>
    </nav>

    <!-- SELECT MODEL FORM -->
    <section id="top" class="hero skip-navbar is-fullheight">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-9">

            <br><br>

            <!-- APIVIZ LOGO -->
            <figure class="image">
              <img src="/logos/logo_apiviz_15.png">
            </figure>
            <br><br>

            <!-- INTRODUCTION -->
            <div class="notification is-primary is-primary-b has-text-centered more-padding">
              
              <p class="is-uppercase is-bold">
                {{ basicDict.intro_1a[locale]}}
                <br>
                {{ basicDict.intro_1b[locale]}}
                <br>
              </p><br>
              <p>
                {{ basicDict.intro_2a[locale]}}
                <a href="#currentUUID">
                  {{ basicDict.intro_2b[locale]}}
                </a>
                {{ basicDict.intro_2c[locale]}}
                <br>
              </p><br>
              <p>
                {{ basicDict.intro_3a[locale]}}
                <a href="https://github.com/co-demos/apiviz-frontend" target="_blank">
                {{ basicDict.open_source_pr[locale]}}
                </a>
                <br> 
                {{ basicDict.intro_3b[locale]}}
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
                      {{ basicDict.check_repo[locale]}}
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
                      {{ basicDict.check_docs[locale]}}
                    </span>
                  </a>
                </div>

              </div>
              
            </div>

            <br id="currentUUID">

            <!-- FEEDBACK CHOICE -->
            <div class="content has-text-centered">
              {{ basicDict.feedback_1[locale]}}
              <span>
                <code>{{ currentApivizFrontUUID }}</code>
              </span>
              <br>
            </div>

            <br>

            <!-- STEPPER -->
            <div 
              ref="thisSteps" 
              class="steps" 
              id="stepGenerator"
              >

              <!-- STE ITEMS -->
              <div class="step-item is-active is-success">
                <div class="step-marker">1</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Your website title -->
                    {{ basicDict.step_title[locale] }}
                  </p>
                </div>
              </div>
              <div class="step-item">
                <div class="step-marker">2</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Select a model -->
                    {{ basicDict.step_model[locale] }}
                  </p>
                </div>
              </div>
              <div class="step-item">
                <div class="step-marker">3</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Your logo -->
                    {{ basicDict.step_logo[locale] }}
                  </p>
                </div>
              </div>
              <div class="step-item">
                <div class="step-marker">4</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Finish -->
                    {{ basicDict.step_finish[locale] }}
                  </p>
                </div>
              </div>

              <!-- STEP CONTENTS -->
              <div class="steps-content">

                <!-- STEPS 1 / TITLE -->
                <div class="step-content has-text-centered is-active">

                  <!-- CHOOSE A TITLE -->
                  <div class="field is-horizontal">
                    <div class="field-label" style="flex-grow : 3">
                      <label class="label">
                        {{ basicDict.title_1a[locale] }}
                      </label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                    <div class="control">
                      <input 
                        class="input has-text-centered" 
                        v-model="new_title"
                        type="text" 
                        placeholder="The title of your new website"
                        >
                    </div>
                      </div>
                    </div>
                  </div>


                </div>

                <!-- STEPS 2 / SELECT MODEL -->
                <div class="step-content has-text-centered">
                  <div class="columns is-centered">
                    
                    <!-- MODEL SELECTION / UUID -->
                    <div class="column is-half">
                      
                      <br>

                      <!-- DEFAULT MODELS -->
                      <div class="field is-block">
                        <label class="label has-text-centered">
                          {{ basicDict.select_1a[locale]}}
                          <br>
                          {{ basicDict.select_1b[locale]}}
                        </label>
                        <div class="control">
                          <div class="select is-fullwidth is-primary is-primary-b ">

                            <select v-model="selectedModel">

                              <option  
                                :value="null" disabled>
                                {{ basicDict.select_1c[locale]}}
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
                      <br>

                      <div class="is-divider" data-content="OR"></div>

                      <!-- ENTER UUID -->
                      <label class="label has-text-centered">
                        <span>
                          {{ basicDict.uuid_1a[locale]}}
                          <br> 
                          {{ basicDict.uuid_1b[locale]}}
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
                            <span class="icon">
                              <i class="fas fa-search"></i>
                            </span>
                          </a>
                        </p>
                      </div>
                      <p v-show="invalidModel" class="help is-danger">
                        {{ basicDict.uuid_invalid[locale]}}
                      </p>

                    </div>

                    <!-- PREVIEW OF SELECTED MODEL -->
                    <div class="column is-half">
                      <div class="is-divider" 
                        :data-content="basicDict.feedback_preview[locale]">
                      </div>
                      <div class="box">
                        <div v-if="!selectedModel">
                          <div class="has-text-centered">
                            {{ basicDict.feedback_preview[locale]}}  
                          </div>
                        </div>
                        <figure v-if="selectedModel && selectedModel.preview" class="image">
                          <img :src="selectedModel.preview">
                        </figure>
                      </div>

                    </div>

                  </div>

                </div>

                <!-- STEPS 3 / CHOOSE A LOGO URL -->
                <div class="step-content has-text-centered">
                  <!-- <label class="label has-text-centered">
                    {{ basicDict.logo_1a[locale] }}
                  </label> -->
                  <div class="columns">

                    <!-- LOGO URL -->
                    <div class="column is-half">
                      <p class="has-text-centered has-text-grey" style="margin-bottom:0.5em">
                        {{ basicDict.logo_1b[locale] }}
                      </p>
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
                      <p class="has-text-centered has-text-grey" style="margin-bottom:0.5em">
                        {{ basicDict.logo_1c[locale] }}
                      </p>
                      <div class="box">
                        <figure class="image">
                          <img 
                            :src="new_logoUrl">
                        </figure>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- STEPS 4 / CREATE BUTTON -->
                <div class="step-content has-text-centered">
                  
                  <br> 

                  <!-- CREATE NEW CONFIG BTN -->
                  <div v-if="!isCreated" class="columns is-centered">
                    <div class="column is-12">
                      <a :disabled="!selectedModel"
                        :class="`${createLoading? 'is-loading' : ''} button is-primary is-primary-b is-rounded is-medium is-fullwidth`"
                        @click="createApivizInstance()"
                        >
                        <span class="icon">
                          <i class="fas fa-plus-circle"></i>
                        </span>
                        <span v-if="selectedModel">
                          {{ basicDict.create_1a[locale] }}
                        </span>
                        <span v-else>
                          {{ basicDict.create_1b[locale] }}
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
                          {{ basicDict.goto_1a[locale] }}
                        </span>
                      </a>
                    </div>
                  </div>

                  <br>


                  <div class="columns">
                    
                    <!-- TAGS -->
                    <div class="column is-half">
                      <div v-if="selectedModel" class="content has-text-centered">

                        <div v-for="(distincts, dfield) in selectedModel.distincts" :key="dfield">

                          <div class="is-divider" 
                            :data-content="basicDict.tags_1a[locale] + ' ' + basicDict[dfield][locale]">
                          </div>
                          <div class="tags">
                            <span v-for="(d, indexD) in distincts" class="tag is-primary" :key="indexD">
                              {{ d }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- IMAGE PREVIEW OF SELECTED MODEL -->
                    <div class="column is-half">
                      <div class="is-divider" 
                        :data-content="basicDict.feedback_preview[locale]">
                      </div>
                      <div class="box">
                        <div v-if="!selectedModel">
                          <div class="has-text-centered">
                            {{ basicDict.feedback_preview[locale]}}  
                          </div>
                        </div>
                        <figure v-if="selectedModel && selectedModel.preview" class="image">
                          <img :src="selectedModel.preview">
                        </figure>
                      </div>
                    </div>

                  </div>
                  


                </div>

              </div>

              <!-- STEPS ACTIONS -->
              <div class="steps-actions">
                <div class="steps-action">
                  <a href="#currentUUID" data-nav="previous" class="button is-primary">
                    <span class="icon">
                      <i class="fas fa-chevron-left"></i>
                    </span>
                    <span>
                      <!-- Previous -->
                      {{ basicDict.previous[locale] }}
                    </span>
                  </a>
                </div>
                <div class="steps-action">
                  <a href="#currentUUID" data-nav="next" class="button is-primary">
                    <span>
                      <!-- Next -->
                      {{ basicDict.next[locale] }}
                    </span>
                    <span class="icon">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                  </a>
                </div>
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
    <br><br><br>
    <br><br><br>
    <br><br><br>
    <br><br><br>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import { BasicDictionnary } from "~/config/basicDict.js" 
  
  // import bulmaSteps from '@/node_modules/bulma-extensions/bulma-steps/dist/js/bulma-steps.min.js'
  import {bulmaSteps} from '@/node_modules/bulma-extensions/dist/js/bulma-extensions.min.js'

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

    watch : {
      selectedModel(next, prev){
        if (next && next.uuid ){
          this.searchUuid = next.uuid
        }
        else {
          this.searchUuid = undefined
        }
      }
    },

    data () {
      return {

        locale : 'en',
        listLocales : ['en', 'fr'],
        showNav : false,

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

        basicDict : BasicDictionnary, 

        bulmaExtensions: {},
  
      }
    },

    mounted () {
      this.log && console.log('\nP-new-apiviz-instance.vue / mounted...')
      this.log && console.log('P-new-apiviz-instance.vue / mounted / bulmaSteps : ', bulmaSteps)
      bulmaSteps.attach()
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

      triggerBurger(){
        this.showNav = !this.showNav
      },

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
            this.selectedModel = model
            // this.selectedModel = {
            //   name : model.content,
            //   preview : model.image_preview,
            //   uuid : model.apiviz_front_uuid
            // }
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

<style scoped>
  .add-margin-bottom{
    margin-bottom: 1em;
  }
  .more-padding{
    padding: 2.5em;
  }
</style>
