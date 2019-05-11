export const state = () => ({

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

})

export const getters = {

  getConfig : state => {
    console.log( "... here comes the app config : \n", state.config )
    return state.config
  },

  getEndpointConfigAuthUsers : state => {
    // console.log("getEndpointConfigAuthUsers...")
    return state.config.endpoints.filter(function(r) {
      return r.data_type === "user"
    });
  },

  getEndpointConfigAuthSpecific : (state, getters) => (endpointType) => {
    console.log("getEndpointConfigAuthSpecific / endpointType : ", endpointType)
    let allAuthEndpoints =  getters.getEndpointConfigAuthUsers
    // console.log("getEndpointConfigAuthSpecific / allAuthEndpoints", allAuthEndpoints)
    return allAuthEndpoints.find(function(r) {
      return r.endpoint_type === endpointType
    });
  }


}

export const mutations = {

  setConfig(state, {type,result}) {
    // console.log("result : ", result)
    state.config[type] = result
  },

}

export const actions = {

  getConfigType({commit, rootGetters},{type, configTypeEndpoint, args}) {
    console.log("getConfigType / type : ", type)
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    return this.$axios
    .get(rootURLbackend+'/config/'+configTypeEndpoint+"?uuid="+apivizFrontUUID+args)
    .then(response => {
      console.log("\ngetConfigType / type : ", type)
      console.log("getConfigType / response : ", response)
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



}