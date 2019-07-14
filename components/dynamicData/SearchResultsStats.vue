<template>
  <section class="search-results-stats">

    <!-- DEBUGGING -->
    <!-- <div class="container"> -->
      <!-- -- SearchResultsList --<br> -->
      <!-- routeConfig.dataset_uri : <code>{{ routeConfig.dataset_uri }}</code><br> -->
      <!-- routeConfig.contents_fields : <br><pre><code>{{ JSON.stringify(routeConfig.contents_fields , null, 1) }}</code></pre><br>  -->
      <!-- <br> -->
    <!-- </div> -->

    <div class="container" v-if="pending">
      <div class="pending">
        <!-- Recherche en cours... -->
        {{ basicDict.request_loading[locale] }}
      </div>
    </div>

    <div class="container" v-if="!pending">
      <SearchResultsCountAndTabs 
        :view="VIEW_STAT"
      />

      <!-- <div class="columns" v-if="total > 0" > -->
      <div class="columns" >




        TEST STATS
        <br>

        <apexchart width="500" type="line" :options="options" :series="series_line"></apexchart>
        <br>
        <apexchart width="380" type="donut" :options="{}" :series="series_doughnut"></apexchart>



      </div>

      <div class="no-result error" v-if="total === 0">
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

  import { VIEW_STAT } from '../../config/constants.js'
  import { BasicDictionnary } from "~/config/basicDict.js" 


  let scrollListener;

  export default {

    name: 'SearchResultsStats',

    components: {
      SearchResultsCountAndTabs,
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
      // this.log && console.log("C-SearchResultsStas / this.routeConfig : \n ", this.routeConfig)
      // this.log && console.log("C-SearchResultsStas / this.projectContentsFields : \n ", this.projectContentsFields)
      // this.log && console.log("C-SearchResultsStas / this.$store.state.search : \n ", this.$store.state.search)
      // this.projectContentsFields = this.routeConfig.content_fields
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
      projects(next, prev){
        this.showCount = this.$store.getters['search/getSearchConfigDefaultShowCount'];
      }
    },


    data(){
      return {
        VIEW_STAT,
        showCount: undefined,

        basicDict : BasicDictionnary, 

        // TO VARIABILIZE
        // TEST DATA FOR APEX CHARTS
        options: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series_line: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }],
        series_doughnut: [44, 55, 41, 17, 15]
        // END TEST DATA FOR APEX CHARTS


      }
    },

    computed: {

      projectContentsFields() {
        return this.routeConfig.contents_fields
      },

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
        // pending: state => !!state.search.search.answer.pendingAbort,
        // projects: state => state.search.search.answer.result && state.search.search.answer.result.projects,
        // total: state => state.search.search.answer.result && state.search.search.answer.result.total,
        hasSelectedFilters: state => {
          const selectedFilters = state.search.search.question && state.search.search.question.selectedFilters;
          // console.log('C-SearchResultsStas / selectedFilters : ', selectedFilters)
          if(!selectedFilters)
              return false;

          return [...selectedFilters.values()].some(selectedFilterValues => selectedFilterValues.size >= 1)
        }
      }),

      ...mapGetters({
        pending : 'search/getPending',
        total : 'search/getResultsCount',
      }),



    },

    methods: {
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


  .pending{
      text-align: center;
      padding: 2em;
  }
</style>
