<template>
  <div>
    <h3
      class="has-text-primary-c"
      >
      {{ getFieldFromConfig( 'field_title' ) }} {{ getFieldFromConfig( 'field_title_post' ) }} 
    </h3>
    <p>{{ getFieldFromConfig( 'field_value' ) }}</p>
    <!-- <button @click="popupClicked">Learn more</button> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default Vue.extend({

  props: {
    feature: {
      required: true,
      type: Object,
    },
    properties: {
      required: true,
      type: Object,
    },
    config: {
      required: true,
      type: Object,
    },
    locale: {
      required: false,
      type: String,
    },
    
  },
    
  mounted(){
    // console.log("\nC-MapboxPopupContent / mounted... ")
  },

  computed: {

  },

  methods: {

    getFieldFromConfig( position ){

      // console.log("\nC-MapboxPopupContent / getFieldFromConfig / this.config : ", this.config)
      // console.log("C-MapboxPopupContent / getFieldFromConfig / position : ", position)
      
      let posConfig = this.config.fields.find( i =>  i.position === position ) 
      // console.log("C-MapboxPopupContent / getFieldFromConfig / posConfig : ", posConfig)

      let prop = posConfig && this.properties[ posConfig.field ]
      if ( posConfig.prefix ){
        prop =  posConfig.prefix + prop
      }
      if ( posConfig.suffix ){
        prop =  prop + posConfig.suffix
      }
      return prop
    },

    // popupClicked() {
    //   alert('Learn more clicked')
    // },
  },
})
</script>