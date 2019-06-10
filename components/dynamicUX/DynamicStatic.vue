<template>


  <!-- DEBUGGING -->
  <!-- <div>
      - localRouteConfig : <br><code>{{ localRouteConfig }}</code><br>
      - appConfig : <br><code>{{ this.appConfig }}</code><br>
  </div>-->

  <!-- MAIN PART -->
  <div class="skip-navbar">

    <!-- <script src="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.4/dist/js/bulma-carousel.min.js"></script> -->

    <div ref="raw" v-html="rawHtml"></div>

		<!-- <v-runtime-template :template="template"></v-runtime-template> -->

  </div>

</template>

<script>
import axios from 'axios'

// import VRuntimeTemplate from "v-runtime-template" ;
// import AppMessage from "./AppMessage" ;

import { loadScript } from '~/plugins/utils'
import { mapState, mapGetters } from 'vuex'

// import { bulmaSteps } from '@/node_modules/bulma-extensions/dist/js/bulma-extensions.min.js'
// import bulmaCarousel from '@/node_modules/bulma-carousel/dist/js/bulma-carousel.min.js'
// import {bulmaSteps, bulmaCarousel} from '@/node_modules/bulma-extensions/dist/js/bulma-extensions.min.js'


export default {

  name: 'DynamicStatic',

  components : {
    // VRuntimeTemplate,
    // AppMessage,
  },

  props: [
    // 'routeConfig',
  ],

  beforeMount : function(){
    // this.log && console.log("\nC-DynamicStatic / beforeMount ... ")
  },

  mounted(){
    this.log && console.log('\nC-DynamicStatic / mounted...')
    // this.log && console.log("C-DynamicStatic / mounted / bulmaSteps : ", bulmaSteps)
    // this.log && console.log("C-DynamicStatic / mounted / bulmaCarousel : ", bulmaCarousel)
    this.getRawHtml()
    if (this.localRouteConfig && this.localRouteConfig.has_ext_script) {
      for ( let ext_script of this.localRouteConfig.ext_script_urls ){
        if ( ext_script.at_mount ) {
          loadScript(ext_script.url, ext_script.type, undefined)
        }
      }
    }
  },


  data: () => {
    return   {
      rawHtml : '',

      bulmaExtensions: {}
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      user : state => state.user.user,
    }),

    ...mapGetters({
      localRouteConfig : 'config/getLocalRouteConfig',
    }),

  },

  watch : {

    localRouteConfig(old){
      // this.log && console.log("\n - - DynamicStatic / watch / localRouteConfig ... ")
      this.rawHtml = ''
      this.getRawHtml()
    },

    rawHtml(newRawHtml, oldRawHtml){
      if (oldRawHtml == '' && newRawHtml != ''){
        this.log && console.log("C-DynamicStatic / watch : rawHtml / rawHtml is not blank anymore")
        this.loadExtScript()
      }
      else {
        this.log && console.log(oldRawHtml, newRawHtml)
      }
    }
  },

  methods: {

    getRawHtml(){

      // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
      const int = setInterval(() => {
        if(window.pageYOffset < 50){
          clearInterval(int)
        }
        else{
          window.scrollTo(0, 0)
        }
      }, 100);


      this.rawHtml = ''

      // here we go fetch the raw HTML content of a webpage
      let template_url = (this.localRouteConfig && this.localRouteConfig.template_url) ? this.localRouteConfig.template_url : 'https://co-demos.com/error'
      this.log && console.log('C-DynamicStatic / getRawHtml / template_url : ', template_url)

      // FETCH DISTANT HTML FILE
      // if ( !isHtmlLocal && process.server) {
        let head = {
          headers: {
          //  'Access-Control-Allow-Origin': '*', // Uncommented, to try
            'accept' : 'text/html',
          }
        }
        axios.get(template_url, head)
          .then( (response) => {
            // this.log && console.log(response);
            this.rawHtml = (response && response.data) ? response.data : '<br><br>there is an Error <br><br>'},
          )
          .catch( (err) => {this.rawHtml = '<br><br>there is an <strong> Error </strong><br><br>'} )
      
      // }

      // else {

      // }

    },

    loadExtScript(){

      // IMPORT EXT SCRIPT
      // Cf:
      // https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github
      // https://stackoverflow.com/questions/45047126/how-to-add-external-js-scripts-to-vuejs-components
      if (this.localRouteConfig && this.localRouteConfig.has_ext_script) {

        this.log && console.log("C-DynamicStatic / loadExtScript / load external script")
        
        let ext_script_urls = this.localRouteConfig.ext_script_urls
        this.log && console.log("C-DynamicStatic / loadExtScript / ext_script_urls : ", ext_script_urls)

        for ( let ext_script of ext_script_urls ) {

          this.log && console.log("C-DynamicStatic / loadExtScript / ext_script : ", ext_script)

          if ( !ext_script.at_mount ){
            loadScript(ext_script.url, ext_script.type, undefined)
          }

        }


      }

      // // ACTIVATE CAROUSELS
      // if (this.localRouteConfig && this.localRouteConfig.has_carousel){

      //   this.log && console.log("C-DynamicStatic / loadExtScript / load carousel")
      //   // loadScript("https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.4/dist/js/bulma-carousel.min.js", activateCarousel);
        
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / this.rawHtml : ", this.rawHtml);

      //   let carouselSettings = this.localRouteConfig.carousel_settings
      //   this.log && console.log("C-DynamicStatic / loadExtScript / carouselSettings : ", carouselSettings);

      //   const pointer = carouselSettings.carousel_id
      //   // const pointer = ".carousel"
      //   this.log && console.log("C-DynamicStatic / loadExtScript / pointer : ", pointer);

      //   const options = {
      //     slidesToShow: carouselSettings.to_show || 1,
      //     infinite: carouselSettings.infinite || true,
      //     pagination: carouselSettings.pagination || false,
      //   }
      //   this.log && console.log("C-DynamicStatic / loadExtScript / options : ", options);

      //   // let raw = this.$refs.raw
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / this.$refs.raw : \n", raw );

      //   // let rawChildren = this.$refs.raw.children
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / rawChildren : ", rawChildren);

      //   // let rawChildNodes = this.$refs.raw.childNodes
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / rawChildNodes : ", rawChildNodes);

      //   // let rawInnerHtml = this.$refs.raw.innerHTML
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / rawInnerHtml : ", rawInnerHtml);


      //   // for (var i = 0; i < this.$refs.raw.childNodes.length; i++) {
      //   //   console.log( "--- this.$refs.raw.childNodes["+i+"] : ", this.$refs.raw.childNodes[i] )
      //   // }


      //   // let selector = this.$refs.raw.home
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / selector : ", selector);

      //   // activateCarousel() 
      //   // activateCarousel(slidesNumber=2, isInfinite=true, hasPagination=true)

      //   // let carousels = bulmaCarousel.attach('.carousel', options)
      //   // let carousels = activateBulmaExtension(bulmaCarousel, pointer, options )
      //   // let carousels = new bulmaCarousel()
      //   // let carousels = new bulmaCarousel(this.$refs.raw[pointer]) //.attach(pointer, options)
      //   // this.log && console.log("C-DynamicStatic / loadExtScript / carousels : ", carousels);

      // }
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }

  }

}
</script>
