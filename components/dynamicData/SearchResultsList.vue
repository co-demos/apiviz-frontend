<template>
  <section class="search-results-list">

    <!-- DEBUGGING -->
    <!-- <div class="container"> -->
      <!-- -- SearchResultsList --<br> -->
      <!-- routeConfig.dataset_uri : <code>{{ routeConfig.dataset_uri }}</code><br> -->
      <!-- routeConfig.contents_fields : <br><pre><code>{{ JSON.stringify(routeConfig.contents_fields , null, 1) }}</code></pre><br>  -->
      <!-- <br> -->
    <!-- </div> -->

    <!-- <div
      class="container"
      v-if="pending"
      :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
      >
      <div class="pending">
        {{ basicDict.request_loading[locale] }}
      </div>
    </div>
    -->

      <!-- v-if="!pending" -->
    <div
      class="container"
      :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
      >
      <SearchResultsCountAndTabs
        :view="VIEW_LIST"
      />

      <PaginationNav
        v-if="routePagination && routePagination.is_visible && ['top', 'top_and_bottom', 'both'].includes(routePagination.position)"
        :position="'top'"
        :feedback="routePagination.feedback"
        :show="true"
      />

      <div
        v-if="total > 0 && !pending"
        class="columns"
        >
        <div class="column is-3"
          v-for="(itemsColumn, i) in projectColumns"
          :key="i"
          >
          <div class="columns is-multiline">
            <ProjectCard
              v-for="item in itemsColumn"
              :key="item.id"
              :item="item"
              :contentFields="projectContentsFields"
              :view="VIEW_LIST"
              />
          </div>
        </div>
      </div>

      <div
        class="container"
        v-if="pending"
        :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
        >
        <div class="pending">
          {{ basicDict.request_loading[locale] }}
        </div>
      </div>

      <PaginationNav
        v-if="routePagination && routePagination.is_visible && ['bottom', 'top_and_bottom', 'both'].includes(routePagination.position)"
        :position="'bottom'"
        :feedback="routePagination.feedback"
        :show="!pending && total > 0"
      />

      <div
        class="no-result error"
        v-if="!pending && total === 0"
        >

        <img src="/static/illustrations/erreur_no_results.png">

        <br>

        <div class="has-text-centered">

          <h1 class="title is-1 has-text-primary has-text-primary-c">
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

import ProjectCard from './ProjectCard.vue'
import SearchResultsCountAndTabs from './SearchResultsCountAndTabs.vue'
import PaginationNav from './PaginationNav.vue'

import { VIEW_LIST } from '../../config/constants.js'
import { BasicDictionnary } from "~/config/basicDict.js"

let scrollListener;

export default {

  name: 'SearchResultsList',

  components: {
    ProjectCard,
    SearchResultsCountAndTabs,
    PaginationNav
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
    // this.log && console.log('\nC-SearchResultsList / beforeMount...')
    // this.log && console.log("C-SearchResultsList / this.routeConfig : \n ", this.routeConfig)
    // this.log && console.log("C-SearchResultsList / this.projectContentsFields : \n ", this.projectContentsFields)
    // this.log && console.log("C-SearchResultsList / this.$store.state.search : \n ", this.$store.state.search)
    // this.projectContentsFields = this.routeConfig.content_fields
  },

  mounted(){

    // this.log && console.log('Cs-SearchResultsList / mounted ...')

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
      VIEW_LIST,
      showCount: undefined,
      basicDict : BasicDictionnary,
    }
  },

  computed: {

    projectContentsFields() {
      return this.routeConfig.contents_fields
    },

    routePagination() {
      return this.routeConfig.pagination
    },

    ...mapState({
      log : 'log',
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      // pending: state => !!state.search.search.answer.pendingAbort,
      // projects: state => state.search.search.answer.result && state.search.search.answer.result.projects,
      total: state => state.search.search.answer.result && state.search.search.answer.result.total,
      hasSelectedFilters: state => {
        const selectedFilters = state.search.search.question && state.search.search.question.selectedFilters;
        // console.log('C-SearchResultsList / selectedFilters : ', selectedFilters)
        if(!selectedFilters)
            return false;

        return [...selectedFilters.values()].some(selectedFilterValues => selectedFilterValues.size >= 1)
      }
    }),

    ...mapGetters({
      pending : 'search/getPending',
      projects : 'search/getResults',
      total : 'search/getResultsCount',
    }),

    projectColumns(){

      // this.log && console.log('\nC-SearchResultsList / projectColumns ...')

      // const {projects} = this.$store.state.search.search.answer.result;
      const {projects} = this.$store.getters['search/getResultObject']
      // this.log && console.log('C-SearchResultsList / projectColumns / projects : ', projects)

      const getSearchConfigColumnCount = this.$store.getters['search/getSearchConfigColumnCount']
      // this.log && console.log('C-SearchResultsList / projectColumns / getSearchConfigColumnCount : ', getSearchConfigColumnCount)

      if ( projects && getSearchConfigColumnCount ){
        const columnsData = Array(getSearchConfigColumnCount).fill().map(() => []);

        projects.slice(0, this.showCount).forEach((p, i) => {
            columnsData[i%getSearchConfigColumnCount].push(p);
        })

        // this.log && console.log('C-SearchResultsList / projectColumns / columnsData : ', columnsData)
        return columnsData
      }
    },



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
  .search-results-list{
    background-color: #F6F6F6;
    width: 100%;

    padding-bottom: 1.5rem;
    padding-top: 1rem;
  }


  .pending{
    text-align: center;
    padding: 2em;
    margin-top : 10em;
    margin-bottom : 10em;
  }
</style>
