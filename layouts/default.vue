<template>
  <div>

    <!-- <Navbar
    > -->

    <nuxt />

    <!-- CREDITS CODEMOS / REMOTE FOOTER -->
    <DynamicStaticRaw 
      :templateURL="'https://raw.githubusercontent.com/co-demos/structure/master/pages-html/codemos-footer.html'"
    ></DynamicStaticRaw>

  </div>
</template>



<script>

import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue';

export default {
  
  components: {
    DynamicStaticRaw,
  },

  data () {
    return {
    }
  },

  methods: {
  }

}

</script>




<style>

</style>
