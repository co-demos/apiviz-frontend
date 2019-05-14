
export default function ({ store, route, redirect }) {
  
  const log = store.state.log 

  log && console.log('\n-M3- getRouteConfig...')
  
  const DynamicComponents = [ 
    'DynamicList' , 
    'DynamicDetail' , 
    'DynamicMap' , 
    // 'DynamicStat', 
    // 'DynamicListDense' 
  ]

  let path = route.path
  log && console.log('-M3- getRouteConfig / path : ', path)

  let currentRouteConfig = store.getters['config/getCurrentRouteConfig'](path)
  store.commit('config/setLocalRouteConfig', currentRouteConfig)

  // check if route is dynamic data
  if( DynamicComponents.indexOf(currentRouteConfig.dynamic_template) !== -1 ) {
    
    log && console.log("-M3- getRouteConfig / route requires a dynamic content ... ")
    store.dispatch('search/setSearchEndpointConfig', currentRouteConfig  )

    // get current dataset_uri for comparison
    let previousDatasetURI = store.getters['config/getCurrentDatasetURI']
    // log && console.log('-M3- getRouteConfig / previousDatasetURI : ', previousDatasetURI)

    let localEndpointConfig = store.getters['config/getEndpointConfig']
    store.commit('config/setLocalEndpointConfig', localEndpointConfig)
    // log && console.log('-M3- getRouteConfig / localEndpointConfig : ', localEndpointConfig)

    let currentDatasetURI = localEndpointConfig.dataset_uri
    store.commit('config/setCurrentDatasetURI', currentDatasetURI)
    log && console.log('-M3- getRouteConfig / currentDatasetURI : ', currentDatasetURI)

    // rebuild filter if dataset_uri had changed
    if ( previousDatasetURI !== currentDatasetURI ){

      log && console.log('-M3- getRouteConfig / rebuilding filters...')

      let localFiltersConfig = store.getters['config/getEndpointConfigFilters']
      store.commit('config/setLocalFiltersConfig', localFiltersConfig)
      // log && console.log('-M3- getRouteConfig / localFiltersConfig : ', localFiltersConfig)

      store.dispatch('search/createDatasetFilters')
      store.commit('search/setIsMapSearch', currentRouteConfig)

      // log && console.log('-M3- getRouteConfig / finished ...')

    }

  }

}