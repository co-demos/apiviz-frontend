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
  <div class="map">

    <!--  getZoom : {{ getZoom }} -->
    <!-- chroplethGeoJSONS : <code><pre>{{ chroplethGeoJSONS.map( i => { return { source_id : i.source_id, is_loaded : i.is_loaded, feat0props : i.data && i.data.features.map( n => { return n.properties }) } } ) }}</pre></code> -->


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
      v-show="!itemsForMap"
      class="lds-roller floating"
      >
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>


      <!-- TO DO / LEGEND AND LAYERS SWiTCH -->
      <!-- <div id='state-legend' class='legend legend-bottom-right'>
        <h4>Population</h4>
        <div><span style='background-color: #723122'></span>25,000,000</div>
        <div><span style='background-color: #8B4225'></span>10,000,000</div>
        <div><span style='background-color: #A25626'></span>7,500,000</div>
        <div><span style='background-color: #B86B25'></span>5,000,000</div>
        <div><span style='background-color: #CA8323'></span>2,500,000</div>
        <div><span style='background-color: #DA9C20'></span>1,000,000</div>
        <div><span style='background-color: #E6B71E'></span>750,000</div>
        <div><span style='background-color: #EED322'></span>500,000</div>
        <div><span style='background-color: #F2F12D'></span>0</div>
      </div> -->
      
      <!-- <div id='county-legend' class='legend' style='display: none;'>
        <h4>Population</h4>
        <div><span style='background-color: #723122'></span>1,000,000</div>
        <div><span style='background-color: #8B4225'></span>500,000</div>
        <div><span style='background-color: #A25626'></span>100,000</div>
        <div><span style='background-color: #B86B25'></span>50,000</div>
        <div><span style='background-color: #CA8323'></span>10,000</div>
        <div><span style='background-color: #DA9C20'></span>5,000</div>
        <div><span style='background-color: #E6B71E'></span>1,000</div>
        <div><span style='background-color: #EED322'></span>100</div>
        <div><span style='background-color: #F2F12D'></span>0</div>
      </div> -->


      <!-- <div id='state-legend' class='legend legend-bottom-left'>
        <h4>Population</h4>
        <div><span style='background-color: #723122'></span>25,000,000</div>
        <div><span style='background-color: #8B4225'></span>10,000,000</div>
        <div><span style='background-color: #A25626'></span>7,500,000</div>
        <div><span style='background-color: #B86B25'></span>5,000,000</div>
        <div><span style='background-color: #CA8323'></span>2,500,000</div>
        <div><span style='background-color: #DA9C20'></span>1,000,000</div>
        <div><span style='background-color: #E6B71E'></span>750,000</div>
        <div><span style='background-color: #EED322'></span>500,000</div>
        <div><span style='background-color: #F2F12D'></span>0</div>
      </div> -->


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

        <!-- MARKERS -->
        <template
          v-if="itemsForMap && itemsForMap.length < markersTreshold"
          >
          <div 
            v-for="(item, index) in itemsForMap"
            :key="index"
            >
            <!-- <MglMarker
              :coordinates="[item.lon, item.lat]"
              color='#90689a'
              @click="highlightItem(item)"
              > -->
              <!-- <MglPopup>
                <div>
                  sd_id : {{ item.sd_id }}
                </div>
              </MglPopup> -->

            <!-- </MglMarker> -->
          </div>
        </template>

        <!-- CLUSTER -->
        <!-- <template
          v-if="geoJsonSource && geoJsonlayer"
          > -->
          <!-- <MglGeojsonLayer
            :sourceId="geoJsonSource.id"
            :source="geoJsonSource"
            layerId="clusters-id"
            :layer="geoJsonlayer"
          /> -->
        <!-- </template> -->

        <!-- CONTROLS -->
        <!-- <MglGeolocateControl ref="geolocateControl"/> -->
        <MglNavigationControl position="bottom-right" />

      </MglMap>
      

      <div> 
        <!-- projects : <code>{{ projects }}</code><br> -->
        <!-- displayedProject : <code>{{ displayedProject }}</code><br> -->
        <!-- itemsForMap : <code>{{ itemsForMap}}</code><br> -->
      </div> 

      <!-- <div id="mapboxDiv">
      </div> -->



    </no-ssr>


  </div>
