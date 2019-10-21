<template>
  <section class="search-results-list">

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
        :view="VIEW_TABLE"
      />



      <PaginationNav 
        v-if="routePagination && routePagination.is_visible && ['top', 'top_and_bottom', 'both'].includes(routePagination.position)" 
        :position="'top'"
        :feedback="routePagination.feedback"              
      />


      <!-- Table container and content -->
      <div class="table-container">
        <table class="table is-centered">

          <!-- HEADER -->
          <thead>
            <tr>
              <th>
                {{ basicDict.table_to_detail[locale] }}
              </th>
              <th 
                v-for="(contentField, index) in columnsOrder.orderedColumnsArray"
                :key="index"
                >
                <!-- <abbr 
                  :title="contentField">
                  {{ contentField }}
                </abbr> -->
                {{ contentField }}
              </th>
            </tr>
          </thead>

          <!-- BODY -->
          <tbody>
            <tr 
              v-for="(item, index) in projects"
              :key="index"
              >
              <td class="has-text-centered">
                <nuxt-link 
                  :to="`/${dataset_uri}/detail?id=${ itemField( item, columnsOrder.idField ) }`" 
                  >
                  <span class="icon has-text-centered is-marginless">
                    <i class="fas fa-link"></i>
                  </span>
                </nuxt-link>
              </td>
              <td
                v-for="(contentField, index) in columnsOrder.contentFieldsRaw"
                :key="index">
                <nuxt-link
                  v-if="contentField.has_link_to_detail"
                  :to="`/${dataset_uri}/detail?id=${ itemField( item, columnsOrder.idField ) }`" 
                  class="has-text-weight-medium link-underlined"
                  >
                  {{ itemField(item, contentField.field ) }}
                </nuxt-link>
                <span v-else>
                  {{ itemField(item, contentField.field ) }}
                </span>
              </td>
            </tr>
          </tbody>

        </table>

      </div>


      <PaginationNav 
        v-if="routePagination && routePagination.is_visible && ['bottom', 'top_and_bottom', 'both'].includes(routePagination.position)" 
        :position="'bottom'"
        :feedback="routePagination.feedback"
      />

      <!-- TABLE NAVIGATION -->
      <!-- <div class="pagination-block">

        <div class="pagination">
          <div class="field has-addons">

            <div class="control">
              <button class="button"
                @click="changePagination( 'changePage' , -1 )"
                :disabled="searchQuestion.page === 1"
                >
                <span class="icon has-text-centered is-marginless">
                  <i class="fas fa-chevron-left"></i>
                </span>
                <span class="is-hidden-touch">
                  {{ basicDict.previous[locale] }}
                </span>
              </button>
            </div>

            <div class="control">
              <div class="select">

                <select
                  @change="changePerPageSelection( $event )"
                  v-model="perPage">

                  <option 
                    v-for="(pp, index) in perPageOptions"
                    :key="index"
                    :selected="pp === perPage"
                    :value="pp"
                    >
                    {{ pp }} {{ basicDict.results_per_page[locale] }}
                  </option>

                </select>
              </div>
            </div>

            <div class="control">
              <button class="button"
                @click="changePagination( 'changePage' , 1 )"
                >
                <span class="is-hidden-touch">
                  {{ basicDict.next[locale] }}
                </span>
                <span class="icon has-text-centered is-marginless">
                  <i class="fas fa-chevron-right"></i>
                </span>
              </button>
            </div>

          </div>
        </div>

        <div class="pagination">
          {{ basicDict.page[locale] }} {{ searchQuestion.page }} /  
          {{ basicDict.results[locale] }} 
            {{ (searchQuestion.perPage * searchQuestion.page ) - searchQuestion.perPage + 1 }} - {{  (searchQuestion.perPage * searchQuestion.page) }}
        </div>

      </div> -->

      <!-- <hr><pre><code>{{ JSON.stringify(columnsOrder, null, 1 )}}</code></pre> -->
      <!-- <hr>searchQuestion : <pre><code>{{ JSON.stringify(searchQuestion, null, 1 )}}</code></pre> -->
      <!-- <hr>perPageOptions : <pre><code>{{ JSON.stringify(perPageOptions, null, 1 )}}</code></pre> -->
      <!-- <hr><pre><code>{{ JSON.stringify(projects , null, 1) }}</code></pre><br> -->


      <div class="no-result error" v-if="total === 0">

        <img src="/static/illustrations/erreur_no_results.png">

        <br>

        <div class="has-text-centered">

          <h1 class="title is-1 has-text-primary has-text-primary-b">
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
import { mapState, mapGetters, mapActions } from 'vuex'

