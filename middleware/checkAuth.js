const cookieparser = require('cookieparser')
import axios from 'axios'

import {  
  getObjectDataFromPath,
} from '~/plugins/utils.js'

export default function ({ req, store, route, redirect }) {

  log && console.log('\n-M4- checkAuth...')
  
  const log = store.state.log 

  let cookie = undefined 
  let parsed = undefined

  let accessToken 	= null 
  let refreshToken 	= null 

	if ( process.server ) {
    log && console.log("- - - checkTokens : process.server == TRUE ") 
    if ( req.headers.cookie ) {
      log && console.log("- - - checkTokens (server-side) : COOKIE DETECTED ")
      cookie = req.headers.cookie ;
			parsed = cookieparser.parse( cookie );
    }
  } 
  else {
    log && console.log("- - - checkTokens : process.server == FALSE ") ; 
		cookie = document.cookie ;
		parsed = cookieparser.parse( cookie );
  }
  
  
  try {
    log && console.log('-M4- checkAuth / parsed : ', parsed )

    accessToken		= parsed.access_token 
    refreshToken 	= parsed.refresh_token
    // log && console.log('-M4- checkAuth / accessToken : ', accessToken )

    // PREPARE AXIOS REQUEST
    const urlAuthRoot = store.getters['getRootUrlAuth']
    log && console.log("-M4-checkAuth / urlAuthRoot : ", urlAuthRoot)

    const urlAuthConfirmJwt = store.getters['config/getEndpointConfigAuthSpecific']('confirm_jwt')
    const urlAuthConfirmSuffix = urlAuthConfirmJwt.root_url
    log && console.log("-M4-checkAuth / urlAuthConfirmSuffix : ", urlAuthConfirmSuffix)

    let authUrl = urlAuthRoot + urlAuthConfirmSuffix
    log && console.log("-M4-checkAuth / authUrl : ", authUrl)

    let header = {
      'headers': { 
        'Authorization': accessToken 
      }
    }
    log && console.log("-M4-checkAuth / header : ", header)
    
    // check access token request
    axios
      .get( authUrl, header )
      .catch( (error) => {
        log && console.log(error)
      })
      .then( r => {
        // log && console.log("-M4-checkAuth / r : ", r)
        log && console.log("-M4-checkAuth / r.data : ", r.data)
        
        // set TOKENS in store
        let tokens = {
          access_token  : accessToken, 
          refresh_token : refreshToken, 
        }
        store.commit('user/setTokens', {tokens})

        // set INFOS
        const authConfig = store.getters['user/getConfirmTokenConfig']
        log && console.log("-M4-checkAuth / authConfig : ", authConfig )
    
        const userIdPath = authConfig.resp_fields.user_id.path
        const userNamePath = authConfig.resp_fields.user_name.path
        const userSurnamePath = authConfig.resp_fields.user_surname.path
        const userPseudoPath = authConfig.resp_fields.user_pseudo.path
        const userEmailPath = authConfig.resp_fields.user_email.path
        
        let infos = ( r && r.data ) ? {
          name    : getObjectDataFromPath(r.data, userNamePath), 
          surname : getObjectDataFromPath(r.data, userSurnamePath), 
          email   : getObjectDataFromPath(r.data, userEmailPath), 
          id      : getObjectDataFromPath(r.data, userIdPath), 
          pseudo  : getObjectDataFromPath(r.data, userPseudoPath), 
        } : undefined 
        log && console.log("-M4-checkAuth / infos : ", infos )
        store.commit('user/setInfos', {infos})
        
        // set ROLE
        const userRolePath = authConfig.resp_fields.user_role.path
        let role = ( r && r.data ) ? getObjectDataFromPath(r.data, userRolePath) : undefined
        log && console.log("-M4-checkAuth / role : ", role )
        store.commit('user/setRole', {role})

      })

  }
  catch (error){
    log && console.log('-M4- checkAuth / error : ', error )
  }



}