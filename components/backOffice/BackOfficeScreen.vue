<template>

  <!-- cf : https://codepen.io/andreich1980/pen/OmobJQ -->
  <section class="main-content skip-navbar columns is-fullheight">
    
    <!-- SIDE MENU -->
      <!-- is-2 is-mobile is-fullheight  -->
    <aside class="column 
    
      is-full-mobile 
      is-one-third-tablet 
      is-one-quarter-desktop 
      is-one-quarter-widescreen 
      is-3-fullhd

      section">
      
      <p 
        v-if="user.isLoggedin"
        class="menu-label is-hidden-touch"
        >
        PREFERENCES
      </p>
      <ul 
        v-if="user.isLoggedin"
        class="menu-list">
        <li 
          v-for="uMenu in userMenu"
          :key="uMenu.config_coll"
          >
          <nuxt-link
            :to="'/backoffice/' + uMenu.config_coll" 
            :class="`${uMenu.config_coll == activeMenu ? 'is-active' : ''}`"
            >
            <!-- @click="setActiveMenu(uMenu.config_coll)" -->
            <span class="icon">
              <i :class="uMenu.icon"></i>
            </span> 
            {{ uMenu.title }}
          </nuxt-link>
        </li>
      </ul>

      <p 
        class="menu-label is-hidden-touch"
        >
        APP SETTINGS
      </p>

      <!-- MENUS -->
      <ul class="menu-list">
        <li 
          v-for="menu in backOfficeMenu"
          :key="menu.config_coll"
          >
          <nuxt-link 
            :to="'/backoffice/' + menu.config_coll" 
            :class="`${menu.config_coll == activeMenu ? 'is-active' : ''}`"
            >
            <!-- @click="setActiveMenu(menu.config_coll)" -->
            <span class="icon">
              <i :class="menu.icon"></i>
            </span> 
            {{ menu.title }}
          </nuxt-link>
        </li>
      </ul>

    </aside>

    <div class="container column 
      is-full-mobile 
      is-three-thirds-tablet 
      is-three-quarters-desktop 
      is-three-quarters-widescreen 
      is-9-fullhd
      ">
      <div class="section">

        <!-- TABS -->
        <div class="tabs is-centered">
          <ul>
            <li
              v-for="tab in menuTabs(activeMenu)" 
              :key="tab.tab_code"
              :class="`${tab.tab_code == activeTab ? 'is-active' : ''}`"
              >
              <a
                @click="pushTabRoute(tab.tab_code)" 
                >
                {{ tab.title }}
              </a>
            </li>
          </ul>
        </div>

        <!-- CONTENTS -->
        <!-- <div class="card">
          <div class="card-header"><p class="card-header-title">Header</p></div>
          <div class="card-content"><div class="content">Content</div></div>
        </div>
        <br /> -->
        
        <!-- DEBUG -->
        <div>
          <!-- getTabConfig.tab_code : <code>{{ getTabConfig.tab_code }}</code><br> -->
          <!-- getTabConfig.tab_type : <code>{{ getTabConfig.tab_type }}</code><br> -->
        </div>
        <!-- <hr> -->
        
        <!-- CONTENTS -->
        <div 
          v-for="docConfig in tabDocs"
          :key="docConfig.field"
          :set="conf = getConfigDoc(docConfig.field)"
          >

          <!-- DEBUG -->
          <div>
            <!-- activeTab : <code>{{ activeTab }}</code><br> -->
            <!-- docConfig.type : <code>{{ docConfig.type }}</code><br> -->
            <!-- conf._id : <code>{{ conf._id }}</code><br> -->
          </div>

          <!-- SIMPLE BLOC EDIT / f.i app_languages doc -->
          <div v-if="docConfig.type === 'blocs' " 
            :set=" subfieldsList = arrayFromObjectsArray(docConfig.edit, 'subfield')">
            <!-- <hr> -->
            <!-- activeMenu : <code>{{ activeMenu }}</code><br> -->
            <!-- docConfig.type : <code>{{ docConfig.type }}</code><br> -->
            <!-- docConfig.field : <code>{{ docConfig.field }}</code><br> -->
            <!-- conf : <br><pre><code>{{ JSON.stringify(conf, null, 1) }}</code></pre><br> -->
            <!-- --- --- -->
            <div 
              :set="confToEdit = filterObject( conf, subfieldsList )"
              >
              <!-- confEdit : <code>{{ confEdit }}</code><br> -->
              <!-- confEdit.subfield : <code>{{ confEdit.subfield }}</code><br> -->
              <!-- confToEdit : <br><pre><code>{{ confToEdit }}</code></pre></br> -->
              <!-- ---- -->
              <BackOfficeJSON
                :configCollection="activeMenu"
                :docId="conf._id"
                :docConfigType="docConfig.type"
                :docConfigField="docConfig.field"
                :confEdit="docConfig"
                :confEditTitle="undefined"
                :confEditSubfield="undefined"
                :confToEdit="confToEdit"
                >
              </BackOfficeJSON>
            </div>
          </div>

          <!-- SIMPLE BLOC EDIT / f.i app_languages doc -->
          <div v-if="docConfig.type === 'bloc' " >
            <!-- <hr> -->
            <!-- activeMenu : <code>{{ activeMenu }}</code><br> -->
            <!-- docConfig.type : <code>{{ docConfig.type }}</code><br> -->
            <!-- docConfig.field : <code>{{ docConfig.field }}</code><br> -->
            <!-- conf : <br><pre><code>{{ JSON.stringify(conf, null, 1) }}</code></pre><br> -->
            <!-- --- --- -->
            <div 
              v-for="confEdit in docConfig.edit"
              :key="confEdit.subfield"
              :set="confToEdit = filterObject(conf, [confEdit.subfield])"
              >
              <!-- confEdit : <code>{{ confEdit }}</code><br> -->
              <!-- confEdit.subfield : <code>{{ confEdit.subfield }}</code><br> -->
              <!-- confToEdit : <br><pre><code>{{ confToEdit }}</code></pre></br> -->
              <!-- ---- -->
              <BackOfficeJSON
                :configCollection="activeMenu"
                :docId="conf._id"
                :docConfigType="docConfig.type"
                :docConfigField="docConfig.field"
                :confEdit="confEdit"
                :confEditTitle="confEdit.subfield"
                :confEditSubfield="confEdit.subfield"
                :confToEdit="confToEdit"
                >
              </BackOfficeJSON>
            </div>
          </div>

          <!-- SUBFIELDS LIST / f.i. navbar links in app_navbar doc -->
          <div v-if="docConfig.type === 'blocs_list' " >
            <!-- <hr> -->
            <!-- activeMenu : <code>{{ activeMenu }}</code><br> -->
            <!-- docConfig.type : <code>{{ docConfig.type }}</code><br> -->
            <!-- docConfig.field : <code>{{ docConfig.field }}</code><br> -->
            <!-- --- --- -->
            <div 
              v-for="confEdit in docConfig.edit"
              :key="confEdit.subfield"
              :set="confToEditList = configToEdit(conf, confEdit.subfield )"
              >
              <!-- confEdit : <code>{{ confEdit }}</code><br> -->
              <!-- confEdit.subfield : <code>{{ confEdit.subfield }}</code><br> -->
              <div
                v-for="(subConf, index) in confToEditList"
                :key="index"
                :set="subConfToEdit = filterObject(conf, [subConf.subfield])"
                >
                <!-- subConf  : <br><pre><code>{{ JSON.stringify(subConf, null, 1) }}</code></pre></br> -->
                <BackOfficeJSON
                  :configCollection="activeMenu"
                  :docId="conf._id"
                  :docConfigType="docConfig.type"
                  :docConfigField="docConfig.field"
                  :confEditSubfield="confEdit.subfield"
                  :confEditTitle="confEdit.subfield + '.' + index"
                  :confEdit="confEdit.object_model"
                  :confToEdit="subConf"
                  >
                </BackOfficeJSON>
              </div>
              <!-- --- -->
            </div>
          </div>

          <!-- DOCS LIST / f.i. endpoints docs in endpoints collection -->
          <div v-if="docConfig.type === 'dos_list' " > 
            <hr>
              activeMenu : <code>{{ activeMenu }}</code><br>
              docConfig.type : <code>{{ docConfig.type }}</code><br>
              docConfig.field : <code>{{ docConfig.field }}</code><br>
          </div>





        </div>
      
      </div>
    </div>
    
  </section>

