<style lang="scss" scoped>
  @import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
  .spot__map {
  margin: 0;
  width: auto;
    .mgl-map-wrapper {
      position: relative;
    }
  }
  .mapxbox-map {
    height: 200px;
  }
  .mapxbox-canvas {
    position: relative;
  }
  .marker {
    display: block;
    border: none;
    border-radius: 50%;
  cursor: pointer;
    padding: 0;
  }
</style>

<template>

  <div
    class="mapDetail"
    :style="`z-index: 25; position: relative; top: 0; bottom: 0; width: ${mapWidth}px; height: ${mapHeight}px`"
    >

    <!-- MAP WITH MAPBOX GL -->
    <no-ssr>
      <MglMap
        :access-token="'noToken'"
        :mapStyle.sync="mapStyle"
        :center="center"
        :zoom="zoom"
        :maxZoom="maxZoom"
        :minZoom="minZoom"
        :interactive="interactive"
        @load="onMapLoaded"
        ref='mapboxDivDetail'
        >
        <!-- MARKER -->
        <MglMarker 
          :coordinates="center"
          :offset="item_marker_offset"
          :anchor="item_marker_anchor"
          >
          <span slot="marker"
            :class="`icon is-large has-text-${item_marker_color} has-text-${item_marker_color}-c`" 
            >
            <i :class="`fa-3x ${item_marker} `"></i>
          </span>
        </MglMarker>
        <!-- CONTROLS -->
        <MglNavigationControl position="bottom-right" />
      </MglMap>
    </no-ssr>

  </div>
</template>



<script>
import { mapState, mapGetters } from 'vuex'

import NotFoundError from './NotFoundError.vue';

import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import { StylesOSM } from '../../config/mapboxVectorStyles.js'


export default {

  name: 'DynamicDetailMap',

  components: {
    NotFoundError,
  },

  props: [
    'contentField',
    'mapWidth'
  ],

  data: () => {
    return   {
      // MAPBOX MAP OBJECT
      mapStyle : StylesOSM.testRasterVoyager,
      container: "Mapbox",
      map : null,
      mapHeight: 200,
      center: undefined,
      zoom: undefined,
      maxZoom: undefined,
      minZoom: undefined,
      interactive: false,

      title_field: undefined,
      item_marker: undefined,
      item_marker_color: undefined,
      item_marker_offset: undefined,
      item_marker_anchor: undefined,
    }
  },

  beforeMount: function () {
    this.log && console.log("\nC-DynamicDetailMap / beforeMount ... ")

    console.log("C-DynamicDetailMap / mounted / this.displayableItem : ", this.displayableItem )
    let contentField = this.contentField

    this.mapHeight = contentField.map_height ? contentField.map_height : 200
    this.title_field = contentField.item_title_field ? contentField.item_title_field : ""

    this.item_marker        = contentField.item_marker ? contentField.item_marker : "fas fa-map-marker-alt"
    this.item_marker_color  = contentField.item_marker_color ? contentField.item_marker_color : "primary"
    this.item_marker_offset = contentField.item_marker_offset ? contentField.item_marker_offset : [ 0, 0 ]
    this.item_marker_anchor = contentField.item_marker_anchor ? contentField.item_marker_anchor : "bottom"

    this.zoom        = contentField.zoom
    this.maxZoom     = contentField.max_zoom
    this.minZoom     = contentField.min_zoom
    this.interactive = contentField.interactive

    const item_geo_fields = contentField.item_geo_fields
    const itemLatField    = item_geo_fields.latitude
    const itemLonField    = item_geo_fields.longitude
    let itemCenter        = [ this.displayableItem[itemLonField], this.displayableItem[itemLatField] ]
    console.log("C-DynamicDetailMap / mounted / itemCenter : ", itemCenter )
    this.center = itemCenter

  },

  mounted(){
    this.mapbox = Mapbox
  },

  computed: {

    ...mapState({
      log: state => state.log,
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      user: state => state.user.user,
    }),

    ...mapGetters({
      displayableItem : 'search/getDisplayedProject',
    }),

  },

  methods : {

    // - - - - - - - - - - - - - - - - - - //
    // INITIALIZATION
    // - - - - - - - - - - - - - - - - - - //
    onMapLoaded(event) {
      this.log && console.log("\nC-DynamicDetailMap / onMapLoaded ... ")
      this.map = event.map

      this.map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': this.center,
              },
              'properties': {
                'title': this.item_title_field,
                'icon': this.item_marker
              }
            },
          ]
        }
      })

    },
  
  }

}
</script>


<style lang="scss" scoped>

</style>
