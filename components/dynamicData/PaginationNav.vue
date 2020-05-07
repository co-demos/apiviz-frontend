<template>
  
    <!-- TABLE NAVIGATION -->
    <div 
      v-show="show"
      class="pagination-block is-centered"
      >

      <div class="pagination">
        <div class="field has-addons">
          
          <!-- PREVIOUS PAGE -->
          <div class="control">
            <button class="button has-text-primary-hover-c"
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

          <!-- SELEECT PERPAGE -->
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

          <!-- NEXT PAGE -->
          <div class="control">
            <button class="button has-text-primary-hover-c"
              @click="changePagination( 'changePage' , 1 )"
              :disabled="(searchQuestion.page * searchQuestion.perPage) >= total"
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

      <div 
        v-if="feedback && (feedback === position || feedback === 'top_and_bottom' )"
        class="pagination"
        >
        {{ basicDict.page[locale] }} {{ searchQuestion.page }} /  
        {{ basicDict.results[locale] }} 
          {{ (searchQuestion.perPage * searchQuestion.page ) - searchQuestion.perPage + 1 }} - {{ roofTotal }}
      </div>

      <!-- <hr><pre><code>{{ JSON.stringify(columnsOrder, null, 1 )}}</code></pre> -->
      <!-- <hr>searchQuestion : <pre><code>{{ JSON.stringify(searchQuestion, null, 1 )}}</code></pre> -->
      <!-- <hr>perPageOptions : <pre><code>{{ JSON.stringify(perPageOptions, null, 1 )}}</code></pre> -->
      <!-- <hr><pre><code>{{ JSON.stringify(projects , null, 1) }}</code></pre><br> -->

    </div>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { defaultPagination } from '../../config/constants.js'
import { BasicDictionnary } from "~/config/basicDict.js" 

// let scrollListener;

export default {

  name: 'PaginationNav',

  components: {
  },

  props: [
    'feedback',
    'position',
    'show'
  ],

  beforeMount : function(){
    this.perPage = this.searchQuestion.perPage
  },

  mounted(){
  },

  watch: {
  },

  data(){
    return {
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
      // total: state => state.search.search.answer.result && state.search.search.answer.result.total,
    }),

    ...mapGetters({
      searchQuestion : 'search/getQuestion',
      perPageOptions : 'search/getPerPageOptions',
      total : 'search/getResultsCount',
    }),

    roofTotal() {
      let rawTotal = this.searchQuestion.perPage * this.searchQuestion.page 
      if ( rawTotal > this.total ){
        return this.total
      } else {
        return rawTotal
      }
    }
  },

  methods: {


    changePerPageSelection(event){
      this.changePagination( 'changePerPage', event.target.value )
    },

    changePagination( pageEffect, value ){

      // this.log && console.log('C-SearchResultsTable / changePagination /  pageEffect : ', pageEffect)
      // this.log && console.log('C-SearchResultsTable / changePagination /  value : ', value)
      
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


}
</script>

<style scoped>

  .pagination-block{
    margin-bottom: 1em 
  }

  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5em;
  }

</style>
