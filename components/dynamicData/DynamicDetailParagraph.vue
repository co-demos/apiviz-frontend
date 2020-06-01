<template>

  <div 
    :class="`mb-3`">

    <!-- {{ paragaphFormat }} -->
    <!-- <code>{{ formatParagraph(rawText)}}</code> -->
    <!-- <br> -->

    <div v-if="paragraphFormat" 
      :class="`content`"
      >

      <!-- loop paragraphs -->
      <p 
        v-for="(p,index) in formatParagraph(rawText)"
        :key="index"
        :class="`${index === 0 ? 'mt-1' : ''}`"
        >
        
        <!-- <br v-if="index === 0 && !p.listType"> -->

        <!-- loop lists -->
        <ul v-if="p.listType && p.listType == 'ul'">
          <li v-for="(pt,it) in p.txt"
            :key="pt+it"
            >
            {{ pt }}
          </li>
        </ul>

        <!-- or loop paragraph texts -->
        <span v-else>
          {{ p.txt }}
        </span>

      </p>
      
    </div>

    <!-- no format at all -->
    <div v-else class="mt-1">
      <!-- <br> -->
      {{ rawText }}
    </div>
    
  </div>

</template>


<script>
import { mapState } from 'vuex'

export default {

  name: 'DynamicDetailParagraph',

  components: {
  },

  props: [
    'rawText',
    'paragraphFormat'
  ],

  data: () => {
    return {
    }
  },

  watch : {
  },

  beforeMount() {
  },

  mounted(){
  },

  created() {
  },

  destroyed() {
  },

  computed: {

    ...mapState({
      log: state => state.log,
      locale : state => state.locale,
    }),

  },

  methods : {

    formatParagraph(rawText) {

      const format = this.paragraphFormat
      let text = [ { txt: rawText.trim() } ]

      if ( format.breakline ) {
        text = rawText.trim().split(format.breakline).map( p => {
          return { txt : p.trim() }
        }) 
      }

      if ( format.list_separator ) {
        text = text.map( p => {
          let pArray = p.txt.trim().split( format.list_separator )
          let pText = pArray.filter( e => e !== '' )
          return {
            listType: format.list_type,
            txt: pText
          }
        })
      }

      return text
    },

  },

}
</script>
