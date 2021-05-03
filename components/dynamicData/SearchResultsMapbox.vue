<style src="mapbox-gl/dist/mapbox-gl.css"></style>
<style lang="scss" scoped>
   .spot__map {
    margin: 0 20px;
    width: auto;
    .mgl-map-wrapper {
      position: absolute;
    }
  }
</style>

<template>

  <!-- <div class="columns">

    <div class="container">

      <div class="column is-half"> -->

        <div class="map">

          <!-- SearchResultsCountAndTabs -->
          <div class="count-and-tabs-container">
            <div 
              class="container"
              :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
              >
              <SearchResultsCountAndTabs 
                :view="VIEW_MAP" 
                :open="showCard"
                >
                
                <!-- HIGHLIGHTED ITEM  -->
                <div 
                  class="highlighted-project" 
                  v-if="showCard" 
                  slot="item"
                  >
                  
                  <!-- BUTTON TO CLOSE PREVIEW -->
                  <button 
                    v-show="displayedProject"
                    class="button close" 
                    @click="showCard = false"
                    >
                    <!-- @click="highlightItem(undefined)" -->
                    <span class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </button>
                  
                  <!-- {{ displayedProject }} -->
                  <!-- PROJECT CARD -->
                  <div class="card">

                    <!-- LOADER -->
                    <div 
                      class="columns is-mobile is-vcentered "
                      v-show="!displayedProject"
                      >
                      <div 
                        class="column is-12 has-text-centered has-text-primary has-text-primary-c"
                        >
                        <div 
                          class="lds-roller"
                          >
                          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                      </div>
                      <!-- <div class="column is-12 has-text-centered has-text-primary has-text-primary-c">
                        <span class="icon app-loader">
                          <i class="fas fa-spinner fa-pulse fa-3x"></i>
                        </span>
                      </div> -->


                    </div>

                    <!-- ITEM DATA -->
                    <ProjectCard 
                      v-if="displayedProject"
                      :item="displayedProject"
                      :contentFields="contentFields"
                      :view="VIEW_MAP"
                      >
                    </ProjectCard>


                  </div>

                </div>

              </SearchResultsCountAndTabs>
            </div>
          </div>


          <!-- {{ itemsForsMap }} -->
          <!-- LOADER -->
          <div 
            id="loader-map"
            v-show="!itemsForMap || showLoader"
            class="lds-roller floating"
            >
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>


          <!-- LAYERS & LEGEND -->
          <div 
            v-if="itemsForMap"
            id='legend' 
            :class='`legend-block legend-bottom-right`'
            >

            <!-- LAYERS SWITCH -->
            <div 
              v-if="layersVisibility && layersVisibility.is_activated"
              class="legend layer-switch" 
              >

              <button 
                class="button is-small is-fullwidth is-primary-b is-outlined"
                @click="switchLayersDrawer()"
                >
                {{ basicDict.map_layers[locale] }}
              </button>

              <div 
                v-show="drawerLayersOpen"
                class="legend-content"
                >
                <div 
                  v-for="(layer, index) in layersVisibility.layers_switches"
                  :key="index"
                  class="field"
                  >
                  <input 
                    class="is-checkradio" 
                    :id="layer.label" 
                    :name="layer.label" 
                    :checked=" layer.default_visible ? 'checked' : false"
                    type="checkbox" 
                    @click="switchLayerVisibility( layer.label )"
                    >
                  <label 
                    :for="layer.label">
                    {{ layer.label }}
                  </label>
                </div>
              </div>
            </div>

            <!-- SCALE LEGEND -->
            <div 
              v-if="findCurrentChorosource"
              class="legend" 
              >

              <button 
                :class="`button is-small is-fullwidth is-primary-b is-outlined`"
                @click="switchLegendDrawer()"
                >
                {{ findCurrentChorosource.legend.title }}
              </button>

              <!-- <code><pre>{{ findCurrentChorosource.legend }}</pre></code> -->
              <!-- <p> {{ findCurrentChorosource.source_id }} </p> -->
              <!-- getZoom : {{ getZoom }} -->
              <!-- findCurrentChorosource.max_zoom : {{ findCurrentChorosource.max_zoom }} -->

              <div 
                v-show="drawerScalesOpen"
                class="legend-content"
                >
                <div 
                  v-for="(scale, index) in findCurrentChorosource.legend.scales"
                  :key="index">
                  <div>
                    <span 
                    :style='`background-color: ${ scale.color }`'></span>
                    {{ scale.value }}
                    </div>
                </div>
              </div>

            </div>
          </div>
          
          <!-- MAP WITH MAPBOX GL -->
          <no-ssr>

            <MglMap
              :access-token="'noToken'"
              :mapStyle.sync="mapStyle"
              :center="center"
              :zoom="zoom"
              :maxZoom="maxZoom"
              :minZoom="minZoom"
              @load="onMapLoaded"
              ref='mapboxDiv'
              >

              <!-- MARKER -->
              <MglMarker v-if="showCard && displayedProject"
                :coordinates="getItemCoordinates()"
                :offset="item_marker_offset"
                :anchor="item_marker_anchor"
                >

                <span slot="marker"
                  :class="`icon is-large has-text-${item_marker_color} has-text-${item_marker_color}-c`" 
                  >
                  <i :class="`fa-3x ${item_marker}`"></i>
                </span>

              </MglMarker>

              <!-- CONTROLS -->
              <MglNavigationControl position="bottom-right" />

            </MglMap>
            
            <!-- <div>  -->
              <!-- zoom : <code>{{ zoom }}</code><br> -->
              <!-- projects : <code>{{ projects }}</code><br> -->
              <!-- displayedProject : <code>{{ displayedProject }}</code><br> -->
              <!-- itemsForMap : <code>{{ itemsForMap}}</code><br> -->
            <!-- </div>  -->

            <!-- <div id="mapboxDiv">
            </div> -->

          </no-ssr>

          <!-- <code><pre>{{ findCurrentChorosource }}</pre></code> -->

          <!-- DEBUGGING -->
          <!-- <div class="column is-half"> -->
          <!-- <div class="container"> -->
            <!-- <br><br><br> -->
              <!-- getCenter => ( lng : {{ getCenter.lng }}, lat : {{ getCenter.lat }} ) <br> -->
              <!-- getZoom => {{ getZoom }} <br> -->
              <!-- 
              getViewBox => {{ getViewBbox }}<br>
              getBbox => _ne : (lng : {{ getBbox._ne.lng }}, lat : {{ getBbox._ne.lat }}) / _sw : (lng : {{ getBbox._sw.lng }}, lat : {{ getBbox._sw.lat }}) <br>
              updatingChoroLayers => <code>{{ updatingChoroLayers }}</code><br>
              getCorrespondingChoroConfigs => <code><pre>{{ getCorrespondingChoroConfigs.map( c => { return { source_id : c.source_id , update_src_options : c.update_src_options } }) }}</pre></code><br> 
              -->
              <!-- chroplethGeoJSONS : <code><pre>{{ chroplethGeoJSONS.map( i => { return { source_id : i.source_id, is_loaded : i.is_loaded, feat0props : i.data && i.data.features.map( n => { return n.properties }) } } ) }}</pre></code> -->
              <!-- getCorrespondingChoroConfig.layer_id => {{ getCorrespondingChoroConfig.layer_id }}<br> -->
              <!-- getCorrespondingChoroConfig => <code><pre>{{ getCorrespondingChoroConfig }}</pre></code><br> -->
              <!-- getRenderedChoroFeatures("chorolayer-departements") => {{ getRenderedChoroFeatures("chorolayer-departements").length }}<br> -->
              <!-- getRenderedChoroFeatures => <code>{{ getRenderedChoroFeatures.length && getRenderedChoroFeatures.map( i => { return { layer : i && i.layer.id, prop : i && i.properties } } ) }}</code><br> -->
            <!-- </div> -->
          <!-- </div> -->

        </div>

      <!-- </div> -->

    <!-- </div>

  </div>

</div> -->

  

</template>



<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import axios from 'axios'
import Vue from 'vue'

import ProjectCard from './ProjectCard.vue'
import SearchResultsCountAndTabs from './SearchResultsCountAndTabs.vue'

import PopupContent from './MapboxPopupContent.vue'
const PopupClass = Vue.extend(PopupContent)

