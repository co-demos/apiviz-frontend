import axios from 'axios'
import {
  makeEmptySelectedFilters,
  getObjectDataFromPath,
  searchItems,
  populateDisplayedItem,
  rawRequest,
  // searchEnpointCreator,
  searchEndpointGenerator,
  createSelectedFiltersForSearch
  } from '~/plugins/utils.js';
import { defaultPagination } from '~/config/constants.js'

// export const strict = false

export const state = () => ({

  // CONSOLE LOG ALLOWED
  log: process.env.ConsoleLog,

  // MAPBOX
  mapbox : { map : new Object() },

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
      query: '', // new URL(location).searchParams.get('text') || '',

      itemId: undefined,

      forMap : false,
      forStats : false,

      onlyGeocoded : true,

      shuffleSeed : undefined,
      page:1,
      perPage:100,
      sortBy: undefined,
      sortIsDescending: false, // true : ascendant / false : descendant

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

  // MAP RELATED
    getMap : state => {
      return state.mapbox
    },
    getIsMapSearch : state => {
      return state.search.question.forMap
    },

  // QUESTION RELATED
  // - - - - - - - - - - - - - - - //
    getQuestion : state => {
      return state.search.question
    },
    getPerPageOptions : (state, getters, rootState) => {
      let defaultPerPage = defaultPagination.perPageOptions
      let endpointPerPage = state.search.endpoint.args_options.find(i => i.app_arg === 'perPage'  )
      return endpointPerPage && endpointPerPage.authorized ? endpointPerPage.authorized : defaultPerPage
      // return endpointPerPage
    },

  // FILTER RELATED
  // - - - - - - - - - - - - - - - //
    getSelectedFilters : state => {
      return state.search.question.selectedFilters
    },
    getFilterDescriptions : state => {
      // state.log && console.log("\nS-search-G-getFilterDescriptions ..." )
      // state.log && console.log("S-search-G-getFilterDescriptions / state.search.question.filterDescriptions : \n", state.search.question.filterDescriptions )
      return state.filterDescriptions
    },

  // XXX RELATED
  // - - - - - - - - - - - - - - - //
    getSearchConfigColumnCount : state => {
      // state.log && console.log("\nS-search-G-getSearchConfigColumnCount ..." )
      return state.search.config.display.columnCount
    },
    getSearchConfigDefaultShowCount : state => {
      return state.search.config.display.defaultShowCount
    },
    getSearchConfigMoreProjectOnScrollCount : state => {
      return state.search.config.display.moreProjectOnScrollCount
    },
    getSearchConfigScrollBeforeBottomTrigger : state => {
      return state.search.config.display.scrollBeforeBottomTrigger
    },
    getSearchDatasetURI : state => {
      return state.search.dataset_uri
    },
    getSearchQuestionQuery : state => {
      return state.search.question.query
    },

  // RESULTS RELATED
  // - - - - - - - - - - - - - - - //
    getPending : (state) => {
      return !!state.search.answer.pendingAbort
    },
    getResultObject : (state) => {
      return state.search.answer.result
    },
    getResults : (state) => {
      // state.log && console.log("\nS-search-G-getResults ..." )
      return state.search.answer.result && state.search.answer.result.projects
    },
    getResultsStats : (state) => {
      state.log && console.log("\nS-search-G-getResultsStats ..." )
      state.log && console.log("\nS-search-G-getResultsStats / state.search.answer.results", state.search.answer.results )
      return state.search.answer.result && state.search.answer.result.stats
    },
    getResultsList : (state) => {
      // state.log && console.log("\nS-search-G-getResultsList ..." )
      return state.search.answer.result ? state.search.answer.result.projects : undefined
    },
    getResultsCount : (state) => {
      state.log && console.log("\nS-search-G-getResultsCount ..." )
      return state.search.answer.result ? state.search.answer.result.total : 0
    },
    getGeoResults : (state, getters) => {
      let allResults = getters.getResults
      // console.log(" ++ getGeoResults / allResults : ", allResults)
      if (typeof allResults !== 'undefined'){
        let filtered = allResults.filter(i => !i.lat && !i.lon)
        // console.log(" ++ getGeoResults / filtered : ", filtered)
        return filtered
      } else {
        return undefined
      }
    },
    getDisplayedProject : (state) => {
      return state.displayedProject
    },

  // ITEMS CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getProjectConfig : (state, getters, rootState) => (position) => {
      try {
        return state.search.currentRouteConfig.contents_fields.find( function(f) {  return f.position === position; });
      }
      catch (e) {
        console.log('err',e);
        return undefined
      }
    },
    getProjectConfigUniform :(state, getters) => (itemData) => {
      // console.log(" ++ getProjectConfigUniform - itemData : ", itemData)
      let res = {}
      const infoTypes = ['id','title','image','address','tags']
      infoTypes.forEach( function(infoType){
        let fieldObj = getters.getProjectConfig('block_'+infoType)
        res[infoType] = (fieldObj && fieldObj.field) ? itemData[fieldObj.field] : undefined
      })
      res.image = getters.getImgUrl(res)
      res.fullItem = itemData
      return res
    },

  // IMAGES CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getImgUrl : (state, getters, rootState) => (obj) => {
      // console.log("\nS-search-G-getImgUrl / obj : ", obj)
      let image = obj.image

      if(!image){
        let images_set = undefined
        if (state.search.dataset_uri
          && rootState.config.config.styles
          && rootState.config.config.styles.app_search_default_images_sets
          && rootState.config.config.styles.app_search_default_images_sets.images_sets) {
          let d = rootState.config.config.styles.app_search_default_images_sets.images_sets.find(function(d){
            return d.dataset_uri === state.search.dataset_uri;
          })
          images_set  = (d) ? d.images_set : undefined
        }

        if (images_set && images_set.length > 0) {
          const textureCount = images_set.length + 1
          let id = (obj.id) ? parseInt(obj.id.substr(obj.id.length - 6), 16) % textureCount : 111111111111111111
          let reste = id % images_set.length + 1;
          let imageObj = images_set.find(function(i){
            return i.dft_text === 'img_'+reste;
          })
          image = imageObj.src_image
        }else {
          let random = Math.floor(Math.random() * (7 - 1) + 1)
          image = `/static/illustrations/textures/medium_fiche_${ (parseInt(id.substr(id.length - 6), 16)%textureCount) + 1}.png`
        }
      }
      return image
    },
    getImageUrl : (state, getters, rootState, rootGetters) => (obj) => {

      // console.log("getImageUrl - obj : ", obj)
      const item = obj.item
      // console.log("S-search-G-getImageUrl - item : ", item)

      const position = obj.position
      // console.log("S-search-G-getImageUrl - position : ", position)

      const defaultImages = rootGetters['config/getRouteConfigDefaultDatasetImages']
      // console.log("S-search-G-getImageUrl - defaultImages : ", defaultImages)

      // console.log("getImageUrl - state.search.currentRouteConfig : ", state.search.currentRouteConfig)
      const routeContentImagesFields = state.search.currentRouteConfig.images_fields
      // console.log("getImageUrl - routeContentImagesFields : ", routeContentImagesFields)

      let fieldToGet = routeContentImagesFields[position]
      let fieldImage = fieldToGet.field
      // console.log("S-search-G-getImageUrl - fieldImage : ", fieldImage)

      let image = item[fieldImage]
      // console.log("S-search-G-getImageUrl - image (A) : ", image)

      if(!image){
        let d = defaultImages
        let images_set  = (d) ? d.images_set : undefined

        if (images_set && images_set.length > 0) {
          const textureCount = images_set.length + 1
          let id = (item.id) ? parseInt(item.id.substr(item.id.length - 6), 16) % textureCount : 111111111111111111
          let tail = id % images_set.length + 1;
          let imageObj = images_set.find(function(i){
            return i.dft_text === 'img_'+tail;
          })
          image = imageObj.src_image
        } else {
          image = `/static/illustrations/textures/medium_fiche_${ (parseInt(id.substr(id.length - 6), 16)%textureCount) + 1}.png`
        }
      }
      // console.log("S-search-G-getImageUrl - image (B) : ", image)
      return image
    },
}

