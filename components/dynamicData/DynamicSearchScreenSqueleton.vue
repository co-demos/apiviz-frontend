<template>
  <div>
    <SearchWithFilters
      :filtersConfig="filtersConfig"
    />
    <main :class="mainClass">
      <!-- TEMPORARILY COMMENTED -->
      <FiltersFeedback/>
      <slot/>
    </main>

    <!-- DEBUGGING -->
      <!-- 
        <br><br>
      DynamicSearchSqueleton // endpointConfig : <br><code>{{ this.endpointConfig }}</code>
      <br><br>
      DynamicSearchSqueleton // getEndpointConfigFilters : <br><code>{{ this.getEndpointConfigFilters }}</code> 
    --> 

  </div>
</template>

<script>
import SearchWithFilters from './SearchWithFilters.vue';
import FiltersFeedback from './FiltersFeedback.vue';

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

  beforeMount : function(){
    this.log && console.log('\nC-DynamicSearchScreenSqueleton / beforeMount...')
  },

  mounted(){
    this.log && console.log('\nC-DynamicSearchScreenSqueleton / mounted...')
    this.log && console.log('C-DynamicSearchScreenSqueleton / this.mainClass : ', this.mainClass)
    this.log && console.log('C-DynamicSearchScreenSqueleton / this.filtersConfig : ', this.filtersConfig)
  },

}
</script>

<style lang="scss">

  @import '../../assets/css/apiviz-misc.scss';

  main{
    margin-top: $apiviz-navbar-height + $apiviz-search-bar-height;
  }

</style>