// import PopupContentCard from './MapboxPopupContentCard.vue'
// const PopupCardClass = Vue.extend(PopupContentCard)

import { VIEW_MAP, GeoCenters } from '../../config/constants.js'

import Mapbox from "mapbox-gl"
import { MglMap, MglMarker, MglPopup } from "vue-mapbox"
import mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'

// TO DO => COMMENT getItemById and replace by an action
// import { getItemById } from '~/plugins/utils.js';

import { StylesOSM } from '../../config/mapboxVectorStyles.js'
import { BasicDictionnary } from "../../config/basicDict.js" 

import {  
  getStyleJSON, 
  createGeoJSONSource, 
  createClusterCirclesLayer, 
  createClusterCountLayer, 
  createClusterUnclusteredLayer,
  createAllPoints,
  createHeatmapLayer,
  createChoroplethLayer
} from '~/plugins/mapbox.js';

import { 
  geoJsonBasesUrls,
  createGeoJsonDataPoints,
  updateGeoJsonProperties
} from '~/plugins/geoJson.js';

import {
  getJson,
} from '~/plugins/utils.js'

export default {

  name: "SearchResultsMapbox",

  components: {
    ProjectCard,
    SearchResultsCountAndTabs,
  },

  props: [
    'routeConfig', 
    'endPointConfig'
  ],

  data() {
    return {

      basicDict : BasicDictionnary, 

      // MAPBOX MAP OBJECT
      map : undefined, 
      isClusterSet : false,
      markersTreshold : 50,
      geoJson : undefined,
      geoJsonSource : undefined,
      // geoJsonlayer : undefined,
      isClusterMode : true,
      isAllPointsMode : true,
      isHeatmap : false,

      chroplethGeoJSONS : [],
      updatingChoroLayers : {},
      currentCenterFeature : undefined,

      // MARKERS
      item_geo_fields: { latitude : "lat", longitude: "lon"},
      item_marker: "fas fa-map-marker-alt",
      item_marker_color: "primary",
      item_marker_offset: [0, 0],
      item_marker_anchor: undefined,

      popup : undefined,
      // legendContent : undefined,
      // hoveredPolygon : undefined,
      drawerLayersOpen : false,
      drawerScalesOpen : false,

      // LOCAL DATA
      VIEW_MAP,
      fieldLat : undefined,
      fieldLong : undefined,
      iconSizeNormal : [29, 29],
      iconSizeHighlighted : [49, 49],

      // FIELDS MAPPER
      contentFields : undefined,

      // ITEMS
      // highlightedItem: undefined,
      itemLoaded: false,
      itemLoading: false,
      showCard: false,
      showLoader: false,

      markerCoordinates: [2.2137, 46.2276], // { lat : 46.2276, lon : 2.2137 } ,
      
      // UX
      hoveredStateId: {},
      selectedStateId: {},

      // MAPBOX SETUP
      preferCanvas: true,
      currentZoom: 6,

      zoom: undefined, //GeoCenters.FRANCE.zoom,
      maxZoom: undefined, //GeoCenters.FRANCE.maxZoom,
      minZoom: undefined, //GeoCenters.FRANCE.minZoom,

      center: undefined, //GeoCenters.FRANCE.center,
      currentCenter: undefined, //GeoCenters.FRANCE.center,

      // url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contibutors',

      // cf : https://openmaptiles.org/docs/website/mapbox-gl-js/
      // mapStyle : undefined,
      // mapStyle: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      // mapStyle: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',



      //// WORKING MAPS /////////////////////////////////////////

      mapStyle : StylesOSM.testRasterVoyager, // OK better - default
      // mapStyle : StylesOSM.testRasterPositron, // OK better
      // mapStyle : StylesOSM.testRasterOSM,
      // mapStyle : StylesOSM.testRasterOSM_bis,
      // mapStyle : StylesOSM.testRasterOSM_topo,
      // mapStyle: StylesOSM.testGeoportail,
      // mapStyle: StylesOSM.testGeo,
      // mapStyle: StylesOSM.arcGis,

      ////////////////////////////////////////////////////////////




      // mapStyle : StylesOSM.testVectorStyle,
      // mapStyle : StylesOSM.ShittyPlanet, // shitty 

      // mapStyle : 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      // mapStyle : StylesOSM.Positron,
      // mapStyle : StylesOSM.FjordColors,
      
    };
  },

  beforeMount: function () {

    this.log && console.log("\n- + - SearchResultsMapbox - + - + - + - + - + - + ")
    this.log && console.log("C-SearchResultsMapbox / beforeMount ... ")
    // this.log && console.log("C-SearchResultsMapbox / routeConfig : \n", this.routeConfig)
    // this.log && console.log("C-SearchResultsMapbox / endPointConfig : \n", this.endPointConfig)

    // set up fields mapper
    this.contentFields = this.routeConfig.contents_fields
    this.log && console.log("C-SearchResultsMapbox / contentFields : \n", this.contentFields)

    // set up MAPBOX options
    // this.log && console.log("C-SearchResultsMapbox / mapOptions : \n", mapOptions)

    const mapOptionsRoute = this.routeConfig.map_options
    this.log && console.log("C-SearchResultsMapbox / mapOptionsRoute : \n", mapOptionsRoute)

    this.fieldLat    = this.routeConfig.lat_long_fields.latitude
    this.fieldLong   = this.routeConfig.lat_long_fields.longitude
    
    this.item_geo_fields    = mapOptionsRoute.item_geo_fields ? mapOptionsRoute.item_geo_fields : { latitude : "lat", longitude: "lon"}
    this.item_marker        = mapOptionsRoute.item_marker ? mapOptionsRoute.item_marker : "fas fa-map-marker-alt"
    this.item_marker_color  = mapOptionsRoute.item_marker_color ? mapOptionsRoute.item_marker_color : "primary"
    this.item_marker_offset = mapOptionsRoute.item_marker_offset ? mapOptionsRoute.item_marker_offset : [ 0, 0 ]
    this.item_marker_anchor = mapOptionsRoute.item_marker_anchor ? mapOptionsRoute.item_marker_anchor : "bottom"

    this.zoom        = mapOptionsRoute.zoom
    this.maxZoom     = mapOptionsRoute.maxZoom
    this.minZoom     = mapOptionsRoute.minZoom
    this.currentZoom = mapOptionsRoute.currentZoom

    this.center      = [ mapOptionsRoute.center[1], mapOptionsRoute.center[0] ]
    // this.center = [0,0]

    this.currentCenter = mapOptionsRoute.currentCenter

    this.layersVisibility = mapOptionsRoute.layers_visibility
    this.drawerLayersOpen = this.layersVisibility && this.layersVisibility.is_drawer_open

    this.mapStyle = mapOptionsRoute.mapStyle ? StylesOSM[mapOptionsRoute.mapStyle] : this.mapStyle // StylesOSM.testRasterVoyager // OK better

  },

  created(){
    this.log && console.log("\nC-SearchResultsMapbox / created... ")
    // We need to set mapbox-gl library here in order to use it in template
    // this.mapbox = Mapbox;
  },

  mounted(){

    this.log && console.log("\nC-SearchResultsMapbox / mounted... ")

    const OSMBright       = 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json'
    const Positron        = 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json'
    const DarkMatter      = 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json'
    const KlokantechBasic = 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json'
    const DarkMatterBis   = 'https://free.tilehosting.com/styles/darkmatter/style.json'

    // !!! ERROR CORS FETCHING DISTANT STYLES !!!    
    const styleUrl = Positron
    this.log && console.log("C-SearchResultsMapbox / mounted / trying to get styleUrl : ", styleUrl)
    // getStyleJSON(styleUrl)

    // this.createMapbox(styleUrl)

  },

  watch:{

    map(next, prev){

      this.log && console.log('\nC-SearchResultsMapbox / watch - map ...')
      // this.log && console.log('C-SearchResultsMapbox / watch - map / prev : ', prev)
      // this.log && console.log('C-SearchResultsMapbox / watch - map / next : ', next)
      // this.log && console.log('C-SearchResultsMapbox / watch - map / this.isClusterSet : ', this.isClusterSet)
      // this.log && console.log('C-SearchResultsMapbox / watch - map / this.itemsForMap : ', this.itemsForMap)

      if (next && !prev) {

        this.log && console.log('C-SearchResultsMapbox / watch - map is created ')

        if ( !this.isClusterSet && this.itemsForMap ) {
          this.log && console.log('C-SearchResultsMapbox / watch - map - createGeoJsonDataPoints ( from geoJson.js ) ...')
          this.geoJson = createGeoJsonDataPoints(this.itemsForMap, this.fieldLat, this.fieldLong)
          // this.log && console.log('C-SearchResultsMapbox / watch - map - this.geoJson : ', this.geoJson)
          this.createMapItems(this.geoJson)
        } 
        
        else if ( !this.clusterSet && !this.itemsForMap ) {
          this.log && console.log('C-SearchResultsMapbox / watch - map - this.itemsForMap empty ... just wait for projects to change')
        }

      }

    },

    projects(next, prev){

      this.log && console.log('\nC-SearchResultsMapbox / watch - projects ...')
      // this.log && console.log('C-SearchResultsMapbox / watch - projects / prev : ', prev)
      // this.log && console.log('C-SearchResultsMapbox / watch - projects / next : ', next)
      // this.log && console.log('C-SearchResultsMapbox / watch - projects / this.map : ', this.map)
      // this.log && console.log('C-SearchResultsMapbox / watch - projects / this.isClusterSet : ', this.isClusterSet)
      // this.log && console.log('C-SearchResultsMapbox / watch - projects / this.itemsForMap : ', this.itemsForMap)

      const int = setInterval(() => {
        if(window.pageYOffset < 50){
          clearInterval(int)
        }
        else{
          window.scrollTo(0, 0)
        }
      }, 100)

      if ( this.map && !this.isClusterSet && this.itemsForMap ) {
        this.log && console.log('\nC-SearchResultsMapbox / watch - projects - createGeoJsonDataPoints ( from geoJson.js ) ...')
        this.geoJson = createGeoJsonDataPoints(this.itemsForMap, this.fieldLat, this.fieldLong)
        // this.log && console.log('C-SearchResultsMapbox / watch - projects - this.geoJson : ', this.geoJson)
        this.createMapItems(this.geoJson)
      } 

      if ( this.map && this.isClusterSet ) {
        this.log && console.log('\nC-SearchResultsMapbox / watch - projects - updateSourceData ...')
        this.updateSourceData(this.itemsForMap)
      } 

      else {
        this.log && console.log('\nC-SearchResultsMapbox / watch - projects - else (no map yet) ...')
      }

    },

    getCenter(next, prev){

      // this.log && console.log('\nC-SearchResultsMapbox / watch - getCenter ...')
      let stringNextCenter = JSON.stringify( next )
      let stringPrevCenter = JSON.stringify( prev )

      if ( stringNextCenter !== stringPrevCenter ){
        let choroConfigs = this.getCorrespondingChoroConfigs
        if ( choroConfigs.length > 1 ){

          let layersToCheck = choroConfigs.filter( c => c.update_src_from_previous_source )

          layersToCheck.forEach( sourceConfig => {
            this.updateChoroSourceByZoom( sourceConfig )
          })

        }
      }
    },

    getCorrespondingChoroConfigs(next, prev){

      let nextSourceIds = next.map( c => { return c.source_id })
      let stringNextSourceIds = JSON.stringify( nextSourceIds.sort() )

      let prevSourceIds = prev.map( c => { return c.source_id })
      let stringPrevSourceIds = JSON.stringify( prevSourceIds.sort() )
      
      // check if list of sources rendered has changed
      if ( stringNextSourceIds !== stringPrevSourceIds ){
        this.log && console.log('\nC-SearchResultsMapbox / watch - getCorrespondingChoroConfigs / next : ', next)
        this.log && console.log('\nC-SearchResultsMapbox / watch - getCorrespondingChoroConfigs / nextSourceIds : ', nextSourceIds)
        // this.log && console.log('C-SearchResultsMapbox / watch - getCorrespondingChoroConfigs / prevSourceIds : ', prevSourceIds)

        // list layers needing 
        let layersToCheck = next.filter( c => c.update_src_from_previous_source )

        if ( layersToCheck.length > 0 && nextSourceIds.length > 1 ){
          this.log && console.log('C-SearchResultsMapbox / watch - getCorrespondingChoroConfigs / layersToCheck : ', layersToCheck)
          layersToCheck.forEach( sourceConfig => {
            this.updateChoroSourceByZoom( sourceConfig )
          })
        }


      }

    }

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
    }),

    ...mapGetters({
      datasetURI : 'search/getSearchDatasetURI',
      projects : 'search/getResults',
      displayedProject : 'search/getDisplayedProject',
      isPending : 'search/getPending',
      // map : 'search/getMap',
    }),

    itemsForMap(){
      
      this.log && console.log('\nC-SearchResultsMapbox / itemsForMap ...')

      if (this.projects){
        this.log && console.log('C-SearchResultsMapbox / itemsForMap / this.projects ... not empty ...')
        this.log && console.log('C-SearchResultsMapbox / itemsForMap / this.projects : ', this.projects)

        let geoItems = this.projects.filter(item => this.checkIfItemHasLatLng(item) )
        // this.log && console.log('C-SearchResultsMapbox / itemsForMap / geoItems ... : ', geoItems )
        return geoItems

      } else {
        // nothing in projects => empty everything
        return undefined
      }

    },
    
    findCurrentChorosource(){
      // this.log && console.log("\nC-SearchResultsMapbox / findCurrentChorosource ...")
      // this.log && console.log("C-SearchResultsMapbox / findCurrentChorosource / this.chroplethGeoJSONS : ", this.chroplethGeoJSONS )
      let currentChoro = this.chroplethGeoJSONS.find( c => c.min_zoom < this.getZoom && this.getZoom < c.max_zoom )
      // this.log && console.log("C-SearchResultsMapbox / findCurrentChorosource / currentChoro : ", currentChoro )
      if ( currentChoro !== undefined ){
        return currentChoro 
      }
    },

    getZoom(){
      return this.map && this.map.getZoom()
    },
    getCenter(){
      let center = this.map && this.map.getCenter()
      center = center ? center : { lat : null, lng : null }
      return center
    },
    getBbox(){
      let bbox = this.map && this.map.getBounds()
      let emptyBox = { 
        _ne : { lat : null, lng : null },
        _sw : { lat : null, lng : null }
      }
      bbox = bbox ? bbox : emptyBox
      // this.log && console.log('C-SearchResultsMapbox / getBbox / bbox : ', bbox)
      return bbox
    },
    getViewBbox(){

      let mapbox = this.map

      var canvas = mapbox && mapbox.getCanvasContainer()
      // this.log && console.log('C-SearchResultsMapbox / getViewBbox / canvas : ', canvas)

      var rect = canvas && canvas.getBoundingClientRect()
      // this.log && console.log('C-SearchResultsMapbox / getViewBbox / rect : ', rect)
      // let currentRectSW = canvas && new mapboxgl.Point( canvas.clientRight, canvas.clientBottom )
      // let currentRectNE = canvas && new mapboxgl.Point( canvas.clientLeft, canvas.clientTop )
      let currentRectSW = canvas && new mapboxgl.Point( rect.right, rect.bottom )
      let currentRectNE = canvas && new mapboxgl.Point( rect.left, rect.right )
      let currrentViewBbox = [ currentRectSW, currentRectNE ]
      // this.log && console.log('C-SearchResultsMapbox / getViewBbox / currrentViewBbox : ', currrentViewBbox)

      return currrentViewBbox
    },

    getCorrespondingChoroConfigs(){

      let currentZoom = this.getZoom
      const mapboxOptions = this.routeConfig.map_options.mapbox_layers
      const mapboxChoroConfigs = mapboxOptions &&  mapboxOptions.choropleth_layer &&  mapboxOptions.choropleth_layer.sources
      // this.log && console.log('C-SearchResultsMapbox / getCorrespondingChoroConfigs / mapboxChoroConfigs : ', mapboxChoroConfigs)

      const emptyChoroConfigs = [
        {
          source_id : null ,
          layer_id  : null ,
          source_url : null, 
          max_zoom : null,
          min_zoom : null,
        }
      ]
      let choroConfigs = mapboxChoroConfigs && mapboxChoroConfigs.filter( conf => 
        { 
          let isZoomRrange = conf.max_zoom > currentZoom && conf.min_zoom < currentZoom 
          let isActivated = conf.is_activated
          return isZoomRrange && isActivated
        }
      )
      return choroConfigs && choroConfigs.length > 0 ? choroConfigs : emptyChoroConfigs
    },
    getCorrespondingChoroToUpdate(){
      let currentZoom = this.getZoom
      // const mapboxOptions = this.routeConfig.map_options.mapbox_layers
      // const mapboxChoroConfigs = mapboxOptions &&  mapboxOptions.choropleth_layer &&  mapboxOptions.choropleth_layer.sources
      // // this.log && console.log('C-SearchResultsMapbox / getCorrespondingChoroConfig / mapboxChoroConfigs : ', mapboxChoroConfigs)

      const emptyChoroConfig = {
        source_id : null ,
        layer_id  : null ,
        source_url : null, 
        max_zoom : null,
        min_zoom : null,
      }
      let choroConfigs = this.getCorrespondingChoroConfigs
      let choroSourceIds = choroConfigs.map( c => {
        return c.source_id
      })
      let choroConfig = choroConfigs.length && choroConfigs.filter( conf => {
        return c.update_src_from_previous_source && choroSourceIds.includes(conf.source_id)
      })
      return choroConfig ? choroConfig : emptyChoroConfig
    },

  },

  beforeDestroy() {
    this.log && console.log('\nC-SearchResultsMapbox / beforeDestroy ...')
  },

  methods: {

    // - - - - - - - - - - - - - - - - - - //
    // INITIALIZATION
    // - - - - - - - - - - - - - - - - - - //
    onMapLoaded(event) {
      this.log && console.log("\nC-SearchResultsMapbox / onMapLoaded ... ")
      // this.log && console.log("C-SearchResultsMapbox / mounted / this.$refs.mapboxDiv : ", this.$refs.mapboxDiv)
      
      // store in component
      this.map = event.map

      // in store => WARNING : object too complex to be stored/mutated in vuex so far
      // check : https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
      // this.$store.dispatch('search/setMap',{map: event.map}) // trigger action 
      // this.$store.commit('search/setMap', {map : event.map}) // trigger mutation directly
    },

    // - - - - - - - - - - - - - - - - - - //
    // JOINER ITEM-POLYGONS
    // - - - - - - - - - - - - - - - - - - //
    joinProjectsToPolygon( source, dataLoaded, choroRefIdex, noDataProxy=false ){

      // modify / agregate data
      let mapbox = this.map
      let items = this.projects
      this.showLoader = true 

      let dataFeatures = dataLoaded.features
      dataFeatures.forEach( i => {
        const result = items.reduce( (sum, item) => 
          ( String(item[ source.join_polygon_id_to_field ]) === String(i.properties[ source.polygon_prop_id])  ? sum + 1 : sum ), 0
        )
        i.properties[ source.agregated_data_field ] = result
      })
      dataLoaded.features = dataFeatures

      mapbox.getSource( source.source_id ).setData(dataLoaded)

      this.chroplethGeoJSONS[ choroRefIdex ]['is_loaded'] = true
      if ( !noDataProxy ){
        this.chroplethGeoJSONS[ choroRefIdex ]['data'] = dataLoaded
      }
      this.showLoader = false 

    },

    // - - - - - - - - - - - - - - - - - - //
    // MAP ITEMS AS GEOJSON
    // - - - - - - - - - - - - - - - - - - //
    createMapItems(geoJson){

      this.log && console.log("\nC-SearchResultsMapbox / createMapItems ...")

      let mapboxOptions = this.routeConfig.map_options.mapbox_layers

      // adding reactive source
      // this.log && console.log("C-SearchResultsMapbox / createMapItems / geoJson :", geoJson)
      // this.log && console.log("C-SearchResultsMapbox / createMapItems / this.map :", this.map)
      this.createAddGeoJsonSource(geoJson)
      this.createChoroplethSource(false)

      let allPointsSourceId = mapboxOptions.all_points_layer && mapboxOptions.all_points_layer.source_id ? mapboxOptions.all_points_layer.source_id : "allPointsSource"
      let geoJsonSourceId   = mapboxOptions.cluster_circles_layer && mapboxOptions.cluster_circles_layer.source_id ? mapboxOptions.cluster_circles_layer.source_id : "clusterSource"
      // cf : https://www.jerriepelser.com/books/airport-explorer/mapping/clustering/
      this.createAddGeoJsonLayers( { 
        allPointsId : allPointsSourceId, // 'allPointsSource', 
        clusterId   : geoJsonSourceId, // 'clusterSource', 
      } )
      this.isClusterSet = true
      // this.log && console.log("C-SearchResultsMapbox / createMapItems / this.map :", this.map)

    },

    // - - - - - - - - - - - - - - - - - - //
    // SOURCES 
    // - - - - - - - - - - - - - - - - - - //
    updateSourceData(itemsForMap){
      
      this.log && console.log("\nC-SearchResultsMapbox / updateSourceData ...")
      // this.log && console.log("C-SearchResultsMapbox / updateSourceData / this.map :", this.map)
      // this.log && console.log("C-SearchResultsMapbox / updateSourceData / itemsForMap :", itemsForMap)
      
      if (itemsForMap){

        let mapboxOptions = this.routeConfig.map_options.mapbox_layers
        let mapboxMap = this.map 

        let allPointsSourceId = mapboxOptions.all_points_layer && mapboxOptions.all_points_layer.source_id ? mapboxOptions.all_points_layer.source_id : "allPointsSource"
        
        let geoJsonSourceId   = mapboxOptions.cluster_circles_layer && mapboxOptions.cluster_circles_layer.source_id ? mapboxOptions.cluster_circles_layer.source_id : "clusterSource"

        this.log && console.log("\nC-SearchResultsMapbox / updateSourceData / createGeoJsonDataPoints ( from geoJson.js ) ...")
        let geoJson = createGeoJsonDataPoints(itemsForMap, this.fieldLat, this.fieldLong)
        this.log && console.log("C-SearchResultsMapbox / updateSourceData / geoJson : ", geoJson)

        this.log && console.log("C-SearchResultsMapbox / updateSourceData / allPointsSourceId : ", allPointsSourceId)
        this.map.getSource( allPointsSourceId ).setData(geoJson)

        this.log && console.log("C-SearchResultsMapbox / updateSourceData / geoJsonSourceId : ", geoJsonSourceId)
        this.map.getSource( geoJsonSourceId ).setData(geoJson)

        // this.map.getSource('allPointsSource').setData(geoJson)
        // this.map.getSource('clusterSource').setData(geoJson)

        // TO DO : update choropleth
        // const choroplethConfigOptions = mapboxOptions.choropleth_layer 
        // for ( let source of choroplethConfigOptions.sources ) {
        //  this.map.getSource( source.source_id ).setData( geoJson )
        // }
        this.createChoroplethSource( true )

      }
    },
    createAddGeoJsonSource(geoJson){

      this.log && console.log("\nC-SearchResultsMapbox / createAddGeoJsonSource / geoJson :", geoJson)

      let mapbox = this.map
      const mapboxOptions = this.routeConfig.map_options.mapbox_layers

      this.showLoader = true 
      // - - - - - - - - - - - - - - - - //
      // SOURCE - ALL POINTS
      if ( mapboxOptions.all_points_layer && mapboxOptions.all_points_layer.is_activated ){
        const allPointsConfigOptions = mapboxOptions.all_points_layer
        let allPointsSourceId = allPointsConfigOptions.source_id ? allPointsConfigOptions.source_id : "allPointsSource"
        let allPointsSource = createGeoJSONSource(geoJson, { 
          isCluster: false, 
          clusterMaxZoom: 14, 
          clusterRadius: 75 
        })
        mapbox.addSource( allPointsSourceId, allPointsSource)

        // FOR LIVE DATA
        // if ( allPointsConfigOptions.is_live_data ){
          // window.setInterval(function() {
          //   mapbox
          //   .getSource( allPointsSourceId )
          //   .setData( // TO DO // ) ;
          // // }, allPointsConfigOptions.refresh_delay)
        // }

      }
      
      // - - - - - - - - - - - - - - - - //
      // SOURCE - ALL POINTS CLUSTERS
      if ( mapboxOptions.cluster_circles_layer && mapboxOptions.cluster_circles_layer.is_activated ){
        const clusterLayerConfigOptions = mapboxOptions.cluster_circles_layer
        let geoJsonSourceId = clusterLayerConfigOptions.source_id ? clusterLayerConfigOptions.source_id : "clusterSource"
        let geoJsonSource   = createGeoJSONSource(geoJson, { 
          isCluster: true, 
          clusterMaxZoom: 14, 
          clusterRadius : 75 
        })
        mapbox.addSource( geoJsonSourceId, geoJsonSource)
      }

      this.showLoader = false 


    },
    createChoroplethSource( isUpdate=false ){

      this.log && console.log("\nC-SearchResultsMapbox / createChoroplethSource / isUpdate : ", isUpdate)

      let mapbox = this.map
      const mapboxOptions = this.routeConfig.map_options.mapbox_layers

      // - - - - - - - - - - - - - - - - //
      // SOURCE - CHOROPLETH //
      if ( mapboxOptions.choropleth_layer && mapboxOptions.choropleth_layer.is_activated ){
        
        this.showLoader = true 
  
        // cf : https://github.com/gregoiredavid/france-geojson
        // cf : https://geojson-maps.ash.ms/
        // cf : https://restcountries.eu/#api-endpoints-all
  
        // cf : https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/
        // cf : https://docs.mapbox.com/mapbox-gl-js/example/data-join/
      
        const choroplethConfigOptions = mapboxOptions.choropleth_layer 

        this.drawerScalesOpen = choroplethConfigOptions.is_drawer_open
        
        for ( let source of choroplethConfigOptions.sources ) {
                  
          if ( source.is_activated ){
            
            // create dummy empty source
            this.log && console.log("\nC-SearchResultsMapbox / createChoroplethSource / source.source_id : ", source.source_id )
            
            this.chroplethGeoJSONS.push({
              source_id : source.source_id,
              legend : source.legend,
              max_zoom : source.max_zoom,
              min_zoom : source.min_zoom,
              is_loaded : false,
              data : undefined
            })

            let dummyGeoJson = {
              "type":"FeatureCollection",
              "features": [
                // { "type":"Feature",
                //   "geometry": { 
                //     "type":"Polygon",
                //     "coordinates": [ [ [4.780213475718984,46.176677022719375],[4.7945808953124605,46.21831635025701],[4.807756868341096,46.23696871115128] ] ] },
                //   "properties": {"code":"01","nom":"Ain"}
                // }
              ]
            }

            if ( source.need_aggregation && !isUpdate ){

              // creation as dummy empty source
              this.log && console.log("C-SearchResultsMapbox / createChoroplethSource / source.need_aggregation && !isUpdate " )
              mapbox.addSource( source.source_id, 
                {
                  type: 'geojson',
                  data: dummyGeoJson
                }
              )
              this.showLoader = false 
            }

            if ( source.need_aggregation && !source.update_src_from_previous_source ) {
              // if ( source.need_aggregation && isUpdate ) {
              
              this.log && console.log("C-SearchResultsMapbox / createChoroplethSource / source.need_aggregation + isUpdate : ", isUpdate )

              let choroRefIdex= this.chroplethGeoJSONS.findIndex( c => c.source_id === source.source_id )

              if ( !isUpdate ){
                
                let choroSource = getJson(source.source_url)
                choroSource.then(( resp ) => {
                  
                  this.log && console.log("C-SearchResultsMapbox / createAddGeoJsonSource / resp.data :", resp.data)
    
                  let dataLoaded = resp.data
 
                  // modify / agregate data
                  this.joinProjectsToPolygon( source, dataLoaded, choroRefIdex ) 

                }) 
              }

              if ( isUpdate ){

                let isDataLoaded = this.chroplethGeoJSONS[ choroRefIdex ]['is_loaded']
                let dataLoaded = this.chroplethGeoJSONS[ choroRefIdex ]['data']

                if ( isDataLoaded ) {
                  
                  // modify / agregate data
                  this.joinProjectsToPolygon( source, dataLoaded, choroRefIdex ) 

                }
              }


            } 

            // if ( !source.need_aggregation || !isUpdate ) {
            if ( !source.need_aggregation && !isUpdate ) {
              this.log && console.log("C-SearchResultsMapbox / createChoroplethSource / !source.need_aggregation " )
              mapbox.addSource( source.source_id, 
                {
                  type: 'geojson',
                  data: source.source_url
                }
              )
              let choroRefIdex= this.chroplethGeoJSONS.findIndex( c => c.source_id === source.source_id )
              this.chroplethGeoJSONS[ choroRefIdex ]['is_loaded'] = true

              this.showLoader = false 
            }

          }

        }


      }
    },
    getRenderedChoroFeatures( layerId ){

      // this.log && console.log('\nC-SearchResultsMapbox / getRenderedFeatures... ')
      let mapbox = this.map
      // this.log && console.log('C-SearchResultsMapbox / getRenderedFeatures / mapbox : ', mapbox)
      
      let currrentViewCenter = this.getCenter
      // this.log && console.log('C-SearchResultsMapbox / getRenderedFeatures / currrentViewCenter : ', currrentViewCenter)
      
      let currrentViewBbox = this.getViewBbox
      // this.log && console.log('C-SearchResultsMapbox / getRenderedFeatures / currrentViewBbox : ', currrentViewBbox)
      
      let renderedFeatures
      try {
        // renderedFeatures = mapbox.queryRenderedFeatures( )
        renderedFeatures = mapbox.queryRenderedFeatures( currrentViewBbox , { layers : [ layerId ] } )
      } catch (err) {
        renderedFeatures = err
      }
      this.log && console.log('C-SearchResultsMapbox / getRenderedFeatures / renderedFeatures : ', renderedFeatures)
      return renderedFeatures 
    },
    updateChoroSourceByZoom( choroSourceConfig, featuresArray=undefined ){

      // called by watching "getCorrespondingChoroConfigs" computed value
      this.updatingChoroLayers[ choroSourceConfig.layer_id ] = { is_updating : true }

      this.log && console.log("\nC-SearchResultsMapbox / updateChoroSourceByZoom / choroSourceConfig : ", choroSourceConfig )
      let mapbox = this.map
      let center = this.getCenter

      let choroRefIdex= this.chroplethGeoJSONS.findIndex( c => c.source_id === choroSourceConfig.source_id )
      this.log && console.log("\nC-SearchResultsMapbox / updateChoroSourceByZoom / choroRefIdex : ", choroRefIdex )

      for (let update of choroSourceConfig.update_src_options ){

        let upperSourceId = update.upper_source_id
        let upperLayerId = update.upper_layer_id
        let slugs_map = update.slugs_map

        let upperRenderredFeatures 
        if ( !featuresArray ){
          upperRenderredFeatures = this.getRenderedChoroFeatures( upperLayerId )

          let renderredCenters = {
            type : "FeatureCollection",
            features : []
          }
          for (let f of upperRenderredFeatures ){
            let fCenter = turf.centerOfMass( f )
            fCenter.properties = f.properties
            renderredCenters.features.push( fCenter )
          }
          this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / renderredCenters : ", renderredCenters )

          if ( update.upper_load_feat === "only_center" ){

            let viewCenter = turf.point( [ center.lng, center.lat ] )
            this.log && console.log("\nC-SearchResultsMapbox / updateChoroSourceByZoom / viewCenter : ", viewCenter )

            var nearest = turf.nearestPoint(viewCenter, renderredCenters)
            this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / nearest : ", nearest )
            let nearestFeature = upperRenderredFeatures.find( f => f.properties[ update.upper_main_matching_prop] === nearest.properties[ update.upper_main_matching_prop] )
            upperRenderredFeatures = [ nearestFeature ]
            this.currentCenterFeature = nearestFeature
          }

        } else {
          upperRenderredFeatures = featuresArray
        }
        this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / upperRenderredFeatures : ", upperRenderredFeatures )

        // if ( update.upper_load_feat === "only_center" ){

        // }

        let promisesArray = []

        for (let feat of upperRenderredFeatures) {

          // this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / feat.properties : ", feat.properties )

          let url_base = update.url_base 
          for (let slug of slugs_map) {
            let prop_field = slug.value_property
            let value = feat.properties[ prop_field ]
            let slug_code = "<" + slug.value_slug_code + ">"
            url_base = url_base.replace( slug_code, value )
          }

          this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / url_base : ", url_base )
          let choroSource = getJson( url_base )
          promisesArray.push(choroSource)
          // choroSource.then(( resp ) => {
          //   this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / response came back for url_base : ", url_base)
          //   // this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / resp :", resp)
          //   let dataLoaded = resp.data
          //   mapbox.getSource( choroSourceConfig.source_id ).setData(dataLoaded)
          // })

        }

        Promise.all( promisesArray ).then( results => {
          this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / results : ", results)
          let dataLoaded = {
            type : "FeatureCollection",
            features : []
          }
          results.forEach( r => { 
            let data = r.data && r.data.features
            if ( data && data.length > 0 ){
              dataLoaded.features = dataLoaded.features.concat( data )
            }
          })
          this.log && console.log("C-SearchResultsMapbox / updateChoroSourceByZoom / dataLoaded : ", dataLoaded)

          if ( choroSourceConfig.need_aggregation ){
            this.joinProjectsToPolygon( choroSourceConfig, dataLoaded, choroRefIdex, true ) 
          }

          mapbox.getSource( choroSourceConfig.source_id ).setData(dataLoaded)
        })

      }

      this.updatingChoroLayers[ choroSourceConfig.layer_id ] = { is_updating : false }

    },

    // - - - - - - - - - - - - - - - - - - //
    // LAYERS
    // - - - - - - - - - - - - - - - - - - //
    createAddGeoJsonLayers(geoJsonSourceId) {

      this.log && console.log("\nC-SearchResultsMapbox / createGeoJsonLayer ... ")
      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / geoJsonSourceId : ", geoJsonSourceId)

      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / this.routeConfig : ", this.routeConfig)

      let mapboxOptions = this.routeConfig.map_options.mapbox_layers
      let mapboxMap = this.map 
      let mapZoom = this.getZoom
      let loc = this.locale

      const itemIdField = this.getBlockField('block_id') ? this.getBlockField('block_id') : "sd_id"

      let displayPoint = this.highlightItem
      let goToDetailPage = this.goToDetailPage

      let toggleSelectedOn = this.toggleSelectedOn
      let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      //  CHOROPLETH
      if ( mapboxOptions.choropleth_layer && mapboxOptions.choropleth_layer.is_activated ){
        let choroplethConfigOptions = mapboxOptions.choropleth_layer 
        for ( let source of choroplethConfigOptions.sources ) {
          if (source.is_activated ){
            this.createAddChoroplethLayers(source)
          }
        }
      }

      //  HEATMAP
      if ( mapboxOptions.heatmap_layer && mapboxOptions.heatmap_layer.is_activated ){
        let heatmapLayerConfigOptions = mapboxOptions.heatmap_layer 

        let heatmapSourceId = heatmapLayerConfigOptions.source_id ? heatmapLayerConfigOptions.source_id : geoJsonSourceId.allPointsId

        let heatmapLayerId = heatmapLayerConfigOptions.layer_id ? heatmapLayerConfigOptions.layer_id : "heatmap-layer"
        let heatmapLayerConfig = createHeatmapLayer(
          heatmapSourceId,
          heatmapLayerConfigOptions,
          heatmapLayerId
        )
        mapboxMap.addLayer(heatmapLayerConfig)
      }

      // ALL POINTS
      if ( mapboxOptions.all_points_layer && mapboxOptions.all_points_layer.is_activated ){
        let allPointsConfigOptions = mapboxOptions.all_points_layer
        let allPointsLayerId = allPointsConfigOptions.layer_id ? allPointsConfigOptions.layer_id : "all-points"

        let allPointsConfig = createAllPoints( 
          geoJsonSourceId.allPointsId, 
          allPointsConfigOptions,
          allPointsLayerId 
        )
        mapboxMap.addLayer(allPointsConfig)
        if ( allPointsConfigOptions.is_clickable ) {

          // CLICK
          mapboxMap.on('click', allPointsLayerId, function (e) {
            
            var featuresPoint = mapboxMap.queryRenderedFeatures(e.point, { layers: [ allPointsLayerId ] });
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / click - all-points - featuresPoint : ", featuresPoint)

            let item = featuresPoint[0]
            let itemSource = item.source
            let itemProps = item.properties

            // toggle as selected
            toggleSelectedOn(e, itemSource)

            var pointId = itemProps[ itemIdField ]
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / click - all-points - pointId : ", pointId)

            if (allPointsConfigOptions.direct_to_detail) {
              goToDetailPage(pointId)
            } else {
              var coordinates = e.features[0].geometry.coordinates.slice()
              // console.log("C-SearchResultsMapbox / createGeoJsonLayers / click - all-points - coordinates : ", coordinates)
  
              // fly to point
              let mapZoomAdd = allPointsConfigOptions.add_zoom_on_click ? allPointsConfigOptions.add_zoom_on_click : 2 
              mapboxMap.easeTo({
                center: coordinates,
                zoom : mapZoom + mapZoomAdd
              })
  
              itemProps.lat = coordinates[1]
              itemProps.lon = coordinates[0]
              displayPoint(itemProps)
            }

          })
          // HOVER ENTER
          mapboxMap.on('mouseenter', allPointsLayerId, function (e) {
            mapboxMap.getCanvas().style.cursor = 'pointer';

            // ADD POPUP ON MARKER IF ACTIVE
            // cf : https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
            if (allPointsConfigOptions.has_popup) {
              var featuresPolygon = mapboxMap.queryRenderedFeatures( e.point, { layers: [ allPointsLayerId ] })
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => featuresPolygon : ", featuresPolygon)

              const coordinates = e.features[0].geometry.coordinates.slice()
              const itemProps = featuresPolygon[0].properties
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => itemProps : ", itemProps)

              const pop = popup
                .setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
                .setHTML(`
                  <div id="vue-popup-marker">
                  </div>`
                )
                .addTo(mapboxMap)
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => pop : ", pop)

              const popInstance = new PopupClass({
                propsData: { 
                  feature: featuresPolygon[0],
                  properties: itemProps,
                  config : allPointsConfigOptions.popup_config,
                  locale : loc
                },
              })
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => popInstance : ", popInstance)
              popInstance.$mount('#vue-popup-marker')
              pop._update()

            }

          })
          // HOVER LEAVE
          mapboxMap.on('mouseleave', allPointsLayerId, function () {
            mapboxMap.getCanvas().style.cursor = ''
            if (allPointsConfigOptions.has_popup) {
              popup.remove()
            }
          })
        }

      }

      // CLUSTERING CIRCLES
      if ( mapboxOptions.cluster_circles_layer && mapboxOptions.cluster_circles_layer.is_activated ){
        let clusterLayerConfigOptions = mapboxOptions.cluster_circles_layer
        let clusterSourceId = clusterLayerConfigOptions.source_id ? clusterLayerConfigOptions.source_id : "clusterSource"
        let clusterLayerId = clusterLayerConfigOptions.layer_id ? clusterLayerConfigOptions.layer_id : "cluster-circles"
        let clusterLayerConfig = createClusterCirclesLayer( 
          geoJsonSourceId.clusterId, 
          clusterLayerConfigOptions,
          clusterLayerId
        )

        // let sourcesList = mapboxMap.getStyle().sources
        // this.log && console.log("\nC-SearchResultsMapbox / createGeoJsonLayer ... sourcesList : ", sourcesList)

        // let layersList = mapboxMap.getStyle().layers
        // this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer ... layersList : ", layersList)

        // this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / clusterLayerConfig : ", clusterLayerConfig)

        mapboxMap.addLayer(clusterLayerConfig)
        if ( clusterLayerConfigOptions.is_clickable ) {
          mapboxMap.on('click', clusterLayerId, function (e) {

            // var featuresSource = mapboxMap.getSource(geoJsonSourceId.clusterId)
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - clusters -  featuresSource : ", featuresSource)

            var featuresCluster = mapboxMap.queryRenderedFeatures(e.point, { layers: [ clusterLayerId ] });
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - clusters -  featuresCluster : ", featuresCluster)
            
            var clusterId = featuresCluster[0].properties.cluster_id;
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - clusters - clusterId : ", clusterId)
            
            mapboxMap.getSource(geoJsonSourceId.clusterId).getClusterExpansionZoom( clusterId, function (err, zoom) {
              if (err) {return}

              mapboxMap.easeTo({
                center: featuresCluster[0].geometry.coordinates,
                zoom: zoom
              })
            })

          })
          mapboxMap.on('mouseenter', clusterLayerId, function () {
            mapboxMap.getCanvas().style.cursor = 'pointer';
          })
          mapboxMap.on('mouseleave', clusterLayerId, function () {
            mapboxMap.getCanvas().style.cursor = '';
          })
        }
      }

      // CLUSTERING COUNTS
      if ( mapboxOptions.cluster_count_layer && mapboxOptions.cluster_count_layer.is_activated ){
        let countLayerConfigOptions = mapboxOptions.cluster_count_layer
        let countLayerId = countLayerConfigOptions.layer_id ? countLayerConfigOptions.layer_id : "cluster-counts"
        let countLayerConfig = createClusterCountLayer( 
          geoJsonSourceId.clusterId, 
          countLayerConfigOptions,
          countLayerId
        )
        mapboxMap.addLayer(countLayerConfig)
        if ( countLayerConfigOptions.is_clickable ) {
          mapboxMap.on('click', countLayerId, function (e) {

            var featuresCluster = mapboxMap.queryRenderedFeatures(e.point, { layers: [ countLayerId ] });
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - cluster-count -  featuresCluster : ", featuresCluster)
            
            var clusterId = featuresCluster[0].properties.cluster_id;
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - cluster-count - clusterId : ", clusterId)
            
            mapboxMap.getSource(geoJsonSourceId.clusterId).getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) {return}

              mapboxMap.easeTo({
                center: featuresCluster[0].geometry.coordinates,
                zoom: zoom
              })
            })

          })
          mapboxMap.on('mouseenter', countLayerId, function () {
            mapboxMap.getCanvas().style.cursor = 'pointer';
          })
          mapboxMap.on('mouseleave', countLayerId, function () {
            mapboxMap.getCanvas().style.cursor = '';
          })
        }

      }

      // UNCLUSTERING
      if ( mapboxOptions.cluster_unclustered_layer && mapboxOptions.cluster_unclustered_layer.is_activated ){
        let unclusteredLayerConfigOptions = mapboxOptions.cluster_unclustered_layer
        let unclusteredLayerId = unclusteredLayerConfigOptions.layer_id ? unclusteredLayerConfigOptions.layer_id : "unclustered-points"
        let unclusteredLayerConfig = createClusterUnclusteredLayer(
          geoJsonSourceId.clusterId, 
          unclusteredLayerConfigOptions,
          unclusteredLayerId
        )
        mapboxMap.addLayer(unclusteredLayerConfig)
        if ( unclusteredLayerConfigOptions.is_clickable ) {

          // CLICK
          mapboxMap.on('click', unclusteredLayerId, function (e) {

            var featuresPoint = mapboxMap.queryRenderedFeatures(e.point, { layers: [ unclusteredLayerId ] });
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - unclustered-point - featuresPoint : ", featuresPoint)

            let item = featuresPoint[0]
            let itemSource = item.source
            let itemProps = item.properties

            // toggle as selected
            toggleSelectedOn(e, itemSource)

            var pointId = itemProps[ itemIdField ]
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - unclustered-point - pointId : ", pointId)

            if (unclusteredLayerConfigOptions.direct_to_detail) {
              goToDetailPage(pointId)
            } else {

              var coordinates = e.features[0].geometry.coordinates.slice()
              // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - unclustered-point - coordinates : ", coordinates)

              // fly to point
              let mapZoomAdd = unclusteredLayerConfigOptions.add_zoom_on_click ? unclusteredLayerConfigOptions.add_zoom_on_click : 2 
              mapboxMap.easeTo({
                center: coordinates,
                zoom : mapZoom + mapZoomAdd
              })
              itemProps.lat = coordinates[1]
              itemProps.lon = coordinates[0]
              displayPoint(itemProps)
            }

          })
          mapboxMap.on('mouseenter', unclusteredLayerId, function (e) {
            mapboxMap.getCanvas().style.cursor = 'pointer'

            // ADD POPUP ON MARKER IF ACTIVE
            // cf : https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
            if (unclusteredLayerConfigOptions.has_popup) {
              var featuresPolygon = mapboxMap.queryRenderedFeatures( e.point, { layers: [ unclusteredLayerId ] })
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => featuresPolygon : ", featuresPolygon)

              const coordinates = e.features[0].geometry.coordinates.slice()
              const itemProps = featuresPolygon[0].properties
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => itemProps : ", itemProps)

              const pop = popup
                .setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
                .setHTML(`
                  <div id="vue-popup-marker">
                  </div>`
                )
                .addTo(mapboxMap)
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => pop : ", pop)

              const popInstance = new PopupClass({
                propsData: { 
                  feature: featuresPolygon[0],
                  properties: itemProps,
                  config : unclusteredLayerConfigOptions.popup_config,
                  locale : loc
                },
              })
              // console.log("C-SearchResultsMapbox / createAddGeoJsonLayers / hover => popInstance : ", popInstance)
              popInstance.$mount('#vue-popup-marker')
              pop._update()

            }

          })
          mapboxMap.on('mouseleave', unclusteredLayerId, function () {
            mapboxMap.getCanvas().style.cursor = ''
            if (unclusteredLayerConfigOptions.has_popup) {
              popup.remove()
            }
          })
        }
      }



    },
    createAddChoroplethLayers(source) {

      this.log && console.log("\nC-SearchResultsMapbox / createGeoJsonLayer ... ")
      this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / source : ", source)

      let mapboxOptions = this.routeConfig.map_options.mapbox_layers
      let mapboxMap = this.map 
      let loc = this.locale

      let choroplethSourceId = source.source_id 
      let choroplethLayerId = source.layer_id 

      let choroplethConfig = createChoroplethLayer( 
        choroplethSourceId, 
        source,
        choroplethLayerId 
      )
      mapboxMap.addLayer(choroplethConfig)

      if ( source.has_popup ){

        // cf : https://tech.beyondtracks.com/posts/mapbox-gl-popups-with-vue/ 
        // cf : https://github.com/phegman/vue-mapbox-gl
        // cf : https://github.com/phegman/vue-mapbox-gl/issues/22

        // Create a popup, but don't add it to the map yet.
        let popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })
        // this.popup = popup

        // mapboxMap.on( 'click', choroplethLayerId, function (e) {
        // })

        mapboxMap.on( source.popup_config.action , choroplethLayerId, function (e) {

          // mapboxMap.getCanvas().style.cursor = 'pointer';
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - e : ", e)

          var featuresPolygon = mapboxMap.queryRenderedFeatures( e.point, { layers: [ choroplethLayerId ] })
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - featuresPolygon : ", featuresPolygon)

          const coordinates = e.features[0].geometry.coordinates.slice()
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - coordinates : ", coordinates)

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          // }
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - coordinates : ", coordinates)

          const itemProps = featuresPolygon[0].properties
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - itemProps : ", itemProps)

          const pop = popup
            .setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
            // .setLngLat({ lng: coordinates[0], lat: coordinates[1] })
            .setHTML('<div id="vue-popup-content"></div>')
            .addTo(mapboxMap)
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - pop : ", pop)
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - source.popup_config : ", source.popup_config)

          const popInstance = new PopupClass({
            propsData: { 
              feature: featuresPolygon[0],
              properties: itemProps,
              config : source.popup_config,
              locale : loc
            },
          })
          popInstance.$mount('#vue-popup-content')
          // console.log("C-SearchResultsMapbox / createAddChoroplethLayers / clic - choroplethLayerId - popInstance : ", popInstance)

          pop._update()

        })

        mapboxMap.on('mouseleave', choroplethLayerId, function () {
          mapboxMap.getCanvas().style.cursor = '';
          popup.remove()
        })

      }

    },

    // - - - - - - - - - - - - - - - - - - //
    // HIGHLIGHTS FUNCTIONS
    // - - - - - - - - - - - - - - - - - - //
    toggleHighlightOn(event, source) {
      let mapbox = this.map
      const canvas = mapbox.getCanvas()
      canvas.style.cursor = "pointer"
      if (event.features.length > 0) {
        if (this.hoveredStateId[source]) {
          mapbox.setFeatureState(
            { source, id: this.hoveredStateId[source] },
            { hover: false }
          ) // clean all sources to prevent error
        }
        this.hoveredStateId[source] = event.features[0].id
        mapbox.setFeatureState(
          { source, id: this.hoveredStateId[source] },
          { hover: true }
        )
      }
    },
    toggleHighlightOff(event, source) {
      let mapbox = this.map
      const canvas = mapbox.getCanvas()
      canvas.style.cursor = ""
      if (this.hoveredStateId[source] !== null) {
        mapbox.setFeatureState(
          { source, id: this.hoveredStateId[source] },
          { hover: false }
        )
      }
    },
    toggleSelectedOn(event, source) {
      let mapbox = this.map
      if (event.features.length > 0) {
        console.log("C-SearchResultsMapbox / toggleSelectedOn / event.features : ", event.features)
        if (this.selectedStateId[source]) {
          mapbox.setFeatureState(
            { source, id: this.selectedStateId[source] },
            { selected: false }
          ) // clean all sources to prevent error
        }
        console.log("C-SearchResultsMapbox / toggleSelectedOn / event.features[0] : ", event.features[0])
        this.selectedStateId[source] = event.features[0].id
        mapbox.setFeatureState(
          { source, id: this.selectedStateId[source] },
          { selected: true }
        )
      }
    },
    toggleAllSelectedOff(event, source) {
      let mapbox = this.map
      if (this.hoveredStateId[source] !== null) {
        mapbox.setFeatureState(
          { source, id: this.hoveredStateId[source] },
          { selected: false }
        )
      }
    },

    // - - - - - - - - - - - - - - - - - - //
    // UX FUNCTIONS
    // - - - - - - - - - - - - - - - - - - //
    switchLayerVisibility( layerLabel ){
      let mapboxMap = this.map 

      let layerVisibilityConfig = this.layersVisibility.layers_switches.find( l => l.label === layerLabel ) 

      for (let layerId of layerVisibilityConfig.layers ){
        let visibility = mapboxMap.getLayoutProperty( layerId, 'visibility');
        if (visibility === 'visible') {
          mapboxMap.setLayoutProperty(layerId, 'visibility', 'none');
        } else {
          mapboxMap.setLayoutProperty(layerId, 'visibility', 'visible');
        }
      }
    },
    switchLayersDrawer(){
      this.drawerLayersOpen = !this.drawerLayersOpen
    },
    switchLegendDrawer(){
      this.drawerScalesOpen = !this.drawerScalesOpen
    },
    goToDetailPage(itemId) {
      const datasetURI = this.datasetURI
      const detailItemUrl = `/${datasetURI}/detail?id=${itemId}`
      this.$router.push(detailItemUrl)
    },

    // - - - - - - - - - - - - - - - - - - //
    // ITEM MATCHING
    // - - - - - - - - - - - - - - - - - - //
    getBlockField(fieldBlock) {
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      if (contentField) {
        return contentField.field
      }
      else {
        return undefined
      }
    },
    matchItemWithConfig(item, fieldBlock) {
      // this.log && console.log("C-SearchResultsMapbox / matchItemWithConfig / item : ", item)
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      // this.log && console.log("C-SearchResultsMapbox / matchItemWithConfig / contentField : ", contentField)
      if (contentField) {
        const field = contentField.field
        return item[field]
      }
      else {
        return undefined
      }
    },
    itemId(item) {
      // this.log && console.log("C-SearchResultsMapbox / itemId / item : ", item)
      return this.matchItemWithConfig(item, 'block_id')
    },
    highlightItem(item) {

      this.log && console.log("C-SearchResultsMapbox / highlightItem / item : ", item)
      // show loader 
      this.showCard = true
      // this.itemLoaded = false

      // recenter map
      // this.center = [item.lon, item.lat]
      // this.zoom = 10

      // get item ID
      const item_id = this.itemId(item)

      // get item data
      this.$store.dispatch('search/searchOne', item_id )
      
    },
    getItemCoordinates() {
      let item = this.displayedProject
      const item_geo_fields = this.item_geo_fields
      let coordinates = [ item[item_geo_fields.longitude], item[item_geo_fields.latitude ] ]
      return coordinates
    },

    // - - - - - - - - - - - - - - - - - - //
    // SIGNALS
    // - - - - - - - - - - - - - - - - - - //
    handleIconSignal(itemData){
      // this.log && console.log('C-SearchResultsMapbox / handleIconSignal / itemData : ', itemData)
      this.highlightItem(itemData)
    },
    getIconSize(item, highlightedItem){
      if (highlightedItem) {
        return this.itemId(item, 'block_id') === this.itemId(highlightedItem, 'block_id') ? this.iconSizeHighlighted : this.iconSizeNormal
      } else {
        return this.iconSizeNormal
      }
    },


    // - - - - - - - - - - - - - - - - - - //
    // UTILS
    // - - - - - - - - - - - - - - - - - - //
    checkIfStringFloat(value){
      let val = parseFloat(value)
      if(!isNaN(val)){
        return val
      } else {
        return false
      }
    },
    checkIfItemHasLatLng(item){
      return this.checkIfStringFloat(item.lat) && this.checkIfStringFloat(item.lon)
    },

  },


};
</script>