</template>



<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import axios from 'axios'

import ProjectCard from './ProjectCard.vue'
import SearchResultsCountAndTabs from './SearchResultsCountAndTabs.vue'

import { VIEW_MAP, GeoCenters } from '../../config/constants.js'

import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import mapboxgl from 'mapbox-gl'

// TO DO => COMMENT getItemById and replace by an action
// import { getItemById } from '~/plugins/utils.js';

import { StylesOSM } from '../../config/mapboxVectorStyles.js'

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

      // LOCAL DATA
      VIEW_MAP,
      iconSizeNormal : [29, 29],
      iconSizeHighlighted : [49, 49],

      // FIELDS MAPPER
      contentFields : undefined,

      // ITEMS
      // highlightedItem: undefined,
      itemLoaded: false,
      itemLoading: false,
      showCard:false,

      markerCoordinates: [2.2137, 46.2276], // { lat : 46.2276, lon : 2.2137 } ,

      // MAPBOX SETUP
      preferCanvas: true,
      currentZoom: 6,

      zoom: GeoCenters.FRANCE.zoom,
      maxZoom: GeoCenters.FRANCE.maxZoom,
      minZoom: GeoCenters.FRANCE.minZoom,

      center: GeoCenters.FRANCE.center,
      currentCenter: GeoCenters.FRANCE.center,

      // url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contibutors',

      // cf : https://openmaptiles.org/docs/website/mapbox-gl-js/
      // mapStyle : undefined,
      // mapStyle: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      // mapStyle: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',

      // mapStyle : StylesOSM.ShittyPlanet, // OK but shitty 
      // mapStyle : StylesOSM.testRasterPositron, // OK better
      mapStyle : StylesOSM.testRasterVoyager, // OK better

      // mapStyle : StylesOSM.testRasterOSM,
      // mapStyle : StylesOSM.testVectorStyle,

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
    const mapOptions = this.endPointConfig.map_options
    this.log && console.log("C-SearchResultsMapbox / mapOptions : \n", mapOptions)

    const mapOptionsRoute = this.routeConfig.map_options
    this.log && console.log("C-SearchResultsMapbox / mapOptionsRoute : \n", mapOptionsRoute)

    this.zoom        = mapOptions.zoom
    this.maxZoom     = mapOptions.maxZoom
    this.minZoom     = mapOptions.minZoom
    this.currentZoom = mapOptions.currentZoom

    this.center      = [ mapOptions.center[1], mapOptions.center[0] ]
    // this.center = [0,0]

    this.currentCenter = mapOptions.currentCenter

    // LEGACTY LEAFLET
    // this.url = mapOptions.url
    // this.attribution = mapOptions.attribution
    // this.subdomains = mapOptions.subdomains

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
          this.geoJson = createGeoJsonDataPoints(this.itemsForMap)
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

      if ( this.map && !this.isClusterSet && this.itemsForMap ) {
        this.log && console.log('\nC-SearchResultsMapbox / watch - projects - createGeoJsonDataPoints ( from geoJson.js ) ...')
        this.geoJson = createGeoJsonDataPoints(this.itemsForMap)
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

    // displayedProject(next, prev){
    //   this.log && console.log('\nC-SearchResultsMapbox / watch - displayedProject ...')
    //   this.log && console.log('C-SearchResultsMapbox / watch - next : ', next)
    //   this.log && console.log('C-SearchResultsMapbox / watch - this.showCard : ', this.showCard)
    // },

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
    }),

    ...mapGetters({
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

    getZoom(){
      return this.map && this.map.getZoom()
    },

  },

  beforeDestroy() {
    this.log && console.log('\nC-SearchResultsMapbox / beforeDestroy ...')
  },

  methods: {

    // - - - - - - - - - - - - - - - - - - //
    onMapLoaded(event) {
      this.log && console.log("\nC-SearchResultsMapbox / onMapLoaded ... ")
      // this.log && console.log("C-SearchResultsMapbox / mounted / this.$refs.mapboxDiv : ", this.$refs.mapboxDiv)
      
      // store in component
      this.map = event.map;

      // in store => WARNING : object too complex to be stored/mutated in vuex so far
      // check : https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
      // this.$store.dispatch('search/setMap',{map: event.map}) // trigger action 
      // this.$store.commit('search/setMap', {map : event.map}) // trigger mutation directly
    },


    // - - - - - - - - - - - - - - - - - - //
    // MAIN MAP FUNCTIONS

    // INITIALIZATION
    createMapItems(geoJson){

      this.log && console.log("\nC-SearchResultsMapbox / createMapItems ...")

      let mapboxOptions = this.routeConfig.map_options.mapbox_layers

      // adding reactive source
      // this.log && console.log("C-SearchResultsMapbox / createMapItems / geoJson :", geoJson)
      // this.log && console.log("C-SearchResultsMapbox / createMapItems / this.map :", this.map)
      this.createAddGeoJsonSource(geoJson)
      this.createChoroplethSource()

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

    // SOURCES 
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
        let geoJson = createGeoJsonDataPoints(itemsForMap)

        this.map.getSource( allPointsSourceId ).setData(geoJson)
        this.map.getSource( geoJsonSourceId ).setData(geoJson)
        // this.map.getSource('allPointsSource').setData(geoJson)
        // this.map.getSource('clusterSource').setData(geoJson)

        // TO DO : update choropleth
        // const choroplethConfigOptions = mapboxOptions.choropleth_layer 
        // for ( let source of choroplethConfigOptions.sources ) {
        //  this.map.getSource( source.source_id ).setData( geoJson )
        // }
        this.createChoroplethSource(true)

      }
    },

    createAddGeoJsonSource(geoJson){

      this.log && console.log("\nC-SearchResultsMapbox / createAddGeoJsonSource / geoJson :", geoJson)

      let mapbox = this.map
      const mapboxOptions = this.routeConfig.map_options.mapbox_layers

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
      

    },

    createChoroplethSource( isUpdate=false ){

      this.log && console.log("\nC-SearchResultsMapbox / createChoroplethSource ...")

      let mapbox = this.map
      const mapboxOptions = this.routeConfig.map_options.mapbox_layers

      // - - - - - - - - - - - - - - - - //
      // SOURCE - CHOROPLETH //
      if ( mapboxOptions.choropleth_layer && mapboxOptions.choropleth_layer.is_activated ){
  
        // cf : https://github.com/gregoiredavid/france-geojson
        // cf : https://geojson-maps.ash.ms/
        // cf : https://restcountries.eu/#api-endpoints-all
  
        // cf : https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/
        // cf : https://docs.mapbox.com/mapbox-gl-js/example/data-join/
        
        const choroplethConfigOptions = mapboxOptions.choropleth_layer 
        
        for ( let source of choroplethConfigOptions.sources ) {
          
          this.log && console.log("\nC-SearchResultsMapbox / createChoroplethSource / source.source_id : ", source.source_id )

          if (source.is_activated ){
            
            this.chroplethGeoJSONS.push({
              source_id : source.source_id,
              is_loaded : false,
              data : undefined
            })

            if ( source.need_aggregation && isUpdate ) {
              
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
              if ( !isUpdate ){
                mapbox.addSource( source.source_id, 
                  {
                    type: 'geojson',
                    data: dummyGeoJson
                  }
                )
              }

              let choroSource = getJson(source.source_url)
              choroSource.then(( resp ) => {
                
                this.log && console.log("C-SearchResultsMapbox / createAddGeoJsonSource / resp.data :", resp.data)
  
                let dataLoaded = resp.data
  
                // modify / agregate data
                let items = this.projects

                let dataFeatures = dataLoaded.features
                dataFeatures.forEach( i => {
                  const result = items.reduce( (sum, item) => 
                    ( String(item[ source.join_polygon_id_to_field ]) === String(i.properties[ source.polygon_prop_id])  ? sum + 1 : sum ), 0
                  )
                  i.properties[ source.agregated_data_field ] = result
                })
                dataLoaded.features = dataFeatures
  
                mapbox.getSource( source.source_id ).setData(dataLoaded)

                let choroRefIdex= this.chroplethGeoJSONS.findIndex( c => c.source_id === source.source_id )
                this.chroplethGeoJSONS[ choroRefIdex ]['is_loaded'] = true
                // this.chroplethGeoJSONS[ choroRefIdex ]['data'] = dataLoaded
                // this.createAddChoroplethLayers(source)
              }) 
            } 
            if ( !source.need_aggregation || !isUpdate ) {
              mapbox.addSource( source.source_id, 
                {
                  type: 'geojson',
                  data: source.source_url
                }
              )
              let choroRefIdex= this.chroplethGeoJSONS.findIndex( c => c.source_id === source.source_id )
              this.chroplethGeoJSONS[ choroRefIdex ]['is_loaded'] = true
              // this.createAddChoroplethLayers(source)
            }

          }

        }

      }
    },

    // LAYERS
    createAddGeoJsonLayers(geoJsonSourceId) {

      this.log && console.log("\nC-SearchResultsMapbox / createGeoJsonLayer ... ")
      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / geoJsonSourceId : ", geoJsonSourceId)

      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / this.routeConfig : ", this.routeConfig)

      let mapboxOptions = this.routeConfig.map_options.mapbox_layers
      let mapboxMap = this.map 

      let displayPoint = this.highlightItem

      //  CHOROPLETH
      if ( mapboxOptions.choropleth_layer && mapboxOptions.choropleth_layer.is_activated ){
        let choroplethConfigOptions = mapboxOptions.choropleth_layer 
        for ( let source of choroplethConfigOptions.sources ) {
          if (source.is_activated ){
            this.createAddChoroplethLayers(source)
          }
        }
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
          mapboxMap.on('click', allPointsLayerId, function (e) {
            
            var featuresPoint = mapboxMap.queryRenderedFeatures(e.point, { layers: [ allPointsLayerId ] });
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - all-points - featuresPoint : ", featuresPoint)

            var pointId = featuresPoint[0].properties.sd_id;
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - all-points - pointId : ", pointId)

            var coordinates = e.features[0].geometry.coordinates.slice();
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - all-points - coordinates : ", coordinates)

            mapboxMap.easeTo({
              center: coordinates,
            })

            let itemProps = featuresPoint[0].properties
            itemProps.lat = coordinates[1]
            itemProps.lon = coordinates[0]
            displayPoint(itemProps)

          })
          mapboxMap.on('mouseenter', allPointsLayerId, function () {
            mapboxMap.getCanvas().style.cursor = 'pointer';
          })
          mapboxMap.on('mouseleave', allPointsLayerId, function () {
            mapboxMap.getCanvas().style.cursor = '';
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
        mapboxMap.addLayer(clusterLayerConfig)
        if ( clusterLayerConfigOptions.is_clickable ) {
          mapboxMap.on('click',      clusterLayerId, function (e) {

            // var featuresSource = mapboxMap.getSource(geoJsonSourceId.clusterId)
            // console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - clusters -  featuresSource : ", featuresSource)

            var featuresCluster = mapboxMap.queryRenderedFeatures(e.point, { layers: ['clusters'] });
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - clusters -  featuresCluster : ", featuresCluster)
            
            var clusterId = featuresCluster[0].properties.cluster_id;
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - clusters - clusterId : ", clusterId)
            
            mapboxMap.getSource(geoJsonSourceId.clusterId).getClusterExpansionZoom(clusterId, function (err, zoom) {
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

            var featuresCluster = mapboxMap.queryRenderedFeatures(e.point, { layers: ['cluster-count'] });
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
          mapboxMap.on('click', unclusteredLayerId, function (e) {
            
            var featuresPoint = mapboxMap.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - unclustered-point - featuresPoint : ", featuresPoint)

            var pointId = featuresPoint[0].properties.sd_id;
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - unclustered-point - pointId : ", pointId)

            var coordinates = e.features[0].geometry.coordinates.slice();
            console.log("C-SearchResultsMapbox / createGeoJsonLayers / clic - unclustered-point - coordinates : ", coordinates)

            mapboxMap.easeTo({
              center: coordinates,
            })

            let itemProps = featuresPoint[0].properties
            itemProps.lat = coordinates[1]
            itemProps.lon = coordinates[0]
            displayPoint(itemProps)

          })
          mapboxMap.on('mouseenter', unclusteredLayerId, function () {
            mapboxMap.getCanvas().style.cursor = 'pointer';
          })
          mapboxMap.on('mouseleave', unclusteredLayerId, function () {
            mapboxMap.getCanvas().style.cursor = '';
          })
        }
      }

      //  HEATMAP
      if ( mapboxOptions.heatmap_layer && mapboxOptions.heatmap_layer.is_activated ){
        let heatmapLayerConfigOptions = mapboxOptions.heatmap_layer 
        let heatmapLayerId = heatmapLayerConfigOptions.layer_id ? heatmapLayerConfigOptions.layer_id : "heatmap-layer"
        let heatmapLayerConfig = createHeatmapLayer(
          geoJsonSourceId.allPointsId, 
          heatmapLayerConfigOptions,
          heatmapLayerId
        )
        mapboxMap.addLayer(heatmapLayerConfig)
      }

    },

    createAddChoroplethLayers(source) {

      this.log && console.log("\nC-SearchResultsMapbox / createGeoJsonLayer ... ")
      this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer ...: source : ", source)

      let mapboxOptions = this.routeConfig.map_options.mapbox_layers
      let mapboxMap = this.map 

      let choroplethSourceId = source.source_id 
      let choroplethLayerId = source.layer_id 

      let choroplethConfig = createChoroplethLayer( 
        choroplethSourceId, 
        source,
        choroplethLayerId 
      )
      mapboxMap.addLayer(choroplethConfig)

    },



    // - - - - - - - - - - - - - - - - - - //
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
    

    // createMapbox(styleUrl){
      //   this.log && console.log("C-SearchResultsMapbox / createMapbox ... ")
      //   // init the map

      //   this.map = new mapboxgl.Map({
      //     container: 'mapboxDiv',
      //     style: styleUrl,
      //     center: [4.7835, 52.3491],
      //     zoom: 6,
      //     pitch: 0,
      //     minZoom: 2,
      //     maxZoom: 20,
      //     attributionControl: false
      //   })
      //   // this.map.addControl(new mapboxgl.Navigation());

    // },



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



    // zoomUpdate(zoom) {
    //   this.currentZoom = zoom;
    // },
    // centerUpdate(center) {
    //   this.currentCenter = center;
    // },



    // getHighlightedItemId(){
    //   if ( this.highlightedItem ) {
    //     // this.log && console.log("C-SearchResultsMapbox / itemId / this.highlightedItem : ", this.highlightedItem)
    //     return this.itemId(highlightedItem, 'block_id') 
    //   } else {
    //     return false
    //   }
    // },




  },


};
</script>

<style>
  
  /* cf : https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/ */
  .legend {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.10);
    /* font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif; */
    padding: 10px;
  
    position: absolute;
    z-index: 200;

    bottom: 30px;
    /* right: 10px; */
  }

  .legend-bottom-left{
    left: 10px;
  }
  
  .legend-bottom-right{
    right: 20px;
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