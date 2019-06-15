<template>
  <div>

    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <!-- LOGO -->
        <a class="navbar-item" 
          href="#top"
          >
          <img 
            src="/logos/logo_apiviz_icon_15.png" 
            height="28"
            >
        </a>

        <!-- BURGER -->
        <a 
          role="button" 
          :class="`navbar-burger ${ showNav ? 'is-active' : '' }`"
          aria-label="menu" 
          aria-expanded="false" 
          data-target="navbarNewInstance"
          @click="triggerBurger()" 
          >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>

      <!-- NNAVBAR ITEMS -->
      <div id="navbarNewInstance" 
        :class="`navbar-menu ${ showNav ? 'is-active' : '' }`"
        >

        <!-- NAV START -->
        <div class="navbar-start">
          <a class="navbar-item"
            @click="showSteps=false"
            >
            <!-- href="#top" -->
            {{ basicDict.welcome_1[locale] }}
          </a>
        </div> 

        <!-- NAV END -->
        <div class="navbar-end">

          <!-- LOCALES -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-uppercase">
              {{ locale }}
            </a>
            <div class="navbar-dropdown">
              <a v-for="(loc, index) in listLocales" class="navbar-item is-uppercase"
                :key="index"
                @click="locale = loc">
                {{ loc }}
              </a>
            </div>
          </div>

          <!-- DOCS LINK -->
          <a class="navbar-item tooltip is-tooltip-bottom"
            href="/https://co-demos.github.io/apiviz-frontend"
            :data-tooltip="basicDict.docs[locale]"
            >
            <span class="icon">
              <i class="fas fa-book"></i>
            </span>
          </a>

          <!-- REPO LINK -->
          <a class="navbar-item tooltip is-tooltip-left" 
            :data-tooltip="basicDict.repo[locale]"
            href="https://github.com/co-demos/apiviz-frontend"
            >
            <span class="icon">
              <i class="fab fa-github"></i>
            </span>
          </a>
        
        </div>

      </div>
    </nav>

    <section id="top" class="hero is-medium skip-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered is-centered">
            <div class="column is-8">
              <div class="notification is-danger has-text-centered">

                <span class="icon is-large">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>

                <p>
                  {{ basicDict.uuid_blocked[locale] }}
                  <br>
                  <code>{{ currentApivizFrontUUID }}</code>
                </p>
                <br>
                <p>
                  {{ basicDict.contact_team[locale] }}
                </p>
                <br>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  import { BasicDictionnary } from "~/config/basicDict.js" 

  export default {
    
    layout: 'basicLayout',

    components: {
    },

    data () {
      return {
        locale : 'en',
        listLocales : [
          'en', 
          'es', 
          'fr', 
          // 'de', 
          // 'tr'
        ],
        showNav : false,
        basicDict : BasicDictionnary, 
      }
    },

    computed: {
      ...mapState({
        log : state => state.log,
        currentApivizFrontUUID : state => state.apivizFrontUUID,
        runMode : state => state.runMode,
        rootUrlBackend : state => state.rootUrlBackend,
      }),
    },

    methods: {
      triggerBurger(){
        this.showNav = !this.showNav
      },
    },


  }

</script>