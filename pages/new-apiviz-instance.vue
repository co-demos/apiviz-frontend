<template>
  <div>

    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <!-- LOGO -->
        <a class="navbar-item" 
          href="#top"
          >
          <img 
            src="/logos/logo_apiviz_icon_15.png" 
            height="28"
            >
        </a>

        <!-- BURGER -->
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

      <!-- NAVBAR ITEMS -->
      <div id="navbarNewInstance" 
        :class="`navbar-menu ${ showNav ? 'is-active' : '' }`"
        >

        <!-- NAV START -->
        <div class="navbar-start">
          <a class="navbar-item"
            @click="showSteps=false"
            >
            <!-- href="#top" -->
            {{ basicDict.welcome_nav[locale] }}
          </a>
        </div> 

        <!-- NAV END -->
        <div class="navbar-end">

          <!-- QUICK START -->
          <a class="navbar-item is-uppercase"
            @click="showSteps=true"
            >
            <!-- href="#currentUUID" -->
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
          <a class="navbar-item tooltip is-tooltip-left" 
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

        <!-- APIVIZ LOGO -->
        <div class="columns is-vcentered is-centered">
          <div :class="`column is-${showSteps ? 3 : 6 }`">
            <br>
            <figure class="image">
              <img src="/logos/logo_apiviz_15.png">
            </figure>
          </div>
        </div>

        <!-- CONTENTS -->
        <div class="columns is-vcentered is-centered">
          <div :class="`column is-${showSteps ? 10 : 9 }`">

            <!-- INTRODUCTION -->
            <div v-show="!showSteps">
              <br>

              <div class="notification is-primary is-primary-b has-text-centered">
                
                <p class="is-uppercase is-bold">
                  {{ basicDict.intro_1a[locale]}}
                  <br>
                  {{ basicDict.intro_1b[locale]}}
                  <br>
                </p>

              </div>

              <div class="has-text-centered">

                <br>

                <div class="columns is-centered">

                  <!-- TEXT / start with model -->
                  <div class="column -is-half">
                    <p>
                      {{ basicDict.intro_2a[locale]}}
                      <a @click="showSteps=true">
                        {{ basicDict.intro_2b[locale]}}
                      </a>
                      {{ basicDict.intro_2c[locale]}}
                      <br>
                    </p><br>
                  </div>

                  <!-- FEEDBACK UUID -->
                  <div class="column -is-half">
                    <div class="content has-text-centered">
                      {{ basicDict.feedback_1[locale]}} 
                      <br>
                      <span>
                        <code>{{ currentApivizFrontUUID }}</code>
                      </span>
                      <br>
                    </div>
                  </div>

                </div>


                <!-- QUICK START -->
                <a class="button is-primary is-primary-b is-outlined is-large is-rounded is-fullwidth"
                  @click="showSteps=true"
                  >
                  <span class="icon is-medium">
                    <i class="far fa-play-circle"></i>
                  </span>
                  <span class="is-uppercase">
                    {{ basicDict.quick_start[locale] }}
                  </span>
                </a>

                <br>
                <br>
                <br>

                <!-- EXTRA TEXTS AND LINKS -->
                <div class="columns is-centered is-vcentered is-8">

                  <!-- TEXT / apiviz is open source  -->
                  <div class="column -is-half">
                    <p>
                      {{ basicDict.intro_3a[locale]}}
                      <a href="https://github.com/co-demos/apiviz-frontend" target="_blank">
                      {{ basicDict.open_source_pr[locale]}}
                      </a>
                      <br> 
                      {{ basicDict.intro_3b[locale]}}
                    </p>
                  </div>

                  <div class="column -is-half">

                    <!-- REPO -->
                    <a class="button is-grey is-grey-b is-outlined is-rounded is-fullwidth"
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
                    <br>
                    <!-- DOCS -->
                    <a class="button is-grey is-grey-b is-outlined is-rounded is-fullwidth"
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
            
            </div>


            <!-- STEPPER RESPONSE MESSAGE -->
            <div 
              v-show="responseMessage && responseModalOpen "
              >
              <div 
                :class="`notification ${ responseStatus === 200 ? 'is-info' : 'is-danger'}`">
                <button 
                  class="delete"
                  @click="responseModalOpen = false"
                  >
                </button>
                <p class="has-text-centered">
                  <!-- {{ responseMessage }} -->
                  {{ basicDict[responseMsgCode][locale] }}
                </p>
              </div>
              <br>
            </div>

            <!-- STEPPER -->
            <div 
              v-show="showSteps"
              ref="thisSteps" 
              class="steps" 
              id="stepGenerator"
              >
              
              <!-- STEPS ITEMS -->
              <div class="step-item is-succes">
                <div class="step-marker">1</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Select a model -->
                    {{ basicDict.step_model[locale] }}
                  </p>
                </div>
              </div>
              <div class="step-item is-active">
                <div class="step-marker">2</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Your website title -->
                    {{ basicDict.step_title[locale] }}
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
                    <!-- Your email -->
                    {{ basicDict.step_email[locale] }}
                  </p>
                </div>
              </div>
              <div class="step-item">
                <div class="step-marker">5</div>
                <div class="step-details">
                  <p class="step-title">
                    <!-- Finish -->
                    {{ basicDict.step_finish[locale] }}
                  </p>
                </div>
              </div>

              <!-- STEP CONTENTS -->
              <div class="steps-content">

                <!-- STEPS 1 / SELECT MODEL -->
                <div class="step-content has-text-centered is-active">
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

                      <div class="is-divider" :data-content="basicDict.or[locale]"></div>

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
                            :placeholder="basicDict.uuid_1c[locale]">
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

                  <hr class="no-bottom-margin">
                </div>

                <!-- STEPS 2 / TITLE -->
                <div class="step-content has-text-centered">

                  <br>

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
                        :placeholder="basicDict.title_1b[locale]"
                        >
                    </div>
                      </div>
                    </div>
                  </div>
                  <br>

                  <hr class="no-bottom-margin">

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
                            class="textarea is-small"
                             rows="5" 
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

                  <hr class="no-bottom-margin">

                </div>

                <!-- STEPS 4 / ADMIN NAME / SURNAME / EMAIL  -->
                <div class="step-content has-text-centered">

                  <br>

                  <!-- CHOOSE AN ADMIN NAME / SURNAME / EMAIL -->
                  <div class="columns is-centered">
                    <div class="column is-8">
                      <div class="field is-horizontal">
                        <div class="field-label" style="flex-grow : 2">
                          <label class="label">
                            {{ basicDict.name_1a[locale] }}
                          </label>
                        </div>
                        <div class="field-body">
                          <div class="field">
                        <div class="control">
                          <input 
                            class="input has-text-centered" 
                            v-model="new_admin_name"
                            type="text" 
                            :placeholder="basicDict.name_1b[locale]"
                            >
                        </div>
                          </div>
                        </div>
                      </div>
                      <div class="field is-horizontal">
                        <div class="field-label" style="flex-grow : 2">
                          <label class="label">
                            {{ basicDict.surname_1a[locale] }}
                          </label>
                        </div>
                        <div class="field-body">
                          <div class="field">
                        <div class="control">
                          <input 
                            class="input has-text-centered" 
                            v-model="new_admin_surname"
                            type="text" 
                            :placeholder="basicDict.surname_1b[locale]"
                            >
                        </div>
                          </div>
                        </div>
                      </div>
                      <div class="field is-horizontal">
                        <div class="field-label" style="flex-grow : 2">
                          <label class="label">
                            {{ basicDict.email_1a[locale] }}
                          </label>
                        </div>
                        <div class="field-body">
                          <div class="field">
                        <div class="control">
                          <input 
                            class="input has-text-centered" 
                            v-model="new_admin_email"
                            type="email" 
                            :placeholder="basicDict.email_1b[locale]"
                            >
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br>

                  <hr class="no-bottom-margin">

                </div>

                <!-- STEPS 5 / CREATE BUTTON -->
                <div class="step-content has-text-centered">
                  
                  <br> 

                  <!-- CREATE NEW CONFIG BTN -->
                  <div v-if="!isCreated" class="columns is-centered">
                    <div class="column is-12">
                      <a :disabled="!hasAllFields"
                        :class="`button ${createLoading? 'is-loading' : ''} ${ hasAllFields ? 'is-primary is-primary-b' : 'is-grey is-grey-b'} is-rounded is-medium is-fullwidth`"
                        @click="createApivizInstance()"
                        >
                        <span class="icon">
                          <i class="fas fa-plus-circle"></i>
                        </span>
                        <span v-if="hasAllFields">
                          {{ basicDict.create_1a[locale] }}
                        </span>
                        <span v-else>
                          <span v-if="!selectedModel">{{ basicDict.create_1b[locale] }}</span>
                          <span v-else-if="!new_admin_email">{{ basicDict.create_1c[locale] }}</span>
                          <span v-else>{{ basicDict.create_1d[locale] }}</span>
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

                  <!-- RESUME -->
                  <div class="columns">
                    
                    <!-- TITLE + TAGS -->
                    <div class="column is-one-third">

                      <!-- REPEAT TITLE -->
                      <div class="is-divider" 
                        :data-content="basicDict.title_1a[locale]">
                      </div>
                      <p class="content hast-text-centered">
                        <strong>{{ new_title }}</strong>
                      </p>

                      <!-- REPEAT LOGO -->
                      <div class="is-divider" 
                        :data-content="basicDict.logo_1c[locale]">
                      </div>
                      <div class="box">
                        <figure class="image">
                          <img 
                            :src="new_logoUrl">
                        </figure>
                      </div>

                      <!-- REPEAT ADMIN INFOS -->
                      <div class="is-divider" 
                        :data-content="basicDict.admin_1a[locale]">
                      </div>
                      <p class="content hast-text-centered">
                        {{ new_admin_name }} 
                        <strong>{{ new_admin_surname }}</strong>
                      </p>
                      <p class="content hast-text-centered">
                        {{ new_admin_email }}
                      </p>
                    </div>
                    
                    <!-- IMAGE PREVIEW OF SELECTED MODEL -->
                    <div class="column is-one-third">

                      <!-- MODEL'S PREVIEW -->
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

                      <!-- MODEL'S TAGS -->
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

                    <!-- SPECS OF SELECTED MODEL -->
                    <div class="column is-one-third">

                      <!-- MODEL'S SPECS -->
                      <div v-if="selectedModel" class="content has-text-centered">
                        <div v-for="(specs, sfield) in selectedModel.specs" :key="sfield">
                         
                          <div class="is-divider" 
                            :data-content="basicDict[sfield][locale]">
                          </div>

                          <div v-if="sfield in specsRenderer">

                            <div v-if="specsRenderer[sfield]['render'] === 'colorsLoop'">
                              <table class="table is-bordered is-size-7">
                                <thead>
                                  <tr>
                                    <th>{{ basicDict.app_colors_class[locale]}}</th>
                                    <th>{{ basicDict.app_colors_color[locale]}}</th>
                                    <th>{{ basicDict.app_colors_code[locale]}}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(color, colClass) in specs[ specsRenderer[sfield]['field'] ]" :key="colClass">
                                    <td>
                                      <code>{{ colClass }}</code>
                                    </td>
                                    <td class="has-text-centered">
                                      <span class="bd-color" :style="'background : ' + color">
                                      </span>
                                    </td>
                                    <td class="has-text-centered">
                                      <code>
                                        {{ color }}
                                      </code>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div v-else-if=" specsRenderer[sfield]['render'] === 'tagsList'">
                              <div class="tags">
                                <span v-for="(s, indexS) in specs[ specsRenderer[sfield]['field'] ]" class="tag is-primary" :key="indexS">
                                  {{ s }}
                                </span>
                              </div>

                            </div>

                            <div v-else>
                              <code>
                                ...{{ specs[ specsRenderer[sfield]['field'] ] }}
                              </code>
                            </div>

                          </div>

                        </div>
                      </div>

                    </div>

                  </div>
                  
                  <hr class="no-bottom-margin">

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
            <!-- <br> -->
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

    <br>
    <br>

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
        listLocales : [
          'en', 
          'es', 
          'fr', 
          // 'de', 
          // 'tr'
        ],
        showNav : false,

        showSteps : false,

        responseMessage : undefined,
        responseStatus : 200,
        responseModalOpen : true,
        responseMsgCode : 'empty_dict',

        searchLoading : false,
        createLoading : false,
        invalidModel : false, 

        isCreated : false,

        selectedModel : null,
        searchUuid : undefined,
        new_title : 'my new Apiviz website',
        new_logoUrl : 'https://github.com/co-demos/carto-sonum/blob/master/logos/logo%2Bmarianne_typo%20sombre%404x.png?raw=true',
        new_admin_email : '',
        new_admin_name : '',
        new_admin_surname : '',

        basicDict : BasicDictionnary, 
        specsRenderer : {
          app_colors : { field: "content", render : 'colorsLoop' },
          app_languages : { field: "languages", render : 'tagsList' },
        },

        // bulmaExtensions: {},
  
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

      hasAllFields(){
        return this.new_admin_email && this.selectedModel
      },
      
      builtRequest() {
        return {
          modelUuid : (this.selectedModel ? this.selectedModel.uuid : ''),
          new_title : this.new_title,
          new_logoUrl : this.new_logoUrl,
          new_admin : this.new_admin_email,
          new_admin_name : this.new_admin_name,
          new_admin_surname : this.new_admin_surname,
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
            this.invalidModel = false
          } else {
            this.invalidModel = true
          }
          this.searchLoading = false
        })
        .catch((error) =>{
          this.log && console.log('\nP-new-apiviz-instance.vue / getUUIDmodel / error : ', error)
          this.searchLoading = false
          this.errorModadOpen = true
          this.errorMessage = error
          this.responseStatus = 500
          this.responseMsgCode = 'error_1a'
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
          this.log && console.log('\nP-new-apiviz-instance.vue / createApivizInstance / resp.data \n : ', resp.data)
          this.createLoading = false

          this.responseModadOpen = true
          this.responseMessage = resp.data.msg
          this.responseStatus = resp.data.status
          this.responseMsgCode = resp.data.msg_code

        })
        .catch((error) => {
          this.log && console.log('\nP-new-apiviz-instance.vue / createApivizInstance / error : ', error)
          this.createLoading = false
          this.responseModadOpen = true
          this.responseMessage = error
          this.responseStatus = 500
          this.responseMsgCode = 'error_1a'
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
  .no-bottom-margin {
    margin-bottom : 0em;
  }
  .bd-color {
    border-radius: 2px;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1),inset 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    float: left;
    height: 24px;
    margin-right: 8px;
    width: 24px;
  }
</style>
