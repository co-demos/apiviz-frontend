 <template>
  <footer class="footer">
    <div class="container">
      <div class="columns">

        <!-- LOOP FOOTER BLOCKS -->
        <div :class="`column is-${columnsDivisions} is-offset-1`"
          v-for="(block, index) in visibleBlocks"
          :key="index"
          >

          <!-- BLOCK TITLE -->
          <h3 v-if="block.title_visible"
            class="has-text-left has-text-primary has-text-primary-c"
            > 
            {{ translate( footerLinks(block.position), 'title_block' ) }}
          </h3>

          <!-- LOOP LINKS -->
          <template v-if="isVisible( footerLinks(block.position) )" >
            <ul>
              <li v-for="(link, index) in footerLinks(block.position)['links']"
                :key="index"
                >

                <a v-if="link.is_visible && link.link_type == 'text' " :href="link.link_to" :target="`${ link.is_external_link ? '_blank' : ''}`"> 
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
                  class="button is-primary is-primary-b" 
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
      locale : state => state.locale
    }),

    ...mapGetters ({
      footerConfig : 'config/getFooterConfig',
      appSocials : 'config/getSocialsConfig',
    }),

    footerUI() {
      return this.footerConfig.ui_options
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

    columnsDivisions(){
      if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 1){
        return 8
      } else if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 2){
        return 5
      } else if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 3){
        return 3
      } else if (this.lengthLinksOptions > 0 && this.lengthLinksOptions == 4){
        return 2
      } 
   }

  },

  methods : {

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
