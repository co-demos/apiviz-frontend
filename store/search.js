import axios from 'axios'
import { makeEmptySelectedFilters } from '~/plugins//utils';

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

}

export const mutations = {

  setSearchParam(state,{type,result}){
    state.search[type] = result
  },

  setIsMapSearch (state, routeConfig) {
    // state.log && console.log("S-search-setIsMapSearch / routeConfig : ", routeConfig )
    state.search.question.forMap = ( routeConfig.dynamic_template === 'DynamicMap' ) ? true : false
    // state.log && console.log("S-search-setIsMapSearch / state.search : ", state.search )
  },

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
  clearAllFilters(state){
    state.search.question.selectedFilters = makeEmptySelectedFilters(state.filterDescriptions)
  },

}

export const actions = {

  // FOR ENDPOINT CONFIG
  setSearchEndpointConfig({state, commit,rootGetters}, currentRouteConfig) {

    state.log && console.log('S-search-setSearchEndpointConfig ...')

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

}