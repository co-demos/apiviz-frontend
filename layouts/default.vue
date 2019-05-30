<template>
  <div>

    <nuxt />

    <!-- CREDITS CODEMOS / REMOTE FOOTER -->
    <DynamicStaticRaw 
      :templateURL="codemosCreditsUrls[locale]"
    ></DynamicStaticRaw>

  </div>
</template>



<script>

import { mapState, mapGetters } from 'vuex'

import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'

export default {
  
  components: {
    DynamicStaticRaw,
  },

  data () {
    return {
      codemosCreditsUrls : {
        fr : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer.html',
        en : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
        es : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
        de : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
        tr : 'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html',
      }
    }
  },

  computed: {

    ...mapState({
      // locale : state => state.locale,
    }),

    ...mapGetters({
      locale : 'getCurrentLocale',
    })
  },

  // methods: {
  // }

}

</script>




<style>

</style>
