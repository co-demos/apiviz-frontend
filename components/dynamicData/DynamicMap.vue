<template>
  <DynamicSearchScreenSqueleton 
    :filtersConfig="filtersConfig"
    mainClass="list"
    >
    <SearchResultsMap
      :routeConfig="routeConfig"
      :endPointConfig="endPointConfig"
    />
  </DynamicSearchScreenSqueleton>
</template>

<script>
import {mapState} from 'vuex'

import DynamicSearchScreenSqueleton from './DynamicSearchScreenSqueleton.vue'
import SearchResultsMap from './SearchResultsMap.vue';

export default {
  name: 'DynamicMap',  
  props:[
    'routeConfig',
    'endPointConfig',
    'filtersConfig',
  ],
  components: {
    DynamicSearchScreenSqueleton, 
    SearchResultsMap
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
}
</script>

<style>
  .list .filter-feedback{
    padding-bottom: 1em;
  }
</style>
