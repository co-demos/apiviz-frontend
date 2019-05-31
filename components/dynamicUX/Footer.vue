 <template>
  <footer class="footer">
    <div class="container">
      <div class="columns">

        <!-- LOOP FOOTER BLOCKS -->
        <div class="column is-3 is-offset-1"
          v-for="(block_pos, index) in blocksList"
          :key="index"
          >

          <!-- BLOCK TITLE -->
          <h3 class="has-text-left has-text-primary"> 
            {{ translate( footerLinks(block_pos), 'title_block' ) }}
          </h3>

          <template v-if="isVisible( footerLinks(block_pos) )" >
            <ul>
              <!-- LOOP LINKS -->
              <li v-for="(link, index) in footerLinks(block_pos)['links']"
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
          <template v-if="HasSocials(block_pos)">
            <br>
            <hr> 
            <div class="content">
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
      blocksList : ['block_center_left', 'block_center_right','block_right'],
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

  },

  methods : {

    footerLinks(position) {
      let allLinks = this.footerConfig.links_options
      let blockLinks = allLinks[position]
      return blockLinks
    },

    HasSocials(position) {
      let blockLinks = this.footerLinks(position)
      return blockLinks.has_socials
    },

    isVisible(block) {
      // console.log("block : ", block)
      return block.is_visible
    },

    translate( textsToTranslate, listField ) {
      let listTexts = textsToTranslate[listField]
      return this.$Translate( listTexts, this.locale, 'text')
    },

  }

}
</script>
