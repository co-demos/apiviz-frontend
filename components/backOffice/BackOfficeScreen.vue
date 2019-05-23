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
        
        <!-- <template
          > -->

          <BackOfficeForm
            v-for="fieldConfig in tabFields()"
            :key="fieldConfig.field"
            :configCollection="activeMenu"
            :currentTab="activeTab"
            :fieldConfig="fieldConfig"
            :config="config[activeMenu]"
            >
          </BackOfficeForm>

        <!-- </template> -->

      </div>
    </div>
    
  </section>

</template>

<script>
import { mapState } from 'vuex'
import { BackofficeGlobal } from '~/config/backOfficeMenusConfig.js';

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

    getTabConfig() {
      let menuTabs = this.menuTabs(this.activeMenu)
      let activeTab = this.activeTab
      // console.log('menuTabs : ', menuTabs)
      let tabConfig = menuTabs.find(function(tab) {
        return tab.tab_code === activeTab
      });
      // console.log('tabConfig : ', tabConfig)
      return tabConfig
    },

    tabFields() {
      let tabConfig = this.getTabConfig()
      return tabConfig.fields
    },

    setActiveMenu(menuConfigField) {
      this.activeMenu = menuConfigField
      let menuConfig = this.getMenuConfig(menuConfigField)
      this.activeTab = menuConfig.tabs[0]['tab_code']
    },

    setActiveTab(tabCode) {
      this.activeTab = tabCode
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
