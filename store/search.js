import axios from 'axios'
import { makeEmptySelectedFilters } from '~/plugins//utils';
// import {  getObjectDataFromPath,
//           searchItems, 
//           // searchEnpointCreator, 
//           searchEndpointGenerator, 
//           createSelectedFiltersForSearch
//         } from '~/plugins/utils.js';

export const state = () => ({

  // CONSOLE LOG ALLOWED 
  log: process.env.ConsoleLog,

  // LEGACY
  geolocByProjectId: new Map(),

  // CURRENT
  displayedProject: undefined,

  // FILTERS
  filterDescriptions: undefined,
  datasetFilters: undefined,

  // SEARCH PARAMETERS
  search: {

    // DATASET
    dataset_uri: undefined,
    endpoint_type: undefined,
    endpoint: undefined,

    // QUERY FROM USER
    question: {
      query: new URL(location).searchParams.get('text') || '',
      forMap : false,
      onlyGeocoded : true,
      shuffleSeed : 1234,
      page:1,
      perPage:100,
      selectedDatasetFilters: undefined,
      selectedFilters: new Map(),
    },
    // RESULTS
    answer: {
      pendingAbort: undefined, // function that can be used to abort the current pending search
      result: undefined, // search results {projects, total}
      // resultMap : undefined, // complete search results with minimal items as { _id, latlng } --> to be loaded just once for better experience + getters
      error: undefined // if last search ended in an error
    },
    // UI IN SEARCH PAGES CONFIG
    config:{
      display: {
        columnCount : undefined,
        defaultShowCount : undefined,
        moreProjectOnScrollCount : undefined,
        scrollBeforeBottomTrigger : undefined
      }
    }
  }

})

export const getters = {

  getSelectedFilters : state => {
    return state.search.question.selectedFilters
  },
  setSearchedText (state, {searchedText}) {
    state.search.question.query = searchedText
  },
  
}

export const mutations = {

  // FILTERS-RELATED
    setDatasetFilters(state, datasetFilter ){
      // state.log && console.log("S-search-setDatasetFilters / datasetFilter : ", datasetFilter )
      const filterOptions = datasetFilter.filter_options
      // state.log && console.log("S-search-setDatasetFilters / filterOptions : ", filterOptions )
      state.datasetFilters = filterOptions
    },
    setFilterDescriptions (state, filterDescriptions) {
      state.filterDescriptions = filterDescriptions
    },

  // MAP-RELATED
    setIsMapSearch (state, routeConfig) {
      // state.log && console.log("S-search-setIsMapSearch / routeConfig : ", routeConfig )
      state.search.question.forMap = ( routeConfig.dynamic_template === 'DynamicMap' ) ? true : false
      // state.log && console.log("S-search-setIsMapSearch / state.search : ", state.search )
    },

  // SEARCH-RELATED
    setSearchParam(state,{type,result}){
      state.search[type] = result
    },
    clearAllFilters(state){
      state.search.question.selectedFilters = makeEmptySelectedFilters(state.filterDescriptions)
    },
    setSearchedText (state, {searchedText}) {
      state.search.question.query = searchedText
    },
    setSelectedFilters (state, {selectedFilters}) {
      // trigger re-render
      state.search.question.selectedFilters = new Map(selectedFilters)
    },
    setFilterDescriptions (state, filterDescriptions) {
      state.filterDescriptions = filterDescriptions
    },
    emptyOneFilter (state, {filter}) {
      state.search.question.selectedFilters.set(filter, new Set())
      // trigger re-render
      state.search.question.selectedFilters = new Map(state.search.question.selectedFilters)
    },
    clearAllFilters(state){
      state.search.question.selectedFilters = makeEmptySelectedFilters(state.filterDescriptions)
    },
    setSearchParam(state,{type,result}){
      state.search[type] = result
    },
    setSearchConfig(state, {type,result}) {
      state.search.config[type] = result
    },

  // RESULTS-RELATED
    setSearchResult(state, {result}){
      state.search.answer = {
        pendingAbort: undefined,
        result,
        // resultMap: undefined,
        error: undefined
      }
    },
    setSearchPending(state, {pendingAbort}){
      state.search.answer = {
        pendingAbort,
        result: undefined,
        // resultMap: undefined,
        error: undefined
      }
    },
    setSearchError(state, {error}){
      console.error('search error', error)
      state.search.answer = {
        pendingAbort: undefined,
        result: undefined,
        // resultMap: undefined,
        error
      }
    },

}

