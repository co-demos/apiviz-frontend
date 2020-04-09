

<template>
  <footer 
    :class="`footer is-${footerColor}-b-only`"
    >
    <div class="container">
      <div class="columns is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">

        <!-- LOOP FOOTER BLOCKS -->
        <div 
          v-for="(block, index) in visibleBlocks"
          :key="index"
          :class="`column is-${columnsDivisions(block)}`"
          >

          <!-- BLOCK TITLE -->
          <h3 v-if="block.title_visible"
            :class="`has-text-left has-text-${footerTitleColor} has-text-${footerTitleColor}-c`"
            > 
            {{ translate( footerLinks(block.position), 'title_block' ) }}
          </h3>

          <!-- LOOP LINKS -->
          <template v-if="isVisible( footerLinks(block.position) )" >
            <ul>
              <li v-for="(link, index) in footerLinks(block.position)['links']"
                :key="index"
                :class="`has-text-left`"
                >

                <a 
                  v-if="link.is_visible && link.link_type == 'text' " 
                  :href="link.link_to" 
                  :target="`${ link.is_external_link ? '_blank' : ''}`"
                  :class="`is-size-7 has-text-${footerTextColor} has-text-${footerTextColor}-c`"
                  > 
                  {{ translate(link, 'link_text') }}
                </a>

                <hr v-if="link.is_visible && link.link_type === 'divider' ">

              </li>
            </ul>
          </template>

          <!-- ADD SOCIAL AT THE END -->
          <template v-if="hasSocials(block.position)">
            <br>
            <hr> 
            <div class="content has-text-centered">

              <!-- LOOP SOCIALS -->
              <template  v-for="(icon, index) in appSocials">

                <!-- ICONS SOCIAL -->
                <a v-if="icon.in_footer"
                  :class="`button is-${footerSocialsColor} is-${footerSocialsColor}-b ${footerSocialsClass}`" 
                  :key="index"
                  :href="icon.url" 
                  >
                  <span class="icon">
                    <i :class="icon.icon_class"></i>
                  </span>
                </a>
                
                &nbsp;&nbsp;&nbsp;
              </template>

            </div>

          </template>

        </div>


      </div>
    </div>
  </footer>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
// import MailchimpSubscribe from './MailchimpSubscribe.vue'

export default {

  components: {
    // MailchimpSubscribe
  },

  props : [
    // 'footerConfig',
    // 'appSocials'
  ],

  data : () => {
    return   {
      blocksList : [
        'block_top_left', 
        'block_top_center_left', 
        'block_top_center_right',
        'block_top_right'
      ],
    }
  },

  computed : {

    ...mapState ({
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
    }),

    ...mapGetters ({
      footerConfig : 'config/getFooterConfig',
      appSocials : 'config/getSocialsConfig',
    }),

    footerUI() {
      return this.footerConfig.ui_options
    },

    footerColor(){
      let cardColor = this.footerUI.card_color
      cardColor = cardColor ? cardColor : { default : 'dark' }
      let footColor = cardColor.value ? cardColor.value : cardColor.default
      return footColor
    },

    footerTitleColor(){
      let titleColor = this.footerUI.title_color
      titleColor = titleColor ? titleColor : { default : 'white' }
      let footTitleColor = titleColor.value ? titleColor.value : titleColor.default
      return footTitleColor
    },

    footerTextColor(){
      let textColor = this.footerUI.text_color
      textColor = textColor ? textColor : { default : 'grey-lighter' }
      let footTextColor = textColor.value ? textColor.value : textColor.default
      return footTextColor
    },

    footerSocialsColor(){
      let socialsColor = this.footerUI.socials_color
      socialsColor = socialsColor ? socialsColor : { default : 'primary' }
      let footSocialsColor = socialsColor.value ? socialsColor.value : socialsColor.default
      return footSocialsColor
    },

    footerSocialsClass(){
      let socialsClass = this.footerUI.socials_class
      socialsClass = socialsClass ? socialsClass : { default : '' }
      let footSocialsClass = socialsClass.value ? socialsClass.value : socialsClass.default
      return footSocialsClass
    },


    visibleBlocks() {
      let visibleColumns = this.footerConfig.links_options.filter(block => {
        return block.is_visible
      })
      // console.log("visibleColumns : ", visibleColumns)
      return visibleColumns
    },

    lengthLinksOptions() {
      return Object.keys(this.visibleBlocks).length
    },


  },

  methods : {

    columnsDivisions(block){

      if (block.block_class) {
        return block.block_class
      }
      else {
        if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 1){
          return 12
        } else if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 2){
          return 6
        } else if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 3){
          return 4
        } else if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 4){
          return 3
        } 
      }

   },

    footerLinks(position) {
      // console.log("position : ", position)
      // let allLinks = this.footerConfig.links_options
      // let blockLinks = allLinks[position]
      let blockLinks = this.footerConfig.links_options.find( block =>{
        // console.log("block : ", block)
        return block.position == position
      })
      // console.log("blockLinks : ", blockLinks)
      return blockLinks
    },

    hasSocials(position) {
      let blockLinks = this.footerLinks(position)
      return blockLinks.has_socials
    },

    isVisible(block) {
      // console.log("block : ", block)
      return block.is_visible
    },

    translate( textsToTranslate, listField ) {
      // console.log("textsToTranslate : ", textsToTranslate)
      // console.log("listField : ", listField)
      let listTexts = textsToTranslate[listField]
      return this.$Translate( listTexts, this.locale, 'text')
    },

  }

}
</script>
