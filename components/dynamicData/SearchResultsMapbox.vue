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

    <!-- SearchResultsCountAndTabs -->
    <div class="count-and-tabs-container">

      <div class="container">

        <SearchResultsCountAndTabs 
          :view="VIEW_MAP" 
          :open="!!showCard"
          >
          
          <!-- HIGHLIGHTED ITEM  -->
          <div 
            class="highlighted-project" 
            v-if="showCard" 
            slot="project"
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
            
            <!-- PROJECT CARD -->
            <div class="card">

              <!-- LOADER -->
              <div 
                class="columns is-mobile is-vcentered "
                v-show="!displayedProject"
                >
                <div 
                  class="column is-12 has-text-centered has-text-primary"
                  >
                  <div 
                    class="lds-roller"
                    >
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                  </div>
                </div>
                <!-- <div class="column is-12 has-text-centered has-text-primary">
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

    <!-- LOADER -->
    <div 
      v-show="!itemsForMap"
      class="lds-roller floating"
      >
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>




    <!-- MAP WITH MAPBOX GL -->
    <no-ssr>

      <MglMap
        :access-token="'noToken'"
        :mapStyle.sync="mapStyle"
        :center="center"
        :zoom="zoom"
        @load="onMapLoaded"
        ref='mapboxDiv'
        >

        <!-- MARKERS -->
        <template
          v-if="itemsForMap && itemsForMap.length < markersTreshold"
          >
          <MglMarker
            v-for="(item, index) in itemsForMap"
            :coordinates="[item.lon, item.lat]"
            color='grey'
            @click="highlightItem(item)"
          >
            <!-- <MglPopup>
              <div>
                sd_id : {{ item.sd_id }}
              </div>
            </MglPopup> -->

          </MglMarker>
        </template>

        <!-- CLUSTER -->
        <template
          v-if="geoJsonSource && geoJsonlayer"
          >
          <MglGeojsonLayer
            :sourceId="geoJsonSource.id"
            :source="geoJsonSource"
            layerId="clusterLayer"
            :layer="geoJsonlayer"
          />
        </template>

        <!-- CONTROLS -->
        <!-- <MglGeolocateControl ref="geolocateControl"/> -->
        <MglNavigationControl position="top-right" />

      </MglMap>
      
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
import { StylesOSM } from '../../config/mapboxVectorStyles.js'

import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import mapboxgl from 'mapbox-gl'

// TO DO => COMMENT getItemById and replace by an action
import { getItemById } from '~/plugins/utils.js';

