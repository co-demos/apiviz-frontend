<template>
  <div>

    <nuxt />

    <DynamicStaticRaw 
      :templateURL="'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html'"
      >
    </DynamicStaticRaw>

  </div>
</template>



<script>

  import { mapState, mapGetters } from 'vuex'

  import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'

  export default {
    
    components: {
      DynamicStaticRaw,
    },

    head(){ 
      
      return {
        title: 'ApiViz',
        // meta: [

        // ],
        link: [
          // { rel: 'icon', type: 'image/x-icon', href: global.app_favicon.url },
          { rel: 'icon', href: '/logos/logo_apiviz_icon_15.png', sizes: '21x32' },
        ],
      }
    },

    data () {
      return {
      }
    },

    computed: {

      ...mapState({
      }),

      ...mapGetters({
      })
    },

    methods: {
    }

  }

</script>




<style>

</style>