export const actions = {

  // FOR ENDPOINT CONFIG
    setSearchEndpointConfig({state, commit,rootGetters}, currentRouteConfig) {

      // state.log && console.log('S-search-setSearchEndpointConfig ...')

      // let routeConfig = getters.getCurrentRouteConfig(path)
      let routeConfig = currentRouteConfig
      // state.log && console.log('S-search-setSearchEndpointConfig / routeConfig : ', routeConfig)

      commit('setSearchParam',{type:'currentRouteConfig', result: routeConfig})
      commit('setSearchParam',{type:'dataset_uri', result: routeConfig.dataset_uri})
      commit('setSearchParam',{type:'endpoint_type', result: routeConfig.endpoint_type})
      
      let endpointConfig = rootGetters['config/getEndpointConfig']
      // state.log && console.log('S-search-setSearchEndpointConfig / endpointConfig : ', endpointConfig)
      commit('setSearchParam',{type:'endpoint', result: endpointConfig})

    },
    
  // FOR FILTERS
    createDatasetFilters({state, getters, commit, rootGetters}){
      // state.log && console.log("S-search-createDatasetFilters / state : ", state )
      const currentFiltersConfig = rootGetters['config/getEndpointConfigFilters']
      // state.log && console.log("S-search-createDatasetFilters / currentFiltersConfig : ", currentFiltersConfig)
      if (currentFiltersConfig && currentFiltersConfig.filter_options){
        let filterDescriptions = currentFiltersConfig.filter_options
        commit('setFilterDescriptions', filterDescriptions)
        commit('clearAllFilters')
      }
    },

  // FOR QUERY SEARCH FILTERS
    toggleFilter({state, commit, dispatch, getters}, {filter, value}){
      // state.log && console.log("\n// toggleFilter ..." )
      const selectedFilters = new Map(getters.getSelectedFilters)
      // state.log && console.log("// toggleFilter / selectedFilters : ", selectedFilters);
      const selectedValues = selectedFilters.get(filter)
      if(selectedValues.has(value))
        selectedValues.delete(value)
      else
        selectedValues.add(value)
  
      commit('setSelectedFilters', {selectedFilters})
      dispatch('search')
    },
  
    emptyOneFilter({state, commit, dispatch, getters}, {filter}){
      // state.log && console.log("\n// emptyOneFilter ..." )
      const selectedFilters = new Map(getters.getSelectedFilters)
      selectedFilters.set(filter, new Set())
  
      commit('setSelectedFilters', {selectedFilters})
      dispatch('search')
    },
  
    clearAllFilters({commit, dispatch}){
      // state.log && console.log("\n// clearAllFilters ..." )
      commit('clearAllFilters')
      dispatch('search')
    },

  // FOR QUERY SEARCH TEXT
    searchedTextChanged({commit, dispatch}, {searchedText}){
      commit('setSearchedText', {searchedText})
      dispatch('search')
    },



  // MAIN SEARCH ACTION
    search({state, commit, dispatch, getters}){

      state.log && console.log("S-search-A-search / main action to query endpoint..." )
      const {search} = state;
      // console.log("// search / search : ", search )

      const selectedFilters = createSelectedFiltersForSearch(getters.getSelectedFilters)
      // state.log && console.log('selectedFilters',selectedFilters);
      // abort previous search if any
      if(search.answer.pendingAbort){
        search.answer.pendingAbort.abort()
      }

      // ENDPOINT GENERATOR
      let endpointGenerated = searchEndpointGenerator({
        endpointConfig : state.search.endpoint,
        questionParams : state.search.question,
        selectedFilters : selectedFilters,
      })
      // state.log && console.log("-- search / endpointBis : \n", endpointGenerated )


      // perform search --> !!! only request map search if map search results empty in store !!! 
      // const searchPendingAbort = searchItems(endpoint)
      const searchPendingAbort = searchItems(endpointGenerated)
      commit('setSearchPending', { pendingAbort: searchPendingAbort })

      searchPendingAbort.promise
        .then(({projects, total}) => {
          // state.log && console.log("-- search / total : \n", total )
          // state.log && console.log("-- search / projects : \n", projects )

          // if search is for map either fill resultMap if empty or do nothing
          commit('setSearchResult', {result: {projects, total}})
          // commit ('setSearchResultMap', {resultMap: {projects, total}})
        })
        .catch(error => {
          // don't report aborted fetch as errors
          if (error.name !== 'AbortError')
            commit('setSearchError', {error})
        })
    },


}