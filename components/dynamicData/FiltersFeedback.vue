<template>
    <section class="filter-feedback" v-if="selectedFilters.length >= 1">
      
      <div class="container inline-filters">

        <a class="button is-small" @click="clearAllFilters">
          <span>
            
            {{ getText('reinit_filters') }}
            <!-- effacer les filtres -->

          </span>

          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </a>

        <a 
          v-for="{filter, value} in selectedFilters" :key="filter+value"
          class="button is-small is-grey" 
          @click="clearFilter({filter, value})"
          >
          <span>
            {{
              filterDescriptions
                .find(f => f.name === filter)
                .choices
                .find(c => c.name === value)
                .fullname
            }}
          </span>

          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </a>

      </div>
    </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {

    name: 'FiltersFeedback',

    beforeMount : function(){
      // this.log && console.log('\nC-FiltersFeedback / beforeMount...')
    },

    computed: {

      ...mapState({
        log : 'log',
        locale : state => state.locale,
        // filterDescriptions: state => state.search.filterDescriptions,
        selectedFilters: state => {
          const {selectedFilters} = state.search.search.question
          const filters = []
          for(const [filter, values] of selectedFilters){
            for(const value of values){
                filters.push({filter, value})
            }
          }
          return filters
        }
      }),

      ...mapGetters({
        filterDescriptions : 'search/getFilterDescriptions'
      }),
    },

    methods: {

      clearAllFilters(){
        this.$store.dispatch( 'search/clearAllFilters' )
      },
      clearFilter({filter, value}){
        this.$store.dispatch( 'search/toggleFilter', {filter, value} )
      },

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },

      translate( textsToTranslate, listField ) {
        let listTexts = textsToTranslate[listField]
        return this.$Translate( listTexts, this.locale, 'text')
      },

    }

  }
</script>

<style scoped>

  .filter-feedback{
    width: 100%;
    /* background-color: #F6F6F6; */
    background-color: white;
    /* border-top: 1px solid; */
    /* border-top-color: #40529d; */
    /* top : -1px; */
    z-index: 10;
  }

  .filter-feedback > .inline-filters{
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 12px;
  }

  .filter-feedback > .inline-filters a.button {
    border-radius: 3px;
    margin-right: 0.5em;
    border: 1px solid #767676;
    padding-top: 0.1em ;
    padding-bottom: 0.1em ;
    height: inherit;
  }
  /* .filter-feedback > .inline-filters span{
      white-space: nowrap;
      border: 1px solid #767676;
      background-color: #767676;

      color: white;

      border-radius: 3px;

      padding: 0.1em 0 0.2em 1em;
      font-size: 0.9em;
  }

  .filter-feedback > .inline-filters span button{
      border: 0;
      padding: 0.2em 1em;
      margin: 0;

      font-size: 1.2em;
      font-weight: bold;
      height: 100%;

      color: currentColor;
      background-color: transparent;

      cursor: pointer;
      
  } */

  .filter-feedback > .inline-filters span.all{

      background-color: white;

      color: #767676;
  }

</style>