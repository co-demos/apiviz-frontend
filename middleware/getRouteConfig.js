
export default function ({ store, route, redirect }) {
  
  const log = store.state.log 

  // log && console.log('\n-M3- getRouteConfig...')
  
  const DynamicComponents = [ 
    'DynamicTable' , 
    'DynamicList' , 
    'DynamicDetail' , 
    'DynamicMap' , 
    'DynamicStats', 

    // TO DO 
    // 'DynamicListDense' 
  ]

  
  let path = route.path

  let queryLocale = route.query.locale
  if ( queryLocale ){
    log && console.log('-M3- getRouteConfig / queryLocale : ', queryLocale)
    store.commit('setLocale', queryLocale )
  }

  // log && console.log('-M3- getRouteConfig / route : ', route)
  log && console.log('-M3- getRouteConfig / path : ', path)

  if (path.startsWith('/backoffice') ){
    path = '/backoffice'
  }
  if (path.startsWith('/preferences') ){
    path = '/preferences'
  }
  let previousIsMapSearch = store.getters['search/getIsMapSearch']

  let currentRouteConfig = store.getters['config/getCurrentRouteConfig'](path)
  log && console.log('-M3- getRouteConfig / currentRouteConfig : ', currentRouteConfig)

  // reroute to error if currentRouteConfig is undefined
  if ( typeof currentRouteConfig === 'undefined' ){
    redirect('/')
  }

  else {

    store.commit('config/setLocalRouteConfig', currentRouteConfig)

    // check if route is dynamic data
    // if( DynamicComponents.indexOf(currentRouteConfig.dynamic_template) !== -1 ) {
    if( DynamicComponents.includes(currentRouteConfig.dynamic_template) ) {
      
      let searchedText = route.query.text
      if ( searchedText ){
        log && console.log('-M3- getRouteConfig / searchedText : ', searchedText)
        store.commit('search/setSearchedText', {searchedText})
      }
      
      // log && console.log("-M3- getRouteConfig / route requires a dynamic content ... ")
      store.dispatch('search/setSearchEndpointConfig', currentRouteConfig  )
  
      // get current dataset_uri for comparison
      let previousDatasetURI = store.getters['config/getCurrentDatasetURI']
      log && console.log('-M3- getRouteConfig / previousDatasetURI : ', previousDatasetURI)
  
      let localEndpointConfig = store.getters['config/getEndpointConfig']
      log && console.log('-M3- getRouteConfig / localEndpointConfig : ', localEndpointConfig)
      store.commit('config/setLocalEndpointConfig', localEndpointConfig)
  
      let currentDatasetURI = localEndpointConfig.dataset_uri
      store.commit('config/setCurrentDatasetURI', currentDatasetURI)
      log && console.log('-M3- getRouteConfig / currentDatasetURI : ', currentDatasetURI)

      store.commit('search/clearResults')

      // rebuild filter if dataset_uri had changed
      if ( previousDatasetURI !== currentDatasetURI ){
  
        // clear previous results
        // store.commit('search/clearResults')
  
        log && console.log('-M3- getRouteConfig / rebuilding filters...')
  
        let localFiltersConfig = store.getters['config/getEndpointConfigFilters']
        store.commit('config/setLocalFiltersConfig', localFiltersConfig)
        // log && console.log('-M3- getRouteConfig / localFiltersConfig : ', localFiltersConfig)
  
        store.dispatch('search/createDatasetFilters')
        store.commit('search/setIsMapSearch', currentRouteConfig)
        store.commit('search/setSearchQuestion', localEndpointConfig)
        // log && console.log('-M3- getRouteConfig / finished ...')
  
      // } else if ( currentRouteConfig.dynamic_template != 'DynamicMap' || previousIsMapSearch ) {
      } 

      // else if ( currentRouteConfig.dynamic_template != 'DynamicMap' ) {
      //   store.commit('search/clearResults')
      //   if ( currentRouteConfig.dynamic_template != 'DynamicDetail' ){
      //     log && console.log('-M3- getRouteConfig / dispatching search ...')
      //     store.dispatch('search/search')
      //   }
      // }
  
      else {
        log && console.log('-M3- getRouteConfig / same dataset URI ... ')
        
        // FIX PROBLEM WHEN RETURNING TO MAP AFTER DETAIL VIEW
        store.commit('search/clearResults')
        if ( currentRouteConfig.dynamic_template != 'DynamicDetail' ){
          log && console.log('-M3- getRouteConfig / dispatching search and cleaning itemId from question...')
          store.commit('search/clearItemId')
        }
        
        log && console.log('-M3- getRouteConfig / store.getters["search/getQuestion"] : ', store.getters["search/getQuestion"])
        store.commit('search/setIsMapSearch', currentRouteConfig)
        store.dispatch('search/search')

      }

    }

  }








}