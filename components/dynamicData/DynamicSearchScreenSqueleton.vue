<template>
  <div>
    <SearchWithFilters
      :filtersConfig="filtersConfig"
    />
    <main :class="mainClass">
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
  
}
</script>

<style lang="scss">

  @import '../../assets/css/apiviz-misc.scss';

  main{
    margin-top: $apiviz-navbar-height + $apiviz-search-bar-height;
  }

</style>
