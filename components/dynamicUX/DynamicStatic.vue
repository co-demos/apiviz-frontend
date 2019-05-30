<template>

    <!-- DEBUGGING -->
    <!-- <div>
        - localRouteConfig : <br><code>{{ localRouteConfig }}</code><br>
        - appConfig : <br><code>{{ this.appConfig }}</code><br>
    </div>-->

    <!-- MAIN PART -->
    <div class="skip-navbar">

      <span v-html="rawHtml"></span>

    </div>

  <!-- </section> -->
</template>

<script>
import axios from 'axios'
import { loadScript, activateCarousel } from '~/plugins/utils'
import { mapState, mapGetters } from 'vuex';

export default {

  name: 'DynamicStatic',

  props: [
    'routeConfig',
  ],

  beforeMount : function(){
    // this.log && console.log('\nC-DynamicStatic / beforeMount...')
  },

  data: () => {
    return   {
      rawHtml : ''
    }
  },

  computed: {

    ...mapState({
      log:'log',
      user: 'user'
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
        // this.log && console.log("rawHtml is not blank anymore")
        this.loadExtScript()
      }
      else{
        // this.log && console.log(oldRawHtml, newRawHtml)
      }
    }
  },

  beforeMount : function(){
    // this.log && console.log("\nC-DynamicStatic / beforeMount ... ")
  },

  mounted(){
    // this.log && console.log("C-DynamicStatic / mounted ... ")
    this.getRawHtml()
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

      // here we go fetch the raw HTML content of a webpage
      let template_url = (this.localRouteConfig && this.localRouteConfig.template_url) ? this.localRouteConfig.template_url : 'https://co-demos.com/error'
      this.log && console.log('template_url : ', template_url)
      let head = {
        headers: {
        //  'Access-Control-Allow-Origin': '*', // Uncommented, to try
          'accept' : 'text/html',
        }
      }
      this.rawHtml = ''
      axios.get(template_url, head)
        .then( (response) => {
          //this.log && console.log(response);
          this.rawHtml = (response && response.data) ? response.data : '<br><br>there is an Error <br><br>'}
        )
        .catch( (err) => {this.rawHtml = '<br><br>there is an <strong> Error </strong><br><br>'} )

    },

    loadExtScript(){
      // IMPORT EXT SCRIPT
      // Cf:
      // https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github
      // https://stackoverflow.com/questions/45047126/how-to-add-external-js-scripts-to-vuejs-components
      if (this.localRouteConfig && this.localRouteConfig.has_ext_script) {

        let ext_script_url = this.localRouteConfig.ext_script_url;
        this.log && console.log(ext_script_url + " is ext_script")
        let extScript = document.createElement('script');
        extScript.setAttribute('src', ext_script_url);
        extScript.setAttribute('type', "text/javascript");
        document.head.appendChild(extScript);

      }

      // ACTIVATE CAROUSELS
      if (this.localRouteConfig && this.localRouteConfig.has_carousel){
        this.log && console.log("load carousel from utils");
        loadScript("https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.4/dist/js/bulma-carousel.min.js", activateCarousel);
        
        // activateCarousel() 
        // activateCarousel(slidesNumber=2, isInfinite=true, hasPagination=true)
      }
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }

  }

}
</script>
