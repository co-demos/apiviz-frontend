<template>
  <div>


    <div
      v-if="getPosition('field_main_title')"
      :class="`${getFieldClass('field_main_title')} has-text-primary has-text-primary-c has-text-centered`"
      style="padding-bottom:.5em;"
      v-html="getFieldValue('field_main_title')"
    />

    <h3
      v-if="getPosition('field_title') || getPosition('field_title_post')"
      :class="`has-text-primary has-text-primary-c has-text-centered`"
      >
      <span
        v-if="getPosition('field_title')"
        :class="`${getFieldClass('field_title')}`"
        v-html="getFieldValue('field_title')"
      />
      <span
        v-if="getPosition('field_title_post')"
        :class="`${getFieldClass('field_title_post')}`"
        v-html="getFieldValue('field_title_post')"
      />
    </h3>

    <p
      v-if="getPosition('field_value')"
      :class="`${getFieldClass('field_value')}`"
      v-html="getFieldValue( 'field_value' )"
    />

    <p
      v-if="getPosition('field_info')"
      :class="`${getFieldClass('field_info')}`"
      v-html="getFieldValue( 'field_info' )"
    />
    <!-- <button @click="popupClicked">Learn more</button> -->

  </div>
</template>

<script>
import Vue from 'vue'
// import { mapState, mapGetters, mapActions } from 'vuex'

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

    getPosition(position) {
      let posConfig = this.config.fields.find( i =>  i.position === position ) 
      return posConfig
    },

    getFieldClass(position) {
      let posConfig = this.getPosition(position)
      return posConfig.class
    },

    getFieldValue(position) {

      // console.log("\nC-MapboxPopupContent / getFieldValue / this.config : ", this.config)
      // console.log("C-MapboxPopupContent / getFieldValue / position : ", position)
      
      let posConfig = this.getPosition(position)
      // console.log("C-MapboxPopupContent / getFieldValue / posConfig : ", posConfig)

      let prop = posConfig && this.properties[ posConfig.field ]

      if (typeof prop === 'undefined') { prop = '' }

      if ( posConfig && posConfig.prefix ){
        prop =  posConfig.prefix + prop
      }

      if ( posConfig && posConfig.suffix ){
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
