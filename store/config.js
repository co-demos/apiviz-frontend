import axios from 'axios'

export const state = () => ({

  // CONSOLE LOG ALLOWED 
  log: process.env.ConsoleLog,

  // FOR NEW INSTANCES - DEFAULT MODELS
  apivizModels : {
    modelUuids : [
      // { name : 'SoNum', 
      //   uuid : 'c5efafab-1733-4ad1-9eb8-d529bc87c481',
      //   preview : '/previews/map-view-sonum-03.png',
      // },
      // { name : 'APCIS', 
      //   uuid : 'f0a482da-28be-4929-a443-f22ecb03ee68',
      //   preview : '/previews/list-view-apcis-01.png',
      // },
    ],
  },

  // APIVIZ CONFIG
  config : {
    'global' : undefined,
    'styles' : undefined,
    'socials' : undefined,
    'footer' : undefined,
    'navbar' : undefined,
    'routes' : undefined,
    'tabs' : undefined,
    'endpoints' : undefined,
  },

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
      state.log && console.log( "S-config-G-getConfig / here comes the app config : \n", state.config )
      return state.config
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
    // getStylesConfigColorsTypo : state => {
    //   return state.config.styles.app_typo_colors.content
    // },

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
      return (state.config.global) ? state.config.global.app_title.content : undefined 
    },

  // FOOTER RELATED
    hasFooter : (state) => {
      return (state.localRouteConfig) ? state.localRouteConfig.has_footer : false 
    },
    hasCreditsFooter : (state) => {
      // state.log && console.log('S-config-hasCreditsFooter ... state.localRouteConfig : \n', state.localRouteConfig)
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
      // state.log && console.log('S-config-hasBanner ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.banner.activated : false 
    },
    getCurrentBanner : (state, getters) => {
      // state.log && console.log('S-config-getCurrentBanner ...')
      let bannersSet = getters.getStylesConfig.app_banners.banners_set
      const routeBannerUri = state.localRouteConfig.banner.banner_uri
      let resultSet = bannersSet.find(function(b) {
        return b.banner_uri == routeBannerUri
      })
      // state.log && console.log('S-config-getCurrentBanner ... resultSet : \n', resultSet)
      return resultSet
    },


  // ROUTE CONFIG GETTERS
    // - - - - - - - - - - - - - - - //
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
    getRouteConfigListForDataset : (state, getters, rootState) => {
      return state.config.routes.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
    },
    getRouteConfigMapForDataset : (state, getters, rootState) => {
      return state.config.routes.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getRouteConfigStatForDataset : (state, getters, rootState) => {
      return state.config.routes.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getRouteConfigDefaultDatasetImages : (state, getters, rootState) => {
      return state.config.styles.app_search_default_images_sets.images_sets.find(function(r) {
        return r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },

  // ENDPOINTS CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getEndpointConfig : (state, getters, rootState, rootGetters) => {
      // state.log && console.log("\nS-config-getEndpointConfig - state.config.endpoints : \n", state.config.endpoints)
      // state.log && console.log("S-config-getEndpointConfig - rootState.search.search.dataset_uri : ", rootState.search.search.dataset_uri)
      // state.log && console.log("S-config-getEndpointConfig - rootGetters['search/getSearchDatasetURI'] : ", rootGetters['search/getSearchDatasetURI'])
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === rootState.search.search.endpoint_type
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigFilters : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigFilters - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'filters'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigList : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigList - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigMap : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigMap - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigDetail : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigDetail - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'detail'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigStat : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigStat - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
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
      let text = noAbstractDict.find(t=>t.locale == rootState.locale )
      return text.text
    },


}

export const mutations = {

  setDefaultApivizModels(state, models) {
    state.apivizModels.modelUuids = models
  },

  setConfig(state, {type,result}) {
    // state.log && console.log("S-setConfig ... result : ", result)
    state.config[type] = result
  },
  setLocalRouteConfig(state, routeConfig) {
    // state.log && console.log("S-config-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    // state.log && console.log("S-config-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },
  setLocalEndpointConfig(state, localEndpointConfig) {
    // state.log && console.log("S-config-M-setLocalEndpointConfig...")
    // state.log && console.log("S-config-M-setLocalEndpointConfig / localEndpointConfig : ", localEndpointConfig)
    state.localEndpointConfig = localEndpointConfig
  },
  setCurrentDatasetURI(state, currentDatasetURI) {
    // state.log && console.log("S-config-setCurrentDatasetURI...")
    state.currentDatasetURI = currentDatasetURI
  },
  setLocalFiltersConfig(state, localFiltersConfig) {
    // state.log && console.log("S-config-setLocalFiltersConfig...")
    state.localFiltersConfig = localFiltersConfig
  },

}

export const actions = {

  getConfigType({commit, state, getters, rootGetters},{type, configTypeEndpoint, args}) {
    // state.log && console.log("S-config-A-getConfigType / type : ", type)
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    // return this.$axios.get(rootURLbackend+'/config/'+configTypeEndpoint+"?uuid="+apivizFrontUUID+args)
    return axios.get(rootURLbackend+'/config/'+configTypeEndpoint+"?uuid="+apivizFrontUUID+args)
    .then(response => {
      // state.log && console.log("\nS-config-A-getConfigType / getConfigType / type : ", type)
      // state.log && console.log("S-config-A-getConfigType / getConfigType / response : ", response)
      let app_config = (response && response.data && response.data.app_config) ? response.data.app_config : undefined
      commit('setConfig', {type:type,result:app_config}); 
      return app_config
    })
    .catch( err => 
      console.log('there was an error trying to fetch some configuration file', err) 
    )
  },

  getConfigAll({dispatch}) {
    let arr = []
    arr.push(dispatch('getConfigType',{type:'global',    configTypeEndpoint:'global', args:''}) )
    arr.push(dispatch('getConfigType',{type:'styles',    configTypeEndpoint:'styles', args:''}) )
    arr.push(dispatch('getConfigType',{type:'socials',   configTypeEndpoint:'socials', args:''}) )
    arr.push(dispatch('getConfigType',{type:'footer',    configTypeEndpoint:'footer', args:''}) )
    arr.push(dispatch('getConfigType',{type:'navbar',    configTypeEndpoint:'navbar', args:''}) )
    arr.push(dispatch('getConfigType',{type:'routes',    configTypeEndpoint:'routes', args:'&as_list=true'}) )
    arr.push(dispatch('getConfigType',{type:'tabs',      configTypeEndpoint:'tabs', args:'&as_list=true'}) )
    arr.push(dispatch('getConfigType',{type:'endpoints', configTypeEndpoint:'endpoints', args:'&as_list=true'}) )
    return Promise.all(arr)
  },

  editConfig({commit, state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-editConfig / request : \n", request)

    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    
    const currentColl = request.currentColl
    const payload = request.payload

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
      console.log('S-config-A-editConfig / error :', error)
    })
    .then(response => {
      console.log('S-config-A-editConfig / response : \n', response)
      // reset config after update
      // this.$store.dispatch('config/getConfigType',{type:currentColl, configTypeEndpoint:currentColl, args:argsConfig}) 
      return response
      }
    )

  },

  deleteConfig({state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-deleteConfig / request : \n", request)

    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    
    const currentColl = request.currentColl
    const docId = request.doc_id
    const accessToken = request.token

    // build request URL
    let requestUrl = rootURLbackend+'/config/'+currentColl+"/"+docId+"?uuid="+apivizFrontUUID
    state.log && console.log('S-config-A-deleteConfig / requestUrl : ', requestUrl)

    // post update request
   return axios
    .delete( requestUrl, {data : {token : accessToken} } )
    .catch( (error) => {
      console.log('S-config-A-deleteConfig / error :', error)
    })
    .then(response => {
      console.log('S-config-A-deleteConfig / response : \n', response)
      // reset config after update
      return response
      }
    )

  },


  // - - - - - - - - - - - - - //
  // New config given UUID
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
      // state.log && console.log('S-config-A-getDefaultApivizModels / response.data : \n', response.data)
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
      state.log &&console.log('S-config-A-getModelFromUuid / error :', error)
    })
    .then(response => {
      // state.log &&console.log('S-config-A-createNewConfig / response.data : \n', response.data)
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