// import ProjectCard from './ProjectCard.vue'
import SearchResultsCountAndTabs from './SearchResultsCountAndTabs.vue'
import PaginationNav from './PaginationNav.vue'

import { VIEW_TABLE, defaultPagination } from '../../config/constants.js'
import { BasicDictionnary } from "~/config/basicDict.js" 

let scrollListener;

export default {

  name: 'SearchResultsTable',

  components: {
    // ProjectCard,
    SearchResultsCountAndTabs,
    PaginationNav,
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
    this.perPage = this.searchQuestion.perPage
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
      VIEW_TABLE,
      showCount: undefined,
      basicDict : BasicDictionnary, 
      perPage : defaultPagination.perPage,
    }
  },
  
  computed: {

    projectContentsFields() {
      return this.routeConfig.contents_fields
    },

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      // pending: state => !!state.search.search.answer.pendingAbort,
      // projects: state => state.search.search.answer.result && state.search.search.answer.result.projects,
      total: state => state.search.search.answer.result && state.search.search.answer.result.total,
      hasSelectedFilters: state => {
        const selectedFilters = state.search.search.question && state.search.search.question.selectedFilters;
        // console.log('C-SearchResultsTable / selectedFilters : ', selectedFilters)
        if(!selectedFilters)
          return false;
        return [...selectedFilters.values()].some(selectedFilterValues => selectedFilterValues.size >= 1)
      }
    }),

    ...mapGetters({
      pending  : 'search/getPending',
      dataset_uri : 'search/getSearchDatasetURI',
      searchQuestion : 'search/getQuestion',
      perPageOptions : 'search/getPerPageOptions',
      projects : 'search/getResults',
      total    : 'search/getResultsCount',
    }),


    columnsOrder() {

      let columnsOrderObject = {}

      let contentFields = this.routeConfig.contents_fields

      let contentFieldsOrdered = []
      contentFields.forEach(item => {
        if ( item.is_id_field ){
          columnsOrderObject.idField = item.field
        }
        if( item.is_visible ){
          contentFieldsOrdered.push(item)
        }
      })
      contentFieldsOrdered.sort((a,b) => (a.position > b.position) ? 1 : -1  )
      columnsOrderObject.contentFieldsRaw = contentFieldsOrdered

      let contentFieldsOrderedArray = []
      contentFieldsOrdered.forEach(item => {
        if ( item.is_visible ){
          contentFieldsOrderedArray.push(item.field)
        }
      })
      columnsOrderObject.orderedColumnsArray = contentFieldsOrderedArray

      return columnsOrderObject
    },

    routePagination() {
      return this.routeConfig.pagination
    },

  },

  methods: {

    clearAllFilters(){
      this.$store.dispatch( 'search/clearAllFilters' )
    },

    itemField( item, field ){
      return item && item[field]
    },

    changePerPageSelection(event){
      this.changePagination( 'changePerPage', event.target.value )
    },

    changePagination( pageEffect, value ){

      this.log && console.log('C-SearchResultsTable / changePagination /  pageEffect : ', pageEffect)
      this.log && console.log('C-SearchResultsTable / changePagination /  value : ', value)

      if ( pageEffect === 'changePage' ){
        if ( this.searchQuestion.page !== 1 || value !== -1 ){
          this.$store.dispatch('search/changePage', value )
        }
      }
      if ( pageEffect === 'changePerPage' ){
        this.perPage = value
        this.$store.dispatch('search/changePerPage', value )
      }
    },

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

  /* .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5em;
  } */

  .table-container {
    margin-bottom: 2em;
  }

  .table {
    margin-left: auto;
    margin-right: auto;
  }

  .pending{
      text-align: center;
      padding: 2em;
      margin-top : 8em;
      margin-bottom : 8em;
  }
</style>
