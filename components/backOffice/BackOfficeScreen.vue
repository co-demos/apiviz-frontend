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
          <a 
            href="#" 
            :class="`${uMenu.config_coll == activeMenu ? 'is-active' : ''}`"
            @click="setActiveMenu(uMenu.config_coll)"
            >
            <span class="icon">
              <i :class="uMenu.icon"></i>
            </span> 
            {{ uMenu.title }}
          </a>
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
          <a 
            href="#" 
            :class="`${menu.config_coll == activeMenu ? 'is-active' : ''}`"
            @click="setActiveMenu(menu.config_coll)"
            >
            <span class="icon">
              <i :class="menu.icon"></i>
            </span> 
            {{ menu.title }}
          </a>
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
                @click="setActiveTab(tab.tab_code)"  
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
          getTabConfig.tab_code : <code>{{ getTabConfig.tab_code }}</code><br>
          getTabConfig.tab_type : <code>{{ getTabConfig.tab_type }}</code><br>
        </div>
        <hr><hr>

        <div 
          v-for="docConfig in tabDocs"
          :key="docConfig.field"
          >

          <!-- DEBUG -->
          <div>
            activeTab : <code>{{ activeTab }}</code><br>
          </div>



          <!-- SIMPLE BLOC EDIT / f.i app_languages doc -->
          <div 
            v-if="docConfig.type === 'bloc' "
            :set="conf = getConfigDoc(docConfig.field)"
            >
            <hr>
            activeMenu : <code>{{ activeMenu }}</code><br>
            docConfig.type : <code>{{ docConfig.type }}</code><br>
            docConfig.field : <code>{{ docConfig.field }}</code><br>
            <!-- config[activeMenu][docConfig.field] : <br><pre><code>{{ JSON.stringify(config[activeMenu][docConfig.field], null, 1) }}</code></pre><br> -->
            <!-- getConfigDoc(docConfig.field) : <br><pre><code>{{ JSON.stringify(getConfigDoc(docConfig.field), null, 1) }}</code></pre><br> -->
            <!-- conf : <br><pre><code>{{ JSON.stringify(conf, null, 1) }}</code></pre><br> -->
            --- ---
            <div 
              v-for="confEdit in docConfig.edit"
              >
              confEdit : <code>{{ confEdit }}</code><br>
              confEdit.subfield : <code>{{ confEdit.subfield }}</code><br>
              confToEdit - all : <br><pre><code>{{ filterObject(conf, [confEdit.subfield]) }}</code></pre></br>
              <!-- confToEdit : <br><pre><code>{{ configToEdit(conf, confEdit.subfield ) }}</code></pre></br> -->
              ----
            </div>
            <!-- <BackOfficeForm
              :configCollection="activeMenu"
              :currentTab="activeTab"
              :docConfig="docConfig"
              :config="config[activeMenu]"
              >
            </BackOfficeForm> -->
          </div>


          <!-- SUBFIELDS LIST / f.i. navbar links in app_navbar doc-->
          <div 
            v-if="docConfig.type === 'blocs_list' "
            >
            <hr>
            activeMenu : <code>{{ activeMenu }}</code><br>
            docConfig.type : <code>{{ docConfig.type }}</code><br>
            docConfig.field : <code>{{ docConfig.field }}</code><br>
            <!-- confToEdit - all : <br><pre><code>{{ filterObject(conf, [confEdit.subfield]) }}</code></pre></br> -->
            --- ---
            <div 
              v-for="confEdit in docConfig.edit"
              >
              confEdit : <code>{{ confEdit }}</code><br>
              confEdit.subfield : <code>{{ confEdit.subfield }}</code><br>
              <div
                v-for="subConf in configToEdit(conf, confEdit.subfield )"
                >
                subConf  : <br><pre><code>{{ JSON.stringify(subConf, null, 1) }}</code></pre></br>
                <!-- confToEdit - all : <br><pre><code>{{ filterObject(subConf, [confEdit.subfield]) }}</code></pre></br> -->
              </div>
              ---
            </div>
          </div>

          <!-- DOCS LIST -->
          <div 
            v-if="docConfig.type === 'dos_list' "
            > 
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

  export default {

    components: {
      BackOfficeForm
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

    mounted(){
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

      // getTabConfig() {
      //   let menuTabs = this.menuTabs(this.activeMenu)
      //   let activeTab = this.activeTab
      //   // this.log && console.log('menuTabs : ', menuTabs)
      //   let tabConfig = menuTabs.find(function(tab) {
      //     return tab.tab_code === activeTab
      //   });
      //   // this.log && console.log('tabConfig : ', tabConfig)
      //   return tabConfig
      // },

      // tabDocs() {
      //   let tabConfig = this.getTabConfig()
      //   return tabConfig.fields
      // },

      setActiveMenu(menuConfigField) {
        this.activeMenu = menuConfigField
        let menuConfig = this.getMenuConfig(menuConfigField)
        this.activeTab = menuConfig.tabs[0]['tab_code']
      },

      setActiveTab(tabCode) {
        this.activeTab = tabCode
      },

      getConfigDoc(field){
        return this.config[this.activeMenu][field]
      },

      filterObject(obj, allowedKeys){
        return filterObjectByKey(obj, allowedKeys)
      },

      configToEdit(conf, subfield){
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
