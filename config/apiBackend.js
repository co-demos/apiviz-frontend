// ALL THOSE OBJECTS MUST BE CHANGED INTO ENV VARS 
// ONCE ALL THE FRONTEND VUE PROJECT / MAIN.HTML (ex-SPA.HTML) 
// WILL BE TOTALLY BUILT INDEPENDENTLY FROM FLASK

export const apivizFrontUUID = Object.freeze({
  apiviz_front_uuid : "c5efafab-1733-4ad1-9eb8-d529bc87c481", // config SONUM
  // apiviz_front_uuid : "f0a482da-28be-4929-a443-f22ecb03ee68", // config APCIS
})

export const apiConfig = Object.freeze({

  // APIVIZ backend URL
  // SWITCHES FOR DYNAMIC SETTING
  
  default : {
    rootURL: 'http://localhost:8100/backend/api',
  },

  default_docker : {
    rootURL: 'http://localhost:8081/backend/api',
  },

  preprod : {
    rootURL: 'https://preprod.sonum-beta.fr/backend/api',
  },

  production : {
    rootURL: 'https://sonum-beta.fr/backend/api',
  }

})
