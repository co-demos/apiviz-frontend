
export const apiBackendConfigs = Object.freeze({

  // APIVIZ backend URL
  // SWITCHES FOR DYNAMIC SETTING
  
  default : {
    rootURL: 'http://localhost:8100/backend/api',
  },

  default_docker : {
    rootURL: 'http://localhost:8081/backend/api',
  },

  preprod : {
    rootURL: 'https://preprod.apiviz-backend.co-demos.com/backend/api',
  },

  production : {
    rootURL: 'https://apiviz-backend.co-demos.com/backend/api',
  }

})
