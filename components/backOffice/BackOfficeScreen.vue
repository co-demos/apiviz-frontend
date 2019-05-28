<template>

  <!-- cf : https://codepen.io/andreich1980/pen/OmobJQ -->
  <section class="main-content skip-navbar columns is-fullheight">
    
    <!-- SIDE MENU -->
      <!-- is-2 is-mobile is-fullheight  -->
    <aside class="column 
    
      is-full-mobile 
      is-one-third-tablet 
      is-3-desktop 
      is-3-widescreen 
      is-2-fullhd

      section">
      
      <p 
        v-if="user.isLoggedin"
        class="menu-label is-hidden-touch"
        >
        <!-- TO DO : translate this -->
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
      is-8-desktop 
      is-8-widescreen 
      is-8-fullhd
      "
      >
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
        
        <!-- DEBUG -->
        <div>
          <!-- getTabConfig.tab_code : <code>{{ getTabConfig.tab_code }}</code><br> -->
        <!-- <hr> -->
        </div>

        <!-- DOCUMENTATION modal -->
        <BackOfficeDocModal
          :currentColl="activeMenu"
          :currentTab="activeTab"
        />
        <br>

        <!-- JSON CONTENTS -->
        <div 
          v-for="(docConfig, indexTabDoc) in tabDocs"
          :key="indexTabDoc"
          >

          <!-- JSON data -->
          <BackOfficeDispatch
            :activeMenu="activeMenu"
            :docConfig="docConfig"
            :conf="getConfigDocs(docConfig)"
          >
          </BackOfficeDispatch>

        </div>
      
      </div>
    </div>
    
  </section>

</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { BackofficeGlobal } from '~/config/backOfficeMenusConfig.js';

  import { getObjectDataFromPath, filterObjectByKey } from '~/plugins/utils.js'

  import BackOfficeDocModal from './BackOfficeDocModal.vue';
  import BackOfficeDispatch from './BackOfficeDispatch.vue';
  // import BackOfficeForm from './BackOfficeForm.vue';
  // import BackOfficeJSON from './BackOfficeJSON.vue';

  export default {

    components: {
      // BackOfficeForm,
      // BackOfficeJSON,
      BackOfficeDispatch,
      BackOfficeDocModal,
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


      // DOC || DOCS TO EDIT
      getConfigDocs(docConfig){

        let docs = this.config[this.activeMenu]
        // this.log && console.log('\nC-BackOfficeScreen / getConfigDocs / docs : \n', docs)

        // return one doc given its field
        const oneDocEditTypes = ['bloc', 'blocs', 'blocs_list']
        if ( oneDocEditTypes.includes(docConfig.type) ){
          return docs[docConfig.field]
        } 

        // return docs list given list_filters
        else if ( docConfig.type == 'docs_list') {

          const list_filters = docConfig.list_filters
          // this.log && console.log('\nC-BackOfficeScreen / getConfigDocs / list_filters : ', list_filters)

          let filteredDocs = docs.filter( function (doc) {
            let docOk = 0 
            list_filters.forEach(function (f) {
              if ( f.is && !f.is.includes(doc[f.field]) ){
                docOk += 1
              } else if ( f.isNot && f.isNot.includes(doc[f.field]) )  {
                docOk += 1
              }
            })
            return !docOk > 0
          })
          return filteredDocs

        }

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
