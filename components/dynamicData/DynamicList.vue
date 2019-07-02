<template>
  <DynamicSearchScreenSqueleton 
    :filtersConfig="filtersConfig"
    mainClass="list"
    >
    <!-- TEMPORARILY COMMENTED -->
    <SearchResultsList
      :routeConfig="routeConfig"
    />
      <!-- :projectContentsFields="routeConfig.contents_fields" -->
  </DynamicSearchScreenSqueleton>
</template>

<script>
import { mapState } from 'vuex'

import DynamicSearchScreenSqueleton from './DynamicSearchScreenSqueleton.vue'
import SearchResultsList from './SearchResultsList.vue';

export default {

  name: 'DynamicList',

  props:[
    'routeConfig',
    'endPointConfig',
    'filtersConfig'
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
    SearchResultsList
  },

  computed: {

    ...mapState({
      log : state => state.log, 
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