export const mutations = {

  // MAP-RELATED
    setMap (state, {map}) {
      state.log && console.log("\nS-search-M-setMap ..." )
      state.log && console.log("S-search-M-setMap / state.mapbox : ", state.mapbox )
      state.log && console.log("S-search-M-setMap / map : ", map )
      // state.mapbox.map = map
    },

    setIsMapSearch (state, routeConfig) {
      // state.log && console.log("S-search-setIsMapSearch / routeConfig : ", routeConfig )
      state.search.question.forMap = ( routeConfig.dynamic_template === 'DynamicMap' ) ? true : false
      // state.log && console.log("S-search-setIsMapSearch / state.search : ", state.search )
    },

  // GENERAL
    setSearchConfig(state, {type,result}) {
      state.search.config[type] = result
    },

    setSearchQuestion(state, localEndpointConfig){
      // state.log && console.log("S-search-setSearchQuestion / state.search.question : ", state.search.question )

      let argOptions = localEndpointConfig.args_options
      // state.log && console.log("S-search-setSearchQuestion / argOptions : ", argOptions )

      let authorizedDefaultArgs = [
        'page',
        'perPage',
        'shuffleSeed',
        'sortBy',
        'sortIsDescending'
      ]
      argOptions.forEach( arg => {
        let appArg = arg.app_arg
        if ( authorizedDefaultArgs.includes(appArg) ) {
          state.search.question[appArg] = arg.default
        }
      })
    },

    setQuestionPerPage(state, perPageNumber){
      state.search.question.perPage = perPageNumber
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

  // SEARCH-RELATED
    setSearchParam(state,{type,result}){
      state.search[type] = result
    },
    setSearchedText (state, {searchedText}) {
      // state.log && console.log("\nS-search-M-setSearchedText ..." )
      // state.log && console.log("S-search-M-setSearchedText / searchedText : ", searchedText )
      state.search.question.query = searchedText
    },
    setSelectedFilters (state, {selectedFilters}) {
      // trigger re-render
      state.search.question.selectedFilters = new Map(selectedFilters)
    },
    setFilterDescriptions (state, filterDescriptions) {
      state.filterDescriptions = filterDescriptions
    },
    setQuestionPage (state, pageNumber ) {
      // state.log && console.log("\nS-search-M-setQuestionPage / pageNumber : ", pageNumber )
      let newPageNumber = state.search.question.page + pageNumber
      if ( newPageNumber > 0 ){
        state.search.question.page = newPageNumber
      }
    },
    setQuestionPageAbsolute (state, pageNumber ) {
      state.search.question.page = pageNumber
    },
    setQuestionPerPage (state, perPageNumber ) {
      // state.log && console.log("\nS-search-M-setQuestionPerPage ..." )
      state.search.question.perPage = perPageNumber
    },
    setQuestionSortBy (state, field ) {
      // state.log && console.log("\nS-search-M-setQuestionSortBy ..." )
      state.search.question.shuffleSeed = undefined
      state.search.question.sortBy = field
    },
    setQuestionSortIsDescending (state, sortIsDescending ) {
      state.log && console.log("\nS-search-M-setQuestionSortIsDescending ..." )
      state.search.question.sortIsDescending = sortIsDescending
    },
    resetShuffle ( state, minMax ){
      state.search.question.sortBy = undefined
      state.search.question.sortIsDescending = false
      state.search.question.shuffleSeed = Math.floor(Math.random() * (minMax.max - minMax.min + 1)) + minMax.min;
    },

    clearAllFilters (state){
      state.search.question.selectedFilters = makeEmptySelectedFilters(state.filterDescriptions)
    },
    emptyOneFilter (state, {filter}) {
      state.search.question.selectedFilters.set(filter, new Set())
      // trigger re-render
      state.search.question.selectedFilters = new Map(state.search.question.selectedFilters)
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
      state.log && console.log('S-search-M-setSearchPending... ')
      state.search.answer = {
        pendingAbort,
        result: undefined,
        // resultMap: undefined,
        error: undefined
      }
    },
    setSearchPendingOne(state, {pendingAbort}){
      state.log && console.log('S-search-M-setSearchPendingOne... ')
      state.log && console.log('S-search-M-setSearchPendingOne / pendingAbort :', pendingAbort)
      state.search.answer = {
        pendingAbort,
        result: state.search.answer.result,
        // resultMap: undefined,
        error: undefined
      }
    },
    setSearchError(state, {error}){
      state.log && console.error('S-search-M-setSearchError / search error', error)
      state.search.answer = {
        pendingAbort: undefined,
        result: undefined,
        // resultMap: undefined,
        error
      }
    },

    setDisplayedProject(state, projectToDisplay){
      state.log && console.log('S-search-M-setDisplayedProject / projectToDisplay ', projectToDisplay)
      state.displayedProject = projectToDisplay
      state.search.answer.pendingAbort = undefined
    },
    setItemId(state, itemId){
      state.search.question.itemId = itemId
    },
    clearItemId(state){
      state.search.question.itemId = undefined
    },
    clearResults(state){
      state.search.answer.result = undefined
    },
    clearDisplayedProject(state){
      state.displayedProject = undefined
    },

}

export const actions = {

  // MAPBOX
    setMap({state, commit}, {map}){
      state.log && console.log("\nS-search-A-setMap ..." )
      state.log && console.log("S-search-A-setMap / map : ", map )
      commit('setMap', {map:map})
    },

  // TO VARIABILIZE
    setSearchConfigDisplay({state, commit}) {
      // here this function will probably change when this may be inherited from the configuration files
      // state.log && console.log("\nS-search-A-setSearchConfigDisplay ...")
      const defaultDisplay = {
        columnCount : 4,
        defaultShowCount : 50,
        moreProjectOnScrollCount : 20,
        scrollBeforeBottomTrigger : 500
      }
      // state.log && console.log("\nS-search-A-setSearchConfigDisplay / defaultDisplay :", defaultDisplay)
      commit('setSearchConfig', {type:'display',result:defaultDisplay});
    },

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
      state.log && console.log('S-search-setSearchEndpointConfig / endpointConfig : ', endpointConfig)
      commit('setSearchParam',{type:'endpoint', result: endpointConfig})

      let endpointPerPage = endpointConfig.args_options.find( i => i.app_arg === 'perPage')
      if ( endpointPerPage ){
        commit('setQuestionPerPage', endpointPerPage.default )
      }

    },

  // FOR PAGINATION
    changePage({state, commit, dispatch}, pageNumber ){
      // state.log && console.log("S-search-A-changePage /  pageNumber : ", pageNumber )
      commit('setQuestionPage', pageNumber )
      dispatch('search')
    },
    changePerPage({state, commit, dispatch}, perPageNumber ){
      // state.log && console.log("S-search-A-changePerPage / perPageNumber : ", perPageNumber )
      commit('setQuestionPerPage', perPageNumber )
      dispatch('search')
    },
    changeSorting({state, commit, dispatch}, sortOptions ){
      // state.log && console.log("S-search-A-changeSorting / sortOptions : ", sortOptions )
      commit('setQuestionSortBy', sortOptions.sortBy )
      commit('setQuestionSortIsDescending', sortOptions.sortIsDescending )
      dispatch('search')
    },
    reShuffle( {state, commit, dispatch}, minMax ){
      state.log && console.log("S-search-A-reShuffle / minMax :", minMax )
      if ( !minMax ){
        minMax = { min: 0 , max: 2000 }
      }
      commit('resetShuffle', minMax )
      dispatch('search')
    },

  // FOR FILTERS
    createDatasetFilters({state, getters, commit, rootGetters}){
      // state.log && console.log("\nS-search-A-createDatasetFilters / state : ", state )

      const currentFiltersConfig = rootGetters['config/getEndpointConfigFilters']
      // state.log && console.log("S-search-A-createDatasetFilters / currentFiltersConfig : ", currentFiltersConfig)

      if (currentFiltersConfig && currentFiltersConfig.filter_options){
        let filterDescriptions = currentFiltersConfig.filter_options
        // state.log && console.log("S-search-A-createDatasetFilters / filterDescriptions : ", filterDescriptions)
        commit('setFilterDescriptions', filterDescriptions)
        commit('clearAllFilters')
      }
      // state.log && console.log("S-search-A-createDatasetFilters / finished...")

    },

  // FOR QUERY SEARCH FILTERS
    toggleFilter({state, commit, dispatch, getters}, {filter, value}){
      state.log && console.log("\n// toggleFilter ..." )
      const selectedFilters = new Map(getters.getSelectedFilters)
      // state.log && console.log("// toggleFilter / selectedFilters : ", selectedFilters);
      const selectedValues = selectedFilters.get(filter)
      if(selectedValues.has(value))
        selectedValues.delete(value)
      else
        selectedValues.add(value)

      commit('setSelectedFilters', {selectedFilters})
      commit('setQuestionPageAbsolute', 1 )
      dispatch('search')
    },

    emptyOneFilter({state, commit, dispatch, getters}, {filter}){
      state.log && console.log("\n// emptyOneFilter ..." )
      const selectedFilters = new Map(getters.getSelectedFilters)
      selectedFilters.set(filter, new Set())

      commit('setSelectedFilters', {selectedFilters})
      commit('setQuestionPageAbsolute', 1 )
      dispatch('search')
    },

    clearAllFilters({state, commit, dispatch}){
      state.log && console.log("S-search-A-clearAllFilters ..." )
      commit('clearAllFilters')
      commit('setQuestionPageAbsolute', 1 )
      dispatch('search')
    },

  // FOR QUERY SEARCH TEXT
    searchedTextChanged({state, commit, dispatch}, {searchedText}){
      state.log && console.log("\nS-search-A-searchedTextChanged ..." )
      commit('setSearchedText', {searchedText} )
      commit('setQuestionPageAbsolute', 1 )
      dispatch('search')
    },


  // + - + - + - + - + - //
  // MAIN SEARCH ACTION
  // + - + - + - + - + - //
    search({state, commit, dispatch, getters, rootGetters}){

      state.log && console.log("\nS-search-A-search / main action to query endpoint..." )

      const search = state.search
      // state.log && console.log("S-search-A-search / search : ", search )

      const selectedFilters = createSelectedFiltersForSearch( getters.getSelectedFilters )
      state.log && console.log('S-search-A-search / selectedFilters',selectedFilters)
      // abort previous search if any
      if(search.answer.pendingAbort){
        search.answer.pendingAbort.abort()
      }

      const endpointRawConfig = state.search.endpoint
      const responsePaths = endpointRawConfig.resp_fields
      state.log && console.log("S-search-A-search / responsePaths : \n", responsePaths )

      // get user access token if any
      const userAccessToken = rootGetters['user/getAccessToken']

      // get user configAuth if any
      const endpointAuthConfig = rootGetters['config/getEndpointConfigAuthSpecific']('auth_root')
      state.log && console.log("S-search-A-search / endpointAuthConfig : \n", endpointAuthConfig )

      commit('clearItemId')

      // ENDPOINT GENERATOR
      let endpointGenerated = searchEndpointGenerator({
        endpointConfig : endpointRawConfig,
        questionParams : state.search.question,
        selectedFilters : selectedFilters,
        authConfig : endpointAuthConfig,
        accessToken : userAccessToken
      })
      state.log && console.log("S-search-A-search / endpointGenerated : \n", endpointGenerated )


      // TO DO - CHANGE FETCH --> USE AXIOS INSTEAD IN "plugins/utils.js"
      // perform search --> !!! only request map search if map search results empty in store !!!

      const searchPendingAbort = searchItems( endpointGenerated, endpointRawConfig )
      commit('setSearchPending', { pendingAbort: searchPendingAbort })

      searchPendingAbort.promise
      .then(( response ) => {
        state.log && console.log("S-search-A-search / response : \n", response )
        // state.log && console.log("S-search-A-search / total : \n", total )
        // state.log && console.log("S-search-A-search / projects : \n", projects )

        // if search is for map either fill resultMap if empty or do nothing
        commit('setSearchResult', { result: {
          projects : response.projects,
          stats : response.stats,
          total : response.total
        }})
        // commit('setSearchResult', {result: {projects, total}})
        // commit ('setSearchResultMap', {resultMap: {projects, total}})
      })
      .catch(error => {
        // don't report aborted fetch as errors
        if (error.name !== 'AbortError')
          commit('setSearchError', { error })
      })
    },

    searchOne({state, commit, dispatch, getters, rootGetters}, id ){

      commit('clearDisplayedProject')

      state.log && console.log("\nS-search-A-searchOne ..." )
      state.log && console.log("S-search-A-searchOne / id : ", id )

      // get specifically endpoint for detail infos
      const endpointCurrentConfig = state.search.endpoint
      const endpointRawConfig = rootGetters['config/getEndpointConfigByType']('detail')
      state.log && console.log("S-search-A-searchOne / endpointRawConfig : \n", endpointRawConfig )


      const responsePaths = state.search.endpoint.resp_fields
      state.log && console.log("S-search-A-searchOne / responsePaths : \n", responsePaths )

      // get user access token if any
      const userAccessToken = rootGetters['user/getAccessToken']

      // get user configAuth if any
      const endpointAuthConfig = rootGetters['config/getEndpointConfigAuthSpecific']('auth_root')
      state.log && console.log("S-search-A-searchOne / endpointAuthConfig : \n", endpointAuthConfig )

      // append itemId to question
      commit('setItemId', id)

      // ENDPOINT GENERATOR
      let endpointGenerated = searchEndpointGenerator({
        endpointConfig : endpointRawConfig,
        questionParams : state.search.question,
        selectedFilters : [],
        authConfig : endpointAuthConfig,
        accessToken : userAccessToken
      })
      state.log && console.log("S-search-A-searchOne / endpointGenerated : \n", endpointGenerated )

      const searchPendingAbort = populateDisplayedItem(id, endpointGenerated, endpointRawConfig )

      if ( endpointCurrentConfig && endpointCurrentConfig.endpoint_type === 'map' ){
        commit('setSearchPendingOne', { pendingAbort: searchPendingAbort })
      } else {
        commit('setSearchPending', { pendingAbort: searchPendingAbort })
      }

      searchPendingAbort.promise
      .then(( response ) => {
        state.log && console.log("S-search-A-searchOne / response : \n", response )
        commit('setDisplayedProject', response)
      })
      .catch(error => {
        // don't report aborted fetch as errors
        if (error.name !== 'AbortError')
          commit('setSearchError', {error})
      })

    },

    exportDataset({state, commit, dispatch, getters, rootGetters}){

      state.log && console.log("\nS-search-A-exportDataset ..." )

      const selectedFilters = createSelectedFiltersForSearch( getters.getSelectedFilters )
      state.log && console.log('S-search-A-search / selectedFilters',selectedFilters)

      // get user access token if any
      const userAccessToken = rootGetters['user/getAccessToken']
      state.log && console.log("S-search-A-exportDataset / userAccessToken : \n", userAccessToken )

      // get user configAuth if any
      const endpointAuthConfig = rootGetters['config/getEndpointConfigAuthSpecific']('auth_root')
      state.log && console.log("S-search-A-exportDataset / endpointAuthConfig : \n", endpointAuthConfig )

      const endpointExportConfig = rootGetters['config/getEndpointConfigExport']
      state.log && console.log("S-search-A-exportDataset / endpointExportConfig : \n", endpointExportConfig )

      // ENDPOINT GENERATOR
      let endpointGenerated = searchEndpointGenerator({
        endpointConfig : endpointExportConfig,
        questionParams : state.search.question,
        selectedFilters : selectedFilters,
        authConfig : endpointAuthConfig,
        accessToken : userAccessToken
      })
      state.log && console.log("S-search-A-exportDataset / endpointGenerated : \n", endpointGenerated )

      const requestPendingAbort = rawRequest( endpointGenerated, endpointExportConfig )
      return requestPendingAbort.promise
      // requestPendingAbort.promise
      // .then(( response ) => {
      //   state.log && console.log("S-search-A-exportDataset / response : \n", response )
      //   return response
      // })
      // .catch(error => {
      //   // don't report aborted fetch as errors
      //   if (error.name !== 'AbortError')
      //     commit('setSearchError', { error })
      // })


    }

}
