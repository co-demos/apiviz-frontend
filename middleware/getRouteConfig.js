
export default function ({ store, route, redirect }) {
  
  console.log('\n-- getRouteConfig...')
  
  const DynamicComponents = [ 
    'DynamicList' , 
    'DynamicDetail' , 
    'DynamicMap' , 
    // 'DynamicStat', 
    // 'DynamicListDense' 
  ]

  let path = route.path
  console.log('-- getRouteConfig / path : ', path)

  let currentRouteConfig = store.getters['config/getCurrentRouteConfig'](path)
  store.commit('config/setLocalRouteConfig', currentRouteConfig)

  if( DynamicComponents.indexOf(currentRouteConfig.dynamic_template) !== -1 ) {
    
    console.log("-- getRouteConfig / route requires a dynamic content ... ")
    // store.dispatch('search/setSearchEndpointConfig', { path : path })
    // let localEndpointConfig = store.getters['getEndpointConfig']
    // store.commit('config/setLocalEndpointConfig', localEndpointConfig)

    // let currentDatasetURI = localEndpointConfig.dataset_uri
    // let localFiltersConfig = store.getters['getEndpointConfigFilters']
    // store.dispatch('search/createDatasetFilters')
    // store.commit('search/setIsMapSearch', routeConfig)

  }

}