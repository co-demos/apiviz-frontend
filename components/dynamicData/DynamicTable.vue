<template>
  <DynamicSearchScreenSqueleton
    :filtersConfig="filtersConfig"
    mainClass="table"
    >
    <SearchResultsTable
      :routeConfig="routeConfig"
    />
      <!-- :projectContentsFields="routeConfig.contents_fields" -->
  </DynamicSearchScreenSqueleton>
</template>

<script>
import { mapState } from 'vuex'

import DynamicSearchScreenSqueleton from './DynamicSearchScreenSqueleton.vue'
import SearchResultsTable from './SearchResultsTable.vue';

export default {

  name: 'DynamicTable',

  props:[
    'routeConfig',
    'endPointConfig',
    'filtersConfig',
    // 'breakpoint'
  ],

  beforeMount : function(){
    // this.log && console.log('\nC-DynamicList / beforeMount...')
  },

  data: () => {
    return   {
    }
  },

  components: {
    DynamicSearchScreenSqueleton,
    SearchResultsTable
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
