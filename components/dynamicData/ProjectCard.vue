<template>
  <div 
    :class="`column is-12 ${ view === 'VIEW_MAP' ? 'hover-effect' : ''}`">
    <div 
      :class="`card proj-card ${ view === 'VIEW_LIST' ? 'hover-effect' : ''}`"
      >
      
      <!-- DEBUGGING -->
      <!-- <div class="container"> -->
        <!-- -- ProjectCard --<br> -->
        <!-- dataset_uri : <br><code>{{ dataset_uri }}</code><br> -->
        <!-- block_id : <br><code>{{ matchItemWithConfig('block_id') }}</code><br> -->
        <!-- item : <br><pre><code>{{ JSON.stringify(item , null, 1) }}</code></pre><br>  -->
        <!-- contentFields : <br><pre><code>{{ JSON.stringify(contentFields , null, 1) }}</code></pre><br>  -->
        
        <!-- filterDescriptions : <br><pre><code>{{ JSON.stringify(filterDescriptions , null, 1) }}</code></pre><br>  -->
      <!-- </div> -->

      <!-- BLOCK IMAGE -->
      <nuxt-link 
        :to="`/${dataset_uri}/detail?id=${matchItemWithConfig('block_id')}`" 
        class="card-image"
        >
        <img 
          class="proj-card-img" 
          :src="itemImage('block_image')" 
          :alt="itemInfos.title" 
        >
          <!-- :src="matchItemWithConfig('block_image')" -->
      </nuxt-link>

      <!-- BLOCK ADDRESS -->
      <div class="card-content">

        <div class="content" v-if="projectCity()">
          <span class="icon">
            <img class="image is-16x16" src="~assets/icons/icon_pin.svg">
          </span>
          <span class="subtitle is-6 is-capitalized">
            <!-- {{ matchItemWithConfig('block_address')}} -->
            <!-- {{ projectAddress() }} -  -->
            <!-- {{ matchItemWithConfig('block_city')}} -->
            {{ projectCity() }}

            <!-- {{ noAddress() }} -->
          </span>
        </div>

        <!-- BLOCK TITLE -->
        <p class="title is-5 has-text-weight-bold has-text-black-ter" v-if="matchItemWithConfig('block_id')">
          <nuxt-link :to="`/${dataset_uri}/detail?id=${ matchItemWithConfig('block_id') }`">
            {{ matchItemWithConfig('block_title')}}
          </nuxt-link>
        </p>

        <!-- BLOCK ABSTRACT -->
        <!-- <div class="content" v-if="projectAbstract()"> -->
        <div class="content" v-if="matchItemWithConfig('block_abstract')">
          <p class="subtitle is-6">
            <!-- {{ projectAbstract() }} -->
            {{ matchItemWithConfig('block_abstract') }}
          </p>
        </div>

        <!-- BLOCK SOURCE -->
        <div class="content" v-if="matchItemWithConfig('block_src')">
          <p class="subtitle is-6 is-italic has-text-grey">
            {{ this.$store.getters['config/defaultText']({txt:'source'})}} : {{ matchItemWithConfig('block_src') }}
          </p>
        </div>

        <!-- BLOCK TAGS -->
        <!-- <div class="content" v-if="Array.isArray( itemInfos.tags ) && itemInfos.tags.length >=1">
          <span v-for="tag in itemInfos.tags" class="tag" :key="tag">
              {{ tag }}
          </span>
        </div> -->
        <div class="content" v-if="matchItemWithConfig('block_tags')">
          <span v-for="(tag, i) in matchItemWithConfig('block_tags')" class="tag" :key="tag+i">
            {{ tag }}
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from "vuex";
import { getItemContent, getDefaultImage } from '~/plugins/utils.js';

const MAX_SUMMARY_LENGTH = 120;

