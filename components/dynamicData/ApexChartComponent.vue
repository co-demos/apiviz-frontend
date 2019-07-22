<template>

  <!-- MAIN CHART COMPONENT -->
  <div 
    v-if="stats"
    class="columns is-multiline"
    >

    <div class="is-divider column is-12" :data-content="chart.serie_id"></div>

    <apexchart 
      :class="`column is-${ chart.col_size }`"
      :type="chart.chart_type" 
      :height="chart.height"

      :options="refinedOptions"
      :series="refinedSeries"
      >
      <!-- :options="buildChartOptions(chart)" -->
      <!-- :series="buildChartSeries(chart)" -->
    </apexChart>
    
    <div class="column is-4">
      chart.data_mapping : <br><pre><code>{{ JSON.stringify(chart.data_mapping, null, 1) }}</code></pre><br>
      stats : <br><pre><code>{{ JSON.stringify( stats, null, 1) }}</code></pre><br>
    </div>
    <div class="column is-4">
      refinedSeries : <br><pre><code>{{ JSON.stringify( refinedSeries, null, 1) }}</code></pre><br>
      refinedOptions : <br><pre><code>{{ JSON.stringify( refinedOptions, null, 1) }}</code></pre><br>
      <!-- buildChartSeries(chart) : <br><pre><code>{{ JSON.stringify(buildChartSeries(chart), null, 1) }}</code></pre><br> -->
      <!-- buildChartOptions(chart) : <br><pre><code>{{ JSON.stringify(buildChartOptions(chart), null, 1) }}</code></pre><br> -->
    </div>

  </div>
  
