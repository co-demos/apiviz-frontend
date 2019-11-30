<template>
  <DynamicSearchScreenSqueleton 
    :filtersConfig="filtersConfig"
    mainClass="calendar"
    >
    <!-- TEMPORARILY COMMENTED -->
    <SearchResultsCalendar
      :routeConfig="routeConfig"
    />
      <!-- :projectContentsFields="routeConfig.contents_fields" -->
  </DynamicSearchScreenSqueleton>
</template>

<script>
import { mapState } from 'vuex'

import DynamicSearchScreenSqueleton from './DynamicSearchScreenSqueleton.vue'
import SearchResultsCalendar from './SearchResultsCalendar.vue';

export default {

  name: 'DynamicCalendar',

  props:[
    'routeConfig',
    'endPointConfig',
    'filtersConfig',
    // 'breakpoint'
  ],

  beforeMount : function(){
    // this.log && console.log('\nC-DynamicCalendar / beforeMount...')
  },

  data: () => {
    return   {
    }
  },

  components: {
    DynamicSearchScreenSqueleton, 
    SearchResultsCalendar
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      breakpoint : state => state.breakpoint,
      user: state => state.user.user
    }),

  },
}
</script>

<style>

  .list .filter-feedback{
    padding-bottom: 0;
  }

</style>
