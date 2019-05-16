<template>
  <DynamicSearchScreenSqueleton 
    :filtersConfig="filtersConfig"
    mainClass="list"
    >
    <!-- <SearchResultsMaps
      :routeConfig="routeConfig"
      :endPointConfig="endPointConfig"
    /> -->
    <SearchResultsMapbox
      :routeConfig="routeConfig"
      :endPointConfig="endPointConfig"
    />
  </DynamicSearchScreenSqueleton>
</template>

<script>
import { mapState } from 'vuex'

import DynamicSearchScreenSqueleton from './DynamicSearchScreenSqueleton.vue'
import SearchResultsMaps from './SearchResultsMaps.vue';
import SearchResultsMapbox from './SearchResultsMapbox.vue';


export default {

  name: 'DynamicMap',  

  props:[
    'routeConfig',
    'endPointConfig',
    'filtersConfig',
  ],

  beforeMount : function(){
    this.log && console.log('\nC-DynamicMap / beforeMount...')
  },

  components: {
    DynamicSearchScreenSqueleton, 
    SearchResultsMaps,
    SearchResultsMapbox,
  },

  computed: {

    ...mapState({
      log : 'log', 
      locale : state => state.locale,
      user: state => state.user.user
    }),

  },
}
</script>

<style>
  .list .filter-feedback{
    padding-bottom: 1em;
  }
</style>
