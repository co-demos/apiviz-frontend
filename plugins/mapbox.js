
console.log('+ + + plugins/mapbox... ')

import Vue from 'vue';
import { 
  MglMap, 
  
  MglMarker,
  MglPopup,

  MglGeolocateControl, 
  MglNavigationControl,
  MglScaleControl,

  MglGeojsonLayer,

} from 'vue-mapbox';
import Mapbox from 'mapbox-gl';

Vue.component('MglMap', MglMap);

Vue.component('MglMarker', MglMarker);
Vue.component('MglPopup', MglPopup);

Vue.component('MglGeolocateControl', MglGeolocateControl);
Vue.component('MglNavigationControl', MglNavigationControl);
Vue.component('MglScaleControl', MglScaleControl);

Vue.component('MglGeojsonLayer', MglGeojsonLayer);

Vue.prototype.$mapbox = Mapbox;


import axios from 'axios'


export function getStyleJSON (styleURL) {

  console.log("+ + + getStyleJSON ... styleURL : ", styleURL)

  // fetch(styleURL)
  //   .then(response => {
  //     console.log("+ + + getStyleJSON / FETCH / response : ", response)
  //     }
  //   )
  //   .then(response => response.json() )

  let head = { 
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      // 'accept' : 'application/json',
      // 'credentials': false
    }
  }
  axios.get(styleURL, head)
    .then( (response) => { 
      console.log("+ + + getStyleJSON / AXIOS / response : ", response); 
    })
    .catch( (error) => {
      console.log("+ + + getStyleJSON / AXIOS / error : ", error)
    } )



}