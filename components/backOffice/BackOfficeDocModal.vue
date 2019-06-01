<template>
  <div>

    <!-- BUTTON DOCUMENTATION -->
    <div
      class="has-text-centered" 
      >
      <a class="button is-fullwidth is-grey is-outlined"
        @click="toggleModal()"
        >
        <span class="icon">
          <i class="fas fa-book"></i>
        </span>
        <span>
          {{ getText('documentation') }}
        </span>
      </a>
    </div>


    <!-- DIALOG MODAL INFOS-->
    <div :class="`modal ${isModalOpen ? 'is-active' : ''}`">
      <div class="modal-background"></div>
      
      <div class="modal-content">

        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content has-text-centered">
                
                <p>
                  <!-- To know more about the  -->
                  {{ basicDict.modal_doc_1a[locale] }}
                  <strong>
                    {{ currentColl }}
                  </strong> 
                  <!-- settings -->
                  {{ basicDict.modal_doc_1b[locale] }}
                  <br>
                  <!-- check our documentation here  -->
                  {{ basicDict.modal_doc_1c[locale] }}
                </p>

                <a class="button is-primary is-primary-b" 
                  href="https://co-demos.github.io/apiviz-frontend/guide/backoffice/" 
                  target="/_blank"
                  >
                  <span class="icon">
                    <i class="fas fa-book"></i>
                  </span>
                  <span>
                    <!-- apiviz documentation website -->
                    {{ basicDict.modal_doc_1d[locale] }}
                  </span>
                </a>
              </div>
            </div>
          </article>
        </div>

        <button 
          class="modal-close is-large" 
          aria-label="close"
          @click="toggleModal()"
          >
        </button>
      
      </div>
    </div>
  </div>
</template>


<script>

  import { mapState, mapGetters } from 'vuex'
  
  import { BasicDictionnary } from "~/config/basicDict.js" 

  export default {

    props : [
      'currentColl',
      'currentTab'
    ],

    data: function () {
      return {
        isModalOpen : false,
        basicDict : BasicDictionnary, 
      }
    },

    computed : {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale, 
        jwt : state => state.user.jwt,
      }),

      ...mapGetters({
        apivizFrontUUID : 'getApivizFrontUUID',
        rootUrlBackend: 'getRootUrlBackend',
        displayableItem : 'search/getDisplayedProject'
      })
    },

    methods : {

      toggleModal() {
        this.isModalOpen = !this.isModalOpen
      },

      getText(textCode) {
        return this.$store.getters['config/defaultText']({txt:textCode})
      },
      
    }

  }

</script>