<template>
  <div 
    :class="`column is-12 ${ view === 'VIEW_MAP' ? 'hover-effect' : ''}`">
    <div 
      :class="`card proj-card ${ view === 'VIEW_LIST' ? 'hover-effect' : ''}`"
      >
      
      <!-- DEBUGGING -->
      <!-- <div class="container"> -->
        <!-- -- ProjectCard --<br> -->
        <!-- datasetURI : <br><code>{{ datasetURI }}</code><br> -->
        <!-- block_id : <br><code>{{ matchItemWithConfig('block_id') }}</code><br> -->
        <!-- item : <br><pre><code>{{ JSON.stringify(item , null, 1) }}</code></pre><br>  -->
        <!-- contentFields : <br><pre><code>{{ JSON.stringify(contentFields , null, 1) }}</code></pre><br>  -->
        
        <!-- filterDescriptions : <br><pre><code>{{ JSON.stringify(filterDescriptions , null, 1) }}</code></pre><br>  -->
      <!-- </div> -->

      <!-- BLOCK IMAGE -->
      <nuxt-link 
        v-if="matchItemWithConfig('block_image') && matchItemWithConfig('block_image') !== this.noData"
        :to="`/${datasetURI}/detail?id=${matchItemWithConfig('block_id')}`" 
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

        <!-- BLOCK ACTOR TOP A -->
        <p class="is-size-6 has-text-weight-bold has-text-primary has-text-primary-c" v-if="matchItemWithConfig('block_actor_top_a')">
          {{ matchItemWithConfig('block_actor_top_a')}}
        </p>

        <!-- BLOCK ADDRESS -->
        <div class="mb-3" v-if="projectCity() || matchItemWithConfig('block_actor_top_b')">

          <!-- BLOCK ADDRESS -->
          <p v-if="projectCity()">
            <span class="icon">
              <img class="image is-16x16" src="~assets/icons/icon_pin.svg">
            </span>
            <span class="is-size-7 is-capitalized">
              {{ projectCity() }}
            </span>
          </p>
          
          <!-- BLOCK ACTOR TOP B -->
          <p class="is-size-7 has-text-weight-bold has-text-primary has-text-primary-c" v-if="matchItemWithConfig('block_actor_top_b')">
            {{ matchItemWithConfig('block_actor_top_b') }}
          </p>
          
        </div>


        <!-- BLOCK TITLE -->
        <p class="title is-5 has-text-weight-bold has-text-black-ter" v-if="matchItemWithConfig('block_title')">
          <nuxt-link :to="`/${datasetURI}/detail?id=${ matchItemWithConfig('block_id') }`">
            {{ matchItemWithConfig('block_title')}}
          </nuxt-link>
        </p>

        <!-- BLOCK ACTOR TOP C -->
        <p class="is-size-6 has-text-weight-bold has-text-black-ter" v-if="matchItemWithConfig('block_actor_top_c')">
          {{ matchItemWithConfig('block_actor_top_c')}}
        </p>

        <!-- BLOCK ABSTRACT -->
        <div class="content" v-if="matchItemWithConfig('block_abstract')">
          <p class="subtitle is-6"
            v-html="matchItemWithConfig('block_abstract')"
          />
            <!-- {{ matchItemWithConfig('block_abstract') }} -->
          <!-- </p> -->
        </div>

        <!-- BLOCK ABSTRACT 1 -->
        <div class="content" v-if="matchItemWithConfig('block_abstract_1')">
          <p class="subtitle is-6"
            v-html="matchItemWithConfig('block_abstract_1')"
          />
        </div>

        <!-- BLOCK ABSTRACT 2 -->
        <div class="content" v-if="matchItemWithConfig('block_abstract_2')">
          <p class="subtitle is-6">
            {{ matchItemWithConfig('block_abstract_2') }}
          </p>
        </div>

        <!-- BLOCK_CONTACTS -->
        <div class="content">

          <!-- BLOCK PHONE -->
          <p class="is-size-7 is-marginless"
            v-if="getDataContentOrNothing('block_phone')"
            >
            <span class="has-text-weight-semibold">
              {{ basicDict.phone[locale] }} : 
            </span>
            {{ matchItemWithConfig('block_phone') }}
          </p>

          <!-- BLOCK EMAIL -->
          <p class="is-size-7 is-marginless"
            v-if="getDataContentOrNothing('block_email')"
            >
            <span class="has-text-weight-semibold">
              {{ basicDict.email[locale] }} : 
            </span>
            {{ matchItemWithConfig('block_email') }}
          </p>

          <!-- BLOCK WEBSITE -->
          <p class="is-size-7 is-marginless"
            v-if="getDataContentOrNothing('block_url')"
            >
            <span class="has-text-weight-semibold">
              {{ basicDict.website[locale] }} : 
            </span>
            <a class="link-underlined"
              :href="getDataContentOrNothing('block_url')"
              target="_blank"
              >
              {{ matchItemWithConfig('block_url') }}
            </a>
          </p>

        </div>

        <!-- BLOCK SOURCE -->
        <div class="content" v-if="matchItemWithConfig('block_src')">
          <p class="subtitle is-6 is-italic has-text-grey">
            {{ sourceText }} : {{ matchItemWithConfig('block_src') }}
          </p>
        </div>

        <!-- BLOCK TAGS -->
        <div class="content">
          
          <!-- block_tags -->
          <span v-if="convertTags('block_tags') && convertTags('block_tags').length > 0"
            >
            <button 
              v-for="(tag, i) in convertTags('block_tags')" 
              :class="`button tag ${ hasTootip('block_tags') ? 'has-tooltip-arrow  has-tooltip-multiline' : '' } ${ getItemColors('block_tags')}`"
              :key="tag.tagText+i"
              @click="addTagAsFilter('block_tags', tag)"
              :data-tooltip="hasTootip('block_tags') && tag.tagFullText"
              >
              <span>
                {{ tag.tagText }}
              </span>
              <span class="icon is-small"
                v-if="selectedFilters.get(tag.filterName) && selectedFilters.get(tag.filterName).has(tag.tagOriginal)"
                >
                <i class="fas fa-times"></i>
              </span>
            </button>
          </span>

          <!-- block_tags_bis -->
          <span v-if="convertTags('block_tags_bis') && convertTags('block_tags_bis').length > 0"
            >
            <button 
              v-for="(tag, i) in convertTags('block_tags_bis')" 
              :class="`button tag ${ hasTootip('block_tags_bis') ? 'has-tooltip-arrow has-tooltip-multiline' : '' } ${ getItemColors('block_tags_bis')}`"
              :key="tag.tagText+i"
              @click="addTagAsFilter('block_tags_bis', tag)"
              :data-tooltip="hasTootip('block_tags_bis') && tag.tagFullText"
              >
              <span>
                {{ tag.tagText }}
              </span>
              <span class="icon is-small"
                v-if="selectedFilters.get(tag.filterName) && selectedFilters.get(tag.filterName).has(tag.tagOriginal)"
                >
                <i class="fas fa-times"></i>
              </span>
            </button>
          </span>

        </div>

        <!-- BLOCK TECH -->
        <div class="content" v-if="matchItemWithConfig('block_tech')">
          <p class="is-size-7 is-italic has-text-grey">
            <span v-if="getCustomBlockTitle('block_tech')"
              >
              {{ getCustomBlockTitle('block_tech') }}
            </span>
            {{ matchItemWithConfig('block_tech') }}
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from "vuex";
import { getItemContent, getDefaultImage, trimString } from '~/plugins/utils.js';
import { BasicDictionnary } from "~/config/basicDict.js" 

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

  data(){
    return {
      basicDict : BasicDictionnary, 
    }
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
      datasetURI : 'search/getSearchDatasetURI',
      selectedFilters : 'search/getSelectedFilters',
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
    sourceText() {
      return this.defaultText({txt:'source'})
      // return this.$store.getters['config/defaultText']({txt:'source'})
    },

  },

  methods : {

    getDefaultText(txt_code){
      return this.$store.getters['config/defaultText']({txt:txt_code})
    },

    matchItemWithConfig(fieldBlock, trimmingOverride=false) {
      // this.log && console.log("C-ProjectCard / matchItemWithConfig / fieldBlock : ", fieldBlock )
      let itemContents = getItemContent(fieldBlock, this.item, this.contentFields, this.noData, this.filterDescriptions, this.locale, trimmingOverride)
      return itemContents
    },

    getDataContentOrNothing(fieldBlock) {
      let content = this.matchItemWithConfig(fieldBlock)
      if ( content && content !== this.noData ) { content = content}
      else { content = undefined }
      return content
    },

    itemImage(fieldBlock){
      let image = this.matchItemWithConfig(fieldBlock)
      // this.log && console.log('C-ProjectCard / itemImage / image : ', image)
      if ( !image ){
        // this.log && console.log('C-ProjectCard / itemImage / this.contentFields : ', this.contentFields)
        const defaultImages = this.$store.getters['config/getRouteConfigDefaultDatasetImages']
        let imageDefault = getDefaultImage(defaultImages, this.item)
        image = imageDefault
      }
      return image
    },

    projectCity() {
      let cityItem = this.matchItemWithConfig('block_city')
      // this.log && console.log('C-ProjectCard / projectCity / cityItem : ', cityItem)
      let city = ( cityItem || cityItem !== 'None' ) ?  cityItem : this.noAddress
      return city
    },

    getContentField(fieldBlock) {
      const contentsFields = this.contentFields
      const contentField = contentsFields.find(f => f.position == fieldBlock)
      return contentField
    },

    getCustomBlockTitle(fieldBlock){
      let customBlockTitle = undefined
      const contentField = this.getContentField(fieldBlock)
      if (contentField){
        customBlockTitle = contentField.custom_title
        if ( Array.isArray(customBlockTitle) ) {
          let translation = customBlockTitle.find( txt => txt.locale == this.locale )
          customBlockTitle = translation.text
        } 
      }
      return customBlockTitle
    },

    hasTootip(fieldBlock) {
      const contentsField = this.getContentField(fieldBlock)
      return contentsField.has_tooltip
    },

    convertTags(fieldBlock) {
      let locale = this.locale
      const contentField = this.getContentField(fieldBlock)
      let tags = this.matchItemWithConfig(fieldBlock, contentField && contentField.convert_from_filters)
      // this.log && console.log("\nC-ProjectCard / convertTags / tags : ", tags )
      // this.log && console.log("C-ProjectCard / convertTags / this.item : ", this.item )
      // this.log && console.log("C-ProjectCard / convertTags / tags === [this.noData] : ", tags === [this.noData] )
      if ( !tags || tags === this.noData || tags[0] === this.noData ) { tags = undefined }
      if ( tags && contentField ) {
        const trimming = contentField.field_format.trim
        const filtersDescription = this.filterDescriptions
        const filterDictionnary = filtersDescription && filtersDescription.find( filter => filter.col_name == contentField.field )
        const filterChoices = filterDictionnary ? filterDictionnary.choices : undefined

        tags = Array.isArray(tags) ? tags : [tags]
        let newTags = tags.map( tag => {

          let tagContainer = {
            filterName: filterDictionnary ? filterDictionnary.name : undefined,
            filterTitle: filterDictionnary ? filterDictionnary.filter_title.find( title => title.locale === locale ) : undefined,
            filterChoice: undefined,
            tagOriginal: tag,
            tagFullText: tag,
            tagText: tag
          }
          try {
            let choice = filterChoices.find( c => c.name === tag)
            tagContainer.filterChoice = choice

            if ( contentField.convert_from_filters ) {
              let newTagObj = choice.choice_title.find( title => title.locale === locale )
              let newText = newTagObj.text
              tagContainer.tagFullText = `${tagContainer.filterTitle.text} : ${newText}`
              tagContainer.tagText = trimString(newText, trimming)
            }

            return tagContainer
          }
          catch (err) { return tagContainer }

        })
        tags = newTags
      }
      return tags
    },

    addTagAsFilter(fieldBlock, tag) {
      // this.log && console.log("\nC-ProjectCard / addTagAsFilter / this.item : ", this.item )
      // this.log && console.log("C-ProjectCard / addTagAsFilter / tag : ", tag )
      const contentField = this.getContentField(fieldBlock)
      if ( contentField.convert_from_filters ) {
        if ( tag.tagOriginal ) {
          let filterTarget = {
            filter: tag.filterName,
            value: tag.tagOriginal
          }
          this.$store.dispatch( 'search/toggleFilter', filterTarget )
        }
      }
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

.mb-1{
  margin-bottom: .5em;
}
.mb-2{
  margin-bottom: .7em;
}
.mb-3{
  margin-bottom: .8em;
}
.mb-4{
  margin-bottom: 1em;
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
