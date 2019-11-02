<template>
  <div>
    <style type="text/css">
      a{ 
        color : {{appColors['link']}};
      }
      a:hover{ 
        color : {{appColors['primary']}} ;
      }
      .link-underlined{ 
        text-decoration: underline;      
      }
      .has-bottom-border{
        border-bottom-color : {{ appColors['navbar-border-color'] }} !important;
      }
      .a-anim:before{
        background-color: {{appColors['primary']}} !important;
      }
      .apiviz-tabs li:not(:last-child){
        border-right: 1px solid {{appColors['primary']}} !important;
      }
      .lds-roller div:after {
        background:  {{appColors['primary']}} !important;
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
      .has-text-{{ cCode }}-hover-c:hover{
        color : {{ appColors[cCode] }} !important ;
      }

      .is-underlined-{{cCode}}-c {
        border-bottom: solid !important;
        border-color : {{ appColors[cCode] }} !important ;
      }
      .menu-delimiter-{{cCode}}-c{
        margin:0em 0em 1.5em 0em ;
        background-color: {{ appColors[cCode] }} !important;
      }

      .is-{{ cCode }}-b{
        background-color : {{ appColors[cCode] }} !important ;
      }
      .is-{{ cCode }}-b.is-inverted{
        color : {{ appColors[cCode] }} !important ;
        background-color : white !important ;
      }
      .is-{{ cCode }}-b:focus{
        background-color : white !important ;
        color : {{ appColors[cCode] }} !important ;
        border-color : {{ appColors[cCode] }} !important ;
      }
      .is-{{ cCode }}-b:hover{
        background-color : white !important ;
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
        border-color : white !important ;
        color : white !important ;
      }
      .is-{{ cCode }}-b.is-outlined:hover{
        background-color : {{ appColors[cCode] }} !important ;
        border-color : white !important ;
        color : white !important ;
      }

      .is-checkradio-c[type="checkbox"] + label::after, .is-checkradio-c[type="checkbox"] + label::after{
        border-color : {{ appColors[cCode] }} !important ;
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
