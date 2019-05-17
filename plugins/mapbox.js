
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

// GEOJSON SOURCE
export function createGeoJSONSource (geoJSON) {

  console.log("+ + + createGeoJSONSource ... ")

  let geoJsonSource = {
    // id : 'clusterLayer',
    type : 'geojson',
    data : geoJSON,
    cluster : true,
    clusterMaxZoom : 14,
    clusterRadius : 50,
  }
  return geoJsonSource
}

// GEOJSON LAYERS
export function createClusterCirclesLayer (sourceId, vars) {

  let layerConfig = {
    id: "clusters",
    type: "circle",
    source: sourceId,
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
      "circle-color": [
        "step",
        ["get", "point_count"],
        // "#51bbd6", 
        // 100, "#f1f075", 
        // 750,"#f28cb1"
        "#a174ac", 
        100, "#90689a", 
        250, "#805c89", 
        500, "#705178", 
        750, "#503a56", 
      ],
      "circle-radius": [
        "step",
        ["get", "point_count"],
        20, 
        100, 20, 
        250, 30,
        500, 40,
        750, 50
    ]
    }
  }
  return layerConfig
}

export function createClusterCountLayer (sourceId, vars) {
  let layerConfig = {
    id: "cluster-count",
    type: "symbol",
    source: sourceId,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",

      "text-font": ["Open Sans Bold"], // OK
      // "text-font": ["Open Sans Regular"], // OK
      // "text-font": ["Roboto Regular"], // not working

      "text-size": 12
    },
    paint: {
      "text-color": "#ffffff"
    }
  }
  return layerConfig
}

export function createClusterUnclusteredLayer (sourceId, vars) {
  let layerConfig = {
    id: "unclustered-point",
    type: "circle",
    source: sourceId,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#fff",
      "circle-radius": 5,
      "circle-stroke-width": 5,
      "circle-stroke-color": "#a174ac"
    }
  }
  return layerConfig
}
