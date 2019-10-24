<template>

  <!-- <div :class="`count-and-tabs ${ view == VIEW_MAP ? 'is-map' : 'is-not-map'}`"> -->
  <div :class="`count-and-tabs`">

    <!-- FEEEDBACK COUNT -->
    <div 
      :class="['result-count-parent', open ? 'open' : undefined]"
      >

      <div 
        v-if="view != VIEW_STAT"
        :class="`results-count`"
        >
        <span class="nb has-text-primary has-text-primary-c">
          {{ pending ? '?' : total }}
        </span> 
          <!-- v-if="breakpoint.btnsAsAddons" -->
        <span 
          :class="`${ breakpoint.btnsAsAddons ? '' : 'is-size-7' }`"
          >
          {{ translateBis(endpointConfigFilters, 'items_found' )}}
        </span>
      </div>

      <div 
        v-else
        class="results-count"
        >
        <span 
          :class="`has-text-primary`"
          >
          {{ translateBis(endpointConfigFilters, 'stats_text' )}}
        </span>
      </div>

      <!-- SLOT FOR MAP'S ITEM CARD -->
      <slot name="item"/>

    </div>


    <!-- SHUFFLER -->
    <!-- <div v-if="endpointConfigFilters.has_shuffle"
      :class="['buttons result-count-parent', open ? 'open' : undefined]">
      <div class="">
        <a class="button"
          @click="reShuffle()"
          >
          <span class="icon is-primary is-primary-c">
            <i class="fas fa-random"></i>
          </span>
        </a>
      </div>
    </div> -->


    <!-- DEBUGGING -->
    <!-- <div class="container"> -->
      <!-- -- SearchResultsCountAndTabs --<br> -->
      <!-- total : <br><code>{{ total }}</code><br> -->
      <!-- item : <br><pre><code>{{ JSON.stringify(item , null, 1) }}</code></pre><br>  -->
    <!-- </div> -->


    <!-- BTNS VIEWS -->
    <div 
      :class="`buttons ${ breakpoint.btnsAsAddons ? 'has-addons' : '' } is-right`"
      >

      <!-- BTN TABLE -->
      <nuxt-link 
        v-if="typeof endpointConfigTable !== 'undefined' && endpointConfigTable.is_visible"
        :disabled="endpointConfigTable.is_disabled" 
        :to="endpointConfigUrlToTable.urls[0]" 
        :class="['has-text-centered button ', view === VIEW_TABLE ? 'is-selected is-primary is-primary-b' : 'has-text-primary-hover-c', smallButtons ? '' : '' ]" 
        >
        <span class="icon has-text-centered is-marginless">
          <i class="fas fa-table"></i>
        </span>
        <span class="is-hidden-touch">
          <!-- {{ translate(configTabs('tab_table')) }} -->
          {{ basicDict.tab_table[locale] }}
        </span>
      </nuxt-link>

      <!-- BTN LIST -->
      <nuxt-link 
        v-if="typeof endpointConfigList !== 'undefined' && endpointConfigList.is_visible"
        :disabled="endpointConfigList.is_disabled" 
        :to="endpointConfigUrlToList.urls[0]" 
        :class="['has-text-centered button ', view === VIEW_LIST ? 'is-selected is-primary is-primary-b' : 'has-text-primary-hover-c', smallButtons ? '' : '' ]" 
        >
        <span class="icon has-text-centered is-marginless">
          <i class="fas fa-th-large"></i>
        </span>
        <span class="is-hidden-touch">
          <!-- {{ translate(configTabs('tab_list')) }} -->
          {{ basicDict.tab_list[locale] }}
        </span>
      </nuxt-link>

      <!-- BTN MAP -->
      <nuxt-link
        v-if="typeof endpointConfigMap !== 'undefined' && endpointConfigMap.is_visible"
        :disabled="endpointConfigMap.is_disabled" 
        :to="endpointConfigUrlToMap.urls[0]" 
        :class="['has-text-centered button ', view === VIEW_MAP ? 'is-selected is-primary is-primary-b' : 'has-text-primary-hover-c', smallButtons ? '' : '' ]" 
        >
        <span class="icon has-text-centered is-marginless">
          <i class="far fa-map"></i>
        </span>
        <span class="is-hidden-touch">
          <!-- {{ translate(configTabs('tab_map')) }} -->
          {{ basicDict.tab_map[locale] }}
        </span>
      </nuxt-link>

      <!-- BTN STATS -->
      <nuxt-link
        v-if="typeof endpointConfigStat !== 'undefined' && endpointConfigStat.is_visible"
        :disabled="endpointConfigStat.is_disabled" 
        :to="endpointConfigUrlToStat.urls[0]" 
        :class="['has-text-centered button ', view === VIEW_STAT ? 'is-selected is-primary is-primary-b' : 'has-text-primary-hover-c', smallButtons ? '' : '' ]" 
        >
        <span class="icon has-text-centered is-marginless">
          <i class="far fa-chart-bar"></i>
        </span>
        <span class="is-hidden-touch">
          <!-- {{ translate(configTabs('tab_stat')) }} -->
          {{ basicDict.tab_stat[locale] }}
        </span>
      </nuxt-link>

    </div>


    <!-- ADDITIONAL BUTTONS -->
    <div 
      :class="'buttons is-right'"
      >

      <!-- SHUFFLER -->
      <a 
        v-if="localRouteConfig.has_shuffle"
        class="button has-text-primary-hover-c tooltip is-tooltip-bottom"
        :data-tooltip="basicDict.shuffle[locale]"
        @click="reShuffle()"
        >
        <span class="icon">
          <i class="fas fa-random"></i>
        </span>
      </a>

      <!-- EXPORT DATASET-->
      <a 
        v-if="endpointConfigFilters.has_export && endpointConfigExport.is_visible"
        class="button has-text-primary-hover-c tooltip is-tooltip-bottom"
        :data-tooltip="basicDict.tab_export[locale]"
        @click="exportDataset()"
        :disabled="endpointConfigExport.is_disabled"
        >
        <span class="icon">
          <i class="fas fa-download"></i>
        </span>
      </a>



    </div>

  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { isMobile } from 'mobile-device-detect'

  import { VIEW_TABLE, VIEW_LIST, VIEW_MAP, VIEW_STAT, responsiveBreakpoint } from '../../config/constants.js'
  import { BasicDictionnary } from "~/config/basicDict.js" 

  export default {

    name: 'SearchResultsCountAndTabs',
    
    props: [
      'view', 
      'open'
    ],

    data(){
      return {

        VIEW_TABLE,
        VIEW_LIST,
        VIEW_MAP, 
        VIEW_STAT,

        basicDict : BasicDictionnary, 
        smallButtons : false,

      }
    },

    created() {
      window.addEventListener("resize", this.winWidth)
      // window.addEventListener('resize', this.handleResize)
      this.winWidth()
    },

    destroyed() {
      window.removeEventListener("resize", this.winWidth)
      // window.removeEventListener('resize', this.handleResize)
    },

    beforeMount : function(){
      this.log && console.log('\nC-SearchResultsCountAndTabs / beforeMount...')
    },

    mounted(){
      this.log && console.log('\nC-SearchResultsCountAndTabs / mounted...')
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
        breakpoint : state => state.breakpoint,
        localRouteConfig : state => state.config.localRouteConfig,
        // pending: state => !!state.search.search.answer.pendingAbort,
        // total: state => state.search.search.answer.result && state.search.search.answer.result.total
      }),

      ...mapGetters({
        pending : 'search/getPending',
        total : 'search/getResultsCount',


        endpointConfigFilters : 'config/getEndpointConfigFilters',

        endpointConfigDetail : 'config/getEndpointConfigDetail',

        endpointConfigTable  : 'config/getEndpointConfigTable',
        endpointConfigList   : 'config/getEndpointConfigList',
        endpointConfigMap    : 'config/getEndpointConfigMap',
        endpointConfigStat   : 'config/getEndpointConfigStat',
        endpointConfigExport : 'config/getEndpointConfigExport',

        endpointConfigUrlToTable : 'config/getRouteConfigTableForDataset',
        endpointConfigUrlToList  : 'config/getRouteConfigListForDataset',
        endpointConfigUrlToMap   : 'config/getRouteConfigMapForDataset',
        endpointConfigUrlToStat  : 'config/getRouteConfigStatForDataset',
      }),



    },

    methods : {

      // configTabs(tabField) {
      //   let tabsConf = this.$store.state.config.config.global.app_screen_tabs
      //   return tabsConf[tabField]
      // },

      winWidth() {
        var w = window.innerWidth
        if (w < responsiveBreakpoint) {
          this.smallButtons = true
        } else {
          this.smallButtons = false
        }
      },

      reShuffle() {
        let minMax = this.localRouteConfig.shuffle_minnmax
        if ( !minMax ){
          minMax = { min: 0 , max: 2000 }
        }
        this.$store.dispatch( 'search/reShuffle', minMax )
      },

      exportDataset() {

        let exportConfig = this.endpointConfigExport
        this.log && console.log('\nC-SearchResultsCountAndTabs / exportDataset / exportConfig : ', exportConfig)

        let fileName = "export_file" + '.csv'

        this.$store.dispatch( 'search/exportDataset' )
        .then( response => {
          this.log && console.log('C-SearchResultsCountAndTabs / exportDataset / response : ', response)
          let blob = new Blob([response.data], {type: 'text/csv'})
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.setAttribute('download', fileName) // or any other extension
          document.body.appendChild(link)
          link.click()
        })

      },

      // translate( textsToTranslate ) {
      //   let listTexts = textsToTranslate.link_text
      //   return this.$Translate( listTexts, this.locale, 'text')
      // },

      translateBis( textsToTranslate, listField ) {
        let listTexts = textsToTranslate[listField]
        return listTexts && this.$Translate( listTexts, this.locale, 'text')
      },

      getDefaultText(txt_code){
        return this.$store.getters['config/defaultText']({txt:txt_code})
      },

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
      padding: 0 1em;

      background-color: white;
      border-radius: 3px;
      font-size: 1.2em;

      display: flex;
      flex-direction: row;
      align-items: center;

      .nb{
        // color: $apiviz-primary;
        font-size: 1.3em;
        font-weight: bold;
        margin-right: 0.5em;
      }
    }
  }

  .buttons{

    & > * {
      // width: 7em;
      // justify-content: left;

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