</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { BackofficeGlobal } from '~/config/backOfficeMenusConfig.js';

import { getObjectDataFromPath, filterObjectByKey } from '~/plugins/utils.js'

  import BackOfficeForm from './BackOfficeForm.vue';
  import BackOfficeJSON from './BackOfficeJSON.vue';

  export default {

    components: {
      BackOfficeForm,
      BackOfficeJSON
    },

    props: [
    ],

    data: function () {

      return {
        
        activeMenu : 'global',
        activeTab : 'gl_general',

        userMenu : BackofficeGlobal.user,
        backOfficeMenu : BackofficeGlobal.config,

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

      tabDocs() {
        let tabConfig = this.getTabConfig
        return tabConfig.docs
      },

      getTabConfig() {
        let menuTabs = this.menuTabs(this.activeMenu)
        let activeTab = this.activeTab
        // this.log && console.log('menuTabs : ', menuTabs)
        let tabConfig = menuTabs.find(function(tab) {
          return tab.tab_code === activeTab
        });
        // this.log && console.log('tabConfig : ', tabConfig)
        return tabConfig
      },

      isUserAdmin () {
        return this.$store.getters['user/getCheckUserRole']('admin')
      },
      isUserStaff () {
        return this.$store.getters['user/getCheckUserRole']('staff')
      },
    },

    beforeMount : function(){
      // this.log && console.log('\nC-BackOff-index.vue / beforeMount...')
      // this.log && console.log('C-BackOff-index.vue / this.$nuxt.$route : ', this.$nuxt.$sroute )
      // this.log && console.log('C-BackOff-index.vue / this.userMenu : ', this.userMenu )
      // this.userMenu = BackofficeGlobal.user
      // this.backOfficeMenu = BackofficeGlobal.config
    },

    mounted(){
      // this.log && console.log('\nC-BackOff-index.vue / mounted...')

      // this.log && console.log('C-BackOff-index.vue / this.$nuxt.$router : \n', this.$nuxt.$router )
      // this.log && console.log('C-BackOff-index.vue / this.$nuxt.$route : \n', this.$nuxt.$route )

      let currentMenu = this.$nuxt.$route.params.pathMatch
      let currentTab = this.$nuxt.$route.hash
      currentTab = currentTab.substring(1, currentTab.length)

      if (currentMenu === '' || typeof currentMenu === 'undefined' ){
        currentMenu = this.activeMenu
      }
      // this.log && console.log('C-BackOff-index.vue / currentMenu : ', currentMenu )
      this.setActiveMenu(currentMenu)
      
      if (currentTab === ''){
        currentTab = this.activeTab
      } 
      // this.log && console.log('C-BackOff-index.vue / currentTab : ', currentTab )
      this.setActiveTab(currentTab)

      // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
      const int = setInterval(() => {
        if(window.pageYOffset < 50){
          clearInterval(int)
        }
        else{
          window.scrollTo(0, 0)
        }
      }, 100);
    },

    methods: {

      getMenuConfig(menuConfigField) {
        let menuConfig = this.backOfficeMenu.find(function(menu) {
          return menu.config_coll === menuConfigField
        });
        return menuConfig
      },

      menuTabs(menuConfigField) {
        let menuConfig = this.getMenuConfig(menuConfigField)
        return menuConfig.tabs
      },

      setActiveMenu(menuConfigField) {
        this.activeMenu = menuConfigField
        let menuConfig = this.getMenuConfig(menuConfigField)
        this.activeTab = menuConfig.tabs[0]['tab_code']
        // this.$nuxt.$router.push('/backoffice/'+menuConfigField)
      },

      setActiveTab(tabCode) {
        // this.log && console.log('C-BackOff-index.vue / setActiveTab / tabCode : ', tabCode )
        this.activeTab = tabCode
      },

      pushTabRoute(tabCode){
        this.setActiveTab(tabCode) 
        this.$nuxt.$router.push(this.$nuxt.$route.path + '#' + tabCode )
      },

      arrayFromObjectsArray(objArray, property){
        // this.log && console.log('C-BackOff-index.vue / arrayFromObjectsArray / objArray : ', objArray )
        // this.log && console.log('C-BackOff-index.vue / arrayFromObjectsArray / property : ', property )
        let array = objArray.map( a => a[property] )
        // this.log && console.log('C-BackOff-index.vue / arrayFromObjectsArray / array : ', array )
        return array
      },

      getConfigDoc(field){
        return this.config[this.activeMenu][field]
      },

      filterObject(obj, allowedKeys){
        return filterObjectByKey(obj, allowedKeys)
      },

      configToEdit(conf, subfield, ){
        return getObjectDataFromPath(conf, subfield, '.')
      },

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },

      goBack(e){
        e.preventDefault()
        this.$router.back()
      }
    }

  }
</script>