</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { 
    objectFromPath, 
    // iterationCopy,
    setValueToField,
    } from '~/plugins/utils.js';
  import { BasicDictionnary } from "~/config/basicDict.js" 

  // cf : https://apexcharts.com/vue-chart-demos/

  export default {

    name: 'ApexChartComponent',

    // components: {
    // },

    props: [
      'chart',
      'rawSerie',
    ],

    beforeMount : function(){
      this.log && console.log('\nC-ApexChartComponent / beforeMount...')
      this.log && console.log('\nC-ApexChartComponent / beforeMount / this.rawSerie: ', this.rawSerie)
      this.stats = this.rawSerie
      this.buildChartSeries() 
    },

    mounted(){
      this.log && console.log('C-ApexChartComponent / mounted ...')
    },

    watch: {
      rawSerie(next, prev){
        this.stats = this.rawSerie
        this.buildChartSeries() 
      }
    },

    data(){
      return {

        basicDict : BasicDictionnary, 
        
        stats : undefined,

        refinedSeries : undefined,
        refinedOptions : undefined,

      }

    },

    computed: {
      
      projectContentsFields() {
        return this.routeConfig.contents_fields
      },

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
      }),

      ...mapGetters({
      }),

    },

    methods: {
      

      // buildChartOptions( chartSettings ){

      //   const chartId = chartSettings.serie_id
      //   this.log && console.log('\nC-ApexChartComponent-buildChartOptions / chartId : ', chartId)

      //   this.log && console.log('C-ApexChartComponent-buildChartOptions / chartSettings : ', chartSettings)
      //   let chartOptions = chartSettings.chart_options
      //   this.log && console.log('C-ApexChartComponent-buildChartOptions / chartOptions : ', chartOptions)

      //   let rawSerie = this.stats

      //   let dataMapping = chartSettings.data_mapping
      //   let dataPath = dataMapping.serie_path



      //   return chartOptions
      // },

      buildChartSeries(){

        const chartId = this.chart.serie_id
        this.log && console.log('\nC-ApexChartComponent-buildChartSeries / chartId :', chartId)

        // let chartOptions = this.chart.chart_options
        let chartOptions = JSON.parse(JSON.stringify( this.chart.chart_options ))
        this.log && console.log('C-ApexChartComponent-buildChartSeries / this.chart :', this.chart)

        // let rawSerie = this.stats
        let rawSerie = JSON.parse(JSON.stringify(this.stats))
        this.log && console.log('C-ApexChartComponent-buildChartSeries / rawSerie :', rawSerie)

        let dataMapping = this.chart.data_mapping

        let dataPath = dataMapping.serie_path
        let dataNameField = dataMapping.serie_name_field
        let dataSerieSettings = dataMapping.serie_data
        let dataValueField = dataSerieSettings.data_value

        let serieChartOptions = dataMapping.serie_chart_options

        let dataObject = objectFromPath( rawSerie, dataPath )
        this.log && console.log('C-ApexChartComponent-buildChartSeries / dataObject :', dataObject)

        // add infos to chartOptions
        if ( serieChartOptions && serieChartOptions.length > 0 ){

          for ( let option of serieChartOptions)  {

            let optionPath = option.options_field_path.split('/')
            this.log && console.log('C-ApexChartComponent-buildChartSeries / optionsBeforeList / optionPath :', optionPath)

            let buildFromPath = option.build_list_from.split('/')
            this.log && console.log('C-ApexChartComponent-buildChartSeries / optionsBeforeList / buildFromPath :', buildFromPath)

            let optionVals = []
            dataObject.forEach( serie => {
              let val = objectFromPath( serie, buildFromPath )
              optionVals.push(val)
            }) 

            chartOptions[ optionPath[0] ] = optionVals

          }
        }

        let dataObjectRefined = dataObject.map( item => {
          
          this.log && console.log('C-ApexChartComponent-buildChartSeries / map / item :', item)
          const container = {}

          // remap serie name
          container.name = item[ dataNameField ]

          // remap serie data values 
          let serieData = objectFromPath( item, dataSerieSettings.subpath )
          this.log && console.log('C-ApexChartComponent-buildChartSeries / map / serieData :', serieData)

          // add missing fields
          if ( dataSerieSettings.add_missing_values ){

            let missingFields = dataSerieSettings.missing_data_by.val_fields_list
            // this.log && console.log('C-ApexChartComponent-buildChartSeries / map / add_missing_values / missingFields :', missingFields)

            let fieldName = dataSerieSettings.missing_data_by.val_field
            // this.log && console.log('C-ApexChartComponent-buildChartSeries / map / add_missing_values / fieldName :', fieldName)
            
            let existingFields = serieData.map( data => {
              return data[ fieldName ]
            })

            for ( let field of missingFields ) {
              if ( !existingFields.includes(field) ) {
                let missingData = {}
                missingData[ dataValueField ] = 0 
                missingData[ fieldName ] = field
                serieData.push( missingData )
              } 
            }
          }
          this.log && console.log('C-ApexChartComponent-buildChartSeries / map / (after add_missing_values) serieData :', serieData)

          // need sorting
          if ( dataSerieSettings.need_sorting ) {
            let sortingField = dataSerieSettings.sorting_by.sort_field
            // this.log && console.log('C-ApexChartComponent-buildChartSeries / map / sorting / sortingField :', sortingField)
            serieData = serieData.sort( (a,b) => ( a[ sortingField ] > b[ sortingField ] ) ? 1 : -1 )
          }
          this.log && console.log('C-ApexChartComponent-buildChartSeries / map / (after need_sorting) serieData :', serieData)

          if ( dataSerieSettings.need_remap ) {
            serieData = serieData.map( data => {
              // this.log && console.log('C-ApexChartComponent-buildChartSeries / map / need_remap / data :', data)
              return data[ dataValueField ]
            })
          }
          this.log && console.log('C-ApexChartComponent-buildChartSeries / map / (after need_remap) serieData :', serieData)

          container.data = serieData
          return container
        })
        this.log && console.log('C-ApexChartComponent-buildChartSeries / (before need_list_only) dataObjectRefined :', dataObjectRefined)




        // list only
        if ( dataSerieSettings.need_list_only ) {
          dataObjectRefined = dataObjectRefined.map( dataObj => {
            return dataObj.data[ dataValueField ]
          })
        }
        this.log && console.log('C-ApexChartComponent-buildChartSeries / dataObjectRefined :', dataObjectRefined)


        this.refinedSeries = dataObjectRefined

        this.refinedOptions = chartOptions

        // return dataObject
        // return dataObjectRefined
      },




    },


  }
</script>

<style scoped>

</style>
