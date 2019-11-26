<template>
  <div>

    <main v-if="!displayableItem">
      
      <div 
        class="container"
        :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
        >
        <div class="pending">
          <!-- Recherche en cours... -->
          {{ basicDict.request_loading[locale] }}
        </div>

      </div>
    </main>
      
    <main v-if="displayableItem">
      
      <div class="container">

        <!-- BACK TO RESULTS -->
        <a class="back" @click="goBack">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>
            <!-- {{ backToResults }} -->
            {{ getDefaultText('back_to_results') }}
          </span>
        </a>


        <!-- DEBUGGING  -->
        <!-- {{ displayableItem }} -->


        <div class="columns">
          
          <!-- //// COLUMN LEFT //// -->
          <div class="column is-5 is-offset-1">
            <div class="description">

              <!-- BLOCK TITLE -->
              <h1 id="block-title" class="title is-3">
                {{ matchProjectWithConfig('block_title')}}
              </h1>

              <!-- BLOCK MAIN TAGS -->
              <div id="block-main-tags" v-if="isPositionFilled('block_main_tags')">
                <span 
                  v-if="getCustomBlockTitle('block_main_tags')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                  >
                  {{ getCustomBlockTitle('block_main_tags') }}
                </span>
                <br>
                <span 
                  class="tag" 
                  v-for="(tag, i) in matchProjectWithConfig('block_main_tags')"
                  :key="tag + i"
                  >
                  {{ tag }}
                </span>
                <br><br>
              </div>

              <!-- BLOCK ADDRESS -->
              <p id="block-address" v-if="isPositionFilled('block_address')">
                <span class="icon">
                  <img class="image is-16x16" src="~assets/icons/icon_pin.svg">
                </span>
                {{ matchProjectWithConfig('block_address')}}
              </p>

              <!-- BLOCK PRE ABSTRACT -->
              <p id="block-pre-abstract" v-if="isPositionFilled('block_pre_abstract')">
                <span 
                  v-if="getCustomBlockTitle('block_pre_abstract')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                  >
                  {{ getCustomBlockTitle('block_pre_abstract') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_pre_abstract')}}
              </p>

              <!-- BLOCK ABSTRACT -->
              <p id="block-abstract" v-if="isPositionFilled('block_abstract')">
                <span 
                  v-if="getCustomBlockTitle('block_abstract')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                  >
                  {{ getCustomBlockTitle('block_abstract') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_abstract')}}
              </p>
              
              <!-- BLOCK PARTNERS -->
              <div id="block-partners" v-if="isPositionFilled('block_partners')">
                <p>{{ matchProjectWithConfig('block_partners')}}</p>
              </div>

              <!-- BLOCK POST ABSTRACT 1 -->
              <p id="block-post-abstract-1" v-if="isPositionFilled('block_post_abstract_1')">
                <span 
                  v-if="getCustomBlockTitle('block_post_abstract_1')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                  >
                  {{ getCustomBlockTitle('block_post_abstract_1') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_post_abstract_1')}}
              </p>

              <!-- BLOCK POST ABSTRACT 2 -->
              <p id="block-post-abstract-2" v-if="isPositionFilled('block_post_abstract_2')">
                <span 
                  v-if="getCustomBlockTitle('block_post_abstract_2')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                  >
                  {{ getCustomBlockTitle('block_post_abstract_2') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_post_abstract_2')}}
              </p>
              <!-- BLOCK POST ABSTRACT 3 -->
              <p id="block-post-abstract-3" v-if="isPositionFilled('block_post_abstract_3')">
                <span 
                  v-if="getCustomBlockTitle('block_post_abstract_3')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                  >
                  {{ getCustomBlockTitle('block_post_abstract_3') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_post_abstract_3')}}
              </p>

              <!-- BLOCK WEBSITE / CONTACT -->
              <div class="columns">

                <!-- BLOCK WEBSITE -->
                <div id="block-main-website" class="column is-5 is-offset-1 link">
                  <a
                    v-if="matchProjectWithConfig('block_wesite')"
                    :class="matchProjectWithConfig('block_wesite') === noData ? 'disabled has-text-grey' : '' "
                    :href="matchProjectWithConfig('block_wesite') === noData ? '' : matchProjectWithConfig('block_wesite') "
                    target="_blank">
                    <!-- {{ seeWebsite }} -->
                    {{ getDefaultText('see_website') }}
                  </a>
                </div>
                
                <!-- BLOCK CONTACT -->
                <div id="block-main-contact" class="column is-5 is-offset-1 link">
                  <a
                    v-if="matchProjectWithConfig('block_contact')"
                    :class="matchProjectWithConfig('block_contact') === noData ? 'disabled has-text-grey' : '' "
                    :href="matchProjectWithConfig('block_wesite') === noData ? '' :'mailto:' + matchProjectWithConfig('block_contact') "
                    target="_blank">
                    <!-- {{ seeContact }} -->
                    {{ getDefaultText('see_contact') }}
                  </a>
                </div>
              </div>

            </div>

            <!-- BLOCK SERVICES -->
            <div class="added" id="block-services" v-if="isPositionFilled('block_services')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span  
                      class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ servicesData }}  -->
                      {{ getDefaultText('services') }}
                      : <br><br>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_services')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK BOTTOM 2 -->
            <div class="added" id="block-LB2" v-if="isPositionFilled('block_left_bottom_2')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span 
                      v-if="getCustomBlockTitle('block_left_bottom_2')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                      >
                      {{ getCustomBlockTitle('block_left_bottom_2') }}
                      <br><br>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_left_bottom_2')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>  <!-- end column left -->



          <!-- //// COLUMN RIGHT //// -->
          <div class="column is-5">

            <!-- BLOCK MAIN ILLUSTRATION -->
            <a id="block-illustration" 
              :href="matchProjectWithConfig('block_wesite')" 
              target="_blank"
              >
              <img
                class="illustration"
                :src="itemImage('block_image')"
                :alt="matchProjectWithConfig('block_title')"
              />
                <!-- :src="matchProjectWithConfig('block_image')" -->
            </a>

            <!-- BLOCK FILE -->
            <div class="added" id="block-file" v-if="isPositionFilled('block_file_1')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <a
                      target="_blank"
                      :href="matchProjectWithConfig('block_file_1')"
                      >
                      <span class="icon is-small">
                        <i class="fas fa-download"></i>
                      </span>
                      <span>
                        <!-- {{ downloadFile }} -->
                        {{ getDefaultText('dowload_file') }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK SOURCE -->
            <div class="added" id="block-src" v-if="isPositionFilled('block_src')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ sourceData }}  -->
                      {{ getDefaultText('source') }}
                      : 
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_src')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK SCALE -->
            <div class="added" id="block-scale" v-if="isPositionFilled('block_scale') || isPositionFilled('block_scale_address')">
              <div class="columns">
                <div class="column is-12">

                  <div>
                    <span 
                      v-if="getCustomBlockTitle('block_scale_tags')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                      >
                      {{ getCustomBlockTitle('block_scale_tags') }}
                    </span>
                    <span 
                      class="tag" 
                      v-for="(tag, i) in matchProjectWithConfig('block_scale_tags')"
                      :key="tag + i"
                      >
                      {{ tag }}
                    </span>
                  </div>

                  <div id="block-scale-2">
                    <span 
                      v-if="getCustomBlockTitle('block_scale_2')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                      >
                      {{ getCustomBlockTitle('block_scale_2') }} 
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_scale_2')}}
                    </span>
                  </div>

                  <div id="block-scale-address" v-if="isPositionFilled('block_scale_address')">
                    <span class="icon">
                      <img class="image is-16x16" src="/static/icons/icon_pin.svg">
                    </span>
                    {{ matchProjectWithConfig('block_scale_address')}}
                  </div>

                </div>
              </div>
            </div>

            <!-- BLOCK PERIOD -->
            <div class="added" id="block-period" v-if="isPositionFilled('block_period')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ periodData }}  -->
                      {{ getDefaultText('period') }}
                      : 
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_period')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK CONTACT -->
            <div 
              v-if="isPositionFilled('block_contact_name') || isPositionFilled('block_contact_email')"
              class="added is-info-b has-text-white" 
              id="block-contact" 
              >
              <div class="columns">
                <div class="column is-12">

                  <div>
                    <span class="has-text-weight-semibold">
                      <!-- {{ seeContact }}  -->
                      {{ getDefaultText('see_contact') }}
                      : 
                    </span>
                  </div>
                  <br>

                  <div v-if="isPositionFilled('block_contact_name')">
                    <span class="icon is-small">
                      <i class="far fa-user"></i>
                    </span>
                    <span>
                      <span v-if="isPositionFilled('block_contact_name')">
                        {{ matchProjectWithConfig('block_contact_name')}} 
                      </span>
                      <span v-if="isPositionFilled('block_contact_surname')">
                        {{ matchProjectWithConfig('block_contact_surname')}}
                      </span>
                      <span v-if="isPositionFilled('block_contact_fullname')">
                        {{ matchProjectWithConfig('block_contact_fullname')}}
                      </span>
                      <span v-if="isPositionFilled('block_contact_title')"><br>
                        {{ matchProjectWithConfig('block_contact_title')}}
                        <br>
                      </span>
                    </span>
                    <br>
                  </div>

                  <div v-if="isPositionFilled('block_contact_email')">
                    <span class="icon is-small">
                      <i class="fas fa-at"></i>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_contact_email')}} <br>
                    </span>
                  </div>

                  <div v-if="isPositionFilled('block_contact_tel')">
                    <span class="icon is-small">
                      <i class="fas fa-phone"></i>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_contact_tel')}} <br>
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <!-- BLOCK OPEN INFOS -->
            <div class="added" id="block-infos" v-if="isPositionFilled('block_open_infos')">
              <div class="columns">

                <div class="column is-12">
                  
                  <div>
                    <span class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ infosData }}  -->
                      {{ getDefaultText('infos') }}
                      : <br><br>
                    </span>
                  </div>

                  <div id="block-tel" v-if="isPositionFilled('block_tel')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      <!-- {{ infosTel }}  -->
                      {{ getDefaultText('tel') }}
                      : 
                      {{ matchProjectWithConfig('block_tel')}} <br>
                    </span>
                  </div>

                  <div id="block-open-infos" v-if="isPositionFilled('block_open_infos')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      <!-- {{ infosOpen }}  -->
                      {{ getDefaultText('open_infos') }}
                      : <br>
                      {{ matchProjectWithConfig('block_open_infos')}} <br>
                    </span>
                  </div>

                  <div id="block-infos-pract" v-if="isPositionFilled('block_infos_pract')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      <!-- {{ infosMore }}  -->
                      {{ getDefaultText('more_infos') }}
                      : 
                      {{ matchProjectWithConfig('block_infos_pract')}}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            <!-- BLOCK RIGHT BOTTOM 1 -->
            <div class="added" id="block-RB1" v-if="isPositionFilled('block_right_bottom_1') || isPositionFilled('block_rb1_tags') || isPositionFilled('block_right_bottom_2') ">
              <div class="columns">
                <div class="column is-12">

                  <!-- BLOCK RB1 TAGS -->
                  <div id="block-RB1-tags" v-if="isPositionFilled('block_rb1_tags')">
                    <span 
                      v-if="getCustomBlockTitle('block_rb1_tags')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                      >
                      {{ getCustomBlockTitle('block_rb1_tags') }}
                    </span>
                    <br><br>
                    <span 
                      class="tag" 
                      v-for="(tag, i) in matchProjectWithConfig('block_rb1_tags')"
                      :key="tag + i"
                      >
                      {{ tag }}
                    </span>
                    <br><br>
                  </div>

                  <div>

                    <span 
                      v-if="getCustomBlockTitle('block_right_bottom_1')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                      >
                      {{ getCustomBlockTitle('block_right_bottom_1') }}
                      <br><br>
                    </span>

                    <span>
                      {{ matchProjectWithConfig('block_right_bottom_1')}}
                    </span>

                  </div>

                  <div v-if="isPositionFilled('block_right_bottom_2')">
                    <br>

                    <span 
                      v-if="getCustomBlockTitle('block_right_bottom_2')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c" 
                      >
                      {{ getCustomBlockTitle('block_right_bottom_2') }}
                      <br><br>
                    </span>

                    <span>
                      {{ matchProjectWithConfig('block_right_bottom_2')}}
                    </span>

                  </div>
                </div>
              </div>
            </div>


          </div> <!-- end column right -->

        </div>
      </div>

    </main>

    <NotFoundError v-if="isError"/>

  </div>
</template>



<script>
import { mapState, mapGetters } from 'vuex'

import NotFoundError from './NotFoundError.vue';

// import { getItemById } from '~/plugins/utils.js';
import { getItemContent, getDefaultImage } from '~/plugins/utils.js';
import { BasicDictionnary } from "~/config/basicDict.js" 

export default {

  name: 'DynamicDetail',

  components: {
    NotFoundError,
  },

  props: [
    'routeConfig',
    'endPointConfig',
  ],

  data: () => {
    return   {
      // displayableItem : null,
      contentFields : null,
      isError: false,
      basicDict : BasicDictionnary, 
    }
  },

  beforeMount: function () {
    this.log && console.log("\n - - DynamicDetail / beforeMount ... ")
    this.contentFields = this.routeConfig.contents_fields

    // this.log && console.log(" - - DynamicDetail / mounted / this.$route : ", this.$route )
    // this.log && console.log(" - - DynamicDetail / beforeMount / this.$nuxt.$route : ", this.$nuxt.$route )
    // this.$store.dispatch('search/searchOne', this.$nuxt.$route.query.id)

  },

  mounted(){

    // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
    this.log && console.log(" - - DynamicDetail / mounted... ")
    const int = setInterval(() => {
      if(window.pageYOffset < 50){
        clearInterval(int)
      }
      else{
        window.scrollTo(0, 0)
      }
    }, 100);

    // console.log(" - - DynamicDetail / mounted / this.$route : ", this.$route )
    this.log && console.log(" - - DynamicDetail / mounted / this.$nuxt.$route : ", this.$nuxt.$route )
    if (this.$nuxt.$route.query.id) {
      this.$store.dispatch('search/searchOne', this.$nuxt.$route.query.id)
    }

  },

  computed: {

    ...mapState({
      log: state => state.log, 
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      user: state => state.user.user,
    }),

    ...mapGetters({
      displayableItem : 'search/getDisplayedProject',
      filterDescriptions : 'search/getFilterDescriptions',
    }),

    // default texts
    // backToResults() {
    //   return this.$store.getters['config/defaultText']({txt:'back_to_results'})
    // },

    // POSITIONS TO BE FILLED
    listOfPositions() {
      // this.log && console.log("listOfPositions /  this.contentFields.map( c => c.position ) :", this.contentFields.map( c => c.position ))
      return this.contentFields.map( c => c.position )
    },

    // TEXT TRANSLATORS - NO DATA 
    noData() {
      return this.$store.getters['config/defaultText']({txt:'no_data'})
    },

  },

  methods : {
    
    getDefaultText(txt_code){
      return this.$store.getters['config/defaultText']({txt:txt_code})
    },

    isPositionFilled(fieldBlock){
      // this.log && console.log("isPositionFilled /  fieldBlock :", fieldBlock)
      return this.listOfPositions.indexOf(fieldBlock) !== -1
    },

    itemImage(fieldBlock){
      let image = this.matchProjectWithConfig(fieldBlock)
      if ( !image ){
        let idFieldObject = this.contentFields.find( c => c.position === 'block_id' )
        // let idField = idFieldObject.field
        let idField = idFieldObject ? idFieldObject.field : 'sd_id'
        let d = this.$store.getters['config/getRouteConfigDefaultDatasetImages']
        let image_default = getDefaultImage(d, this.displayableItem, idField)
        image = image_default
      }
      return image
    },

    matchProjectWithConfig(fieldBlock) {

      // console.log("\nC-DynamicDetail / matchProjectWithConfig / fieldBlock : ", fieldBlock)

      return getItemContent(fieldBlock, this.displayableItem, this.contentFields, this.noData, this.filterDescriptions, this.locale)

      /*
        const contentField = this.contentFields.find(f=> f.position == fieldBlock)
        // this.log && console.log("C-DynamicDetail / matchProjectWithConfig / contentField : ", contentField)

        if (contentField){

          const field = contentField.field
          const field_format = contentField.field_format
          this.log && console.log("C-DynamicDetail / matchProjectWithConfig / field_format : ", field_format)

          let content = this.displayableItem[field]
          this.log && console.log("C-DynamicDetail / matchProjectWithConfig / content : ", content)

          if ( content && content !== "None" && content !== "" ){
            
            if ( field_format.type === 'list'){
              let begin = field_format.retrieve[0]
              if ( begin === -1){
                content = content
              } 
              else if ( field_format.retrieve.length === 1 ) {
                content = content[ begin ]
              }
              else {
                let end = field_format.retrieve[1] || content.length
                content = content.slice( begin, end )
              }
            }
            
            this.log && console.log("C-DynamicDetail / matchProjectWithConfig / content bis : ", content)

            if (contentField.is_tag_like) {
              content = content.split(contentField.tags_separator).filter(c => c != "")
              return content
            } else {
              return content
            }

          } else {
            // this.log && console.log("content is None | null ...")
            // this.log && console.log("this.noData : ", this.noData)
            return this.noData
          }
        } else {
          return undefined
        }
      */
      
    },
    getCustomBlockTitle(fieldBlock){
      let customBlockTitle = undefined
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      if (contentField){
        customBlockTitle = contentField.custom_title
      }
      return customBlockTitle
    },

    projectId() {
      return this.matchProjectWithConfig('block_id')
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }
  },

}
</script>


<style lang="scss" scoped>
  @import '../../assets/css/apiviz-colors.scss';
  @import '../../assets/css/apiviz-misc.scss';

  main{
    // background-color: $apiviz-blue-deep;
    background-color: $apiviz-grey-background;
    margin-top: $apiviz-navbar-height;
    height: 100%;
    padding-bottom: 3em;
    
  }

  .block-color {
    background-color: $apiviz-secondary !important;
    color: white;
  }

  .tag{
      background-color: $apiviz-secondary;
      color: white;
      margin-right: 1em;
      margin-bottom: 0.5em;
  }

  a.disabled {
    pointer-events: none;
    border-bottom: none !important ;
    cursor: default;
  }

  a.back{
    padding: 1em 0;
    display: block;

    color: $apiviz-text-color;
    // color: white ;

    img, .icon{
      height: 1.5em;
      transform: translateY(0.1em);
    }

    span{
      margin-left: 1em;
      // color: white ;
    }
  }

  .columns{
      margin-top: 0;
  }

  .illustration{
    width: 100%;
    margin-bottom: 1em;
  }

  .description, .added{
    // background-color: $apiviz-blue-deep;
    background-color: white;
    // color: white;
    padding: 1em;
    margin-bottom: 1em;
  }

  .description{
    h1{
        font-weight: bold;
    }

    p{
        margin-bottom: 1em;
    }

    a{
        color: $apiviz-primary;
        border-bottom: 1px solid $apiviz-primary;
    }
  }


  .added {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    .link-at-sourcer img{
        max-height: 1.1em;
        transform: translateY(0.2em);
    }

    img{
        height:auto;
    }

    .no-left-padding {
        padding-left: 0em;
    }
    .is-vertical-centered {
        // padding-left: 1em;
        display: flex;
        align-items: center;
    }

    .logo {
        // max-width: 175px;
        height: auto;
        width:100%;
    }

    a{
        color: $apiviz-primary;
        font-weight: bold;
    }
  }

  .content{
    h2{
        font-weight: bold;
    }

  }
  .pending{
      text-align: center;
      padding: 9em;
  }
</style>
