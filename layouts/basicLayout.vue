<template>
  <div>

    <nuxt />

    <DynamicStaticRaw 
      :templateURL="'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer-en.html'"
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
