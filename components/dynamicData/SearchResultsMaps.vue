<template>
  <div class="map">
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
              v-show="itemLoaded"
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
                v-show="!itemLoaded"
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
                v-if="itemLoaded"
                :item="highlightedItem"
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
    v-show="!projects || itemLoading"
    class="lds-roller floating"
    >
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    <!-- class="leaflet-control-loader lds-roller" -->
  </div>

  <l-map
    :zoom="zoom"
    :bounds="bounds"
    :preferCanvas="preferCanvas"
    :min-zoom="minZoom"
    :max-zoom="maxZoom"
    :options="{ zoomControl: false }"
    :center="center"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
    ref='map'
    >

    <l-control-zoom position="bottomright"/>

    <l-tile-layer
      :url="url"
      :attribution="attribution"/>

      <!-- MARKER CLUSTER -->
      <!-- <v-marker-cluster 
        v-if="projects"
        :options="{showCoverageOnHover: false, iconCreateFunction: iconCreateFunction}"
        >
        <l-marker 
          v-for="(item, i) in itemsForMap()"
          :key="i"
          :lat-lng="{lng: parseFloat(item.lon), lat: parseFloat(item.lat)}"
          @click="showCard=true; highlightItem(item)"
          >
          <l-icon
            v-if="checkIfItemHasLatLng(item)"
            iconUrl="/static/icons/icon_pin_plein_violet.svg"
            :iconSize="getIconSize(item, highlightedItem)"
          />
            <!-- :iconSize="item.sd_id === highlightedItem.sd_id ? [46, 46] : [29, 29]" -->
            <!-- :iconSize="itemId(item, 'block_id') === itemId(highlightedItem, 'block_id') ? [46, 46] : [29, 29]" -->
        </l-marker>
      </v-marker-cluster> -->

      <CustomMarkers
        :routeConfig="routeConfig"
        :endPointConfig="endPointConfig"
        :itemsForMap="itemsForMap"
        :checkIfStringFloat="checkIfStringFloat"
        :mapObject="this.$refs.map"

        :contentFields="contentFields"
        @getSelectedItem="handleIconSignal"
        :highlightedItem="highlightedItem"
      />

    </l-map>

  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

