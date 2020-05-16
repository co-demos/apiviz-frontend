<template>
  <section class="search-results-list">

    <!-- DEBUGGING -->
    <div class="container">
      <!-- -- SearchResultsList --<br> -->
      <!-- routeConfig.dataset_uri : <code>{{ routeConfig.dataset_uri }}</code><br> -->
      <!-- routeConfig.contents_fields : <br><pre><code>{{ JSON.stringify(routeConfig.contents_fields , null, 1) }}</code></pre><br>  -->
      <!-- <br> -->
      <!-- {{ selectedFilters }} -->
    </div>

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
        :view="VIEW_TABLE"
      />

      <PaginationNav 
        v-if="routePagination && routePagination.is_visible && ['top', 'top_and_bottom', 'both'].includes(routePagination.position)" 
        :position="'top'"
        :feedback="routePagination.feedback"
        :show="true"
      />

      <!-- Table container and content -->
      <div 
        v-if="!pending && total > 0"
        class="table-container"
        >
        <table 
          class="table is-centered"
          >

          <!-- HEADER -->
          <thead>
            <tr 
              class="is-centered"
              >
              <th
                v-if="tableOptions && tableOptions.has_link_col" 
                class="is-size-7 table-header-center-parent"
                >
                <span
                  class="table-header-center-child">
                  {{ basicDict.table_to_detail[locale] }}
                </span>
              </th>
              <th 
                v-for="(contentField, index) in columnsOrder.contentFieldsRaw"
                :key="index"
                class="table-header-center-parent has-text-centered"
                >
                <!-- <abbr 
                  :title="contentField">
                  {{ contentField }}
                </abbr> -->
                <div 
                  v-if="contentField.is_sortable"
                  :class="`button is-small  ${ contentField.field === sortBy ? 'is-active' : ''}`"
                  @click="changeSorting( contentField.field )"
                  >
                  {{ getContentText(contentField) }}
                  <span class="icon has-text-centered is-marginless">
                    <i 
                      :class="`fas fa-angle-${ sortIsDescending ? 'down' : 'up'} ${ contentField.field === sortBy ? '' : ''}`"></i>
                  </span>
                </div>
                <div 
                  v-else
                  class="is-size-7 has-text-centered table-header-center-child"
                  >
                  <span
                    class="table-header-center-child">
                    {{ getContentText(contentField) }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <!-- BODY -->
          <tbody>
            <tr 
              v-for="(item, index) in projects"
              :key="index"
              >
              <td 
                v-if="tableOptions && tableOptions.has_link_col" 
                class="has-text-centered"
                >
                <nuxt-link 
                  :to="`/${dataset_uri}/detail?id=${ itemField( item, columnsOrder.idField ) }`" 
                  >
                  &nbsp;
                  <span class="icon has-text-centered is-marginless">
                    <i class="fas fa-link"></i>
                  </span>
                  &nbsp;
                </nuxt-link>
              </td>
              <td
                v-for="(contentField, index) in columnsOrder.contentFieldsRaw"
                :key="index">

                <!-- LINK TO DETAIL -->
                <nuxt-link v-if="contentField.has_link_to_detail"
                  :to="`/${dataset_uri}/detail?id=${ itemField( item, columnsOrder.idField ) }`" 
                  :class="`link-underlined ${ contentField.is_table_head ? 'has-text-weight-semibold' : 'has-text-weight-medium'}`"
                  >
                  {{ itemField(item, contentField.field ) }}
                </nuxt-link>

                <!-- EXTERNAL LINK -->
                <a v-else-if="contentField.is_external_link"
                  :href="getCleanUrl(item, contentField.field )"
                  target="_blank"
                  class="link-underlined"
                  >
                  {{ itemField(item, contentField.field ) }}
                </a>

                <!-- TAGS -->
                <div v-else-if="contentField.is_tag_like">

                  <!-- {{ convertTags(item, contentField.field ) }} -->
                  <button 
                    v-for="(tag, i) in convertTags(item, contentField.field )" 
                    :class="`button tag ${ getItemColors(contentField.field)}`"
                    :key="tag.tagText+i"
                    @click="addTagAsFilter(contentField.field, tag)"
                    >
                    <span>
                      {{ tag.tagText }}
                    </span>
                    <span class="icon is-small"
                      v-if="selectedFilters.get(tag.filterName) && selectedFilters.get(tag.filterName).has(tag.tagOriginal)"
                      >
                      <i class="fas fa-times"></i>
                    </span>
                  </button>

                </div>

                <!-- ELSE -->
                <span v-else
                  :class="`${ contentField.is_table_head ? 'has-text-weight-semibold' : ''}`"
                  >
                  {{ itemField(item, contentField.field ) }}
                </span>
              </td>
            </tr>
          </tbody>

        </table>

      </div>

      <div 
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


      <!-- <hr><pre><code>{{ JSON.stringify(columnsOrder, null, 1 )}}</code></pre> -->
      <!-- <hr>searchQuestion : <pre><code>{{ JSON.stringify(searchQuestion, null, 1 )}}</code></pre> -->
      <!-- <hr>columnsOrder : <pre><code>{{ JSON.stringify(columnsOrder, null, 1 )}}</code></pre> -->
      <!-- <hr>perPageOptions : <pre><code>{{ JSON.stringify(perPageOptions, null, 1 )}}</code></pre> -->
      <!-- <hr><pre><code>{{ JSON.stringify(projects , null, 1) }}</code></pre><br> -->


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
import { mapState, mapGetters, mapActions } from 'vuex'

import axios from 'axios'
import { trimString } from '~/plugins/utils.js';

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
    this.log && console.log('\nC-SearchResultsList / beforeMount...')
    this.log && console.log("C-SearchResultsList / this.routeConfig : \n ", this.routeConfig)
    // this.log && console.log("C-SearchResultsList / this.projectContentsFields : \n ", this.projectContentsFields)
    // this.log && console.log("C-SearchResultsList / this.$store.state.search : \n ", this.$store.state.search)
    // this.projectContentsFields = this.routeConfig.content_fields
    this.perPage = this.searchQuestion.perPage
    this.localSortBy = this.searchQuestion.sortBy
    this.sortIsDescending = this.searchQuestion.sortIsDescending

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
      this.log && console.log('C-SearchResultsList / watch / projects ...')
      this.showCount = this.$store.getters['search/getSearchConfigDefaultShowCount'];
      const int = setInterval(() => {
        if(window.pageYOffset < 50){
          clearInterval(int)
        }
        else{
          window.scrollTo(0, 0)
        }
      }, 100);
    },

  },

  data(){
    return {
      VIEW_TABLE,
      showCount: undefined,
      basicDict : BasicDictionnary, 
      perPage : defaultPagination.perPage,
      
      localSortBy : undefined,
      sortIsDescending : false,

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
      sortBy: state => state.search.search.question.sortBy,
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
      selectedFilters : 'search/getSelectedFilters',
      filterDescriptions : 'search/getFilterDescriptions',
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
    tableOptions() {
      return this.routeConfig.table_options
    },
  },

  methods: {

    clearAllFilters(){
      this.$store.dispatch( 'search/clearAllFilters' )
    },

    itemField( item, field ){
      return item && item[field]
    },

    getContentText(contentField) {
      let resultText = contentField.field
      if ( contentField.custom_title && Array.isArray(contentField.custom_title ) ) {
        let textRef = contentField.custom_title.find( txt => txt.locale == this.locale )
        resultText = textRef.text
      }
      return resultText
    },

    getCleanUrl( item, field ) {
      let rawContent = this.itemField( item, field )
      if ( rawContent ) {
        if ( rawContent.startsWith('www') || !rawContent.startsWith('http') ) {
          rawContent = 'http://' + rawContent
        }
      }
      return rawContent
    },

    getContentField(field) {
      const contentsFields = this.routeConfig.contents_fields
      const contentField = contentsFields.find(f=> f.field == field)
      return contentField
    },

    convertTags(item, field) {
      let locale = this.locale
      const contentField = this.getContentField(field)
      let tags = this.itemField(item, field)

      if ( tags !== this.noData && contentField ) {
        let separator = contentField.tags_separator
        let tagsRaw = tags.split( separator )
        let tagsAsCleanArray = []
        tagsRaw.forEach( t => {
          if ( t !== "") { tagsAsCleanArray.push(t)}
        })

        const trimming = contentField.field_format.trim
        const filtersDescription = this.filterDescriptions
        const filterDictionnary = filtersDescription && filtersDescription.find( filter => filter.col_name == field )
        const filterChoices = filterDictionnary ? filterDictionnary.choices : undefined
        let newTags = tagsAsCleanArray.map( tag => {

          let tagContainer = {
            filterName: filterDictionnary ? filterDictionnary.name : undefined,
            filterChoice: undefined,
            tagOriginal: tag,
            tagText: tag
          }
          try {

            let choice = filterChoices.find( c => c.name == tag)
            tagContainer.filterChoice = choice

            // this.log && console.log("\nC-SearchResultsTable / convertTags / tagContainer : ", tagContainer )
            if ( contentField.convert_from_filters ) {
              let newTagObj = choice.choice_title.find( title => title.locale == locale )
              let newText = newTagObj.text
              // this.log && console.log("C-SearchResultsTable / convertTags / newText : ", newText )
              // this.log && console.log("C-SearchResultsTable / convertTags / trimming : ", trimming )
              // return trimString(newText, trimming)
              tagContainer.tagText = trimString(newText, trimming)
            }

            return tagContainer
          }
          catch (err) { return tagContainer }

        })
        tags = newTags
      }
      if ( tags === this.noData ) { tags = undefined }
      return tags
    },

    addTagAsFilter(field, tag) {
      // this.log && console.log("\nC-SearchResultsTable / addTagAsFilter / tag : ", tag )
      const contentField = this.getContentField(field)
      // this.log && console.log("C-SearchResultsTable / addTagAsFilter / contentField : ", contentField )
      if ( contentField && contentField.convert_from_filters ) {
        let filterTarget = {
          filter: tag.filterName,
          value: tag.tagOriginal
        }
        this.$store.dispatch( 'search/toggleFilter', filterTarget )
      }
    },

    getItemColors(field) {
      let contentField = this.getContentField( field )
      let textColor = contentField.item_color ? contentField.item_color : "white"
      let backgroundColor = contentField.background_color ? contentField.background_color : "dark"
      let colors = `is-${backgroundColor} is-${backgroundColor}-b has-text-${textColor} has-text-${textColor}-c`
      return colors
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

    changeSorting( field ){

      this.log && console.log('C-SearchResultsTable / changeSorting /  field : ', field)

      if ( field !== this.localSortBy ){
        this.sortIsDescending = false 
      } else {
        this.sortIsDescending = !this.sortIsDescending 
      }
      this.localSortBy = field
      this.$store.dispatch('search/changeSorting', { sortBy : field, sortIsDescending : this.sortIsDescending } )

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

  .table-header-center-parent {
    position: relative;
  }
  .table-header-center-child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .pending{
    text-align: center;
    padding: 2em;
    margin-top : 10em;
    margin-bottom : 10em;
  }

  .button.tag{
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0.2em 1em;
    font-size: 12px;
  }

</style>
