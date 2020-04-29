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

      <!-- CONTENTS -->
      <div class="card-content">

        <!-- BLOCK ADDRESS -->
        <div class="content" v-if="projectCity()">
          <span class="icon">
            <img class="image is-16x16" src="~assets/icons/icon_pin.svg">
          </span>
          <span class="subtitle is-6 is-capitalized">
            <!-- {{ matchItemWithConfig('block_address')}} -->
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
        <div class="content" v-if="matchItemWithConfig('block_abstract')">
          <p class="subtitle is-6">
            {{ matchItemWithConfig('block_abstract') }}
          </p>
        </div>

        <!-- BLOCK ABSTRACT 1 -->
        <div class="content" v-if="matchItemWithConfig('block_abstract_1')">
          <p class="subtitle is-6">
            {{ matchItemWithConfig('block_abstract_1') }}
          </p>
        </div>

        <!-- BLOCK ABSTRACT 2 -->
        <div class="content" v-if="matchItemWithConfig('block_abstract_2')">
          <p class="subtitle is-6">
            {{ matchItemWithConfig('block_abstract_2') }}
          </p>
        </div>

        <!-- BLOCK SOURCE -->
        <div class="content" v-if="matchItemWithConfig('block_src')">
          <p class="subtitle is-6 is-italic has-text-grey">
            {{ this.$store.getters['config/defaultText']({txt:'source'})}} : {{ matchItemWithConfig('block_src') }}
          </p>
        </div>

        <!-- BLOCK TAGS -->
        <div class="content">
          <span v-if="convertTags('block_tags')">
            <span 
              v-for="(tag, i) in convertTags('block_tags')" 
              :class="`tag ${ getItemColors('block_tags')}`"
              :key="tag+i"
              >
              {{ tag }}
            </span>
          </span>
          <span v-if="convertTags('block_tags_bis')">
            <span 
              v-for="(tag, i) in convertTags('block_tags_bis')" 
              :class="`tag ${ getItemColors('block_tags_bis')}`"
              :key="tag+i"
              >
              {{ tag }}
            </span>
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from "vuex";
import { getItemContent, getDefaultImage, trimString } from '~/plugins/utils.js';

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
    this.log && console.log('\nC-ProjectCard / this.contentFields : ', this.contentFields)
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
      breakpoint : state => state.breakpoint,
    }),

    ...mapGetters({
      dataset_uri : 'search/getSearchDatasetURI',
      filterDescriptions : 'search/getFilterDescriptions',
      getProjectConfigUniform : 'search/getProjectConfigUniform',
      defaultText : 'config/defaultText',
    }),

    itemInfos(){
      return this.getProjectConfigUniform(this.item)
      // return this.$store.getters['search/getProjectConfigUniform'](this.item)
    },
    noData() {
      return this.defaultText({txt:'no_data'})
      // return this.$store.getters['config/defaultText']({txt:'no_data'})
    },
    noAbstractText() {
      return this.defaultText({txt:'no_abstract'})
      // return this.$store.getters['config/defaultText']({txt:'no_abstract'})
    },
    noInfos() {
      return this.defaultText({txt:'no_info'})
      // return this.$store.getters['config/defaultText']({txt:'no_info'})
    },
    noAddress() {
      return this.defaultText({txt:'no_address'})
      // return this.$store.getters['config/defaultText']({txt:'no_address'})
    },

  },

  methods : {

    getDefaultText(txt_code){
      return this.$store.getters['config/defaultText']({txt:txt_code})
    },

    matchItemWithConfig(fieldBlock) {
      // this.log && console.log("C-ProjectCard / matchItemWithConfig / fieldBlock : ", fieldBlock )
      let itemContents = getItemContent(fieldBlock, this.item, this.contentFields, this.noData, this.filterDescriptions, this.locale)
      return itemContents
    },

    itemImage(fieldBlock){
      // console.log("C-ProjectCard / itemImage / fieldBlock : ", fieldBlock )
      let image = this.matchItemWithConfig(fieldBlock)
      // console.log("C-ProjectCard / itemImage / this.contentFields : ", this.contentFields )
      if ( !image ){
        let idFieldObject = this.contentFields.find( c => c.position === 'block_id' )
        // let idField = idFieldObject.field
        let idField = idFieldObject ? idFieldObject.field : 'sd_id'
        let d = this.$store.getters['config/getRouteConfigDefaultDatasetImages']
        let image_default = getDefaultImage(d, this.item, idField)
        image = image_default
      }
      return image
    },

    projectCity() {
      let cityItem = this.matchItemWithConfig('block_city')
      // this.log && console.log('C-ProjectCard / cityItem : ', cityItem)
      let city = ( cityItem || cityItem !== 'None' ) ?  cityItem : this.noAddress
      return city
    },

    getContentField(fieldBlock) {
      const contentsFields = this.contentFields
      const contentField = contentsFields.find(f=> f.position == fieldBlock)
      return contentField
    },

    convertTags(fieldBlock) {
      let locale = this.locale
      let tags = this.matchItemWithConfig(fieldBlock)
      // this.log && console.log("\nC-ProjectCard / convertTags / tags : ", tags )
      const contentField = this.getContentField(fieldBlock)
      if ( tags !== this.noData && contentField && contentField.convert_from_filters ) {
        const trimming = contentField.field_format.trim
        const filtersDescription = this.filterDescriptions
        const filterDictionnary = filtersDescription.find( filter => filter.col_name == contentField.field )
        const filterChoices = filterDictionnary.choices
        let newTags = tags.map( tag => {
          try {
            let choice = filterChoices.find( c => c.name == tag)
            let newTagObj = choice.choice_title.find( title => title.locale == locale )
            let newText = newTagObj.text
            return trimString(newText, trimming)
          }
          catch (err) { return tag }
        })
        tags = newTags
      }
      if ( tags === this.noData ) { tags = undefined }
      return tags
    },

    getItemColors(fieldBlock) {
      let contentField = this.getContentField( fieldBlock )
      let textColor = contentField.item_color ? contentField.item_color : "white"
      let backgroundColor = contentField.background_color ? contentField.background_color : "dark"
      let colors = `is-${backgroundColor} is-${backgroundColor}-b has-text-${textColor} has-text-${textColor}-c`
      return colors
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
  font-size: 12px;
}

.card-content img{
  max-height: 1.1em;
  transform: translateY(0.1em);
}

</style>
