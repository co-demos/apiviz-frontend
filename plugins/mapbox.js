
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

// GEOJSON DATA
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
export function createGeoJSONSource (geoJSON, vars) {

  console.log("+ + + createGeoJSONSource ... ")

  let geoJsonSource = {
    // id : 'clusterLayer',
    type : 'geojson',
    data : geoJSON,
    cluster : vars.isCluster,
    clusterMaxZoom : vars.clusterMaxZoom,
    clusterRadius : vars.clusterRadius,
  }
  return geoJsonSource
}

// GEOJSON LAYERS - CLUSTER CIRCLES
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

// GEOJSON LAYERS - CLUSTER COUNTS
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

// GEOJSON LAYERS - UNCLUSTERED CIRCLES
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

// GEOJSON LAYERS - ALL POINTS CIRCLES
export function createAllPoints (sourceId, vars) {
  var layerConfig = {
    "id": "all-points",
    "type": "circle",
    "source": sourceId,
    "filter": ["==", "$type", "Point"],
    "paint": {
      "circle-stroke-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9, 0,
        vars.maxZoom, 1
      ], 
      "circle-stroke-color": "#fff",
      "circle-color": "#a174ac",
      "circle-opacity": 0.8,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"], 
        4, vars.radiusMin,
        vars.maxZoom, vars.radiusMax
      ],

    },
  }
  return layerConfig
}

// GEOJSON LAYERS - HEATMAP
export function createHeatmapLayer (sourceId, vars) {

  // cf : https://docs.mapbox.com/help/tutorials/make-a-heatmap-with-mapbox-gl-js/
  let layerConfig = {
    "id": "projects-heatmap",
    "type": "heatmap",
    "source": sourceId,
    "maxzoom": vars.maxZoom,
    "paint": {

      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", vars.propWeight],
        0, 0,
        0.1, 1
      ],

      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0, 0.1,
        vars.maxZoom, 1.5
      ],

      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(33,102,172,0)",
        0.2, "rgb(103,169,207)",
        0.4, "rgb(209,229,240)",
        0.6, "rgb(253,219,199)",
        0.8, "rgb(239,138,98)",
        1, "rgb(178,24,43)"
      ],

      // Adjust the heatmap radius by zoom level
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        6, 15,
        vars.maxZoom, 100
      ],

      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        6, 0.7,
        vars.maxZoom, 0.1
      ],
    }
  }
  return layerConfig
}

// GEOJSON LAYERS - CLUSTER COUNTS
// cf : https://docs.mapbox.com/mapbox-gl-js/example/data-join/
// cf : 
export function createChoroplethLayer(sourceId, vars) {
  let layerConfig = {
    "id": "choropleth",
    "type": "fill",
    "source": sourceId,
    // "source-layer": sourceId,
    "paint": {
      // cf : https://docs.mapbox.com/mapbox-gl-js/style-spec/#layer-paint
      "fill-color": "#888888",
      "fill-opacity": 0.6,
      "fill-outline-color": "rgb(256,256,256)",
    }
  }
  return layerConfig
}


// mapbox actions