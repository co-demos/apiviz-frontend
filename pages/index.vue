<template>
  <section class="container">
    <div>

      <h1 class="title">
        apiviz-nuxt
      </h1>
      <h2 class="subtitle">
        Migrating apiviz frontend as SPA Nuxt project
      </h2>

      <!-- DEBUGGING -->
      <hr>
      <div>
        apivizFrontUUID : <code>{{ apivizFrontUUID }}</code><br>
        runMode : <code>{{ runMode }}</code><br>
        rootUrlBackend : <code>{{ rootUrlBackend }}</code><br>
        locale : <code>{{ locale }}</code><br>
        <hr>
        config.socials : <br><code>{{ config.socials }}</code>
        <hr>
        jwt : <br><code>{{ jwt }}</code>
        user : <br><code>{{ user }}</code><br>
        <hr>
        <!-- search : <br><code>{{ search }}</code><hr> -->
      </div>


      <!-- <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>
      </div> -->

    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'

// import Logo from '~/components/Logo.vue'

// import DynamicBanner     from '~/components/dynamicUX/DynamicBanner.vue';
// import DynamicStatic     from '~/components/dynamicUX/DynamicStatic.vue';
// import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue';
// import DynamicStaticTest from '~/components/dynamicUX/DynamicStaticTest.vue';

// import DynamicList       from '~/components/dynamicData/DynamicList.vue';
// import DynamicMap        from '~/components/dynamicData/DynamicMap.vue';
// import DynamicDetail     from '~/components/dynamicData/DynamicDetail.vue';

export default {
  
  components: {
  },

  middleware : [
  ],

  data () {
    return {
      // config : this.$store.getters['config/getConfig'],
    }
  },

  computed: {

    ...mapState({

      apivizFrontUUID : state => state.apivizFrontUUID,
      runMode : state => state.runMode ,
      rootUrlBackend : state => state.rootUrlBackend,
      locale : state => state.locale,

      config : state => state.config.config,

      search : state => state.search.search,

      user : state => state.user.user,
      jwt : state => state.user.jwt

    }),

    // ...mapGetters({
    //
    //}),

    // config() {
    //   console.log('getting config from page')
    //   return this.$store.getters['config/getConfig']
    // },



  },

  methods: {

  }

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
