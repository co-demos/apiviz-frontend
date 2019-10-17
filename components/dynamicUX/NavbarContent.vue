
<template>
  <div id="navbar-main" 
    :class="`navbar-menu ${ showNav ? 'is-active' : '' }`"
    >
    <div class="navbar-end">

      <!-- NAVBAR ITEMS -->
      <template
        v-for="(link, index) in navbarConfig.links_options.extra_buttons"
        >

        <nuxt-link
          v-if="link.link_type == 'link' && link.is_visible == true"
          :key="`'link-' + ${index}`"
          :class="`navbar-item a-anim ${ link.has_dropdown ? 'has-dropdown is-hoverable' : '' }  `"
          :to="link.link_to"
          >

          <!-- MAIN LINK -->
          <div 
            :class="`${ link.has_dropdown ? 'navbar-link is-arrowless' : '' } ${ isItemActive(link) ? 'has-text-primary has-text-primary-c' : '' }`"
            >
            <span 
              v-if="link.icon_class && link.icon_class !==''" 
              class="icon"
              >
                <i :class="link.icon_class"></i>
            </span>
            <span 
              :class="`${ isItemActive(link) ? 'is-underlined-primary-c' : '' }`"
              >
              {{ translate(link, 'link_text' ) }}
            </span>
          </div>

          <!-- DROPDOWNS -->
          <div
            v-if="link.has_dropdown"
            class="navbar-dropdown"
            >

            <template 
              v-for="(sublink, i) in link.dropdowns"
              >

              <a 
                v-if="!sublink.is_divider && sublink.is_external_link"
                :key="`'sublink-ext-' + ${i}`"
                class="navbar-item a-anim"
                :href="sublink.link_to"
                @click="loadExternalURL(sublink.link_to)"
                >
                {{ translate(sublink, 'link_text' ) }}
              </a>

              <nuxt-link
                v-if="!sublink.is_divider && !sublink.is_external_link"
                :key="`'sublink-int-' + ${i}`"
                :class="`navbar-item a-anim ${ isActiveLink(sublink.link_to) ? 'has-text-white has-background-primary is-primary-b' : 'has-text-primary-hover-c' }`"
                :to="sublink.link_to"
                >
                {{ translate(sublink, 'link_text' ) }}
              </nuxt-link>


              <hr 
                v-if="sublink.is_divider"
                :key="`'sublink-div-' + ${i}`"
                class="navbar-divider"
              >

            </template>
          
          </div>

        </nuxt-link>
        
        <hr 
          v-if="link.link_type == 'link' && link.is_visible == true"
          :key="index"
          class="is-flex-touch menu-delimiter-primary-c"
        >
      
      </template>

      <!-- BUTTONS LINKS -->
      <div class="buttons">

        <template
          v-for="(link, index) in navbarConfig.links_options.extra_buttons"
          >

          <nuxt-link
            v-if="!link.has_dropdown && !link.is_external_link && link.link_type == 'button' && link.is_visible == true"
            :class="`navbar-item a-anim button is-primary is-primary-b is-outlined is-small btn-menu`"
            :key="`'btnlink-ext-' + ${index}`"
            :to="link.link_to"
            >
            <span>{{ translate( link,'link_text' ) }}</span>
          </nuxt-link>

          <a
            v-if="!link.has_dropdown && link.is_external_link && link.link_type == 'button' && link.is_visible == true"
            :class="`navbar-item a-anim button is-primary is-primary-b is-outlined is-small btn-menu`"
            :href="link.link_to"
            :key="`'sublink-int-' + ${index}`"
            target="_blank"
            >
            <span>{{ translate( link,'link_text' ) }}</span>
          </a>

          <hr 
            v-if="!link.has_dropdown && link.link_type == 'button' && link.is_visible == true"
            :key="`'sublink-div-' + ${index}`"
            class="is-flex-touch menu-delimiter-primary-c"
          >

        </template>

      </div>

      <!-- LOCALES -->
      <div v-if="languages.is_multi_lang"
        :class="`navbar-item a-anim is-hoverable has-dropdown ${user.isLoggedin || navbarConfig.has_login ? 'no-padding-right' : ''}`"
        >
        <!-- LOCALES BTN -->
        <a :class="`navbar-link a-anim is-arrowless is-uppercase ${ navbarConfig.ui_options.background_isdark ? 'has-text-white' : '' }`"
          >
          {{ locale }}
        </a>

        <div class="navbar-dropdown">

          <!-- LOOP LOCALES -->
          <a v-for="(loc, index) in languages.languages" 
            :key="index"
            class="navbar-item a-anim is-uppercase"
            @click="switchLocale(loc)"
            >
            {{ loc }}
          </a>

        </div>
      </div>

      <!-- USER DROPDOWN -->
      <div v-if="user.isLoggedin"
        :class="`navbar-item a-anim has-dropdown is-hoverable ${languages.is_multi_lang ? 'no-padding-left' : ''}`"
        >

        <a class="navbar-link is-arrowless">
          <span :class="`icon is-large ${ navbarConfig.ui_options.background_isdark ? 'has-text-white' : '' }`">
            <i class="far fa-user-circle"></i>
          </span>
        </a>

        <div class="navbar-dropdown is-right">

          <p class="navbar-item a-anim has-text-grey-light">
            <!-- {{ getText('hello') }}  -->
            {{ basicDict.hello[locale] }}
            {{ user.infos.name }}
          </p>

          <hr class="navbar-divider">

          <nuxt-link class="navbar-item a-anim"
            :to="'/preferences'"
            >
            <span class="icon">
              <i class="far fa-user"></i>
            </span>
            <span>
              <!-- {{ getText('preferences') }} -->
              {{ basicDict.preferences[locale] }}
            </span>
          </nuxt-link>

          <hr class="navbar-divider">
          
          <nuxt-link class="navbar-item a-anim"
            v-if="isUserAdmin || isUserStaff"
            :to="'/backoffice'"
            >
            <span class="icon">
              <i class="fas fa-cog"></i>
            </span>
            <span>
              <!-- {{ getText('backoffice') }} -->
              {{ basicDict.backoffice[locale] }}
            </span>
          </nuxt-link>

          <hr v-if="isUserAdmin || isUserStaff" class="navbar-divider">

          <nuxt-link class="navbar-item"
            :to="'/logout'"
            >
            <span class="icon">
              <i class="fas fa-sign-out-alt"></i>
            </span>
            <span>
              <!-- {{ getText('disconnect') }} -->
              {{ basicDict.disconnect[locale] }}
            </span>
          </nuxt-link>

        </div>

      </div>

      <!-- LOGIN BUTTON -->
      <div v-if="navbarConfig.has_login && !user.isLoggedin"
        :class="`navbar-item a-anim has-dropdown is-hoverable ${languages.is_multi_lang ? 'no-padding-left' : ''}`"
        >
        <a class="navbar-link is-arrowless"
          :href="loginRoute.urls[0]"
          >
          <span :class="`icon is-large ${ navbarConfig.ui_options.background_isdark ? 'has-text-white' : '' }`">
            <i class="fas fa-sign-in-alt"></i>
          </span>
        </a>
      </div>

    </div>

    <hr class="is-flex-touch menu-ender">

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { BasicDictionnary } from "~/config/basicDict.js" 


  export default {

    name: 'NavbarContent',


    props : [
      // 'NavbarConfig',
      'localRouteConfig'
      // 'currentDatasetURI'
    ],

    beforeMount: function () {
      // console.log("// NavbarConfig : ", this.NavbarConfig)
      // console.log("// currentDatasetURI : ", this.currentDatasetURI)
    },

    data : function () {
      return {
        activeLocales : false,
        basicDict : BasicDictionnary, 
      }
    },

    computed : {

      ...mapState({
        log : state => state.log,
        user: state => state.user.user,
        locale: state => state.locale,
        breakpoint : state => state.breakpoint,
        languages: state => state.config.config.global.app_languages,
      }),

      ...mapGetters({
        showNav : 'getNavbarVisibility',
        navbarConfig : 'config/getNavbarConfig',
      }),

      loginRoute() {
        return this.$store.getters['config/getRouteConfigByField']('app_login')
      },

      isUserAdmin () {
        return this.$store.getters['user/getCheckUserRole']('admin')
      },
      isUserStaff () {
        return this.$store.getters['user/getCheckUserRole']('staff')
      },


    },

    methods : {

      switchLocale(loc){
        this.$store.commit('setLocale', loc)
        this.activeLocales = false
      },

      // getText(textCode) {
      //   return this.$store.getters['config/defaultText']({txt:textCode})
      // },
      loadExternalURL(link_to){
        console.log("loadExternalURL / link_to : ", link_to)
        var win = window.open(link_to, '_blank');
        win.focus();
      },
      isActiveLink(link_to){
        const currentRoute = this.$route.path
        // console.log("isActiveLink / currentRoute : ", currentRoute)
        const routeURL = this.localRouteConfig.urls
        // console.log("isActiveLink / routeURL : ", routeURL)
        return link_to === currentRoute || routeURL.indexOf(link_to) != -1
      },
      isItemActive(link){
        const currentRoute = this.$route.path
        const isLinkToRoute = this.isActiveLink(link.link_to)
        let isSublinkRoute = false
        if (link.has_dropdown){
          const linkDropdowns = link.dropdowns
          const linkDropdownsList = linkDropdowns.map(e => e.link_to);
          isSublinkRoute = linkDropdownsList.indexOf(currentRoute) != -1
          // console.log("isItemActive / linkDropdownsList : ", linkDropdownsList)
        }
        return isLinkToRoute || isSublinkRoute
      },
      
      translate( textsToTranslate, listField ) {
        let listTexts = textsToTranslate[listField]
        return this.$Translate( listTexts, this.locale, 'text')
      },
    }

  }
</script>

<style lang="scss" scoped>
  @import '~/assets/css/apiviz-colors.scss';

  .no-padding-left {
    padding-left : 0em !important;
  }
  .no-padding-right {
    padding-right : 0em !important;
  }
  .nuxt-link-active{
    // text-decoration: underline;
    color: $apiviz-primary ;
  }
  .is-underlined{
    border-bottom: solid;
    // border-color: $apiviz-primary;
  }
  .navbar-dropdown {
    z-index: 100;
  }
  .menu-delimiter{
    margin:0em 0em 1.5em 0em ;
    background-color: $apiviz-primary;
  }
  hr.menu-ender{
    margin: 1.5em 0em 0em 0em ;
    background-color: $apiviz-primary;
  }
  // .spacer{
  //   padding: 1em 0em 1.5em 0em;
  // }
  .buttons{
    margin-bottom: 0em;
  }
  .btn-menu{
    margin-left: 1em;
    margin-bottom: 0em;
  }
  .is-flex-touch{
    margin-top: 1em;
  }
</style>
