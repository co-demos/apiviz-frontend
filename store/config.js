import axios from 'axios'

const emptyConfig = {
  'global' : undefined,
  'styles' : undefined,
  'socials' : undefined,
  'footer' : undefined,
  'navbar' : undefined,
  'routes' : undefined,
  'tabs' : undefined,
  'endpoints' : undefined,
}

export const state = () => ({

  // CONSOLE LOG ALLOWED
  log: process.env.ConsoleLog,

  // FOR NEW INSTANCES - DEFAULT MODELS
  apivizModels : {
    modelUuids : [],
  },

  // APIVIZ CONFIG
  uuidAuth : undefined,
  isConfigComplete : false,
  config : emptyConfig,

  localRouteConfig : undefined,

  localEndpointConfig : undefined,
  localFiltersConfig : undefined,
  currentDatasetURI : undefined,

})

export const getters = {

  // NEW INSTANCES
  // - - - - - - - - - - - - - - - //
    getApivizModels : state => {
      return state.apivizModels
    },

  // APP CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getConfig : state => {
      // state.log && console.log( "S-config-G-getConfig / here comes the app config : \n", state.config )
      return state.config
    },
    getUuidAuth : state => {
      // state.log && console.log( "S-config-G-getUuidAuth / here comes the uuidAuth : \n", state.uuidAuth )
      return state.uuidAuth
    },
    getIsConfigComplete : state => {
      // state.log && console.log( "S-config-G-getConfig / getIsConfigComplet / isConfigComplete :", isConfigComplete )
      return state.isConfigComplete
    },
    getEndpointConfigAuthUsers : state => {
      // state.log && console.log("S-config-G-getEndpointConfigAuthUsers...")
      return state.config.endpoints.filter(function(r) {
        return r.data_type === "user"
      });
    },
    getEndpointConfigAuthSpecific : (state, getters) => (endpointType) => {
      // state.log && console.log("S-config-G-getEndpointConfigAuthSpecific / endpointType : ", endpointType)
      let allAuthEndpoints =  getters.getEndpointConfigAuthUsers
      // state.log && console.log("S-config-G-getEndpointConfigAuthSpecific / allAuthEndpoints", allAuthEndpoints)
      return allAuthEndpoints.find(function(r) {
        return r.endpoint_type === endpointType
      });
    },

  // GLOBAL RELATED
    getGlobalConfig : state => {
      return state.config.global
    },
    getAppLocales : state => {
      return (state.config.global) ? state.config.global.app_languages : 'fr'
    },

  // STYLES RELATED
    getStylesConfig : state => {
      return state.config.styles
    },
    getStylesConfigColors : state => {
      return state.config.styles.app_colors.content
    },

  // NAVBAR RELATED
    hasNavbar : (state) => {
      // state.log && console.log('S-config-G-hasNavbar ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.has_navbar : false
    },
    getNavbarConfig : state => {
      return (state.config.navbar) ? state.config.navbar.app_navbar : undefined
    },
    getNavbarLogo : state => {
      return (state.config.global) ? state.config.global.app_logo : undefined
    },
    getNavbarBrand : state => {
      // return (state.config.global) ? state.config.global.app_title.content : undefined
      return (state.config.global) ? state.config.global.app_title : undefined
    },

  // FOOTER RELATED
    hasFooter : (state) => {
      return (state.localRouteConfig) ? state.localRouteConfig.has_footer : false
    },
    hasCreditsFooter : (state) => {
      // state.log && console.log('S-config-G-hasCreditsFooter ... state.localRouteConfig : \n', state.localRouteConfig)
      return state.config.footer.app_footer.has_credits_footer
    },
    getFooterConfig : state => {
      return (state.config.footer) ? state.config.footer.app_footer : undefined
    },
    getSocialsConfig : state => {
      return state.config.socials
    },

  // BANNER RELATED
    hasBanner : state => {
      // state.log && console.log('S-config-G-hasBanner ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.banner.activated : false
    },
    getCurrentBanner : (state, getters) => {
      // state.log && console.log('S-config-G-getCurrentBanner ...')
      let bannersSet = getters.getStylesConfig.app_banners.banners_set
      const routeBannerUri = state.localRouteConfig.banner.banner_uri
      let resultSet = bannersSet.find(function(b) {
        return b.banner_uri == routeBannerUri
      })
      // state.log && console.log('S-config-getCurrentBanner ... resultSet : \n', resultSet)
      return resultSet
    },

    // TABS RELATED
    hasTabs : state => {
      // state.log && console.log('S-config-G-hasTabs ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.has_tabs : false
    },
    getTabConfig : (state) => (tabsUri) => {
      // state.log && console.log('S-config-G-getTabConfig ... tabsUri : ', tabsUri)
      // state.log && console.log('S-config-G-getTabConfig ... state.config.tabs : \n', state.config.tabs)
      let tabsConfig = state.config.tabs.find( tabs => {
        return tabs.tabs_uri == tabsUri
      })
      // state.log && console.log('S-config-G-getTabConfig ... tabsConfig : \n', tabsConfig)
      return tabsConfig
    },


  // ROUTE CONFIG GETTERS
    // - - - - - - - - - - - - - - - //
    getRouteConfigByField : (state) => (field) => {
      return state.config.routes.find(function(r){
        return r.field === field
      })
    },
    getCurrentRouteConfig : (state) => (currentRoute) => {
      try {
        return state.config.routes.find(function(r) {
          return r.urls.indexOf(currentRoute) !== -1;
        });
      } catch (e) {
        state.log && console.log('err',e);
        return undefined
      }
    },
    getLocalRouteConfig : state => {
      return state.localRouteConfig
    },
    getRouteConfigTableForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'table'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigTableForDataset / config : ", config )
      return config
    },
    getRouteConfigListForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigListForDataset / config : ", config )
      return config
    },
    getRouteConfigMapForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log("S-config-G-getRouteConfigMapForDataset / config", config )
      return config
    },
    getRouteConfigStatForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigStatForDataset / config : ", config )
      return config
    },
    getRouteConfigCalendarForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'calendar'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigCalendarForDataset / config : ", config )
      return config
    },
    getRouteConfigDefaultDatasetImages : (state, getters, rootState) => {
      return state.config.styles.app_search_default_images_sets.images_sets.find(function(r) {
        return r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },

  // ENDPOINTS CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getEndpointConfig : (state, getters, rootState, rootGetters) => {
      state.log && console.log("\nS-config-getEndpointConfig - state.config.endpoints : \n", state.config.endpoints)
      state.log && console.log("S-config-getEndpointConfig - rootState.search.search.dataset_uri : ", rootState.search.search.dataset_uri)
      state.log && console.log("S-config-getEndpointConfig - rootState.search.search.endpoint_type : ", rootState.search.search.endpoint_type)
      // state.log && console.log("S-config-getEndpointConfig - rootGetters['search/getSearchDatasetURI'] : ", rootGetters['search/getSearchDatasetURI'])
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === rootState.search.search.endpoint_type
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigByType : (state, getters, rootState) => (endpointType) => {
      // state.log && console.log("S-config-getEndpointConfigFilters - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === endpointType
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigFilters : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigFilters - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'filters'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigFilters - config : ", config)
      return config
    },
    getEndpointConfigTable : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigTable - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'table'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigTable - config : ", config)
      return config
    },
    getEndpointConfigList : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigList - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigList - config : ", config)
      return config
    },
    getEndpointConfigMap : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigMap - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigMap - config : ", config)
      return config
    },
    getEndpointConfigDetail : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigDetail - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'detail'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigDetail - config : ", config)
      return config
    },
    getEndpointConfigStat : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigStat - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigStat - config : ", config)
      return config
    },
    getEndpointConfigCalendar : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigCalendar - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'calendar'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigCalendar - config : ", config)
      return config
    },
    getEndpointConfigExport : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigExport - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'export'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigExport - config : ", config)
      return config
    },

    getLocalEndpointConfig : state => {
      return state.localEndpointConfig
    },
    getLocalFiltersConfig : state => {
      return state.localFiltersConfig
    },
    getCurrentDatasetURI : state => {
      return state.currentDatasetURI
    },

  // DEFAULT TEXTS GETTERS
  // - - - - - - - - - - - - - - - //
    defaultText : (state, getters, rootState) => (field) => {
      // state.log && console.log("\nS-config-G-defaultText ..." )
      // state.log && console.log("S-config-G-defaultText / field : ", field )

      // default texts fields are :
      // 'reinit_filters', 'no_abstract', 'no_address'
      // 'source', 'no_info'

      // state.log && console.log("S-config-G-defaultText / field : ", field )

      const f = field.txt
      // state.log && console.log("S-config-G-defaultText / f : ", f )

      const noAbstractDict = state.config.global.app_basic_dict[f]
      // state.log && console.log("S-config-G-defaultText / noAbstractDict : ", noAbstractDict )
      let text = noAbstractDict.find( t=>t.locale == rootState.locale )
      return text.text
    },


}