<style>
  
  /* cf : https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/ */

  .legend-block {
    position: absolute;
    z-index: 9;
    bottom: 30px;
  }

  .legend {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.10);
    /* font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif; */
    padding: 10px;
    /* right: 10px; */
  }
  
  .legend-bottom-left{
    left: 10px;
  }
  
  .legend-bottom-right{
    right: 50px;
  }

  .layer-switch{
    margin-bottom: 10px; 
  }

  .legend-content{
    margin-top: .7em; 
  }

  .legend h4 {
    margin: 0 0 10px;
  }
  
  .legend div span {
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    margin-right: 5px;
    width: 10px;
  }

  /* LOADERS */
  .floating {
    position: absolute;
    z-index:200;
    top: 50%;
    left: 50%;
  }

  /* from : https://loading.io/css/ */
  .lds-roller {
    display: inline-block;
    /* position: absolute;
    z-index:200;
    top: 50%;
    left: 50%; */
    /* margin-top: -40px; */
    margin-left: 30px;
    height: 80px;
    width: 100px;
    border-radius: 10px;
  }
  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 32px 32px;
  }
  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background:  #513085;
    margin: -3px 0 0 -3px;
  }
  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .lds-roller div:nth-child(1):after {
    top: 50px;
    left: 50px;
  }
  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .lds-roller div:nth-child(2):after {
    top: 54px;
    left: 45px;
  }
  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .lds-roller div:nth-child(3):after {
    top: 57px;
    left: 39px;
  }
  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .lds-roller div:nth-child(4):after {
    top: 58px;
    left: 32px;
  }
  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .lds-roller div:nth-child(5):after {
    top: 57px;
    left: 25px;
  }
  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .lds-roller div:nth-child(6):after {
    top: 54px;
    left: 19px;
  }
  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .lds-roller div:nth-child(7):after {
    top: 50px;
    left: 14px;
  }
  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .lds-roller div:nth-child(8):after {
    top: 45px;
    left: 10px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  .app-loader {
    margin: 1.5em;
    padding: 1.5em
  }
  .map { 
    height: calc(100vh - 120px); 
    width: 100%;
    position: relative;
  }




  .map .count-and-tabs-container{
    position: absolute;
    top: 1rem;
    width: 100%;
  }

  .map .count-and-tabs-container .result-count-parent,
  .map .count-and-tabs-container .buttons{
    z-index: 2;
  }

  .map .cis-marker-cluster{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: #a174ac;
    color: white;

    font-size: 16px;
    font-weight: bold;

    border-radius: 50%;
  }

  .highlighted-project{
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .highlighted-project button.close{
    margin: 0.5em 0;
    background-color: transparent;
    border: 0;

    align-self: flex-end;
  }

  .highlighted-project .card{
    font-size: 0.9em;
      
    box-shadow: none;
  }

  .highlighted-project .card .card-content{
    padding: 0.2em 0.5em;   
  }

  .highlighted-project .card .card-content:first-of-type{
    padding-top: 0.5em;
  }
  .highlighted-project .card .card-content:last-of-type{
    padding-bottom: 0.5em;
  }

  .highlighted-project .card .card-content h1{
    font-size: 1.1em;
    font-weight: bold;
  }

  /* TODO SASS : share this style with search result project card tag style */
  .highlighted-project .tag{
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0.2em 1em;
    background-color: #767676;
    color: white;
  }

</style>
