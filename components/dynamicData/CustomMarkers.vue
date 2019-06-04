<template>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// import { L } from 'leaflet';
import { LIcon } from 'vue2-leaflet';

// import { PruneCluster, PruneClusterForLeaflet } from '~/plugins/PruneCluster.js'
import { PruneClusterExport, PruneClusterForLeafletExport } from '~/plugins/PruneCluster.js'

export default {
  
  name: "CustomMarkers",

  props: [
    'routeConfig',
    'endPointConfig',
    'itemsForMap',
    'mapObject',
    'checkIfStringFloat',
    'contentFields',
    'highlightedItem'
  ],

  data() {
    return {

      itemsOnMap : [],
      pruneCluster: undefined,

      iconSizeNormal : [29, 29],
      iconSizeHighlighted : [49, 49],

    };
  },

  mounted(){

    this.log && console.log("\n- + - CustomMarkers - + - + - + - + - + - + ")
    console.log("C-CustomMarkers / mounted... ")

    // this.itemsOnMap = this.projects
    this.itemsOnMap = this.itemsForMap
    console.log("C-CustomMarker / mounted / this.itemsOnMap : ", this.itemsOnMap);

    this.pruneCluster = new PruneClusterForLeafletExport();
    console.log("C-CustomMarker / mounted / this.pruneCluster : ", this.pruneCluster);

    const iconNormalSize = this.iconSizeNormal
    const iconBigSize = this.iconSizeHighlighted

    const emitDataFunction = this.emitItem
    const IconSize = this.getIconSize

    const smallIcon = L.icon({
      iconUrl: '~assets/icons/icon_pin_plein_violet.svg',
      iconSize: iconNormalSize,
    })

    const bigIcon = L.icon({
      iconUrl: '~assets/icons/icon_pin_plein_violet.svg',
      iconSize: iconBigSize,
    })

    // we configure the onClick option
    this.pruneCluster.PrepareLeafletMarker = function(leafletMarker, data) {

      leafletMarker.setIcon( smallIcon );

      leafletMarker.on('click', function(e){
        // console.log("C-CustomMarker / PrepareLeafletMarker / data : ", data);
        // console.log("C-CustomMarker / PrepareLeafletMarker / this : ", this);
        leafletMarker.setIcon( bigIcon )
        emitDataFunction(data)
      });
    };

    //--------------------------------- configuration de l'icon du Cluster
    this.pruneCluster.BuildLeafletClusterIcon = function(cluster) {
      var e = new L.Icon.MarkerCluster();
      e.stats = cluster.stats;
      e.population = cluster.population;
      return e;
    };

    var colors = ['#ff4b00', '#bac900', '#EC1813', '#55BCBE', '#D2204C', '#FF0000', '#ada59a', '#3e647e'],
    pi2 = Math.PI * 2;
    L.Icon.MarkerCluster = L.Icon.extend({
      options: {
        iconUrl: '~assets/icons/icon_cluster_yellow.svg',
        iconSize: new L.Point(44, 44),
        className: 'prunecluster leaflet-markercluster-icon'
      },
      createIcon: function () {
        // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
        var e = document.createElement('canvas');
        this._setIconStyles(e, 'icon');
        var s = this.options.iconSize;
        e.width = s.x;
        e.height = s.y;
        this.draw(e.getContext('2d'), s.x, s.y);
        return e;
      },
      createShadow: function () {
          return null;
      },
      draw: function(canvas, width, height) {
        var lol = 0;
        var start = 0;
        for (var i = 0, l = colors.length; i < l; ++i) {
          var size = this.stats[i] / this.population;
          if (size > 0) {
            canvas.beginPath();
            canvas.moveTo(22, 22);
            canvas.fillStyle = colors[i];
            var from = start + 0.14,
              to = start + size * pi2;
            if (to < from) {
              from = start;
            }
            canvas.arc(22,22,22, from, to);
            start = start + size*pi2;
            canvas.lineTo(22,22);
            canvas.fill();
            canvas.closePath();
          }
        }
        canvas.beginPath();
        canvas.fillStyle = '#a174ac';
        canvas.arc(22, 22, 18, 0, Math.PI*2);
        canvas.fill();
        canvas.closePath();
        canvas.fillStyle = 'white';
        canvas.textAlign = 'center';
        canvas.textBaseline = 'middle';
        canvas.font = 'bold 12px sans-serif';
        canvas.fillText(this.population, 22, 22, 40);
      }
    });
    //--------------------------------- the end of the Cluster icon configuration

    console.log('C-CustomMarker / mounted / this.mapObject', this.mapObject);
    let map = this.mapObject.mapObject;
    console.log('C-CustomMarker / mounted / map ', map );

    console.log('C-CustomMarker / mounted / this.pruneCluster', this.pruneCluster);
    map.addLayer(this.pruneCluster);
  },

  computed: {

    ...mapState({
      log : 'log', 
      locale : state => state.locale,
      // projects({search}){ return search.answer.result && search.answer.result.projects },
    }),

    ...mapGetters({
      // projects : 'search/getResults',
    }),


  },

  watch: {

    projects(next, prev){
      if (this.projects && this.projects.length > 0) {
        this.reDraw()
      }
    },
    itemsForMap(next, prev){
      if (next && next.length > 0) {
        this.reDraw()
      }
    }

  },

  methods:{

    emitItem(item){
      this.$emit('getSelectedItem', item)
    },

    checkIfItemHasLatLng(item){
      return this.checkIfStringFloat(item.lat) && this.checkIfStringFloat(item.lon)
    },

    reDraw(){
      console.log('C-CustomMarker ------------- redraw -------------');
      var pruneCluster = this.pruneCluster

      pruneCluster.RemoveMarkers();

      console.log('C-CustomMarker / removed all the markers - number of markers to map: ',this.itemsForMap().length);
      this.itemsForMap().forEach((item) => {
        let marker = this.createMarker(item,pruneCluster)
        pruneCluster.RegisterMarker(marker);
      })

    },

    createMarker(obj,pruneCluster){
      let parsedObj = JSON.parse(JSON.stringify(obj))
      let marker = new PruneClusterExport.Marker(parsedObj.lat, parsedObj.lon);
      marker.data.ID = this.itemId(obj);
      marker.data.lat = parsedObj.lat;
      marker.data.lon = parsedObj.lon;
      return marker
    },

    getIconSize(item){
      if (this.highlightedItem) {
        const itemID = item.ID
        console.log("C-CustomMarker / getIconSize / itemID : " , itemID)
        let highlightedItemID = this.itemId(this.highlightedItem, 'block_id')
        console.log("C-CustomMarker / getIconSize / highlightedItemID : " , highlightedItemID)
        return itemID === highlightedItemID ? [49,49] : [29,29]
      } else {
        return this.iconSizeNormal
      }
    },
    matchItemWithConfig(item, fieldBlock) {
      console.log("C-CustomMarker / matchItemWithConfig / item : ", item)
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      console.log("C-CustomMarker / matchItemWithConfig / contentField : ", contentField)
      if (contentField){
        const field = contentField.field
        return item[field]
      } else {
        return undefined
      }
    },
    itemId(item) {
      console.log("C-CustomMarker / itemId / item : ", item)
      return this.matchItemWithConfig(item, 'block_id')
    },
    getHighlightedItemId(){
      if ( this.highlightedItem ) {
        return this.itemId(highlightedItem, 'block_id') 
      } else {
        return false
      }
    },

  },




}
</script>

<style lang="css">
</style>
