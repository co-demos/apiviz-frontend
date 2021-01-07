<template>
  <div class="svg-container" :style="{width: settings.width + '%'}">
    <svg id="svg" pointer-events="all" preserveAspectRatio="xMinYMin meet">
      <g :id="links"></g>
      <g :id="nodes"></g>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {

    name: 'ForceNetworkGraphComponent',

    props: [
      'graphData',
    ],

    beforeMount : function(){
      console.log('\nForceNetworkGraphComponent / beforeMount...')
    },

    mounted(){
      console.log('ForceNetworkGraphComponent / mounted with graphData : ', this.graphData.nodes)
        console.log('ForceNetworkGraphComponent / mounted with graphData : ', this.graphData.links)

      this.graph = this.graphData
      this.simulation = d3.forceSimulation(this.graph.nodes)
          .force("link", d3.forceLink(this.graph.links).distance(100).strength(0.1))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(this.settings.svgWigth / 2, this.settings.svgHeight / 2));
    },

    data(){
      return {
        graph: null,
        simulation: null,
        color: d3.scaleOrdinal(d3.schemeCategory10),
        settings: {
            strokeColor: "#29B5FF",
            width: 100,
            svgWigth: 960,
            svgHeight: 600
        }
      }
    },

    computed: {
      nodes: function () {
          var that = this;
          if (that.graph) {
              return d3.select("svg").append("g")
                  .attr("class", "nodes")
                  .selectAll("circle")
                  .data(that.graph.nodes)
                  .enter().append("circle")
                  .attr("r", 20)
                  .attr("fill", function (d ,i) {
                      return that.color(i);
                  })
                  .call(d3.drag()
                      .on("start", function dragstarted(d) {
                          if (!d3.event.active) that.simulation.alphaTarget(0.3).restart();
                          d.fx = d.x;
                          d.fy = d.y;
                      })
                      .on("drag", function dragged(d) {
                          d.fx = d3.event.x;
                          d.fy = d3.event.y;
                      })
                      .on("end", function dragended(d) {
                          if (!d3.event.active) that.simulation.alphaTarget(0);
                          d.fx = null;
                          d.fy = null;
                      }));
          }
      },
      links: function () {
          var that = this;
          if (that.graph) {
              return d3.select("svg").append("g")
                  .attr("class", "links")
                  .selectAll("line")
                  .data(that.graph.links)
                  .enter().append("line")
                  .attr("stroke-width", function (d) { return Math.sqrt(d.value); });
          }
      },
    },

    methods: {

    },

    updated: function () {
        var that = this;
        that.simulation.nodes(that.graph.nodes).on('tick', function ticked() {
            that.links
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            that.nodes
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
        });
    }
  }
</script>

<style scoped>
  body {
      width: 100%;
      height: 100%;
  }

  .controls {
      position: fixed;
      top: 16px;
      left: 16px;
      background: #f8f8f8;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
  }

  .svg-container {
      display: table;
      border: 1px solid #f8f8f8;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
  }

  .controls>*+* {
      margin-top: 1rem;
  }

  label {
      display: block;
  }

  .links line {
      stroke: #999;
      stroke-opacity: 0.6;
  }

  .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
  }
</style>
