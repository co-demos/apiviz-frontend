
<template>
  <div 
    id="navbar-main" 
    :class="`navbar-menu ${ showNav ? 'is-active' : '' }`"
    >
    <div class="navbar-end">

      <!-- NAVBAR ITEMS -->
      <template
        v-for="(link, index) in this.NavbarLinks.extra_buttons"
        >

        <router-link
          v-if="link.link_type == 'link' && link.is_visible == true"
          :key="`'link-' + ${index}`"
          :class="`navbar-item ${ link.has_dropdown ? 'has-dropdown is-hoverable' : '' }  `"
          :to="link.link_to"
          >

          <!-- MAIN LINK -->
          <div 
            :class="`${ link.has_dropdown ? 'navbar-link is-arrowless' : '' } ${ isItemActive(link) ? 'has-text-primary' : '' }`"
            >
            <span :class="`${ isItemActive(link) ? 'is-underlined' : '' }`">
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
                class="navbar-item"
                :href="sublink.link_to"
                @click="loadExternalURL(sublink.link_to)"
                >
                {{ translate(sublink, 'link_text' ) }}
              </a>

              <router-link
                v-if="!sublink.is_divider && !sublink.is_external_link"
                :key="`'sublink-int-' + ${i}`"
                :class="`navbar-item ${ isActiveLink(sublink.link_to) ? 'has-text-white has-background-primary' : '' }`"
                :to="sublink.link_to"
                >
                {{ translate(sublink, 'link_text' ) }}
              </router-link>


              <hr 
                v-if="sublink.is_divider"
                :key="`'sublink-div-' + ${i}`"
                class="navbar-divider"
              >

            </template>
          
          </div>

        </router-link>
        
        <hr 
          v-if="link.link_type == 'link' && link.is_visible == true"
          :key="index"
          class="is-flex-touch menu-delimiter"
        >
      
      </template>


      <!-- BUTTONS LINKS -->
      <div class="buttons">

        <template
          v-for="(link, index) in this.NavbarLinks.extra_buttons"
          >

          <router-link
            v-if="!link.has_dropdown && !link.is_external_link && link.link_type == 'button' && link.is_visible == true"
            :class="`navbar-item button is-primary is-outlined is-small btn-menu`"
            v-bind:key="`'btnlink-ext-' + ${index}`"
            :to="link.link_to"
            >
            <span>{{ translate( link,'link_text' ) }}</span>
          </router-link>

          <a
            v-if="!link.has_dropdown && link.is_external_link && link.link_type == 'button' && link.is_visible == true"
            :class="`navbar-item button is-primary is-outlined is-small btn-menu`"
            :href="link.link_to"
            v-bind:key="`'sublink-int-' + ${i}`"
            target="_blank"
            >
            <span>{{ translate( link,'link_text' ) }}</span>
          </a>

          <hr 
            v-if="!link.has_dropdown && link.link_type == 'button' && link.is_visible == true"
            v-bind:key="`'sublink-div-' + ${i}`"
            class="is-flex-touch menu-delimiter"
          >

        </template>

      </div>


      <!-- USER DROPDOWN -->
      <div class="navbar-item has-dropdown is-hoverable"
        v-if="user.isLoggedin"
        >

        <a class="navbar-link is-arrowless">
          <span class="icon is-large">
            <i class="far fa-user-circle"></i>
          </span>
        </a>

        <div class="navbar-dropdown is-right">

          <p class="navbar-item">
            {{ getText('hello') }} {{ user.infos.name }}
          </p>

          <hr class="navbar-divider">

          <router-link class="navbar-item"
            v-if="isUserAdmin || isUserStaff"
            :to="'/backoffice'"
            >
            {{ getText('backoffice') }}
          </router-link>

          <router-link class="navbar-item"
            :to="'/preferences'"
            >
            {{ getText('pref_user') }}
          </router-link>

          <hr class="navbar-divider">

          <router-link class="navbar-item"
            :to="'/logout'"
            >
            {{ getText('disconnect') }}
          </router-link>

        </div>

      </div>


    </div>

    <hr class="is-flex-touch menu-ender">

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props : [
    'NavbarLinks',
    'localRouteConfig'
    // 'currentDatasetURI'
  ],
  beforeMount: function () {
    // console.log("// NavbarLinks : ", this.NavbarLinks)
    // console.log("// currentDatasetURI : ", this.currentDatasetURI)
  },
  computed : {
    ...mapState({
      user: 'user'
    }),
    showNav() {
      return this.$store.getters.getNavbarVisibility
    },
    isUserAdmin () {
      return this.$store.getters.getCheckUserRole('admin')
    },
    isUserStaff () {
      return this.$store.getters.getCheckUserRole('staff')
    },
  },
  methods : {

    getText(textCode) {
      return this.$store.getters.defaultText({txt:textCode})
    },

    // isCurrentRoute(linkTo){
    //   console.log("\n...... linkTo : ", linkTo)
    //   let path = this.$router.currentRoute.path
    //   console.log("...... path : ", path)
    //   return ( path === linkTo ) ? true : false
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
      // console.log("textsToTranslate : ", textsToTranslate )
      let listTexts = textsToTranslate.link_text
      // console.log("listTexts : ", listTexts )
      return this.$store.getters.getTranslation({ texts : listTexts })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/styles/apiviz-colors.scss';
  .router-link-active{
    // text-decoration: underline;
    color: $apiviz-primary ;
  }
  .is-underlined{
    border-bottom: solid;
    border-color: $apiviz-primary;
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
