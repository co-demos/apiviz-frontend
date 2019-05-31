<template>
  <div>
    <style type="text/css">
      a{ 
        color : {{appColors['link']}} ;
      }
      a:hover{ 
        color : {{appColors['primary']}} ;
      }
      .has-bottom-border{
        border-bottom-color : {{ appColors['navbar-border-color'] }} !important;
      }
    </style>
        <!-- color : {{appColors['link-hover']}} -->
    <style v-for="(cCode, index) in colorCodes" 
      :key="index"
      type="text/css"
      >
        .has-text-{{ cCode }}-c{
          color : {{ appColors[cCode] }} !important ;
        }
        .has-text-{{ cCode }}-c{
          color : {{ appColors[cCode] }} !important ;
        }

        .is-{{ cCode }}-b{
          background-color : {{ appColors[cCode] }} !important ;
        }
        .is-{{ cCode }}-b.is-inverted{
          color : {{ appColors[cCode] }} !important ;
          background-color : transparent !important ;
        }
        .is-{{ cCode }}-b:focus{
          background-color : transparent !important ;
          color : {{ appColors[cCode] }} !important ;
          border-color : {{ appColors[cCode] }} !important ;
        }
        .is-{{ cCode }}-b:hover{
          background-color : transparent !important ;
          color : {{ appColors[cCode] }} !important ;
          border-color : {{ appColors[cCode] }} !important ;
        }

        .is-{{ cCode }}-b.is-outlined {
          background-color : white !important ;
          border-color : {{ appColors[cCode] }} !important ;
          color : {{ appColors[cCode] }} !important ;
        }
        .is-{{ cCode }}-b.is-outlined:focus {
          background-color : {{ appColors[cCode] }} !important ;
          border-color : transparent !important ;
          color : white !important ;
        }
        .is-{{ cCode }}-b.is-outlined:hover{
          background-color : {{ appColors[cCode] }} !important ;
          border-color : transparent !important ;
          color : white !important ;
        }

    </style>

    <!-- DEBUGGING -->
    <!-- appColors : <br><pre><code>{{ JSON.stringify(appColors, null, 1) }}</code></pre> -->

  </div>
</template>



<script>

import { mapState, mapGetters } from 'vuex'

export default {

  components: {
  },

  data () {
    return {

      colorCodes : [

        'light' ,
        'dark' ,

        'link' ,
        'link-hover',

        'primary' ,
        'info' ,
        'success' ,
        'warning' ,
        'danger' ,

        'text-color',
      ],

    }
  },

  beforeMount : function(){
    this.log && console.log('\nC-DynamicCSS.vue / beforeMount...')
    this.log && console.log('C-DynamicCSS.vue / beforeMount / this.colorCodes : ', this.colorCodes)
  },

  mounted : function(){
    this.log && console.log('C-DynamicCSS.vue / mounted...')
    this.log && console.log('C-DynamicCSS.vue / mounted / this.colorCodes : ', this.colorCodes)
  },

  computed: {

    ...mapState({
      locale : state => state.locale,
    }),

    ...mapGetters({
      locale : 'getCurrentLocale',
      // styles : 'config/getStylesConfig',
      appColors : 'config/getStylesConfigColors',

    })
  },

  methods: {
  }

}

</script>




<style>

</style>
