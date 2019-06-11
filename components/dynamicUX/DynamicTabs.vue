<template>

  <div class="container">

    <div 
      v-if="tabConfig" 
      :class="`tabs ${tabConfig.ui_options.size.value} ${tabConfig.ui_options.position.value} ${skipNavbar ? 'skip-navbar' : ''}`"
      :style="`margin-top:${tabConfig.ui_options.top_margin.value}rem; margin-bottom:${tabConfig.ui_options.bottom_margin.value}rem`"
      >
      
      <ul :class="`${tabConfig.ui_options.class.value}`">

        <li v-for="tab in tabConfig.tabs_options" 
          :key="tab.tab_code"
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
    <!-- tabsUri : <code>{{ tabsUri }}</code><br> -->
    <!-- tabConfig : <br> <pre><code>{{ JSON.stringify(tabConfig, null, 1)}}</code></pre><br> -->

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
      currentTabConfig : undefined,
    }
  },

  beforeMount : function(){
    // this.log && console.log('\nC-DynamicTabs / beforeMount...')
    // this.log && console.log('C-DynamicTabs / beforeMount / this.tabsUri : ', this.tabsUri)
    // this.log && console.log('C-DynamicTabs / beforeMount / this.tabConfig : \n', this.tabConfig)
  },

  mounted : function(){
    // this.log && console.log('\nC-DynamicTabs / mounted...')
  },

  computed: {

    ...mapState({
      log : state => state.log,
      locale: state => state.locale,
    }),

    // ...mapGetters({
    // }),

    currentRoutePath() {
      return this.$route.path
    },

    tabConfig() {
      return this.$store.getters['config/getTabConfig'](this.tabsUri)
    },

  },

  watch : {

    tabsUri(newVal, oldVal){
      this.log && console.log("C-DynamicTabs / watch : tabsUri ...")
      let currentTabConfig = this.tabConfig
      this.log && console.log("C-DynamicTabs / watch : tabsUri / currentTabConfig : ", currentTabConfig)
    }

  },


  methods: {

    translate( textsToTranslate, listField ) {
      let listTexts = textsToTranslate[listField]
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
