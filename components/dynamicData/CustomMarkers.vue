<template>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { L, LIcon } from 'vue2-leaflet';
import { PruneCluster, PruneClusterForLeaflet } from '../utilsPruneCluster.js'

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

      // testProp : "this is the test prop",

    };
  },
  mounted(){
    console.log(" - - CustomMarkers / mounted... ")
    this.itemsOnMap = this.projects
    this.pruneCluster = new PruneClusterForLeaflet();

    const iconNormalSize = this.iconSizeNormal
    const iconBigSize = this.iconSizeHighlighted

    const emitDataFunction = this.emitItem
    const IconSize = this.getIconSize

    const smallIcon = L.icon({
      iconUrl: '/static/icons/icon_pin_plein_violet.svg',
      iconSize: iconNormalSize,
    })

    const bigIcon = L.icon({
      iconUrl: '/static/icons/icon_pin_plein_violet.svg',
      iconSize: iconBigSize,
    })

    // we configure the onClick option
    this.pruneCluster.PrepareLeafletMarker = function(leafletMarker, data) {

      leafletMarker.setIcon( smallIcon );

      leafletMarker.on('click', function(e){
        // console.log("PrepareLeafletMarker / data : ", data);
        // console.log("PrepareLeafletMarker / this : ", this);
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
             iconUrl: '/static/icons/icon_cluster_yellow.svg',
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

    // console.log('this.mapObject',this.mapObject);
    let map = this.mapObject.mapObject;
    map.addLayer(this.pruneCluster);
  },

  computed: {
    ...mapState({
      projects({search}){ return search.answer.result && search.answer.result.projects },
    })
  },

  watch: {
    projects(old){
      if (this.projects && this.projects.length > 0) {
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
      console.log('------------- redraw -------------');
      // var pruneCluster = new PruneClusterForLeaflet();
      var pruneCluster = this.pruneCluster

      pruneCluster.RemoveMarkers();

      console.log('removed all the markers - number of markers to map: ',this.itemsForMap().length);
      this.itemsForMap().forEach((item) => {
        let marker = this.createMarker(item,pruneCluster)
        pruneCluster.RegisterMarker(marker);
      })

    },

    // createIcon(data, category) {
    //     return L.icon({
    //         iconUrl: '/static/icons/icon_pin_plein_violet.svg',
    //         iconSize: [38, 95],
    //         iconAnchor: [22, 94],
    //         // shadowUrl: 'my-icon-shadow.png',
    //         shadowSize: [68, 95],
    //         shadowAnchor: [22, 94]
    //     });
    // },

    createMarker(obj,pruneCluster){
      let parsedObj = JSON.parse(JSON.stringify(obj))
      let marker = new PruneCluster.Marker(parsedObj.lat, parsedObj.lon);
      // marker.data.icon = this.createIcon;
      // marker.data.ID = parsedObj.sd_id;
      marker.data.ID = this.itemId(obj);
      marker.data.lat = parsedObj.lat;
      marker.data.lon = parsedObj.lon;
      return marker
    },

    getIconSize(item){
      if (this.highlightedItem) {
        const itemID = item.ID
        // console.log("getIconSize / itemID : " , itemID)
        let highlightedItemID = this.itemId(this.highlightedItem, 'block_id')
        // console.log("getIconSize / highlightedItemID : " , highlightedItemID)
        // return this.itemId(item, 'block_id') === this.itemId(this.highlightedItem, 'block_id') ? this.iconSizeHighlighted : this.iconSizeNormal
        // return itemID === highlightedItemID ? this.iconSizeHighlighted : this.iconSizeNormal
        return itemID === highlightedItemID ? [49,49] : [29,29]
      } else {
        return this.iconSizeNormal
      }
    },
    matchItemWithConfig(item, fieldBlock) {
      // console.log("matchItemWithConfig / item : ", item)
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      // console.log("matchItemWithConfig / contentField : ", contentField)
      if (contentField){
        const field = contentField.field
        return item[field]
      } else {
        return undefined
      }
    },
    itemId(item) {
      // console.log("itemId / item : ", item)
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
