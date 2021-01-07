<template>
  <section class="search-results-calendar">


    <!-- DEBUGGING -->
    <!-- <div class="container"> -->
      <!-- -- SearchResultsCalendar --<br> -->
      <!-- projects : <code><pre>{{ projects }}</pre></code><br> -->
      <!-- eventsCalendar : <code>{{ eventsCalendar[0] }}</code><br> -->
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
        :view="VIEW_CALENDAR"
      />

      <!-- <PaginationNav
        v-if="routePagination && routePagination.is_visible && ['top', 'top_and_bottom', 'both'].includes(routePagination.position)"
        :position="'top'"
        :feedback="routePagination.feedback"
        :show="true"
      />
        -->





      <!-- CALENDAR... -->

      <vue-event-calendar
        v-if="eventsCalendar.length"
        :events="eventsCalendar">
      </vue-event-calendar>

      <!-- <Kalendar
        :configuration="calendar_settings"
        :events="events"
      /> -->

      <!-- <FullCalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
      /> -->


      <!-- <no-ssr>
        <full-calendar
        :events="events"
        :header="header"
        :config="config"
        ref="calendar"
        >
        </full-calendar>
      </no-ssr> -->



      <!-- <div
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
              :view="VIEW_CALENDAR"
              />
          </div>
        </div>
      </div> -->

      <div
        class="container"
        v-if="pending"
        :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
        >
        <div class="pending">
          {{ basicDict.request_loading[locale] }}
        </div>
      </div>






      <!-- <PaginationNav
        v-if="routePagination && routePagination.is_visible && ['bottom', 'top_and_bottom', 'both'].includes(routePagination.position)"
        :position="'bottom'"
        :feedback="routePagination.feedback"
        :show="!pending && total > 0"
      /> -->

      <div
        class="no-result error"
        v-if="!pending && total === 0"
        >

        <img src="/error_no_result.png">

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

import { VIEW_CALENDAR } from '../../config/constants.js'
import { BasicDictionnary } from "~/config/basicDict.js"


// TEST WITH CALENdAR
// import { Kalendar } from 'kalendar-vue';
// import 'kalendar-vue/dist/kalendarVue.css';


// TEST FULL-CALENDAR
// import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'



let scrollListener;

export default {

  name: 'SearchResultsCalendar',

  components: {
    ProjectCard,
    SearchResultsCountAndTabs,
    PaginationNav,

    // Kalendar,
    // FullCalendar // make the <FullCalendar> tag available
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
    // this.log && console.log('\nC-SearchResultsCalendar / beforeMount...')
    // this.log && console.log("C-SearchResultsCalendar / this.routeConfig : \n ", this.routeConfig)
    // this.log && console.log("C-SearchResultsCalendar / this.projectContentsFields : \n ", this.projectContentsFields)
    // this.log && console.log("C-SearchResultsCalendar / this.$store.state.search : \n ", this.$store.state.search)
    // this.projectContentsFields = this.routeConfig.content_fields
  },

  mounted(){

    // this.log && console.log('Cs-SearchResultsCalendar / mounted ...')

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

      VIEW_CALENDAR,
      showCount: undefined,
      basicDict : BasicDictionnary,

      eventsCalendar : [],
      demoEvents: [
        {
          date: '2019/11/19', // Required
          title: 'Foo' // Required
        }, {
          date: '2019/12/19',
          title: 'Bar',
          desc: 'description',
          customClass: 'disabled highlight' // Custom classes to an calendar cell
        }
      ],




      calendarPlugins: [ dayGridPlugin ],
      events: [],
      calendar_settings: {
        style: 'material_design',
        view_type: 'week',
        cell_height: 20,
        scrollToNow: true,
        current_day: new Date(),
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_dates: ['2019-10-31'], // Spooky
        hide_days: [6],
        past_event_creation: true
      },
      new_appointment: {
        title: null,
        description: null
      }

    }
  },

  watch: {

    projects(next, prev){
      this.log && console.log("C-SearchResultsCalendar / next : ", next)
      let newEvents = next.map( element => {
        const obj = {}
        obj.content = element
        obj.title = element.title
        obj.date = element.start.slice(0,10).replace(/-/g, "/")
        return obj
      })
      this.log && console.log("C-SearchResultsCalendar / next : ", next)
      this.eventsCalendar = newEvents
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
      projects: state => state.search.search.answer.result && state.search.search.answer.result.projects,
      total: state => state.search.search.answer.result && state.search.search.answer.result.total,
      hasSelectedFilters: state => {
        const selectedFilters = state.search.search.question && state.search.search.question.selectedFilters;
        // console.log('C-SearchResultsCalendar / selectedFilters : ', selectedFilters)
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

      // this.log && console.log('\nC-SearchResultsCalendar / projectColumns ...')

      // const {projects} = this.$store.state.search.search.answer.result;
      const {projects} = this.$store.getters['search/getResultObject']
      // this.log && console.log('C-SearchResultsCalendar / projectColumns / projects : ', projects)

      const getSearchConfigColumnCount = this.$store.getters['search/getSearchConfigColumnCount']
      // this.log && console.log('C-SearchResultsCalendar / projectColumns / getSearchConfigColumnCount : ', getSearchConfigColumnCount)

      if ( projects && getSearchConfigColumnCount ){
        const columnsData = Array(getSearchConfigColumnCount).fill().map(() => []);

        projects.slice(0, this.showCount).forEach((p, i) => {
            columnsData[i%getSearchConfigColumnCount].push(p);
        })

        // this.log && console.log('C-SearchResultsCalendar / projectColumns / columnsData : ', columnsData)
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

/* @import '@fullcalendar/core/main.css';
@import '@fullcalendar/daygrid/main.css'; */

  /* TODO SASS : make a variable out of this background-value. Also used in SearchResultsCountAndTabs */
  .search-results-calendar{
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