export const mutations = {

  setDefaultApivizModels(state, models) {
    state.apivizModels.modelUuids = models
  },

  setConfig(state, {type,result}) {
    // state.log && console.log("S-config-M-setConfig ... result : ", result)
    state.config[type] = result
  },
  setUuidAuth(state, uuidAuth) {
    // state.log && console.log( "S-config-M-setUuidAuth / uuidAuth : \n", uuidAuth )
    state.uuidAuth = uuidAuth
  },
  setIsConfigComplete(state, isComplete) {
    // state.log && console.log("S-config-M-setIsConfigComplete ... isComplete : ", isComplete)
    state.isConfigComplete = isComplete
  },
  setLocalRouteConfig(state, routeConfig) {
    // state.log && console.log("S-config-M-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    // state.log && console.log("S-config-M-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },
  setLocalEndpointConfig(state, localEndpointConfig) {
    // state.log && console.log("S-config-M-setLocalEndpointConfig...")
    // state.log && console.log("S-config-M-setLocalEndpointConfig / localEndpointConfig : ", localEndpointConfig)
    state.localEndpointConfig = localEndpointConfig
  },
  setCurrentDatasetURI(state, currentDatasetURI) {
    // state.log && console.log("S-config-M-setCurrentDatasetURI...")
    state.currentDatasetURI = currentDatasetURI
  },
  setLocalFiltersConfig(state, localFiltersConfig) {
    // state.log && console.log("S-config-M-setLocalFiltersConfig...")
    state.localFiltersConfig = localFiltersConfig
  },

  // completly reset/empty config
  resetConfig(state){
    state.log && console.log("S-config-M-resetConfig...")
    state.config = emptyConfig
    state.isComplete = false
  }

}

export const actions = {

  // - - - - - - - - - - - - - //
  // UUID - RELATED
  // - - - - - - - - - - - - - //

  checkUuidAuth({commit, state, getters, rootGetters}){

    state.log && console.log("S-config-A-checkUuidAuth ... ")
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    const authMode = rootGetters['getAuthMode']

    // get user access token if any
    const userAccessToken = rootGetters['user/getAccessToken']

    let firstArgs = "?auth_mode="+authMode+"&token="+userAccessToken

    let fullUrl   = rootURLbackend+'/check_uuid/'+apivizFrontUUID+firstArgs
    state.log && console.log("S-config-A-getConfigType / fullUrl : ", fullUrl)

    // get one apiviz instance's auth options
    return axios
    .get(fullUrl)
    .then(response => {
      // state.log && console.log("S-config-A-checkUuidAuth / response.data : ", response.data)
      return response.data
    })
    .catch( err =>
      console.log('there was an error trying to fetch UUID auth document', err)
    )

  },

  // - - - - - - - - - - - - - //
  // CONFIG - RELATED
  // - - - - - - - - - - - - - //

  getConfigType({commit, state, getters, rootGetters},{type, configTypeEndpoint, args}) {

    // state.log && console.log("S-config-A-getConfigType / type : ", type)
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const authMode = rootGetters['getAuthMode']
    // state.log && console.log("S-config-A-getConfigType / authMode : ", authMode)

    // get user access token if any
    const userAccessToken = rootGetters['user/getAccessToken']
    // state.log && console.log("S-config-A-getConfigType / userAccessToken : ", userAccessToken)

    let firstArgs = configTypeEndpoint+"?uuid="+apivizFrontUUID+"&auth_mode="+authMode+"&token="+userAccessToken
    let fullUrl   = rootURLbackend+'/config/'+firstArgs+args
    state.log && console.log("S-config-A-getConfigType / fullUrl : ", fullUrl)

    // get one collection's config items
    return axios
    .get(fullUrl)
    .then(response => {
      state.log && console.log("S-config-A-getConfigType / type -", type," - response.data : ", response.data)
      let app_config = (response && response.data && response.data.app_config) ? response.data.app_config : undefined
      if (type == "endpoints")
      {
        state.log && console.log("S-config-A-getConfigType / type : "+ type + " / app_config ", app_config)
        for (let endpoint of app_config )
        {
          if (["table", "list"].includes(endpoint.endpoint_type))
          {
            state.log && console.log("S-config-A-getConfigType / rewrite endpoint : ", endpoint)
            for (let arg of endpoint.args_options)
            {
              if (arg.app_arg == "query")
              {
                arg.arg = "probe"
              }
              console.log("+ + + S-config-A-getConfigType / arg : ", arg)
            }
          }
        }
      }
      commit('setConfig', {type:type,result:app_config});
      return app_config
    })
    .catch( err =>
      state.log && console.log('there was an error trying to fetch some configuration file', err)
    )
  },


  getConfigAll({dispatch}, loginRoute=false) {

    let arr = []

    // get all configuration (all collections) as a list of promises
    arr.push(dispatch('getConfigType',{type:'global',    configTypeEndpoint:'global',  args:'&log_route='+loginRoute}) )
    arr.push(dispatch('getConfigType',{type:'styles',    configTypeEndpoint:'styles',  args:'&log_route='+loginRoute}) )
    arr.push(dispatch('getConfigType',{type:'socials',   configTypeEndpoint:'socials', args:'&log_route='+loginRoute}) )
    arr.push(dispatch('getConfigType',{type:'footer',    configTypeEndpoint:'footer',  args:'&log_route='+loginRoute}) )
    arr.push(dispatch('getConfigType',{type:'navbar',    configTypeEndpoint:'navbar',  args:'&log_route='+loginRoute}) )
    arr.push(dispatch('getConfigType',{type:'tabs',      configTypeEndpoint:'tabs',    args:'&as_list=true&log_route='+loginRoute}) )
    arr.push(dispatch('getConfigType',{type:'routes',    configTypeEndpoint:'routes',  args:'&as_list=true&log_route='+loginRoute}) )

    // protect endpoints config for private apiviz instances : don't retrieve "data_type" == "data" endpoints, juste "data_type" == "user"
    arr.push(dispatch('getConfigType',{type:'endpoints', configTypeEndpoint:'endpoints', args:'&as_list=true&log_route='+loginRoute}) )

    return Promise.all(arr)
  },

  editConfig({commit, state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-editConfig / request : \n", request)

    const authMode        = rootGetters['getAuthMode']
    const rootURLbackend  = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const currentColl = request.currentColl
    let payload = request.payload
    payload['auth_mode'] = authMode

    // build request URL
    let requestUrl = rootURLbackend+'/config/'+currentColl+"?uuid="+apivizFrontUUID
    state.log && console.log('S-config-A-editConfig / requestUrl : ', requestUrl)

    // INTERNATIONALIZATION
    if (currentColl === 'global' ) {
      let appLocales = getters['getAppLocales']
      commit('setLocale', appLocales.locale, { root: true })
    }

    // post update request
    return axios
    .post( requestUrl, payload )
    .catch( (error) => {
      state.log && console.log('S-config-A-editConfig / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-editConfig / response : \n', response)
      return response
    })

  },

  deleteConfig({state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-deleteConfig / request : \n", request)

    const authMode = rootGetters['getAuthMode']
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const currentColl = request.currentColl
    const docId = request.doc_id
    const accessToken = request.token

    // build request URL
    let requestUrl = rootURLbackend+'/config/'+currentColl+"/"+docId+"?uuid="+apivizFrontUUID
    state.log && console.log('S-config-A-deleteConfig / requestUrl : ', requestUrl)

    let payload = {
      data : {
        token : accessToken,
        auth_mode : authMode,
      }
    }

    // post update request
   return axios
    .delete( requestUrl, payload )
    .catch( (error) => {
      state.log && console.log('S-config-A-deleteConfig / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-deleteConfig / response : \n', response)
      // reset config after update
      return response
      }
    )

  },

  addConfigDoc({commit, state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-addConfigDoc / request : \n", request)

    const authMode = rootGetters['getAuthMode']
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const currentColl = request.currentColl
    const payload = request.payload
    payload['apiviz_front_uuid'] = apivizFrontUUID
    payload['auth_mode'] = authMode

    // build request URL
    let requestUrl = rootURLbackend+'/add_document/'+currentColl
    state.log && console.log('S-config-A-addConfigDoc / requestUrl : ', requestUrl)

    // post update request
    return axios
    .post( requestUrl, payload )
    .catch( (error) => {
      state.log && console.log('S-config-A-addConfigDoc / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-addConfigDoc / response : \n', response)
      return response
      }
    )

  },

  resetConfig({state, commit}){
    state.log && console.log("S-config-A-resetConfig ... ")
    commit('resetConfig')
  },

  // - - - - - - - - - - - - - //
  // NEW CONFIG GIVEN UUID - RELATED
  // - - - - - - - - - - - - - //

  getDefaultApivizModels({commit, state, getters, rootGetters}){

    // state.log && console.log("S-config-A-getDefaultApivizModels ...")

    // build request URL
    const rootURLbackend = rootGetters['getRootUrlBackend']
    let requestUrl = rootURLbackend+'/get_default_models'
    // state.log && console.log('S-config-A-getDefaultApivizModels / requestUrl : ', requestUrl)

    // send axios request to backend
    axios.get(requestUrl)
    .catch( (error) => {
      state.log && console.log('S-config-A-getDefaultApivizModels / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-getDefaultApivizModels / response.data : \n', response.data)
      let defaultModels = response.data.models
      commit('setDefaultApivizModels', defaultModels)
    })

  },

  getModelFromUuid({state, getters, rootGetters}, uuid){
    state.log && console.log("S-config-A-getModelFromUuid / uuid :", uuid)

    // build request URL
    const rootURLbackend = rootGetters['getRootUrlBackend']
    let requestUrl = rootURLbackend+'/get_config_model/'+uuid
    // state.log && console.log('S-config-A-getModelFromUuid / requestUrl : ', requestUrl)

    // send axios request to backend
    return axios.get(requestUrl)
    .catch( (error) => {
      state.log && console.log('S-config-A-getModelFromUuid / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-createNewConfig / response.data : \n', response.data)
      return response
    })

  },

  createNewConfig({state, getters, rootGetters}, request){

    // state.log && console.log("S-config-A-createNewConfig / request : \n", request)

    // retrieve current uuid
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    // prepare the payload with uuid to copy
    let payload = {
      new_uuid : apivizFrontUUID,
      model_uuid : request.modelUuid,
      new_title : request.new_title,
      new_logoUrl : request.new_logoUrl,
      model_admin_email : request.new_admin,
      model_admin_name : request.new_admin_name,
      model_admin_surname : request.new_admin_surname,
    }
    // state.log && console.log("S-config-A-createNewConfig / payload : \n", payload)

    // build request URL
    const rootURLbackend = rootGetters['getRootUrlBackend']
    let requestUrl = rootURLbackend+'/create_new_config'
    // state.log && console.log('S-config-A-createNewConfig / requestUrl : ', requestUrl)

    // send axios request to backend
    return axios.post( requestUrl, payload )
    .catch( (error) => {
      state.log &&console.log('S-config-A-createNewConfig / error :', error)
    })
    .then(response => {
      // state.log &&console.log('S-config-A-createNewConfig / response.data : \n', response.data)
      return response
      }
    )

  }

}