export default {

  name: 'ProjectCard',

  components: {},

  props: [
    'item',
    'contentFields',
    'view'
    ],

  // beforeCreate: function () {
    // this.log && console.log('\nC-ProjectCard / beforeCreate...')
  // },
  // created: function () {
    // this.log && console.log('\nC-ProjectCard / created...')
  // },

  beforeMount: function () {
    // this.log && console.log('\nC-ProjectCard / beforeMount...')
    // this.log && console.log('\nC-ProjectCard / this.contentFields : ', this.contentFields)
    // this.log && console.log('\nC-ProjectCard / this.item : ', this.item)
    // this.log && console.log('\nC-ProjectCard /  this.$store.state.config.config.global.app_basic_dict : ',  this.$store.state.config.config.global.app_basic_dict)

  },
  mounted : function () {
    // this.log && console.log('\nC-ProjectCard / mounted...')
    // this.log && console.log('\nC-ProjectCard / this.routeConfig : ', this.routeConfig)
  },

  watch : {

    // item(next, prev){
    //   this.log && console.log('\nC-ProjectCard / watch - item ...')
    //   this.log && console.log('\nC-ProjectCard / watch - next :', next)
    // },
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
    }),

    ...mapGetters({
      dataset_uri : 'search/getSearchDatasetURI',
      filterDescriptions : 'search/getFilterDescriptions',
    }),

    // dataset_uri(){
    //   return this.$store.state.search.search.dataset_uri
    // },
    itemInfos(){
      return this.$store.getters['search/getProjectConfigUniform'](this.item)
      // return this.item
    },
    noData() {
      return this.$store.getters['config/defaultText']({txt:'no_data'})
    },
    noAbstractText() {
      return this.$store.getters['config/defaultText']({txt:'no_abstract'})
    },
    noInfos() {
      return this.$store.getters['config/defaultText']({txt:'no_info'})
    },
    noAddress() {
      return this.$store.getters['config/defaultText']({txt:'no_address'})
    },

  },

  methods : {

    getDefaultText(txt_code){
      return this.$store.getters['config/defaultText']({txt:txt_code})
    },

    matchItemWithConfig(fieldBlock) {

      // this.log && console.log("C-ProjectCard / matchItemWithConfig / fieldBlock : ", fieldBlock )

      return getItemContent(fieldBlock, this.item, this.contentFields, this.noData, this.filterDescriptions, this.locale)

      /*
        const contentField = this.contentFields.find(f=> f.position == fieldBlock)
        if (contentField) {
          const field = contentField.field
          return this.item[field]
        }
        else {
          return undefined
        }
      */



    },

    // itemImage(fieldBlock){
    //   return this.$store.getters['search/getImageUrl']({item: this.item, position: fieldBlock})
    //   // return this.item
    // },

    itemImage(fieldBlock){
      let image = this.matchItemWithConfig(fieldBlock)
      if ( !image ){
        let d = this.$store.getters['config/getRouteConfigDefaultDatasetImages']
        let image_default = getDefaultImage(d, this.item)
        image = image_default
      }
      return image
    },

    projectId() {
      return this.matchItemWithConfig('block_id')
    },

    projectAbstract() {
      let fullAbstract = this.matchItemWithConfig('block_abstract')
      // fullAbstract = ( fullAbstract == null ) ? this.noAbstractText : fullAbstract
      // const tail = fullAbstract.length > MAX_SUMMARY_LENGTH ? '...' : '';
      // return fullAbstract.slice(0, MAX_SUMMARY_LENGTH) + tail
      return fullAbstract
    },

    // projectInfo(field) {
    //   let fullInfo = this.matchItemWithConfig(field)
    //   fullInfo = ( fullInfo == null ) ? this.noInfos : fullInfo
    //   return fullInfo
    // },

    projectAddress() {
      let fullAddress = this.matchItemWithConfig('block_address')
      // this.log && console.log('C-ProjectCard / fullAddress : ', fullAddress)
      let address = ( fullAddress || fullAddress !== 'None' ) ?  fullAddress : this.noAddress
      return address
    },

    projectCity() {
      let cityItem = this.matchItemWithConfig('block_city')
      // this.log && console.log('C-ProjectCard / cityItem : ', cityItem)
      let city = ( cityItem || cityItem !== 'None' ) ?  cityItem : this.noAddress
      return city
    },

  },

};
</script>

<style lang="scss" scoped>
@import '../../assets/css/apiviz-misc.scss';

.card-image {
    min-height: 100px;
}

.card-image img{
    width: 100%;
}

.proj-card {
	border-radius: 3px ;
  box-shadow : $apiviz-discrete-shadow;
}
.hover-effect:hover {
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
}

.proj-card-img {
	border-radius : 3px 3px 0px 0px ;
}

.card-content .tag{
    margin-right: 0.5em;
    margin-bottom: 0.5em;

    padding: 0.2em 1em;

    background-color: #767676;
    color: white;

    font-size: 12px;
}

.card-content img{
    max-height: 1.1em;
    transform: translateY(0.1em);
}

</style>
