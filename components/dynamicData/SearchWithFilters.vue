<template>
  <div class="search-bar navbar is-white is-fixed-top" role="menubar" aria-label="filters navigation">
    
    <div class="container">
      
      <!-- INPUT TEXT -->
      <div class="navbar-start custom-start"> <!-- is-hidden-touch (to completely hide from mobile)-->
      
        <div class="columns is-gapless is-mobile custom-input">

          <div :class="`column is-${ showFiltersSwitch ? '10' : '12' }`">
            <div class="navbar-item is-paddingless">
              <div class="field is-large has-addons field-centered">

                <p class="control is-expanded has-icons-left">

                  <input
                    type="search"
                    v-model="textQuery"
                    class="input is-large is-light input-navbar"
                    @input="searchTextChanged"
                    :placeholder="translate(endpointConfigFilters, 'placeholder' )"
                    >
                    <!-- :placeholder="`WW : ${ windowWidth } / SFS : ${ showFiltersSwitch }`" -->

                  <span class="icon is-large is-left has-text-grey-light">
                    <i class="fas fa-search"></i>
                  </span>

                </p>

                <p class="control"
                  v-show="textQuery !== ''"
                  >
                  <a class="button is-large is-right has-text-grey-light"
                    @click="clearQuery"
                    >
                    <span class="icon">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </p>

              </div>
            </div>
          </div>

          <div 
            v-if="showFiltersSwitch"
            :class="`column is-2 is-centered`"
            >
            <div class="navbar-item navbar-item-filter has-text-centered">
              <a 
                :class="`button ${ showFilters ? 'is-primary' : 'is-white' }`"
                @click="SwitchFilters()"
                >
                <span 
                  :class="`icon ${ showFilters ? '' : 'has-text-primary' }`">
                  <i class="fas fa-filter"></i>
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>



      <!-- INPUT FILTERS -->
      <hr 
        v-if="showFiltersSwitch && showFilters"
        class="is-flex-touch filters-delimiter"
      >

      <div 
        v-if="showFilters"
        class="navbar-end has-background-white"
        > <!-- is-hidden-touch (to completely hide from mobile)-->


        <!-- LOOP FILTERS LISTS -->
        <span v-for="filter in filterDescriptions"
          class="navbar-item navbar-item-filter has-dropdown is-hoverable"
          :key="filter.name"
          :id="filter.name"
          href="#"
          >

          <!-- FILTER TITLE - MAIN DROPDOWN -->
          <a :class="`navbar-link is-arrrowless ${ selectedFilters.get(filter.name).size >= 1 ? 'has-text-weight-semibold' : '' } `"
            @click="collapseChoices(filter.name)"
            >
            <!-- <a :class='["navbar-link", {"has-text-weight-semibold" : isFilterFromSelectedFiltersBold(filter.name) } ]'> -->
            <span>
              {{ translate(filter, 'filter_title' ) }}
            </span>
          </a>

          <!-- CHOICES CONTAINER -->
          <div  
            :id="filter.name" 
            :ref="filter.name"
            class="navbar-dropdown is-right hide-choices no-padding-bottom"
            > 
            <!-- here make it collapsable -->

            <!-- LOOP CHOICES -->
            <a v-for="choice in filter.choices" :key="choice.name"
              class="navbar-item no-border"
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
                <label :for="choice.name" class="dense-label">
                  {{ translate(choice, 'choice_title' ) }}
                </label>
              </div>
            </a>

            <!-- RESET FILTER BTN -->
            <hr class="end-choices">

            <div class="reset-btn">
              <button class="button is-text no-underline is-fullwidth has-text-grey"
                :data-filter="filter.name"
                @click="emptyOneFilter({filter: filter.name})"
                >
                <span>
                  {{ translate(endpointConfigFilters, 'reset' ) }}
                </span>
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

    data : () => {
      return {
        textQuery : '',
        showFiltersSwitch : true,
        showFiltersSwitch_ : true,
        showFilters : true,
        windowWidth : 0,
        // window: {
        //   width: 0,
        //   height: 0
        // }
      }
    },

    created() {
      window.addEventListener("resize", this.winWidth)
      // window.addEventListener('resize', this.handleResize)
      this.winWidth()
    },

    destroyed() {
      window.removeEventListener("resize", this.winWidth)
      // window.removeEventListener('resize', this.handleResize)
    },

    beforeMount(){
      this.log && console.log('\nC-SearchWithFilters / beforeMount...')
      this.textQuery = this.searchedText
    },

    mounted(){

      // document.addEventListener("resize", this.winWidth)
      // this.winWidth()

      // this.log && console.log('C-SearchWithFilters / mounted...')
      // this.winWidth()

      if( !this.$store.state.search.search.answer.result ){
        // this.log && console.log('C-SearchWithFilters / dispatching [search/searchedTextChanged]...')
        // this.$store.dispatch('search/searchedTextChanged', {searchedText: this.searchedText})
        this.$store.dispatch('search/searchedTextChanged', {searchedText: this.textQuery})
      }

      // this.log && console.log('\nC-SearchWithFilters / mounted finished ...')
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
        breakpoint : state => state.breakpoint,
        // selectedFilters: state => state.search.search.question.selectedFilters,
        // filterDescriptions: state => state.search.filterDescriptions
      }),

      ...mapGetters({
        selectedFilters : 'search/getSelectedFilters',
        filterDescriptions : 'search/getFilterDescriptions',
        searchedText : 'search/getSearchQuestionQuery'
      }),

      // searchedText: {
      //   get () { return this.$store.getters['search/getSearchQuestionQuery'] },
      //   // set (value) {
      //   //   // this.log && console.log('\nC-SearchWithFilters / searchedText dispatching ...')
      //   //   this.$store.dispatch('search/searchedTextChanged', { searchedText: value })
      //   // }
      // },

      endpointConfigFilters() {
        // this.log && console.log('C-SearchWithFilters / endpointConfigFilters() ...')
        let configFilter = this.$store.getters['config/getEndpointConfigFilters']
        return configFilter
      }

    },

    methods: {

      SwitchFilters(){
        this.showFilters = !this.showFilters
      },

      winWidth() {
        var w = window.innerWidth
        this.windowWidth = window.innerWidth
        if (w < 1090) {
          this.showFiltersSwitch = true
          this.showFilters = false
        } else {
          this.showFiltersSwitch = false
          this.showFilters = true
        }
      },

      // handleResize() {
      //   this.window.width = window.innerWidth;
      //   this.window.height = window.innerHeight;
      // },

      collapseChoices(filterName){
        // console.log("C-SearchWithFilters / collapseChoices / filterName : ", filterName)
        let element = this.$refs[filterName][0]
        // console.log("C-SearchWithFilters / collapseChoices / element : ", element)
        element.classList.toggle("hide-choices")
      },

      clearQuery(){
        this.textQuery = ''
        this.searchTextChanged()
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
        // this.$store.dispatch('search/searchedTextChanged', {searchedText: this.searchedText})
        this.$store.dispatch('search/searchedTextChanged', {searchedText: this.textQuery})
      },

      translate( textsToTranslate, listField ) {
        // this.log && console.log('C-SearchWithFilters / translate / listField : ', listField )
        // this.log && console.log('C-SearchWithFilters / translate / textsToTranslate : ', textsToTranslate )
        let listTexts = textsToTranslate[listField]
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

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },

    },


  }
