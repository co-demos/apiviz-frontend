 <template>
  <footer class="footer">
    <div class="container">
      <div class="columns">


        <div class="column is-3 is-offset-1"
          v-for="(block_pos, index) in ['block_center_left', 'block_center_right','block_right']"
          :key="index"
          >

          <h3 class="has-text-left has-text-primary"> 
            {{ translate( footerLinks(block_pos), 'title_block' ) }}
          </h3>

          <template 
            v-if="isVisible( footerLinks(block_pos) )"
            >
            <ul>
              <li 
                v-for="(link, index) in footerLinks(block_pos)['links']"
                :key="index"
                >
                <a :href="link.link_to" :target="`${ link.is_external_link ? '_blank' : ''}`"> 
                  {{ translate(link, 'link_text') }}
                </a>
              </li>
            </ul>
          </template>

          <!-- ADD SOCIAL AT THE END -->
          <template v-if="block_pos === 'block_right' ">
            
            <br>
            <div class="content">
              <template  
                v-for="(icon, index) in appSocials"
                >
                <!-- {{ icon }} -->
                <a
                  v-if="icon.in_footer"
                  class="button is-primary" 
                  :key="index"
                  :href="icon.url" 
                >
                  <span class="icon">
                    <i 
                      :class="icon.icon_class"
                    ></i>
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

import { mapState } from 'vuex'
// import MailchimpSubscribe from './MailchimpSubscribe.vue'

export default {

  components: {
    // MailchimpSubscribe
  },

  props : [
    'footerConfig',
    'appSocials'
  ],

  computed : {
    ...mapState ({
      locale : state => state.locale
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
    footerContents(position) {
      let allContents = this.footerConfig.contents_fields
      let blockContents = allContents[position]
      return blockContents
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
