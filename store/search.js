export const state = () => ({

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

}

export const mutations = {

}

export const actions = {

}