import { getStyleJSON } from '~/plugins/mapbox.js';


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
      markersTreshold : 100,
      geoJsonSource : undefined,
      geoJsonlayer : {

      },

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
      zoom: 6,
      maxZoom: 19,
      minZoom: 2,
      currentZoom: 6,

      center: GeoCenters.FRANCE_CENTER,
      currentCenter: GeoCenters.FRANCE_CENTER,

      // url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contibutors',

      // cf : https://openmaptiles.org/docs/website/mapbox-gl-js/
      // mapStyle : undefined,
      // mapStyle: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      // mapStyle: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',

      // mapStyle : StylesOSM.ShittyPlanet, // OK but shitty 
      mapStyle : StylesOSM.testRasterPositron, // OK better

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

    this.zoom = mapOptions.zoom
    this.maxZoom = mapOptions.maxZoom
    this.minZoom = mapOptions.minZoom
    this.currentZoom = mapOptions.currentZoom

    this.center =[ mapOptions.center[1], mapOptions.center[0] ]
    // this.center = [0,0]

    this.currentCenter = mapOptions.currentCenter

    // LEGACTY LEAFLET
    // this.url = mapOptions.url
    // this.attribution = mapOptions.attribution
    // this.subdomains = mapOptions.subdomains

  },

  created(){

    // this.log && console.log("\nC-SearchResultsMapbox / created... ")
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;

  },

  mounted(){

    this.log && console.log("\nC-SearchResultsMapbox / mounted... ")
    this.log && console.log("C-SearchResultsMapbox / mounted / this.$refs.mapboxDiv : ", this.$refs.mapboxDiv)

    const OSMBright = 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json'
    const Positron = 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json'
    const DarkMatter = 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json'
    const KlokantechBasic = 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json'
    const DarkMatterBis = 'https://free.tilehosting.com/styles/darkmatter/style.json'

    const styleUrl = Positron
    this.log && console.log("C-SearchResultsMapbox / mounted / trying to get styleUrl : ", styleUrl)

    // !!! ERROR CORS FETCHING DISTANT STYLES !!!    
    getStyleJSON(styleUrl)

    // this.createMapbox(styleUrl)

  },


  computed: {

    ...mapState({
      log : 'log', 
      locale : state => state.locale,
    }),

    ...mapGetters({
      projects : 'search/getResults',
      displayedProject : 'search/getDisplayedProject',
      isPending : 'search/getPending',
    }),


    itemsForMap(){
      this.log && console.log('\nC-SearchResultsMapbox / itemsForMap ...')

      if (this.projects){
        let geoItems = this.projects.filter(item => this.checkIfItemHasLatLng(item) )
        this.log && console.log('C-SearchResultsMapbox / itemsForMap/ geoItems : ', geoItems )
        
        
        // if (geoItems.length > this.markersTreshold ){
        if (geoItems.length > 2 ){

          this.log && console.log('C-SearchResultsMapbox / itemsForMap/ remapping to geoJSON ' )
          let ItemsAsGeoJSON = this.createGeoJsonSource(geoItems)
          this.log && console.log('C-SearchResultsMapbox / itemsForMap/ ItemsAsGeoJSON : ', ItemsAsGeoJSON )
          this.geoJsonSource = ItemsAsGeoJSON

          this.geoJsonLayer = this.createGeoJsonLayer(ItemsAsGeoJSON)

        } else {
          this.geoJsonSource = undefined
          this.geoJsonLayer = undefined
          return undefined 
        }
        
        return geoItems

      }

    },

  },


  methods: {

    onMapLoaded(event) {
      this.log && console.log("C-SearchResultsMapbox / onMapLoaded ... ")

      // in component
      this.map = event.map;
      this.log && console.log("C-SearchResultsMapbox / onMapLoaded / this.map :", this.map)

      // or just to store if you want have access from other components
      // this.$store.search.map = event.map;

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

    createGeoJsonSource(dataArray){

      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonSource ... ")
      
      // geojson wrappeer
      let geoJSON = {
        type : 'FeatureCollection',
        features : [],
      }

      const notAllowedKeys = ['lon', 'lat']

      // remap items array
      let dataGeoJson = dataArray.map(item => {
        let trimmedItem = Object.keys(item)
                          .filter(key => !notAllowedKeys.includes(key))
                          .reduce((obj, key) => {
                            obj[key] = item[key];
                            return obj;
                          }, {} );
        const tempObject = {
          type : 'Feature',
          properties : trimmedItem,
          geometry : {
            type : 'Point',
            coordinates : [item.lon, item.lat]
          }
        }
        return tempObject
      })
      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonSource / dataGeoJson : ", dataGeoJson)
      geoJSON.features = dataGeoJson
      // this.log && console.log("C-SearchResultsMapbox / createGeoJsonSource / geoJSON : ", geoJSON)
      // return geoJSON
      let geoJsonSource = {
        id : 'clusterLayer',
        type : 'geojson',
        data : geoJSON,
        cluster : true,
        clusterMaxZoom : 14,
        clusterRadius : 50,
      }
      return geoJsonSource

    },

    createGeoJsonLayer(geoJsonSource) {

      this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / geoJsonSource : ", geoJsonSource)

      let geoJsonLayer = {
        id: "clusters",
        type: "circle",
        source: geoJsonSource.id,
        filter: ["has", "point_count"],
      }
      this.log && console.log("C-SearchResultsMapbox / createGeoJsonLayer / geoJsonLayer : ", geoJsonLayer)
      return geoJsonLayer

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

      // this.log && console.log("C-SearchResultsMapbox / highlightItem / i : ", i)
      // show loader 
      this.showCard = true
      // this.itemLoaded = false

      // recenter map
      this.center = [item.lon, item.lat]
      // this.zoom = 10

      // get item ID
      const item_id = this.itemId(item)

      // get item data
      this.$store.dispatch('search/searchOne', item_id )
      
    },
    





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