</script>

<style lang="scss" scoped>

  @import '../../assets/css/apiviz-colors.scss';
  @import '../../assets/css/apiviz-misc.scss';
  @import '../../assets/css/rem.scss';

  .no-margin{
    margin: 0;
  }

  .getFilterTitle{
    margin-left : 0.3em;
  }

  .hide-choices{
    display: none;
  }

  .filters-delimiter{
    margin:0em;
    background-color: $apiviz-primary;
  }

  .custom-start {
    margin-right: none;
    width: 100%;

    .custom-input{
      width: 100%;
    }
  }

  .search-bar {
    
    top: $apiviz-navbar-height;
    // height: $apiviz-search-bar-height;
    z-index: 10;
    font-size: $apiviz-navbar-font-size;

    .field-centered{
      justify-content: center;
    }

    .field {

      // .search {

        flex: 1;
        // height: $apiviz-search-bar-height;

        display: flex;
        flex-direction: row;
        // justify-content: center;
        align-items: center;
        margin-bottom: 0;

        // .image-container{
        //   display: flex;
        //   flex-direction: row;
        //   justify-content: center;
        //   align-items: center;

        //   img{
        //       width: rem(36px);
        //   }
        // }

        input[type="search"]{
          height: 100%;
          border: 0;
        }
        a {
          height: 100%;
          border: 0;
        }

        .dense-label{
          padding: 0.15rem 0.5rem 0.1rem 2rem;
          margin : 0.1em 0em 0.1em 0em;
          border : none;
        }

      // }
    }

    .navbar-end {

      .navbar-item {
        // padding: 0.2em 0.2em ;
        border-left: 1px solid #CBCBCB;

        .navbar-dropdown{
          padding-bottom : 0em;

          .navbar-item{
            padding: 0em 0.1em 0em 0.7em ;
          }
          .navbar-item.no-border{
          border-left: none;
          }
          hr.end-choices {
            margin-top: 0.7em;
            margin-bottom: 0em;
          }
        }
      }
      .reset-btn{
        margin-top: 0em;

        .no-underline {
          text-decoration: none ;
        }
      }

    }
  }

</style>
