<template>
  <div 
    :class="`column is-12 ${ view === 'VIEW_MAP' ? 'hover-effect' : ''}`">
    <div 
      :class="`card proj-card ${ view === 'VIEW_LIST' ? 'hover-effect' : ''}`"
      >
      

      <!-- BLOCK IMAGE -->
      <router-link 
        :to="`/${dataset_uri}/detail?id=${matchItemWithConfig('block_id')}`" 
        class="card-image"
        >
        <img 
          class="proj-card-img" 
          :src="itemInfos.image" 
          :alt="itemInfos.title" 
        >
      </router-link>

      <!-- BLOCK ADDRESS -->
      <div class="card-content">

        <div class="content" v-if="projectCity()">
          <span class="icon">
            <img class="image is-16x16" src="/static/icons/icon_pin.svg">
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
          <router-link :to="`/${dataset_uri}/detail?id=${ matchItemWithConfig('block_id') }`">
            {{ matchItemWithConfig('block_title')}}
          </router-link>
        </p>

        <!-- BLOCK ABSTRACT -->
        <div class="content" v-if="projectAbstract()">
          <p class="subtitle is-6">
            {{ projectAbstract() }}
          </p>
        </div>

        <!-- BLOCK SOURCE -->
        <div class="content" v-if="matchItemWithConfig('block_src')">
          <p class="subtitle is-6 is-italic has-text-grey">
            {{ this.$store.getters.defaultText({txt:'source'})}} : {{ matchItemWithConfig('block_src') }}
          </p>
        </div>

        <!-- BLOCK TAGS -->
        <div class="content" v-if="Array.isArray( itemInfos.tags ) && itemInfos.tags.length >=1">
          <span v-for="tag in itemInfos.tags" class="tag" :key="tag">
              {{ tag }}
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
  //   console.log("\n - - ProjectCard / beforeCreate ... ")
  // },
  // created: function () {
  //   console.log("\n - - ProjectCard / created ... ")
  // },
  beforeMount: function () {
    // console.log("\n - - ProjectCard / beforeMount ... ")
    // console.log(" - - ProjectCard / this.contentFields : \n ", this.contentFields)
    // console.log(" - - ProjectCard / this.item : \n ", this.item)
    // console.log(" - - ProjectCard / this.$store.state.config.global.app_basic_dict : \n ", this.$store.state.config.global.app_basic_dict)

  },
  // mounted : function () {
  //   console.log("\n - - ProjectCard / mounted ... ")
  //   console.log("- - ProjectCard / this.routeConfig", this.routeConfig)
  // },

  computed: {
    // summary(){
    //   const {description = '(projet sans résumé)'} = this.item
    //   const tail = description.length > MAX_SUMMARY_LENGTH ? '...' : '';
    //   return description.slice(0, MAX_SUMMARY_LENGTH) + tail
    // },
    dataset_uri(){
      return this.$store.state.search.dataset_uri
    },
    itemInfos(){
      return this.$store.getters.getProjectConfigUniform(this.item)
      // return this.item
    },
    noData() {
      return this.$store.getters.defaultText({txt:'no_data'})
    },
    noAbstractText() {
      return this.$store.getters.defaultText({txt:'no_abstract'})
    },
    noInfos() {
      return this.$store.getters.defaultText({txt:'no_info'})
    },
    noAddress() {
      return this.$store.getters.defaultText({txt:'no_address'})
    },
  },
  methods : {
    matchItemWithConfig(fieldBlock) {
      // console.log("matchItemWithConfig / fieldBlock : ", fieldBlock )
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      if (contentField) {
        const field = contentField.field
        return this.item[field]
      }
      else {
        return undefined
      }
    },
    itemImage(fieldBlock){
      return this.$store.getters.getImageUrl({item: this.item, position: fieldBlock})
      // return this.item
    },
    projectId() {
      return this.matchItemWithConfig('block_id')
    },
    projectAbstract() {
      let fullAbstract = this.matchItemWithConfig('block_abstract')
      fullAbstract = ( fullAbstract == null ) ? this.noAbstractText : fullAbstract
      const tail = fullAbstract.length > MAX_SUMMARY_LENGTH ? '...' : '';
      return fullAbstract.slice(0, MAX_SUMMARY_LENGTH) + tail
    },
    projectInfo(field) {
      let fullInfo = this.matchItemWithConfig(field)
      fullInfo = ( fullInfo == null ) ? this.noInfos : fullInfo
      return fullInfo
    },
    projectAddress() {
      let fullAddress = this.matchItemWithConfig('block_address')
      console.log('fullAddress : ', fullAddress)
      let address = ( fullAddress || fullAddress !== 'None' ) ?  fullAddress : this.noAddress
      return address
    },
    projectCity() {
      let cityItem = this.matchItemWithConfig('block_city')
      // console.log('cityItem : ', cityItem)
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
