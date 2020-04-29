<template>

  <div 
    id="searchScreennSkeleton"
    >

    <SearchWithFilters
      :filtersConfig="filtersConfig"
    />
    
    <main 
      :class="`${mainClass} ${ isIframe ? 'iframe' : ''}`"
      >
      <FiltersFeedback/>
      <slot/>
    </main>

    <!-- DEBUGGING -->
    <!-- 
    <div>
      isIframe : {{ isIframe }}<br>
      onlyIframe : {{ onlyIframe }}<br>
      DynamicSearchSqueleton // endpointConfig : <br><code>{{ this.endpointConfig }}</code>
      <br><br>
      DynamicSearchSqueleton // getEndpointConfigFilters : <br><code>{{ this.getEndpointConfigFilters }}</code> 
    </div>
    --> 

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import SearchWithFilters from './SearchWithFilters.vue'
import FiltersFeedback from './FiltersFeedback.vue'

export default {
  
  name: 'DynamicSearchScreenSqueleton',
  
  components: {
    SearchWithFilters, 
    FiltersFeedback, 
  },
  
  props: [
    'filtersConfig',
    'mainClass'
  ],

  data : () => {
    return {
    }
  },

  // beforeMount : function(){
  // },

  mounted(){
    this.log && console.log('\nC-DynamicSearchScreenSqueleton / mounted...')
    this.log && console.log('C-DynamicSearchScreenSqueleton / this.mainClass : ', this.mainClass)
    this.log && console.log('C-DynamicSearchScreenSqueleton / this.filtersConfig : ', this.filtersConfig)
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      isIframe : state => state.isIframe,
    }),

    ...mapGetters({
      shrinkNav : 'getShrinkNav',
    }),

  }

}
</script>

<style lang="scss">

  @import '../../assets/css/apiviz-misc.scss';

  main{
    // margin-top: $apiviz-navbar-height + $apiviz-search-bar-height;
    margin-top: $apiviz-navbar-height + rem(60px);
  }

  .iframe {
    margin-top: rem(60px) !important ;
  }

</style>