import { L, LMap, LControlZoom, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
// import { PruneCluster, PruneClusterForLeaflet } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'
// import { PruneCluster, PruneClusterForLeaflet } from 'PruneCluster'

import ProjectCard from './ProjectCard.vue'
import SearchResultsCountAndTabs from './SearchResultsCountAndTabs.vue'
import CustomMarkers from './CustomMarkers.vue'

import {VIEW_MAP} from '../constants.js'
import {getItemById} from '../utils.js';

const FRANCE_CENTER = [46.2276, 2.2137];


export default {
  name: "SearchResultsMap",

  components: {
    LMap,
    LControlZoom,
    LTileLayer,
    LMarker,
    LIcon,

    CustomMarkers,
    // 'v-marker-cluster': Vue2LeafletMarkerCluster,
    // PruneCluster,
    // PruneClusterForLeaflet,

    ProjectCard,
    SearchResultsCountAndTabs,

  },

  props: [
    'routeConfig', 
    'endPointConfig'
  ],

  data() {
    return {

      // LOCAL DATA
      VIEW_MAP,
      iconSizeNormal : [29, 29],
      iconSizeHighlighted : [49, 49],

      // FIELDS MAPPER
      contentFields : undefined,

      // ITEMS
      highlightedItem: undefined,
      itemLoaded: false,
      itemLoading: false,
      showCard:false,
      itemsOnMap : [
        // {sd_id : 'A', lat : '47.412', lon : '-1.218' },
        // {sd_id : 'B', lat : '47.4234', lon : '-1.248' },
      ],

      // LEAFLET SETUP
      preferCanvas: true,
      zoom: 6,
      maxZoom: 19,
      minZoom: 2,
      currentZoom: 6,
      center: FRANCE_CENTER,
      currentCenter: FRANCE_CENTER,

      // url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contibutors',
      
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      
    };
  },

  beforeMount: function () {
    // console.log("- - - - - MAP TIME !!!! - - - - - -")
    // console.log("\n - - SearchResultsMap / beforeMount ... ")
    // console.log(" - - SearchResultsMap / routeConfig : \n", this.routeConfig)
    // console.log(" - - SearchResultsMap / endPointConfig : \n", this.endPointConfig)

    // let pruneCluster = new PruneClusterForLeaflet();

    // set up fields mapper
    this.contentFields = this.routeConfig.contents_fields
    // console.log(" - - SearchResultsMap / contentFields : \n", this.contentFields)

    // console.log("test marker / L.latLng(47.412, -1.218)", L.latLng(47.412, -1.218))
    // set up leaflet options
    const mapOptions = this.endPointConfig.map_options

    this.zoom = mapOptions.zoom
    this.maxZoom = mapOptions.maxZoom
    this.minZoom = mapOptions.minZoom
    this.currentZoom = mapOptions.currentZoom
    this.center = mapOptions.center
    this.currentCenter = mapOptions.currentCenter
    this.url = mapOptions.url
    this.attribution = mapOptions.attribution
    this.subdomains = mapOptions.subdomains

  },

  mounted(){

    // console.log(" - - SearchResultsMap / mounted... ")
    // if(this.projects){
    //   const projectsWithMissingAddress = this.projects.filter(p => !p.lat)
    //   // if(projectsWithMissingAddress.length >= 1)
    //   //   this.findProjectsGeolocs(projectsWithMissingAddress)
    //   }
    this.itemsOnMap = this.projects

  },

  computed: {

    ...mapState({
      projects({search}){ return search.answer.result && search.answer.result.projects },
      // items({search}){ return search.answer.resultMap && search.answer.result.projects },
      // displayedProjects(){
      //   return this.projects && this.projects.filter(p => this.geolocByProjectId.get(p.id))
      // },
      // displayedProjects(){
      //   console.log("displayedProjects : ", this.projects)
      //   if(this.projects){
      //     let itemsWithLatLng = this.projects.filter(i => !i.lat && !i.lon)
      //     return itemsWithLatLng
      //   }
      // },
      // geolocByProjectId({geolocByProjectId}){return geolocByProjectId}
    }),
    bounds(){
      let displayedItems = this.itemsForMap()
      return displayedItems && new L.LatLngBounds(displayedItems.map(p => ({
        lng: parseFloat(p.lon), 
        lat: parseFloat(p.lat),
      })));
    },
  },




  methods: {

    handleIconSignal(itemData){
      // console.log('handleIconSignal / itemData : ', itemData)
      this.highlightItem(itemData)
    },
    itemsForMap(){
      if (this.projects){
        return this.projects.filter(item => this.checkIfItemHasLatLng(item) )
      }
    },
    getIconSize(item, highlightedItem){
      if (highlightedItem) {
        return this.itemId(item, 'block_id') === this.itemId(highlightedItem, 'block_id') ? this.iconSizeHighlighted : this.iconSizeNormal
      } else {
        return this.iconSizeNormal
      }
    },
    matchItemWithConfig(item, fieldBlock) {
      // console.log("matchItemWithConfig / item : ", item)
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      // console.log("matchItemWithConfig / contentField : ", contentField)
      if (contentField) {
        const field = contentField.field
        return item[field]
      }
      else {
        return undefined
      }
    },
    itemId(item) {
      // console.log("itemId / item : ", item)
      return this.matchItemWithConfig(item, 'block_id')
    },
    getHighlightedItemId(){
      if ( this.highlightedItem ) {
        // console.log("itemId / this.highlightedItem : ", this.highlightedItem)
        return this.itemId(highlightedItem, 'block_id') 
      } else {
        return false
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
    // getLatLng(item){
    //   return { lat : this.checkIfStringFloat(item.lat) , lng : checkIfStringFloat(item.lon) }
    // },
    // getLatLngDense(item){
    //   return { lat : this.checkIfStringFloat(item.latlng[0]) , lng : checkIfStringFloat(item.latlng[1]) }
    // },
    checkIfItemHasLatLng(item){
      return this.checkIfStringFloat(item.lat) && this.checkIfStringFloat(item.lon)
    },

    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },



    highlightItem(i) {
      // console.log("highlightItem / i : ", i)
      // show loader 
      this.showCard = true
      this.itemLoaded = false
      // this.itemLoading = true
      this.center = [i.lat, i.lon]
      // this.center = [i.lon, i.lat]
      // get item ID
      // const item_id = this.itemId(i)
      const item_id = i.ID
      getItemById( item_id, this.$store.state.search.endpoint)
        .then(item => {
          // this.$store.commit('setDisplayedProject', {item})
          // console.log(" - - DynamicDetail / item : ", item)
          this.highlightedItem = item;
          this.itemLoaded = true
          // this.itemLoading = false
        })
        .catch(function(err) { this.isError = true ; console.error('item route error', err) })
    },




    iconCreateFunction(cluster){
      const markerCount = cluster.getChildCount();

      return new L.DivIcon({
        html: `<span>${markerCount}</span>`, 
        className: 'cis-marker-cluster',
        iconSize: new L.Point(40, 40)
      });
    },

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

  /* from : https://github.com/stefanocudini/leaflet-loader */
  .leaflet-control-loader {
    /* position: absolute;
    z-index:200;
    top: 50%;
    left: 50%; */
    margin-top: -40px;
    margin-left: -50px;
    height: 80px;
    width: 100px;
    border-radius: 10px;
    background: url('/static/illustrations/leaflet-loader.gif') center center no-repeat rgba(255,255,255,0.8);
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
  }

  /*
    Leaflet adds its own z-index to a bunch of elements which makes the map appear on top of 
    other elements with no good reason
    This line allows for the map to be usable without known limit yet while leaving the map below
    other elements
  */
  .map .leaflet-container *{
    z-index: 1;
  }


  .map{
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