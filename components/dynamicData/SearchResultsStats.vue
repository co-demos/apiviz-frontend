<template>

  <section class="search-results-stats">

    <!-- DEBUGGING -->
    <!-- <div class="container"> -->
      <!-- -- SearchResultsList --<br> -->
      <!-- routeConfig.dataset_uri : <code>{{ routeConfig.dataset_uri }}</code><br> -->
      <!-- routeConfig.contents_fields : <br><pre><code>{{ JSON.stringify(routeConfig.contents_fields , null, 1) }}</code></pre><br>  -->
      <!-- <br> -->
    <!-- </div> -->

    <div
      class="container"
      v-if="pending"
      :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
      >
      <div class="pending">

        <!-- Recherche en cours... -->
        {{ basicDict.request_loading[locale] }}

      </div>
    </div>

    <div
      class="container"
      v-if="!pending"
      :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
      >
      <SearchResultsCountAndTabs
        :view="VIEW_STAT"
        />

      <!-- MAIN CHART COMPONENT -->
      <div
        v-if="stats"
        class="columns is-multiline is-8"
        >

        <div
          v-for="(chart, index) in chartsList"
          :key="chart.serie_id"
          :class="`apexChartComponent-canvas column is-${ chart.col_size }`"
          >

          <!-- {{ chart }} -->

          <ApexChartComponent
            v-if="chart.is_activated"
            :chart="chart"
            :rawSerie="getCurrentRawSerie(chart.serie_id)"
            >
          </ApexChartComponent>

        </div>

      </div>


      <!-- TESTS APEX CHARTS -->
      <!-- <div class="is-divider" data-content="TESTS APEX"></div> -->

      <!-- <div class="columns is-multiline">

        <apexchart
          :class="`column is-6`"
          type="bar"
          width="100%"
          height="300px"
          :options="chartOptions"
          :series="series_horiz_bar"
        />

        <apexchart
          :class="`column is-6 `"
          type="line"
          width="100%"
          height="200px"
          :options="options"
          :series="series_line">
        </apexchart>

        <apexchart
          :class="`column is-6 `"
          type="donut"
          width="100%"
          height="200px"
          :options="chartOptions_doughnut"
          :series="series_doughnut"
        ></apexchart>

      </div> -->





      <div class="no-result error" v-if="!stats">
        <img src="/static/illustrations/erreur_no_results.png">
        <div>
          <h1 class="title is-1 is-primary is-primary-b">
            <!-- Aucun projet trouvé ! -->
            {{ basicDict.no_results[locale] }}
          </h1>
          <p>
            <!-- Pour obtenir plus de résultats, modifiez vos critères de recherche -->
            {{ basicDict.no_results_help[locale] }}
          </p>
          <button v-if="hasSelectedFilters" href="/" class="button is-primary is-primary-b is-outlined" @click="clearAllFilters">
            <!-- Supprimer tous les filtres -->
            {{ basicDict.delete_all_filters[locale] }}
          </button>
        </div>
      </div>



    </div>
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import SearchResultsCountAndTabs from './SearchResultsCountAndTabs.vue'
  import ApexChartComponent from './ApexChartComponent.vue'

  import {  objectFromPath, isEmpty } from '~/plugins/utils.js';

  import { VIEW_STAT } from '../../config/constants.js'
  import { BasicDictionnary } from "~/config/basicDict.js"


  let scrollListener;

  // cf : https://apexcharts.com/vue-chart-demos/

  export default {

    name: 'SearchResultsStats',

    components: {
      SearchResultsCountAndTabs,
      ApexChartComponent
    },

    props: [
      'routeConfig',
      // 'projectContentsFields'
    ],


    // beforeCreate: function () {
      //   console.log("\n - - SearchResultsList / beforeCreate ... ")
    // },
    // created: function () {
      //   console.log("\n - - SearchResultsList / created ... ")
    // },

    beforeMount : function(){
      this.log && console.log('\nC-SearchResultsStats / beforeMount...')
    },

    mounted(){

      // this.log && console.log('Cs-SearchResultsStas / mounted ...')

      this.$store.dispatch('search/setSearchConfigDisplay');
      this.showCount = this.$store.getters['search/getSearchConfigDefaultShowCount']

      scrollListener = () => {
        const getSearchConfigScrollBeforeBottomTrigger = this.$store.getters['search/getSearchConfigScrollBeforeBottomTrigger']
        const getSearchConfigMoreProjectOnScrollCount = this.$store.getters['search/getSearchConfigMoreProjectOnScrollCount']

        if (getSearchConfigMoreProjectOnScrollCount && getSearchConfigScrollBeforeBottomTrigger &&
          window.innerHeight + window.scrollY >= (document.body.offsetHeight - getSearchConfigScrollBeforeBottomTrigger)
        ) {
          if(this.$store.state.search.search.answer.result && this.showCount < this.$store.state.search.search.answer.result.projects.length){
            this.showCount = this.showCount + getSearchConfigMoreProjectOnScrollCount
          }
        }
      }
      window.addEventListener('scroll', scrollListener, {passive: true})
    },

    watch: {
      stats(next, prev){
        // this.showCount = this.$store.getters['search/getSearchConfigDefaultShowCount'];
      }
    },


    data(){
      return {
        VIEW_STAT,
        showCount: undefined,
        basicDict : BasicDictionnary,
      }
    },

    computed: {

      projectContentsFields() {
        return this.routeConfig.contents_fields
      },

      routeConfigCharts() {
        let chartsListCopy = []
        for ( let chart of this.routeConfig.charts_list) {
          chartsListCopy.push( chart )
        }
        // return this.routeConfig.charts_list
        chartsListCopy = chartsListCopy.sort( (a,b) => ( a.position > b.position ) ? 1 :-1  )
        return chartsListCopy
      },



      ...mapState({

        log : state => state.log,
        locale : state => state.locale,
        breakpoint : state => state.breakpoint,
        // pending: state => !!state.search.search.answer.pendingAbort,
        // projects: state => state.search.search.answer.result && state.search.search.answer.result.projects,
        // total: state => state.search.search.answer.result && state.search.search.answer.result.total,
        hasSelectedFilters: state => {
          const selectedFilters = state.search.search.question && state.search.search.question.selectedFilters;
          // console.log('C-SearchResultsStas / selectedFilters : ', selectedFilters)
          if(!selectedFilters)
            return false
          return [...selectedFilters.values()].some(selectedFilterValues => selectedFilterValues.size >= 1)
        }
      }),

      ...mapGetters({
        pending : 'search/getPending',
        stats : 'search/getResultsStats',
      }),

      chartsList (){
        this.log && console.log('\nC-SearchResultsStats-getCurrentRawSerie / this.routeConfig.charts_list : ', this.routeConfig.charts_list)
        let chartsList = this.routeConfigCharts
        // chartsList = chartsList.sort( (a,b) => ( a.position > b.position ) ? 1 :-1  )
        return chartsList
      },

      isStatsEmpty(){
        return isEmpty(this.stats)
      }


    },

    methods: {

      getCurrentRawSerie( serieId ) {
        this.log && console.log('\nC-SearchResultsStats-getCurrentRawSerie / this.stats : ', this.stats)
        let rawSerie = !this.isStatsEmpty && this.stats.find( serie => {
          return serie.serie_id === serieId
        })

        return rawSerie
      },

      buildChartOptions( chartSettings ){

        const chartId = chartSettings.serie_id
        this.log && console.log('\nC-SearchResultsStats-buildChartOptions / chartId : ', chartId)

        this.log && console.log('C-SearchResultsStats-buildChartOptions / chartSettings : ', chartSettings)
        let chartOptions = chartSettings.chart_options
        this.log && console.log('C-SearchResultsStats-buildChartOptions / chartOptions : ', chartOptions)

        // let rawSerieVue = this.getCurrentRawSerie( chartId )
        // let rawSerie = Object.assign( {}, rawSerieVue )
        let rawSerie = this.getCurrentRawSerie(chartId)

        let dataMapping = chartSettings.data_mapping
        let dataPath = dataMapping.serie_path

        return chartOptions
      },

      buildChartSeries( chartSettings ){

        const chartId = chartSettings.serie_id
        this.log && console.log('\nC-SearchResultsStats-buildChartSeries / chartId :', chartId)

        this.log && console.log('C-SearchResultsStats-buildChartSeries / chartSettings :', chartSettings)

        // let rawSerieVue = this.getCurrentRawSerie( chartId )
        // let rawSerie = Object.assign( {}, rawSerieVue )
        let rawSerie = this.getCurrentRawSerie(chartId)
        this.log && console.log('C-SearchResultsStats-buildChartSeries / rawSerie :', rawSerie)

        let dataMapping = chartSettings.data_mapping
        let dataPath = dataMapping.serie_path
        let dataNameField = dataMapping.serie_name_field
        let dataSerieSettings = dataMapping.serie_data
        let dataValueField = dataSerieSettings.data_value

        let dataObject = objectFromPath( rawSerie, dataPath )
        this.log && console.log('C-SearchResultsStats-buildChartSeries / dataObject :', dataObject)


        let dataObjectRefined = dataObject.map( item => {

          this.log && console.log('C-SearchResultsStats-buildChartSeries / map / item :', item)
          const container = {}

          // remap serie name
          container.name = item[ dataNameField ]

          // remap serie data values
          let serieData = objectFromPath( item, dataSerieSettings.subpath )
          this.log && console.log('C-SearchResultsStats-buildChartSeries / map / serieData :', serieData)

          // reorder and add missing fields
          if ( dataSerieSettings.add_missing_values ){

            let missingFields = dataSerieSettings.missing_data_by.val_fields_list
            this.log && console.log('C-SearchResultsStats-buildChartSeries / map / missingFields :', missingFields)

            let fieldName = dataSerieSettings.missing_data_by.val_field
            this.log && console.log('C-SearchResultsStats-buildChartSeries / map / fieldName :', fieldName)

            let existingFields = serieData.map( data => {
              return data[ fieldName ]
            })

            for ( let field of missingFields ) {
              if ( !existingFields.includes(field) ) {
                let missingData = {}
                missingData[ dataValueField ] = 0
                missingData[ fieldName ] = field
                // serieData.push( missingData ) // tries to mutate vuex object => BAD
              }
            }
          }

          container.data = serieData

          if ( dataSerieSettings.need_remap ) {
            container.data = container.data.map( data => {
              this.log && console.log('C-SearchResultsStats-buildChartSeries / map / data :', data)
              return data[ dataValueField ]
            })
          }

          this.log && console.log('C-SearchResultsStats-buildChartSeries / map / container :', container)
          return container
        })


        this.log && console.log('C-SearchResultsStats-buildChartSeries / (before list only) dataObjectRefined :', dataObjectRefined)

        // list only
        if ( dataSerieSettings.need_list_only ) {
          dataObjectRefined = dataObjectRefined.map( dataObj => {
            return dataObj.data[ dataValueField ]
          })
        }

        this.log && console.log('C-SearchResultsStats-buildChartSeries / dataObjectRefined :', dataObjectRefined)
        // return dataObject
        return dataObjectRefined
      },


      clearAllFilters(){
        this.$store.dispatch( 'search/clearAllFilters' )
      }
    },

    beforeDestroy(){
      window.removeEventListener('scroll', scrollListener)
      scrollListener = undefined;
    }

  }
</script>

<style scoped>

  /* TODO SASS : make a variable out of this background-value. Also used in SearchResultsCountAndTabs */
  .search-results-stats{
    background-color: #F6F6F6;
    width: 100%;

    padding-bottom: 1.5rem;
    padding-top: 1rem;
  }

  .apexChartComponent-canvas{
    margin: 1em 0.75em 1em 0.75em ;
  }

  .pending{
    text-align: center;
    padding: 2em;
  }
</style>
