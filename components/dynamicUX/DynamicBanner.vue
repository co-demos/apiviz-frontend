<template>

  <section 
    v-show="rawHtml !== '' && bannerVisible"
    :class="`is-hidden-touch ${ hasFilters ? 'banner-height-with-filters' : 'banner-height-without-filters' } has-text-center skip-navbar`"
    >

    <!-- RAW HTML FOR BANNER -->

    <!-- BUTTON TO CLOSE PREVIEW -->
    <div class="buttons is-right">
      <button 
        class="button close is-primary is-inverted" 
        @click="disableBanners"
        >
        <span class="icon is-small">
          <i class="fas fa-times"></i>
        </span>
      </button>
    </div>

    <!-- CONTENT HTML -->
    <div class="container">
      <div class="content">
        <span v-html="rawHtml"></span>
      </div>
    </div>

  </section>

</template>

<script>

import { mapState, mapGetters } from 'vuex'
import axios from 'axios'

export default {

  props:[
    // 'template_url',
    'dynamicTemplate',
  ],

  data: () => {
    return   {
      rawHtml : '',
      visible : true,
    }
  },

  beforeMount : function(){
    console.log('\nC-DynamicBanner / beforeMount...')
    console.log('C-DynamicBanner / beforeMount / this.dynamicTemplate : ', this.dynamicTemplate)
  },

  computed: {

    ...mapState({
      user: 'user',
      bannerVisible : 'bannerVisible'
    }),

    ...mapGetters({
      currentBanner : 'config/getCurrentBanner',
    }),

    hasFilters(){
      return (this.dynamicTemplate === 'DynamicStatic' )? false : true
    }

  },



  mounted(){
    
    // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
    // here we go fetch the raw HTML content of a webpage
    let template_url = (this.currentBanner.template_url) ? this.currentBanner.template_url : 'https://co-demos.com/error'
    let head = { 
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        'accept' : 'text/html',
      }
    }
    axios.get(template_url, head)
    .then( (response) => { 
      // console.log(response); 
      this.rawHtml = (response && response.data) ? response.data : '<br><br>there is an Error <br><br>'} 
    )
    .catch( (err) => {this.rawHtml = '<br><br>there is an <strong> Error </strong><br><br>'} )
  },

  methods: {

    disableBanners() {
      this.rawHtml = ''
      this.$store.commit('disableBanners')
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }

  }
}
</script>

<style scoped>

  .banner-height-with-filters {
    /* padding-top: 125px; */
    margin-top: 100px;
    margin-bottom: 30px;
    max-height: 250px
  }
  .banner-height-without-filters {
    padding-top: 60px;
    margin-top: 10px;
    margin-bottom: 30px;
    height: 250px
  }

  .buttons{
    margin-right: 3em;
  }

  .buttons{
    margin-right: 3em;
  }

  .close{
    z-index: 2;
    position:absolute;

    /* float: right;
    display: flex;  */
    /* align-self: flex-end; */
    /* justify-content: flex-end !important; */
    /* justify-content: flex-end; */
}

</style>