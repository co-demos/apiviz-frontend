<template>

  <!-- cf : https://codepen.io/andreich1980/pen/OmobJQ -->
  <section class="main-content skip-navbar columns is-fullheight">
    
    <!-- SIDE MENU -->
    <aside class="column noPaddingBottom
    
      is-full-mobile 
      is-4-tablet 
      is-3-desktop 
      is-3-widescreen 
      is-3-fullhd

      section">
      
      <p class="menu-label">
        <!-- {{ getText('menu_preferences') }} -->
        {{ basicDict.menu_preferences[locale] }}
      </p>

      <!-- MENUS -->
      <ul 
        class="menu-list">
        <li 
          v-for="uMenu in userMenu"
          :key="uMenu.title"
          >
          <nuxt-link
            :to="uMenu.url" 
            :class="`${uMenu.title == activeMenu ? 'is-active' : ''}`"
            >
            <!-- @click="setActiveMenu(uMenu.config_coll)" -->
            <span class="icon">
              <i :class="uMenu.icon"></i>
            </span> 
            <!-- {{ uMenu.title }} -->
            <!-- {{ getText( uMenu.code ) }} -->
            {{ basicDict[uMenu.code][locale] }}
          </nuxt-link>
        </li>
      </ul>

      <hr class="is-hidden-tablet menu-ender">

    </aside>

    <div class="container column noMarginLeft
      is-full-mobile 
      is-7-tablet 
      is-7-desktop 
      is-7-widescreen 
      is-6-fullhd
      "
      >
      <div class="section">

        <br><br>

        <!-- DEBUGGING -->
        <div v-if="log">
          <!-- activeMenu : <code>{{ activeMenu }}</code><br> -->
          <!-- user : <pre><code>{{ JSON.stringify(user, null, 1) }}</code></pre><br> -->
          
          <!-- <div class=" is-hidden-mobile "> is-hidden-mobile </div>
          <div class=" is-hidden-tablet-only "> is-hidden-tablet-only </div>
          <div class=" is-hidden-desktop-only ">  is-hidden-desktop-only </div>
          <div class=" is-hidden-widescreen-only ">  is-hidden-widescreen-only </div>
          <div class=" is-hidden-fullhd ">  is-hidden-fullhd  </div> -->
         
          <!-- <hr> -->
        </div>

        <!-- LOGGED USER -->
        <div v-if="user && user.isLoggedin">

          <!-- INFOS -->
          <div v-if="activeMenu === 'infos'">
            <InfosForm>
            </InfosForm>
          </div>

          <!-- PASSWORD RENEWAL -->
          <div v-if="activeMenu === 'password'">
            <PasswordForm>
            </PasswordForm>
          </div>

        </div>

        <!-- LOGIN if not logged yet -->
        <div v-else>
          <div class="box">
            <LoginForm/>
          </div>
        </div>

        <br><br>

      </div>
    </div>
    
  </section>

</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { PreferencesGlobal } from '~/config/preferencesMenusConfig.js'

  import { getObjectDataFromPath, filterObjectByKey } from '~/plugins/utils.js'
  import { BasicDictionnary } from "~/config/basicDict.js" 

  import InfosForm from './InfosForm.vue'
  import PasswordForm from './PasswordForm.vue'
  import LoginForm from '~/components/userUX/LoginForm.vue'

  export default {

    components: {
      InfosForm, 
      PasswordForm,
      LoginForm
    },

    props: [
    ],

    data: function () {

      return {
        
        activeMenu : 'infos',

        userMenu : PreferencesGlobal.user,
        basicDict : BasicDictionnary,

      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
        user : state => state.user.user,
        config: state => state.config.config,
      }),

      ...mapGetters({
      }),


      isUserAdmin () {
        return this.$store.getters['user/getCheckUserRole']('admin')
      },
      isUserStaff () {
        return this.$store.getters['user/getCheckUserRole']('staff')
      },
    },

    beforeMount : function(){
      // this.log && console.log('\nC-Preferences-index.vue / beforeMount...')
      // this.log && console.log('C-Preferences-index.vue / this.$nuxt.$route : ', this.$nuxt.$sroute )
      // this.log && console.log('C-Preferences-index.vue / this.userMenu : ', this.userMenu )
      // this.userMenu = BackofficeGlobal.user
      // this.backOfficeMenu = BackofficeGlobal.config
    },

    mounted(){
      // this.log && console.log('\nC-Preferences-index.vue / mounted...')

      // this.log && console.log('C-Preferences-index.vue / this.$nuxt.$router : \n', this.$nuxt.$router )
      // this.log && console.log('C-Preferences-index.vue / this.$nuxt.$route : \n', this.$nuxt.$route )

      let currentMenu = this.$nuxt.$route.params.pathMatch

      if (currentMenu === '' || typeof currentMenu === 'undefined' ){
        currentMenu = this.activeMenu
      }
      this.log && console.log('C-Preferences-index.vue / currentMenu : ', currentMenu )
      this.setActiveMenu(currentMenu)

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
        let menuConfig = this.userMenu.find(function(menu) {
          return menu.title === menuConfigField
        });
        return menuConfig
      },

      setActiveMenu(menuConfigField) {
        this.activeMenu = menuConfigField
        let menuConfig = this.getMenuConfig(menuConfigField)
      },

      // getText(textCode) {
      //   return this.$store.getters['config/defaultText']({txt:textCode})
      // },

      goBack(e){
        e.preventDefault()
        this.$router.back()
      }
    }

  }
</script>

<style scoped>

  .noMarginLeft {
    margin-left : 0rem
  }

  .noPaddingBottom {
    padding-bottom : 0rem
  }

  hr.menu-ender{
    margin: 1.5em 0em 0em 0em ;
  }

</style>