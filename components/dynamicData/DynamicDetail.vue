<template>
  <div>

    <main v-if="displayableItem">
      
      <div class="container">

        <!-- BACK TO RESULTS -->
        <a class="back" @click="goBack">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>
            {{ backToResults }}
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
                <!-- {{projectFormatted.title}} -->
                 {{ matchProjectWithConfig('block_title')}}
              </h1>

              <!-- BLOCK MAIN TAGS -->
              <div id="block-main-tags" v-if="isPositionFilled('block_main_tags')">
                <span 
                  v-if="getCustomBlockTitle('block_main_tags')"
                  class="has-text-weight-semibold has-text-primary" 
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
                  class="has-text-weight-semibold has-text-primary" 
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
                  class="has-text-weight-semibold has-text-primary" 
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

              <!-- BLOCK POST ABSTRACT -->
              <p id="block-post-abstract-1" v-if="isPositionFilled('block_post_abstract_1')">
                <span 
                  v-if="getCustomBlockTitle('block_post_abstract_1')"
                  class="has-text-weight-semibold has-text-primary" 
                  >
                  {{ getCustomBlockTitle('block_post_abstract_1') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_post_abstract_1')}}
              </p>

              <!-- BLOCK POST ABSTRACT -->
              <p id="block-post-abstract-2" v-if="isPositionFilled('block_post_abstract_2')">
                <span 
                  v-if="getCustomBlockTitle('block_post_abstract_2')"
                  class="has-text-weight-semibold has-text-primary" 
                  >
                  {{ getCustomBlockTitle('block_post_abstract_2') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_post_abstract_2')}}
              </p>

              <div class="columns">

                <!-- BLOCK WEBSITE -->
                <div id="block-main-website" class="column is-5 is-offset-1 link">
                  <a
                    v-if="matchProjectWithConfig('block_wesite')"
                    :class="matchProjectWithConfig('block_wesite') === noData ? 'disabled has-text-grey' : '' "
                    :href="matchProjectWithConfig('block_wesite') === noData ? '' : matchProjectWithConfig('block_wesite') "
                    target="_blank">
                    {{ seeWebsite }}
                  </a>
                </div>
                
                <!-- BLOCK CONTACT -->
                <div id="block-main-contact" class="column is-5 is-offset-1 link">
                  <a
                    v-if="matchProjectWithConfig('block_contact')"
                    :class="matchProjectWithConfig('block_contact') === noData ? 'disabled has-text-grey' : '' "
                    :href="matchProjectWithConfig('block_wesite') === noData ? '' :'mailto:' + matchProjectWithConfig('block_contact') "
                    target="_blank">
                    {{ seeContact }}
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
                      class="has-text-weight-semibold has-text-primary">
                      {{ servicesData }} : <br><br>
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
                      class="has-text-weight-semibold has-text-primary" 
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
            <a 
              id="block-illustration" 
              :href="matchProjectWithConfig('block_wesite')" 
              target="_blank"
              >
              <img
                class="illustration"
                :src="itemImage('card_img_main')"
                :alt="matchProjectWithConfig('block_title')"
              />
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
                        {{ downloadFile }}
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
                    <span class="has-text-weight-semibold has-text-primary">
                      {{ sourceData }} : 
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
                      class="has-text-weight-semibold has-text-primary" 
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
                      class="has-text-weight-semibold has-text-primary" 
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
                    <span class="has-text-weight-semibold has-text-primary">
                      {{ periodData }} : 
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_period')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK CONTACT -->
            <div class="added block-color" id="block-contact" v-if="isPositionFilled('block_contact_name')">
              <div class="columns">
                <div class="column is-12">

                  <div>
                    <span class="has-text-weight-semibold">
                      {{ seeContact }} : 
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
                    <span class="has-text-weight-semibold has-text-primary">
                      {{ infosData }} : <br><br>
                    </span>
                  </div>

                  <div id="block-tel" v-if="isPositionFilled('block_tel')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      {{ infosTel }} : 
                      {{ matchProjectWithConfig('block_tel')}} <br>
                    </span>
                  </div>

                  <div id="block-open-infos" v-if="isPositionFilled('block_open_infos')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      {{ infosOpen }} : <br>
                      {{ matchProjectWithConfig('block_open_infos')}} <br>
                    </span>
                  </div>

                  <div id="block-infos-pract" v-if="isPositionFilled('block_infos_pract')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      {{ infosMore }} : 
                      {{ matchProjectWithConfig('block_infos_pract')}}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            <!-- BLOCK RIGHT BOTTOM 1 -->
            <div class="added" id="block-RB1" v-if="isPositionFilled('block_right_bottom_1')">
              <div class="columns">
                <div class="column is-12">

                  <div>
                    <span 
                      v-if="getCustomBlockTitle('block_right_bottom_1')"
                      class="has-text-weight-semibold has-text-primary" 
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
                      class="has-text-weight-semibold has-text-primary" 
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
      isError: false
    }
  },

  beforeMount: function () {
    console.log("\n - - DynamicDetail / beforeMount ... ")
    this.contentFields = this.routeConfig.contents_fields

  },

  mounted(){
    // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
    console.log(" - - DynamicDetail / mounted... ")
    const int = setInterval(() => {
      if(window.pageYOffset < 50){
        clearInterval(int)
      }
      else{
        window.scrollTo(0, 0)
      }
    }, 100);

    this.$store.dispatch('search/searchOne', this.$route.query.id)
    
    // LEGACY
    // getItemById(this.$route.query.id, this.$store.state.search.search.endpoint)
    // .then(item => {
    //   // console.log(" - - DynamicDetail / item : \n ", item)
    //   // this.$store.commit('setDisplayedProject', {item})
    //   this.displayableItem = item
    // })
    // .catch(function(err) { this.isError = true ; console.error('item route error', err) })
  },

  computed: {

    ...mapState({
      log : 'log', 
      locale : state => state.locale,
      user: state => state.user.user,
    }),

    ...mapGetters({
      displayableItem : 'search/getDisplayedProject'
    }),

    // default texts
    backToResults() {
      return this.$store.getters['config/defaultText']({txt:'back_to_results'})
    },

    // POSITIONS TO BE FILLED
    listOfPositions() {
      // console.log("listOfPositions /  this.contentFields.map( c => c.position ) :", this.contentFields.map( c => c.position ))
      return this.contentFields.map( c => c.position )
    },

    // TEXT TRANSLATORS - NO DATA 
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

    // TEXT TRANSLATORS - FIELD TITLES
    seeWebsite() {
      return this.$store.getters['config/defaultText']({txt:'see_website'})
    },
    seeContact() {
      return this.$store.getters['config/defaultText']({txt:'see_contact'})
    },
    shareLink() {
      return this.$store.getters['config/defaultText']({txt:'share_link'})
    },
    sourceData() {
      return this.$store.getters['config/defaultText']({txt:'source'})
    },
    periodData() {
      return this.$store.getters['config/defaultText']({txt:'period'})
    },
    infosData() {
      return this.$store.getters['config/defaultText']({txt:'infos'})
    },
    infosTel() {
      return this.$store.getters['config/defaultText']({txt:'tel'})
    },
    infosOpen() {
      return this.$store.getters['config/defaultText']({txt:'open_infos'})
    },
    infosMore() {
      return this.$store.getters['config/defaultText']({txt:'more_infos'})
    },
    servicesData() {
      return this.$store.getters['config/defaultText']({txt:'services'})
    },
    downloadFile() {
      return this.$store.getters['config/defaultText']({txt:'dowload_file'})
    },

  },

  methods : {

    isPositionFilled(fieldBlock){
      // console.log("isPositionFilled /  fieldBlock :", fieldBlock)
      return this.listOfPositions.indexOf(fieldBlock) !== -1
    },

    itemImage(fieldBlock){
      return this.$store.getters['search/getImageUrl']({item: this.displayableItem, position: fieldBlock})
      // return this.item
    },
    matchProjectWithConfig(fieldBlock) {
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      // console.log("contentField : ", contentField)
      if (contentField){
        const field = contentField.field
        let content = this.displayableItem[field]
        // console.log("content : ", content)
        if ( content && content !== "None" && content !== "" ){
          if (contentField.is_tag_like) {
            content = content.split(contentField.tags_separator).filter(c => c != "")
            return content
          } else {
            return content
          }
        } else {
          // console.log("content is None | null ...")
          // console.log("this.noData : ", this.noData)
          return this.noData
        }
      } else {
        return undefined
      }
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

    // projectAbstract() {
    //   let fullAbstract = this.matchProjectWithConfig('block_abstract')
    //   fullAbstract = ( fullAbstract == null ) ? this.noAbstractText : fullAbstract
    //   const tail = fullAbstract.length > MAX_SUMMARY_LENGTH ? '...' : '';
    //   return fullAbstract.slice(0, MAX_SUMMARY_LENGTH) + tail
    // },
    // projectInfo(field) {
    //   let fullInfo = this.matchProjectWithConfig(field)
    //   fullInfo = ( fullInfo == null ) ? this.noInfos : fullInfo
    //   return fullInfo
    // },
    // projectAddress() {
    //   let fullAddress = this.matchProjectWithConfig('block_address')
    //   // console.log('fullAddress : ', fullAddress)
    //   let address = ( fullAddress || fullAddress !== 'None' ) ?  fullAddress : this.noAddress
    //   return address
    // },


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
</style>
