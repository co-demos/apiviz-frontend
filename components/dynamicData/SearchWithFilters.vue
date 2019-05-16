<template>
  <div class="search-bar navbar is-white is-fixed-top" role="menubar" aria-label="filters navigation">
    <div class="container">
      

      <!-- INPUT TEXT -->
      <div class="search control is-expanded">
        <div class="image-container"><img src="/static/icons/icon_search_violet.svg"></div>
        <input
          type="search"
          v-model="searchedText"
          class="input is-large is-light input-navbar"
          :placeholder="translate(endpointConfigFilters, 'placeholder' )"
          @input="searchTextChanged"
          >
        <span 
          v-show="searchedText !== ''"
          class="icon is-large is-right has-text-grey-light"
          @click="searchedText=''"
          >
          <i class="fas fa-times"></i>
        </span>
      </div>


      <!-- INPUT FILTERS -->
      <hr class="is-flex-touch filters-delimiter">
      <div class="navbar-end has-background-white "> <!-- is-hidden-touch (to completely hide from mobile)-->


        <span v-for="filter in filterDescriptions"
          :key="filter.name"
          :id="filter.name"
          href="#"
          class="navbar-item navbar-item-filter has-dropdown is-hoverable "
          >

          <a 
            :class='["navbar-link", {"has-text-weight-semibold" : selectedFilters.get(filter.name).size >= 1 } ]'
            @click="collapseChoices(filter.name)"
          >
          <!-- <a :class='["navbar-link", {"has-text-weight-semibold" : isFilterFromSelectedFiltersBold(filter.name) } ]'> -->
            <span>
              {{ filter.fullname }}
            </span>
          </a>

          <div  
            :id="filter.name" 
            :ref="filter.name"
            class="navbar-dropdown is-right hide-choices"
            > <!-- here make it collapsable -->

            <a
              class="navbar-item"
              v-for="choice in filter.choices" :key="choice.name"
              >
              <div class="field is-narrow">
                <input 	class="is-checkradio is-default is-normal"
                  :id="choice.name"
                  type="checkbox"
                  :checked="selectedFilters.get(filter.name).has(choice.name)"
                  :data-filter="filter.name"
                  :data-choice="choice.name"
                  @change="changeFilter"
                  >
                <label :for="choice.name">
                  {{ choice.fullname }}
                </label>
              </div>
            </a>

            <div class="navbar-item">
              <button class="button is-text is-fullwidth has-text-primary"
                :data-filter="filter.name"
                @click="emptyOneFilter({filter: filter.name})"
              >
                {{translate(endpointConfigFilters, 'reset' )}}
              </button>
            </div>

          </div>
        <hr class="is-flex-touch filters-delimiter">
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {

  name: 'SearchWithFilters',

  beforeMount : function(){
    // this.log && console.log('\nC-SearchWithFilters / beforeMount...')
  },

  mounted(){

    // this.log && console.log('C-SearchWithFilters / mounted...')

    if(!this.$store.state.search.search.answer.result){
      // this.log && console.log('C-SearchWithFilters / dispatching [search/searchedTextChanged]...')
      this.$store.dispatch('search/searchedTextChanged', {searchedText: this.searchedText})
    }

    // this.log && console.log('\nC-SearchWithFilters / mounted finished ...')
  },

  computed: {

    ...mapState({
      log : 'log', 
      locale : state => state.locale,
      // selectedFilters: state => state.search.search.question.selectedFilters,
      // filterDescriptions: state => state.search.filterDescriptions
    }),

    ...mapGetters({
      selectedFilters : 'search/getSelectedFilters',
      filterDescriptions : 'search/getFilterDescriptions'
    }),

    searchedText: {
      // get () { return this.$store.state.search.search.question.query },
      get () { return this.$store.getters['search/getSearchQuestionQuery'] },
      set (value) {
        // this.log && console.log('\nC-SearchWithFilters / searchedText dispatching ...')
        this.$store.dispatch('search/searchedTextChanged', {searchedText: value})
      }
    },

    endpointConfigFilters() {
      // this.log && console.log('C-SearchWithFilters / endpointConfigFilters() ...')
      let configFilter = this.$store.getters['config/getEndpointConfigFilters']
      return configFilter
    }

  },

  methods: {

    collapseChoices(filterName){
      // console.log("C-SearchWithFilters / collapseChoices / filterName : ", filterName)
      let element = this.$refs[filterName][0]
      // console.log("C-SearchWithFilters / collapseChoices / element : ", element)
      element.classList.toggle("hide-choices")
    },

    emptyOneFilter({filter}){
      this.$store.dispatch( 'search/emptyOneFilter', {filter} )
    },
    changeFilter({target}){
      this.$store.dispatch(
        'search/toggleFilter',
        {filter: target.getAttribute('data-filter'), value: target.getAttribute('data-choice')}
      )
    },

    searchTextChanged(){
      this.log && console.log('C-SearchWithFilters / searchTextChanged...')
      this.$store.dispatch('search/searchedTextChanged', {searchedText: this.searchedText})
    },

    translate( textsToTranslate, listField ) {
      let listTexts = textsToTranslate[listField]
      // return this.$store.getters['getTranslation']({ texts : listTexts })
      return this.$Translate( listTexts, this.locale, 'text')
    },
    isFilterFromSelectedFiltersBold(filterName){
      return false
      // return (this.selectedFilters.get(filterName)) ? this.selectedFilters.get(filterName) : undefined
    },
    isFilterFromSelectedFiltersChecked(filterName){
      //  :checked="selectedFilters.get(filter.name).has(choice.name)"
      return false
      // return (this.selectedFilters.get(filterName)) ? this.selectedFilters.get(filterName) : undefined
    },
  },


}
</script>

<style lang="scss" scoped>

  @import '../../assets/css/apiviz-colors.scss';
  @import '../../assets/css/apiviz-misc.scss';
  @import '../../assets/css/rem.scss';

  .hide-choices{
    display: none;
  }
  .filters-delimiter{
    margin:0em;
    background-color: $apiviz-primary;
  }


  .search-bar {
    top: $apiviz-navbar-height;
    height: $apiviz-search-bar-height;
    z-index: 10;
    font-size: $apiviz-navbar-font-size;

    .search{
      flex: 1;

      display: flex;
      flex-direction: row;
      //justify-content: center;
      align-items: center;

      .image-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img{
            width: rem(36px);
        }
      }

      input[type="search"]{
        height: 100%;
        border: 0;
      }
    }

    .navbar-end{

      .navbar-link::after{
        content: url("/static/icons/icon_chevron3.svg");
        border: 0;

        transform: none;

        margin-right: -0.5em;
        width: rem(20px);

        right: 1em;
        top: 47%;
      }

      .navbar-item{
        padding: 0.2em 0.2em;
        border-left: 1px solid #CBCBCB;
      }
    }
  }

</style>
