<template>

  <div class="container">

    <template v-if="tabConfig && tabConfig.top_margin > 0">
      <br v-for="extra_margin in tabConfig.top_margin" :key="extra_margin">
    </template>

    <div v-if="tabConfig" :class="`tabs is-centered ${skipNavbar ? 'skip-navbar' : ''}`">
      
      <ul>

        <li v-for="(tab, index) in tabConfig.tabs_options" 
          :key="index"
          :class="`${ tab.link_to === currentRoutePath ? 'is-active' : ''}`"
          >
          <nuxt-link
            :to="tab.link_to"
            @click="setActiveTab(tab.tab_code)"
            >
            <span v-if="tab.has_icon" class="icon">
              <i :class="tab.icon_class"></i>
            </span>
            <span>
              {{ translate(tab, 'link_text') }}
            </span>
          </nuxt-link>
        </li>

      </ul>
    </div>

    <!-- DEBUGGING  -->
    <!-- tabsUri : <code>{{ tabsUri}}</code><br>
    tabConfig : <br> <pre><code>{{ JSON.stringify(tabConfig, null, 1)}}</code></pre><br> -->

  </div>

</template>

<script>
import axios from 'axios'

import { mapState, mapGetters } from 'vuex';

export default {

  name: 'DynamicTabs',

  props: [
    'skipNavbar',
    'tabsUri',
  ],

  data : function() {
    return {
      activeTab : undefined,
    }
  },

  beforeMount : function(){
    // this.log && console.log('\nC-DynamicTabs / beforeMount...')
  },

  mounted : function(){
    // this.log && console.log('\nC-DynamicTabs / mounted...')
  },

  computed: {

    ...mapState({
      log : 'log',
      // user: state => state.user.user,
      locale: 'locale',
    }),

    ...mapGetters({
      }),

    currentRoutePath() {
      return this.$route.path
    },

    tabConfig() {
      return this.$store.getters['config/getTabConfig'](this.tabsUri)
    },

  },

  watch : {

  },

  beforeMount : function(){
    // this.log && console.log("\nC-DynamicTabs / beforeMount ... ")
  },

  mounted(){
    // this.log && console.log("C-DynamicTabs / mounted ... ")
  },

  methods: {

    translate( textsToTranslate, listField ) {
    // this.log && console.log("C-DynamicTabs / mounted ... ")
      let listTexts = textsToTranslate[listField]
    // this.log && console.log("C-DynamicTabs / mounted ... ")
      return this.$Translate( listTexts, this.locale, 'text')
    },

    setActiveTab(tab_code){
      this.activeTab = tab_code
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }

  }

}
</script>
