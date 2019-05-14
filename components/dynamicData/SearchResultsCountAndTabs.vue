<template>
  <div :class="`count-and-tabs ${ view == VIEW_MAP ? 'is-map' : 'is-not-map'}`">

    <div :class="['result-count-parent', open ? 'open' : undefined]">
      <div class="results-count">
        <span class="nb">
          {{ pending ? '?' : total }}
        </span> 
        <span>
          {{ translateBis(endpointConfigFilters, 'items_found' )}}
        </span>
      </div>
      <slot name="project"/>
    </div>

    <div class="buttons has-addons is-right">

      <router-link 
        v-if="typeof endpointConfigList !== 'undefined'"
        :disabled="endpointConfigList.is_disabled" 
        :to="endpointConfigUrlToList.urls[0]" 
        :class="['button', view === VIEW_LIST ? 'is-selected is-primary' : undefined]" 
        >
        <img :src="`/static/icons/${view === VIEW_LIST ? 'icon_list_blanc.svg': 'icon_list.svg'}`">
        <!-- <span>liste</span> -->
        <span>{{ translate(configTabs('tab_list')) }}</span>
      </router-link>

      <router-link
        v-if="typeof endpointConfigMap !== 'undefined'"
        :disabled="endpointConfigMap.is_disabled" 
        :to="endpointConfigUrlToMap.urls[0]" 
        :class="['button', view === VIEW_MAP ? 'is-selected is-primary' : undefined]" 
        >
        <img :src="`/static/icons/${view === VIEW_MAP ? 'icon_map_blanc.svg': 'icon_map.svg'}`">
        <!-- <span>carte</span> -->
        <span>{{ translate(configTabs('tab_map')) }}</span>
      </router-link>

      <!-- <router-link
        v-if="typeof endpointConfigUrlToStat !== 'undefined'"
        :disabled="endpointConfigStat.is_disabled" 
        :to="endpointConfigUrlToStat.urls[0]" 
        :class="['button', view === VIEW_MAP ? 'is-selected is-primary' : undefined]" 
        >
        <img src="/static/icons/icon_dataviz.svg">
        <span>{{ translate(configTabs('tab_stat')) }}</span>
      </router-link> -->

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { VIEW_LIST, VIEW_MAP, VIEW_STAT } from '../../config/constants.js'

export default {

  name: 'SearchResultsCountAndTabs',
  
  props: [
    'view', 
    'open'
  ],

  data(){
    return {
      VIEW_MAP, 
      VIEW_LIST,
      VIEW_STAT
    }
  },

  beforeMount : function(){
    this.log && console.log('\nC-SearchResultsCountAndTabs / beforeMount...')
  },

  mounted(){

  },

  computed: {

    ...mapState({
      log : 'log', 
      locale : state => state.locale,
      pending: state => !!state.search.search.answer.pendingAbort,
      total: state => state.search.search.answer.result && state.search.search.answer.result.total
    }),

    // CONFIG ENDPOINTS
    endpointConfigFilters() {
      return this.$store.getters['config/getEndpointConfigFilters']
    },
    endpointConfigList() {
      return this.$store.getters['config/getEndpointConfigList']
    },
    endpointConfigMap() {
      return this.$store.getters['config/getEndpointConfigMap']
    },
    endpointConfigDetail() {
      return this.$store.getters['config/getEndpointConfigDetail']
    },
    endpointConfigStat() {
      let endpointStat =  this.$store.getters['/getEndpointConfigStat']
      console.log("endpointStat : ", endpointStat)
      return endpointStat
    },

    // CONFIG ROUTES
    endpointConfigUrlToList() {
      let routeConfig =  this.$store.getters['config/getRouteConfigListForDataset']
      return routeConfig
    },
    endpointConfigUrlToMap() {
      let routeConfig =  this.$store.getters['config/getRouteConfigMapForDataset']
      return routeConfig
    },
    // endpointConfigUrlToStat() {
    //   let routeConfig = this.$store.getters.getRouteConfigStatForDataset
    //   console.log("routeConfig : ", routeConfig)
    //   return routeConfig
    // }
  },

  methods : {
    configTabs(tabField) {
      let tabsConf = this.$store.state.config.config.global.app_screen_tabs
      return tabsConf[tabField]
    },
    translate( textsToTranslate ) {
      let listTexts = textsToTranslate.link_text
      return this.$Translate( listTexts, this.locale, 'text')
      // return this.$store.getters.getTranslation({ texts : listTexts })
    },
    translateBis( textsToTranslate, listField ) {
      let listTexts = textsToTranslate[listField]
      return this.$Translate( listTexts, this.locale, 'text')
      // return this.$store.getters.getTranslation({ texts : listTexts })
    }
  }

}
</script>

<style lang="scss" scoped>

@import '../../assets/css/apiviz-colors.scss';

.count-and-tabs{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 1em;

  .result-count-parent{
    padding-top: 1rem;
    padding: 0 1em;
    position: relative;
    left: -1em; /* TODO SASS : same absolute value as padding above*/
    max-width: 20em;

    background-color: transparent;

    &.open{
      background-color: $apiviz-grey-background;
      
      top: -1rem;
      padding-top: 1rem;
    }

    .results-count{
      padding: 0.5em 1em;

      background-color: white;
      border-radius: 3px;
      font-size: 1.2em;

      display: flex;
      flex-direction: row;
      align-items: center;

      .nb{
          color: $apiviz-primary;
          font-size: 1.3em;
          font-weight: bold;
          margin-right: 0.5em;
      }
    }
  }

  .buttons{
    & > *{
      width: 7em;
      justify-content: left;

      img{
          max-height: 1.5em;
      }

      span{
          margin-left: 0.2em;
      }

    }
  }

}


</style>
