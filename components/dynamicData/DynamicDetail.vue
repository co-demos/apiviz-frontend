<template>
  <div>

    <main v-if="!displayableItem">

      <div
        class="container"
        :style="`margin-right:${breakpoint.marginContainer}; margin-left:${breakpoint.marginContainer}`"
        >
        <div class="pending">
          <!-- Recherche en cours... -->
          {{ basicDict.request_loading[locale] }}
        </div>

      </div>
    </main>

    <main v-if="displayableItem">

      <div class="container">

        <!-- BACK TO RESULTS -->
        <a class="back" @click="goBack">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>
            <!-- {{ backToResults }} -->
            {{ getDefaultText('back_to_results') }}
          </span>
        </a>
        <!-- BLOCK TITLE -->
        <h1 id="block-title" class="title is-3">
          {{ displayableItem.Enthic.denomination.value }}
        </h1>
        <ul id="demo">
          <TreeItem v-for="oneYeardata in treeData" v-bind:key="oneYeardata.year"
            class="item"
            :item="oneYeardata"
          ></TreeItem>
        </ul>
        <div class="column is-12">
          <apexchart type="bar" height="350" :options="chartDetails.chartOptionsCA" :series="chartDetails.seriesCA"></apexchart>
        </div>
        <div class="column is-12">
          <apexchart type="bar" height="350" :options="chartDetails.chartOptionsMargin" :series="chartDetails.seriesMargin"></apexchart>
        </div>
        <div class="columns">

          <!-- //// COLUMN LEFT //// -->
          <div class="column is-5 is-offset-1">
            <div class="description">

              <ul>
                <li v-for="data in displayableEnthicData.flatData">{{ data.description }} : {{ data.value }}</li>
                <li v-for="year in displayableEnthicData.yearData">
                  {{ year.year }}
                  <ul>
                    <li v-for="data in year">{{ data.description }} : {{ data.value }}</li>
                  </ul>
                </li>
              </ul>
              <!-- BLOCK MAIN TAGS -->
              <div id="block-main-tags" v-if="isPositionFilled('block_main_tags')">
                <span
                  v-if="getCustomBlockTitle('block_main_tags')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                  >
                  {{ getCustomBlockTitle('block_main_tags') }}
                </span>
                <br>
                <span
                  class="tag"
                  v-for="(tag, i) in matchProjectWithConfig('block_main_tags')"
                  :key="tag + i"
                  >
                  {{ tag }}
                </span>
                <br><br>
              </div>

              <!-- BLOCK ADDRESS -->
              <p id="block-address" v-if="isPositionFilled('block_address')">
                <span class="icon">
                  <img class="image is-16x16" src="~assets/icons/icon_pin.svg">
                </span>
                {{ matchProjectWithConfig('block_address')}}
              </p>

              <!-- BLOCK PRE ABSTRACT -->
              <p id="block-pre-abstract" v-if="isPositionFilled('block_pre_abstract')">
                <span
                  v-if="getCustomBlockTitle('block_pre_abstract')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                  >
                  {{ getCustomBlockTitle('block_pre_abstract') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_pre_abstract')}}
              </p>

              <!-- BLOCK PARTNERS -->
              <div id="block-partners" v-if="isPositionFilled('block_partners')">
                <p>{{ matchProjectWithConfig('block_partners')}}</p>
              </div>

              <!-- BLOCK POST ABSTRACT 1 -->
              <p id="block-post-abstract-1">
              </p>

              <!-- BLOCK POST ABSTRACT 2 -->
              <p id="block-post-abstract-2">
              </p>

              <!-- BLOCK POST ABSTRACT 3 -->
              <p id="block-post-abstract-3" v-if="isPositionFilled('block_post_abstract_3')">
                <span
                  v-if="getCustomBlockTitle('block_post_abstract_3')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                  >
                  {{ getCustomBlockTitle('block_post_abstract_3') }}
                  <br><br>
                </span>
                {{ matchProjectWithConfig('block_post_abstract_3')}}
              </p>

              <!-- BLOCK WEBSITE / CONTACT -->
              <div class="columns">

                <!-- BLOCK WEBSITE -->
                <div id="block-main-website" class="column is-5 is-offset-1 link">
                  <a
                    v-if="matchProjectWithConfig('block_wesite')"
                    :class="matchProjectWithConfig('block_wesite') === noData ? 'disabled has-text-grey' : '' "
                    :href="matchProjectWithConfig('block_wesite') === noData ? '' : matchProjectWithConfig('block_wesite') "
                    target="_blank">
                    <!-- {{ seeWebsite }} -->
                    {{ getDefaultText('see_website') }}
                  </a>
                </div>

                <!-- BLOCK CONTACT -->
                <div id="block-main-contact" class="column is-5 is-offset-1 link">
                  <a
                    v-if="matchProjectWithConfig('block_contact')"
                    :class="matchProjectWithConfig('block_contact') === noData ? 'disabled has-text-grey' : '' "
                    :href="matchProjectWithConfig('block_wesite') === noData ? '' :'mailto:' + matchProjectWithConfig('block_contact') "
                    target="_blank">
                    <!-- {{ seeContact }} -->
                    {{ getDefaultText('see_contact') }}
                  </a>
                </div>
              </div>

            </div>

            <!-- BLOCK SERVICES -->
            <div class="added" id="block-services" v-if="isPositionFilled('block_services')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span
                      class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ servicesData }}  -->
                      {{ getDefaultText('services') }}
                      : <br><br>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_services')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK BOTTOM 2 -->
            <div class="added" id="block-LB2" v-if="isPositionFilled('block_left_bottom_2')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span
                      v-if="getCustomBlockTitle('block_left_bottom_2')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c"
                      >
                      {{ getCustomBlockTitle('block_left_bottom_2') }}
                      <br><br>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_left_bottom_2')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>  <!-- end column left -->



          <!-- //// COLUMN RIGHT //// -->
          <div class="column is-5">

            <!-- BLOCK MAIN ILLUSTRATION -->
            <a id="block-illustration"
              :href="matchProjectWithConfig('block_wesite')"
              target="_blank"
              >
              <img
                class="illustration"
                :src="itemImage('block_image')"
                :alt="matchProjectWithConfig('block_title')"
              />
                <!-- :src="matchProjectWithConfig('block_image')" -->
            </a>

            <!-- BLOCK SOURCE -->
            <div class="added" id="block-src" v-if="isPositionFilled('block_src')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ sourceData }}  -->
                      {{ getDefaultText('source') }}
                      :
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_src')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK SCALE -->
            <div class="added" id="block-scale" v-if="isPositionFilled('block_scale') || isPositionFilled('block_scale_address')">
              <div class="columns">
                <div class="column is-12">

                  <div>
                    <span
                      v-if="getCustomBlockTitle('block_scale_tags')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c"
                      >
                      {{ getCustomBlockTitle('block_scale_tags') }}
                    </span>
                    <span
                      class="tag"
                      v-for="(tag, i) in matchProjectWithConfig('block_scale_tags')"
                      :key="tag + i"
                      >
                      {{ tag }}
                    </span>
                  </div>

                  <div id="block-scale-2">
                    <span
                      v-if="getCustomBlockTitle('block_scale_2')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c"
                      >
                      {{ getCustomBlockTitle('block_scale_2') }}
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_scale_2')}}
                    </span>
                  </div>

                  <div id="block-scale-address" v-if="isPositionFilled('block_scale_address')">
                    <span class="icon">
                      <img class="image is-16x16" src="/static/icons/icon_pin.svg">
                    </span>
                    {{ matchProjectWithConfig('block_scale_address')}}
                  </div>

                </div>
              </div>
            </div>

            <!-- BLOCK PERIOD -->
            <div class="added" id="block-period" v-if="isPositionFilled('block_period')">
              <div class="columns">
                <div class="column is-12">
                  <div>
                    <span class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ periodData }}  -->
                      {{ getDefaultText('period') }}
                      :
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_period')}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- BLOCK CONTACT -->
            <div
              v-if="isPositionFilled('block_contact_name') || isPositionFilled('block_contact_email')"
              class="added is-info-b has-text-white"
              id="block-contact"
              >
              <div class="columns">
                <div class="column is-12">

                  <div>
                    <span class="has-text-weight-semibold">
                      <!-- {{ seeContact }}  -->
                      {{ getDefaultText('see_contact') }}
                      :
                    </span>
                  </div>
                  <br>

                  <div v-if="isPositionFilled('block_contact_name')">
                    <span class="icon is-small">
                      <i class="far fa-user"></i>
                    </span>
                    <span>
                      <span v-if="isPositionFilled('block_contact_name')">
                        {{ matchProjectWithConfig('block_contact_name')}}
                      </span>
                      <span v-if="isPositionFilled('block_contact_surname')">
                        {{ matchProjectWithConfig('block_contact_surname')}}
                      </span>
                      <span v-if="isPositionFilled('block_contact_fullname')">
                        {{ matchProjectWithConfig('block_contact_fullname')}}
                      </span>
                      <span v-if="isPositionFilled('block_contact_title')"><br>
                        {{ matchProjectWithConfig('block_contact_title')}}
                        <br>
                      </span>
                    </span>
                    <br>
                  </div>

                  <div v-if="isPositionFilled('block_contact_email')">
                    <span class="icon is-small">
                      <i class="fas fa-at"></i>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_contact_email')}} <br>
                    </span>
                  </div>

                  <div v-if="isPositionFilled('block_contact_tel')">
                    <span class="icon is-small">
                      <i class="fas fa-phone"></i>
                    </span>
                    <span>
                      {{ matchProjectWithConfig('block_contact_tel')}} <br>
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <!-- BLOCK OPEN INFOS -->
            <div class="added" id="block-infos" v-if="isPositionFilled('block_open_infos')">
              <div class="columns">

                <div class="column is-12">

                  <div>
                    <span class="has-text-weight-semibold has-text-primary has-text-primary-c">
                      <!-- {{ infosData }}  -->
                      {{ getDefaultText('infos') }}
                      : <br><br>
                    </span>
                  </div>

                  <div id="block-tel" v-if="isPositionFilled('block_tel')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      <!-- {{ infosTel }}  -->
                      {{ getDefaultText('tel') }}
                      :
                      {{ matchProjectWithConfig('block_tel')}} <br>
                    </span>
                  </div>

                  <div id="block-open-infos" v-if="isPositionFilled('block_open_infos')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      <!-- {{ infosOpen }}  -->
                      {{ getDefaultText('open_infos') }}
                      : <br>
                      {{ matchProjectWithConfig('block_open_infos')}} <br>
                    </span>
                  </div>

                  <div id="block-infos-pract" v-if="isPositionFilled('block_infos_pract')">
                    <span class="icon is-small">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    <span>
                      <!-- {{ infosMore }}  -->
                      {{ getDefaultText('more_infos') }}
                      :
                      {{ matchProjectWithConfig('block_infos_pract')}}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            <!-- BLOCK RIGHT BOTTOM 1 -->
            <div class="added" id="block-RB1" v-if="isPositionFilled('block_right_bottom_1') || isPositionFilled('block_rb1_tags') || isPositionFilled('block_right_bottom_2') ">
              <div class="columns">
                <div class="column is-12">

                  <!-- BLOCK RB1 TAGS -->
                  <div id="block-RB1-tags" v-if="isPositionFilled('block_rb1_tags')">
                    <span
                      v-if="getCustomBlockTitle('block_rb1_tags')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c"
                      >
                      {{ getCustomBlockTitle('block_rb1_tags') }}
                    </span>
                    <br><br>
                    <span
                      class="tag"
                      v-for="(tag, i) in matchProjectWithConfig('block_rb1_tags')"
                      :key="tag + i"
                      >
                      {{ tag }}
                    </span>
                    <br><br>
                  </div>

                  <div>

                    <span
                      v-if="getCustomBlockTitle('block_right_bottom_1')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c"
                      >
                      {{ getCustomBlockTitle('block_right_bottom_1') }}
                      <br><br>
                    </span>

                    <span>
                      {{ matchProjectWithConfig('block_right_bottom_1')}}
                    </span>

                  </div>

                  <div v-if="isPositionFilled('block_right_bottom_2')">
                    <br>

                    <span
                      v-if="getCustomBlockTitle('block_right_bottom_2')"
                      class="has-text-weight-semibold has-text-primary has-text-primary-c"
                      >
                      {{ getCustomBlockTitle('block_right_bottom_2') }}
                      <br><br>
                    </span>

                    <span>
                      {{ matchProjectWithConfig('block_right_bottom_2')}}
                    </span>

                  </div>
                </div>
              </div>
            </div>


          </div> <!-- end column right -->

        </div>
      </div>

    </main>

    <NotFoundError v-if="isError"/>

  </div>
</template>



<script>
import { mapState, mapGetters } from 'vuex'

import NotFoundError from './NotFoundError.vue';

// import { getItemById } from '~/plugins/utils.js';
import { getItemContent, getDefaultImage } from '~/plugins/utils.js';
import { BasicDictionnary } from "~/config/basicDict.js"

import VueApexCharts from 'vue-apexcharts'

import ForceNetworkGraph from './ForceNetworkGraph.vue'
import TreeView from './TreeView.vue'

export default {

  name: 'DynamicDetail',

  components: {
    NotFoundError,
    apexchart: VueApexCharts,
    TreeItem : TreeView,
    ForceNetworkGraph
  },

  props: [
    'routeConfig',
    'endPointConfig',
  ],

  data: () => {
    return   {
      contentFields : null,
      isError: false,
      basicDict : BasicDictionnary
    }
  },

  beforeMount: function () {
    this.log && console.log("\n - - DynamicDetail / beforeMount ... ")
    this.contentFields = this.routeConfig.contents_fields
  },

  mounted(){
    // hack to scroll top because vue-router scrollBehavior thing doesn't seem to work on Firefox on Linux at least
    this.log && console.log(" - - DynamicDetail / mounted... ")
    const int = setInterval(() => {
      if(window.pageYOffset < 50){
        clearInterval(int)
      }
      else{
        window.scrollTo(0, 0)
      }
    }, 100);

    this.log && console.log(" - - DynamicDetail / mounted / this.$nuxt.$route : ", this.$nuxt.$route )
    if (this.$nuxt.$route.query.id) {
      this.$store.dispatch('search/searchOne', this.$nuxt.$route.query.id)
    }
  },

  computed: {

    ...mapState({
      log: state => state.log,
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      user: state => state.user.user,
    }),

    ...mapGetters({
      displayableItem : 'search/getDisplayedProject',
      filterDescriptions : 'search/getFilterDescriptions',
    }),

    refinedData() {
      var prototypeRefinedData = {
        year : -42,
        VenteMarchandises : -42,
        ProductionVendueDeBiens : -42,
        ProductionVendueDeServices : -42,
        ChiffresAffairesNet : -42,
        ProductionStocked : -42,
        ProductionImmobilisee : -42,
        SubventionsExploitation : -42,
        RepriseDepreciationProvisionsTransfertChargesExploitation : -42,
        AutresProduits : -42,
        ProduitsExploitation : -42,
        AchatsDeMarchandises : -42,
        VariationStockMarchandises : -42,
        AchatMatierePremiereAutreAppro : -42,
        VariationStockMatierePremiereEtAppro : -42,
        AutresAchatEtChargesExternes : -42,
        ImpotTaxesEtVersementsAssimiles : -42,
        SalairesEtTraitements : -42,
        ChargesSociales : -42,
        DotationAmortissementImmobilisations : -42,
        DotationDepreciationImmobilisations : -42,
        DotationDepreciationActifCirculant : -42,
        DotationProvisions : -42,
        AutresCharges : -42,
        ChargesExploitation : -42,
        ResultatExploitation : -42,
        ProduitsFinanciersParticipations : -42,
        ProduitsAutresValeursMobiliereEtCreancesActifImmobilise : -42,
        AutreInteretEtProduitAssimile : -42,
        RepriseDepreciationEtProvisionTransfertsChargesFinancier : -42,
        DifferencesPositivesChange : -42,
        ProduitsNetsCessionsValeursMobilesPlacement : -42,
        ProduitsFinanciers : -42,
        DotationsFinancieresAmortissementDepreciationProvision : -42,
        InteretEtChargeAssimilees : -42,
        DifferenceNegativeChange : -42,
        ChargesNetteCessionValeurMobiliereDePlacement : -42,
        ChargesFinancieres : -42,
        ResultatFinancier : -42,
        ProduitExceptionnelOperationGestion : -42,
        ProduitExceptionnelOperationCapital : -42,
        RepriseDepreciationProvisionTransfertChargeExceptionnel : -42,
        ProduitsExceptionnels : -42,
        ChargesExceptionnelleOperationGestion : -42,
        ChargesExceptionnelleOperationCapital : -42,
        DotationExceptionnelleAmortissementDepreciationProvision : -42,
        ChargesExceptionnelles : -42,
        ResultatExceptionnel : -42,
        ParticipationSalariesAuxResultats : -42,
        ImpotsSurLesBenefices : -42,
        Benefice : -42,
        EffectifsMoyens : -42,
        Dividende : -42
      }

      var codeToArrayMappings = [
        { arrayToFill : 'VenteMarchandises' , codeAlternatives : [ 'FA' ] },
        { arrayToFill : 'ProductionVendueDeBiens' , codeAlternatives : [ 'FD' ] },
        { arrayToFill : 'ProductionVendueDeServices' , codeAlternatives : [ 'FG' ] },
        { arrayToFill : 'ChiffresAffairesNet' , codeAlternatives : [ 'FJ' ] },
        { arrayToFill : 'ProductionStocked' , codeAlternatives : [ 'FM', '222' ] },
        { arrayToFill : 'ProductionImmobilisee' , codeAlternatives : [ 'FN', '224' ] },
        { arrayToFill : 'SubventionsExploitation' , codeAlternatives : [ 'FO', '226' ] },
        { arrayToFill : 'RepriseDepreciationProvisionsTransfertChargesExploitation' , codeAlternatives : [ 'FP' ] },
        { arrayToFill : 'AutresProduits' , codeAlternatives : [ 'FQ', '230' ] },
        { arrayToFill : 'ProduitsExploitation' , codeAlternatives : [ 'FR', '232' ] },
        { arrayToFill : 'AchatsDeMarchandises' , codeAlternatives : [ 'FS', '234' ] },
        { arrayToFill : 'VariationStockMarchandises' , codeAlternatives : [ 'FT', '236' ] },
        { arrayToFill : 'AchatMatierePremiereAutreAppro' , codeAlternatives : [ 'FU', '238' ] },
        { arrayToFill : 'VariationStockMatierePremiereEtAppro' , codeAlternatives : [ 'FV', '240' ] },
        { arrayToFill : 'AutresAchatEtChargesExternes' , codeAlternatives : [ 'FW', '242' ] },
        { arrayToFill : 'ImpotTaxesEtVersementsAssimiles' , codeAlternatives : [ 'FX', '244' ] },
        { arrayToFill : 'SalairesEtTraitements' , codeAlternatives : [ 'FY', '250' ] },
        { arrayToFill : 'ChargesSociales' , codeAlternatives : [ 'FZ', '252' ] },
        { arrayToFill : 'DotationAmortissementImmobilisations' , codeAlternatives : [ 'GA', '254' ] },
        { arrayToFill : 'DotationDepreciationImmobilisations' , codeAlternatives : [ 'GB' ] },
        { arrayToFill : 'DotationDepreciationActifCirculant' , codeAlternatives : [ 'GC' ] },
        { arrayToFill : 'DotationProvisions' , codeAlternatives : [ 'GD', '256' ] },
        { arrayToFill : 'AutresCharges' , codeAlternatives : [ 'GE', '262' ] },
        { arrayToFill : 'ChargesExploitation' , codeAlternatives : [ 'GF', '264' ] },
        { arrayToFill : 'ResultatExploitation' , codeAlternatives : [ 'GG', '270' ] },
        { arrayToFill : 'ProduitsFinanciersParticipations' , codeAlternatives : [ 'GJ' ] },
        { arrayToFill : 'ProduitsAutresValeursMobiliereEtCreancesActifImmobilise' , codeAlternatives : [ 'GK' ] },
        { arrayToFill : 'AutreInteretEtProduitAssimile' , codeAlternatives : [ 'GL' ] },
        { arrayToFill : 'RepriseDepreciationEtProvisionTransfertsChargesFinancier' , codeAlternatives : [ 'GM' ] },
        { arrayToFill : 'DifferencesPositivesChange' , codeAlternatives : [ 'GN' ] },
        { arrayToFill : 'ProduitsNetsCessionsValeursMobilesPlacement' , codeAlternatives : [ 'GO' ] },
        { arrayToFill : 'ProduitsFinanciers' , codeAlternatives : [ 'GP', '280' ] },
        { arrayToFill : 'DotationsFinancieresAmortissementDepreciationProvision' , codeAlternatives : [ 'GQ' ] },
        { arrayToFill : 'InteretEtChargeAssimilees' , codeAlternatives : [ 'GR' ] },
        { arrayToFill : 'DifferenceNegativeChange' , codeAlternatives : [ 'GS' ] },
        { arrayToFill : 'ChargesNetteCessionValeurMobiliereDePlacement' , codeAlternatives : [ 'GT' ] },
        { arrayToFill : 'ChargesFinancieres' , codeAlternatives : [ 'GU', '294' ] },
        { arrayToFill : 'ResultatFinancier' , codeAlternatives : [ 'GV' ] },
        { arrayToFill : 'ProduitExceptionnelOperationGestion' , codeAlternatives : [ 'HA' ] },
        { arrayToFill : 'ProduitExceptionnelOperationCapital' , codeAlternatives : [ 'HB' ] },
        { arrayToFill : 'RepriseDepreciationProvisionTransfertChargeExceptionnel' , codeAlternatives : [ 'HC' ] },
        { arrayToFill : 'ProduitsExceptionnels' , codeAlternatives : [ 'HD', '290' ] },
        { arrayToFill : 'ChargesExceptionnelleOperationGestion' , codeAlternatives : [ 'HE' ] },
        { arrayToFill : 'ChargesExceptionnelleOperationCapital' , codeAlternatives : [ 'HF' ] },
        { arrayToFill : 'DotationExceptionnelleAmortissementDepreciationProvision' , codeAlternatives : [ 'HG' ] },
        { arrayToFill : 'ChargesExceptionnelles' , codeAlternatives : [ 'HH', '300' ] },
        { arrayToFill : 'ResultatExceptionnel' , codeAlternatives : [ 'HI' ] },
        { arrayToFill : 'ParticipationSalariesAuxResultats' , codeAlternatives : [ 'HJ' ] },
        { arrayToFill : 'ImpotsSurLesBenefices' , codeAlternatives : [ 'HK', '306' ] },
        { arrayToFill : 'Benefice' , codeAlternatives : [ 'HN', '310' ] },
        { arrayToFill : 'EffectifsMoyens' , codeAlternatives : [ '' ] },
        { arrayToFill : 'Dividende' , codeAlternatives : [ '' ] }
      ]

      var result = []
      for (var declaration of this.displayableItem.Enthic.declarations){
        var localData = JSON.parse(JSON.stringify(prototypeRefinedData));
        for ( var mapping of codeToArrayMappings)
        {
          var value = -42
          for ( var code of mapping.codeAlternatives)
          {
            if (code in declaration.financial_data_refined)
            {
              value = declaration.financial_data_refined[code].value
              break
            }
          }
          localData[mapping.arrayToFill] = value
        }
        localData.year = declaration.declaration.value
        result.push(localData)
      }
      console.log(" - - DynamicDetail / computed / this.refinedData :", result)
      return result
    },

    treeData() {
      var formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
      });
      var result = []
      for (var oneYearData of this.refinedData){
        result.push(
          {
            name : 'Année ' + oneYearData.year + ', bénéfices : ' + formatter.format(oneYearData.Benefice),
            children : [
              {
               name : 'Résultat d\'exploitation ' + formatter.format(oneYearData.ResultatExploitation),
               children : [
                  {
                    name : 'Produits d\'exploitation ' + formatter.format(oneYearData.ProduitsExploitation),
                    children : [
                      {
                        name : 'Chiffres d\'affaires nets ' + formatter.format(oneYearData.ChiffresAffairesNet),
                        children : [
                          { name: 'Ventes de marchandises ' + formatter.format(oneYearData.VenteMarchandises) },
                          { name: 'Production vendues de biens ' + formatter.format(oneYearData.ProductionVendueDeBiens) },
                          { name: 'Production vendue de services ' + formatter.format(oneYearData.ProductionVendueDeServices) }
                        ]
                      },
                      { name: 'Production stockée ' + formatter.format(oneYearData.ProductionStocked) },
                      { name: 'Production immobilisée ' + formatter.format(oneYearData.ProductionImmobilisee) },
                      { name: 'Subvention d\'exploitation ' + formatter.format(oneYearData.SubventionsExploitation) },
                      { name: 'Reprises sur dépréciations, provisions (et amortissements), transfert de charges ' + formatter.format(oneYearData.RepriseDepreciationProvisionsTransfertChargesExploitation) },
                      { name: 'Autres produits ' + formatter.format(oneYearData.AutresProduits) }
                    ]
                  },
                  {
                    name : 'Charges d\'exploitation ' + formatter.format(oneYearData.ChargesExploitation),
                    children : [
                        { name: 'Achats de marchandise (y compris droits de douane)' + formatter.format(oneYearData.AchatsDeMarchandises) },
                        { name: 'Variation de stock (marchandises)' + formatter.format(oneYearData.VariationStockMarchandises) },
                        { name: 'Achat de matières premières et autres approvisionnements (et droit de douane)' + formatter.format(oneYearData.AchatMatierePremiereAutreAppro) },
                        { name: 'Variation de stock (matières premières et approvisionnements)' + formatter.format(oneYearData.VariationStockMatierePremiereEtAppro) },
                        { name: 'Autres achats et charges externes ' + formatter.format(oneYearData.AutresAchatEtChargesExternes) },
                        { name: 'Impôts, taxes et versements assimilés ' + formatter.format(oneYearData.ImpotTaxesEtVersementsAssimiles) },
                        { name: 'Salaires et traitements ' + formatter.format(oneYearData.SalairesEtTraitements) },
                        { name: 'Cotisations sociales ' + formatter.format(oneYearData.ChargesSociales) },
                        {
                          name : 'DOTATIONS D\'EXPLOITATION ' + formatter.format(oneYearData.DotationAmortissementImmobilisations + oneYearData.DotationDepreciationImmobilisations + oneYearData.DotationDepreciationActifCirculant + oneYearData.DotationProvisions),
                          children : [
                            { name: 'Sur immobilisations : dotations aux amortissements ' + formatter.format(oneYearData.DotationAmortissementImmobilisations) },
                            { name: 'Sur immobilisations : dotations aux dépréciations ' + formatter.format(oneYearData.DotationDepreciationImmobilisations) },
                            { name: 'Sur actif circulant : dotations aux dépréciations ' + formatter.format(oneYearData.DotationDepreciationActifCirculant) },
                            { name: 'Dotations aux provisions ' + formatter.format(oneYearData.DotationProvisions) }
                          ]
                        },
                        { name: 'Autres charges ' + formatter.format(oneYearData.AutresCharges) }
                      ]
                  },
                ]
              },
              {
                name : 'Résultat financier ' + formatter.format(oneYearData.ResultatFinancier),
                children : [
                  {
                    name : 'Produits financiers ' + formatter.format(oneYearData.ProduitsFinanciers),
                    children : [
                      { name: 'Produits financiers de participations' },
                      { name: 'Produits des autres valeurs mobilières et créances de l\'actif immobilisé' },
                      { name: 'Autres intérêts et produits assimilés' },
                      { name: 'Reprises sur dépréciations et provisions, transferts de charges' },
                      { name: 'Différences positives de change' },
                      { name: 'Produits nets sur cessions de valeurs mobilières de placement' }
                    ]
                  },
                  {
                    name : 'Charges financières ' + formatter.format(oneYearData.ChargesFinancieres),
                    children : [
                      { name: 'Dotations financières aux amortissements, dépréciations et provisions' },
                      { name: 'Intérêts et charges assimilées' },
                      { name: 'Différences négatives de change' },
                      { name: 'Charges nettes sur cessions de valeurs mobilières de placement' },
                    ]
                  }
                ]
              },
              {
                name : 'Résultat exceptionnel ' + formatter.format(oneYearData.ResultatExceptionnel),
                children : [
                  {
                    name : 'Produits exceptionnels ' + formatter.format(oneYearData.ProduitsExceptionnels),
                    children : [
                      { name: 'Produits exceptionnels sur opérations en capital' },
                      { name: 'Produits exceptionnels sur opérations de gestion' },
                      { name: 'Reprises sur dépréciations et provisions, transferts de charges' },
                    ]
                  },
                  {
                    name : 'Charges exceptionnelles ' + formatter.format(oneYearData.ChargesExceptionnelles),
                    children : [
                      { name: 'Charges exceptionnelles sur opérations de gestion' },
                      { name: 'Charges exceptionnelles sur opérations en capital' },
                      { name: 'Dotations exceptionnelles aux amortissements, dépréciations et provisions' },
                    ]
                  }
                ]
              },
              { name: 'Participation des salarié⋅es aux résultats de l\'entreprise ' + formatter.format(oneYearData.ParticipationSalariesAuxResultats) },
              { name: 'Impôts sur les bénéfices ' + formatter.format(oneYearData.ImpotsSurLesBenefices) }
            ]
          })
      }
      console.log("computed / treeData:", result);

      return result
    },

    // POSITIONS TO BE FILLED
    listOfPositions() {
      // this.log && console.log("listOfPositions /  this.contentFields.map( c => c.position ) :", this.contentFields.map( c => c.position ))
      return this.contentFields.map( c => c.position )
    },

    // TEXT TRANSLATORS - NO DATA
    noData() {
      return this.$store.getters['config/defaultText']({txt:'no_data'})
    },

    tidyRepresentants(){
      let representantsStreamlined = {"P.Physique" : new Map(), "P. Morale" : new Map()}
      for (const representant of this.displayableItem.RncsImr.representants) {
        // Personne physique
        if(["P.Physique", "P. Physique"].includes(representant.type_representant))
        {
          if(representantsStreamlined["P.Physique"].has(representant.id_representant))
          {
            representantsStreamlined["P.Physique"].get(representant.id_representant).push(representant);
          }
          else{
            representantsStreamlined["P.Physique"].set(representant.id_representant, [representant]);
          }
        }
        // Personne morale
        else if(representant.type_representant == "P. Morale")
        {
          if(representantsStreamlined["P. Morale"].has(representant.denomination))
          {
            representantsStreamlined["P. Morale"].get(representant.denomination).push(representant);
          }
          else{
            representantsStreamlined["P. Morale"].set(representant.denomination, [representant]);
          }
        }
        else {
          console.log("undefined :", representant);
        }
      }
      this.log && console.log(" - - DynamicDetail / computed / tidyRepresentants :", representantsStreamlined);

      let result = { nodes: [{id: this.displayableItem.CompanyNumber, name: this.displayableItem.Name}] , links : []}
      for (var physique of representantsStreamlined["P.Physique"])
      {
        var representantPhysique = physique[1][0];
        var nodeId = representantPhysique.id_representant;
        var nodeLabel = representantPhysique.nom_patronyme + " " + representantPhysique.prenoms;
        if(representantPhysique.nationalite != null)
        {
           nodeLabel += "\n Nationalité:" + representantPhysique.nationalite;
        }
        else {
          nodeLabel += "\n Pays:" + representantPhysique.adresse_pays;
        }
        var nodeColor = 'orange';
        // Create one node per physical person
        var newNode = {id: nodeId.toString(), name: nodeLabel, _color : nodeColor}
        result.nodes.push(newNode);
        for (var rep of physique[1])
        {
          // Create one link per "qualité"
          result.links.push({source: result.nodes[0], target: newNode, name: rep.qualite + "\n au " + representantPhysique.date_derniere_modification, _color : 'red' });
        }
      }

      for (var morale of representantsStreamlined["P. Morale"])
      {
        var nodeId = morale[0];
        var nodeColor = 'f0f';
        var nodeLabel = morale[0] + "\n représenté par ";
        if(morale[1][0].siren_pm != null)
        {
           nodeColor = 'f0f';
           nodeId = morale[1][0].siren_pm;
        }
        var qualiteMap = new Map();
        for (var rep of morale[1])
        {
          if (qualiteMap.has(rep.qualite))
          {
            qualiteMap.set(rep.qualite, qualiteMap.get(rep.qualite) + 1);
          }
          else{
            qualiteMap.set(rep.qualite, 1);
          }
        }
        for (var qualite of qualiteMap)
        {
          nodeLabel += qualite[1] + " " + qualite[0] + ";";
        }
        var newNode = {id: nodeId.toString(), name: nodeLabel, _color : nodeColor}
        result.nodes.push(newNode);
        result.links.push({source: result.nodes[0], target: newNode, name: "vache", _color : 'red' });
      }

      return result
    },

    displayableEnthicData(){
      var regexYear = /[12][0-9][0-9][0-9]/;
      let displayableEnthicData = { flatData : {}, yearData : []}
      for (var property in this.displayableItem.Enthic){
        if (["siren", "ape", "postal_code", "town"].includes(property) ){
          displayableEnthicData.flatData[property] = this.displayableItem.Enthic[property]
        }
      }
      for ( let enthicDeclaration of  this.displayableItem.Enthic.declarations)
      {
        let yearData = { year : enthicDeclaration.declaration.value }
        for (var yearProp in enthicDeclaration.financial_data_refined)
        {
          if (!["declaration", "dir", "dis", "gan"].includes(yearProp) )
          {
             yearData[yearProp] = enthicDeclaration.financial_data_refined[yearProp]
          }
        }
        displayableEnthicData.yearData.push(yearData)
      }
      this.log && console.log(" - - DynamicDetail / computed / displayableEnthicData :", displayableEnthicData)
      return displayableEnthicData
    },

    chartDetails(){
      var xLabels = [];

      var CA = [];
      var subventions = [];
      var achatMarchandises = [];
      var variationStockMarchandises = [];
      var achatMatierePremiereAutreAppro = [];
      var variationStockMatierePremiereAutreAppro = [];
      var autresAchatEtChargesExterne = [];
      var taxes = [];

      var resultatExploitation = [];
      var resultatFinancier = [];
      var resultatExceptionnel = [];

      var resultatExceptionnelEtFinancier = [];

      var factorCA = 1;
      var unitCA = '€';
      if (this.refinedData[0].ChiffresAffairesNet > 10000000){
        var factorCA = 1000000;
        var unitCA = 'millions d\'€';
      }
      else if (CA[0] > 30000) {
        var factorCA = 1000;
        var unitCA = 'milliers d\'€';
      }

      var factor = 1;
      var unitMargin = '€';
      if (this.refinedData[0].ResultatExploitation > 3000000 || this.refinedData[0].ResultatExploitation < -3000000){
        var factor = 1000000;
        var unitMargin = 'millions d\'€';
      }
      else if (this.refinedData[0].ResultatExploitation > 30000 || this.refinedData[0].ResultatExploitation < -100000) {
        var factor = 1000;
        var unitMargin = 'milliers d\'€';
      }

      var autreChargesMoinsAutresProduitsAffiches = [];
      var taxesMoinsSubventions = [];
      var marchandisesTotalAfficher = [];
      var salaires = [];
      var cotisationSociale = [];
      var Participation = [];
      var ImpotsSurLesSocietes = [];

      var resultatPourProprietaire = [];
      for(var i = 0; i < this.refinedData.length; i++){
          xLabels.push(this.refinedData[i].year)
          // Mise en forme des données du graphe sur le CA
          taxesMoinsSubventions.push(this.refinedData[i].ImpotTaxesEtVersementsAssimiles - this.refinedData[i].SubventionsExploitation);
          marchandisesTotalAfficher.push(this.refinedData[i].AchatsDeMarchandises + this.refinedData[i].VariationStockMarchandises + this.refinedData[i].AchatMatierePremiereAutreAppro + this.refinedData[i].VariationStockMatierePremiereEtAppro);
          autreChargesMoinsAutresProduitsAffiches.push(this.refinedData[i].ChiffresAffairesNet - this.refinedData[i].SalairesEtTraitements - this.refinedData[i].ChargesSociales - taxesMoinsSubventions[i] - marchandisesTotalAfficher[i] - this.refinedData[i].ResultatExploitation);

          // Mise en forme des données sur le graphe de la répartition du résultat d'exploitation
          resultatExceptionnelEtFinancier.push(-this.refinedData[i].ResultatFinancier - this.refinedData[i].ResultatExceptionnel);

          // Application du ratio pour l'affichage du graphe sur le CA
          salaires.push(Math.round(1000 * this.refinedData[i].SalairesEtTraitements / factorCA) / 1000);
          cotisationSociale[i] = Math.round(1000 * this.refinedData[i].ChargesSociales / factorCA) / 1000;
          taxesMoinsSubventions[i] = Math.round(1000 * taxesMoinsSubventions[i] / factorCA) / 1000;
          marchandisesTotalAfficher[i] = Math.round(1000 * marchandisesTotalAfficher[i] / factorCA) / 1000;
          autreChargesMoinsAutresProduitsAffiches[i] = Math.round(1000 * autreChargesMoinsAutresProduitsAffiches[i] / factorCA) / 1000;
          resultatExploitation.push(Math.round(1000 * this.refinedData[i].ResultatExploitation / factorCA) / 1000);

          // Application du ratio pour l'affichage du graphe sur le résultat d'exploitation
          Participation[i] = Math.round(1000 * this.refinedData[i].ParticipationSalariesAuxResultats / factor) / 1000;
          ImpotsSurLesSocietes[i] = Math.round(1000 * this.refinedData[i].ImpotsSurLesBenefices / factor) / 1000;
          resultatPourProprietaire[i] = Math.round(1000 * this.refinedData[i].Benefice / factor) / 1000;
          resultatExceptionnelEtFinancier[i] = Math.round(1000 * resultatExceptionnelEtFinancier[i] / factor) / 1000;
      }

      let seriesCA = [{
          name: 'Salaires Bruts',
          data: salaires
        }, {
          name: 'Cotisations Sociales',
          data: cotisationSociale
        }, {
          name: 'Taxes diverses retranchées des subventions',
          data: taxesMoinsSubventions
        }, {
          name: 'Achat de marchandises, matières premières et autre approvisionnement',
          data: marchandisesTotalAfficher
        }, {
          name: 'Autres charges retranchées des autres produits',
          data: autreChargesMoinsAutresProduitsAffiches
        }, {
          name: 'Résultat d\'exploitation (marge de l\'entreprise)',
          data: resultatExploitation
        }]

      let seriesMargin = [{
          name: 'Participation',
          data: Participation
        }, {
          name: 'Impôts',
          data: ImpotsSurLesSocietes
        }, {
          name: 'Résultat pour les propriétaires de l\'entreprise',
          data: resultatPourProprietaire
        }, {
          name: 'Résultat financier et exceptionnel',
          data: resultatExceptionnelEtFinancier
        }]

      let chartOptionsCA = {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: xLabels,
          },
          yaxis:
          {
            title: {
              text: unitCA,
              style: {
                color: "#008FFB"
              }
            }
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        }

      let chartOptionsMargin = {
          chart: {
            type: 'bar',
            height: 350,
            stacked: false,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: false
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: xLabels,
          },
          yaxis:
          {
            title: {
              text: unitMargin,
              style: {
                color: "#008FFB"
              }
            }
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        }
      this.log && console.log(" - - DynamicDetail / computed / chartDetails :", seriesCA)

      return {
        seriesMargin: seriesMargin,
        seriesCA: seriesCA,
        chartOptionsCA: chartOptionsCA,
        chartOptionsMargin: chartOptionsMargin
      }
    }
  },

  methods : {

    getDefaultText(txt_code){
      return this.$store.getters['config/defaultText']({txt:txt_code})
    },

    isPositionFilled(fieldBlock){
      // this.log && console.log("isPositionFilled /  fieldBlock :", fieldBlock)
      return this.listOfPositions.indexOf(fieldBlock) !== -1
    },

    itemImage(fieldBlock){
      let image = this.matchProjectWithConfig(fieldBlock)
      if ( !image ){
        let idFieldObject = this.contentFields.find( c => c.position === 'block_id' )
        // let idField = idFieldObject.field
        let idField = idFieldObject ? idFieldObject.field : 'sd_id'
        let d = this.$store.getters['config/getRouteConfigDefaultDatasetImages']
        let image_default = getDefaultImage(d, this.displayableItem, idField)
        image = image_default
      }
      return image
    },

    matchProjectWithConfig(fieldBlock) {
      return getItemContent(fieldBlock, this.displayableItem, this.contentFields, this.noData, this.filterDescriptions, this.locale)
    },

    getCustomBlockTitle(fieldBlock){
      let customBlockTitle = undefined
      const contentField = this.contentFields.find(f=> f.position == fieldBlock)
      if (contentField){
        customBlockTitle = contentField.custom_title
      }
      return customBlockTitle
    },

    projectId() {
      return this.matchProjectWithConfig('block_id')
    },

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }
  },

}
</script>


<style lang="scss" scoped>
  @import '../../assets/css/apiviz-colors.scss';
  @import '../../assets/css/apiviz-misc.scss';

  main{
    // background-color: $apiviz-blue-deep;
    background-color: $apiviz-grey-background;
    margin-top: $apiviz-navbar-height;
    height: 100%;
    padding-bottom: 3em;

  }

  ul {
    list-style-type: circle;
  }

  .block-color {
    background-color: $apiviz-secondary !important;
    color: white;
  }

  .tag{
      background-color: $apiviz-secondary;
      color: white;
      margin-right: 1em;
      margin-bottom: 0.5em;
  }

  a.disabled {
    pointer-events: none;
    border-bottom: none !important ;
    cursor: default;
  }

  a.back{
    padding: 1em 0;
    display: block;

    color: $apiviz-text-color;
    // color: white ;

    img, .icon{
      height: 1.5em;
      transform: translateY(0.1em);
    }

    span{
      margin-left: 1em;
      // color: white ;
    }
  }

  .columns{
      margin-top: 0;
  }

  .illustration{
    width: 100%;
    margin-bottom: 1em;
  }

  .description, .added{
    // background-color: $apiviz-blue-deep;
    background-color: white;
    // color: white;
    padding: 1em;
    margin-bottom: 1em;
  }

  .description{
    h1{
        font-weight: bold;
    }

    p{
        margin-bottom: 1em;
    }

    a{
        color: $apiviz-primary;
        border-bottom: 1px solid $apiviz-primary;
    }
  }


  .added {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    .link-at-sourcer img{
        max-height: 1.1em;
        transform: translateY(0.2em);
    }

    img{
        height:auto;
    }

    .no-left-padding {
        padding-left: 0em;
    }
    .is-vertical-centered {
        // padding-left: 1em;
        display: flex;
        align-items: center;
    }

    .logo {
        // max-width: 175px;
        height: auto;
        width:100%;
    }

    a{
        color: $apiviz-primary;
        font-weight: bold;
    }
  }

  .content{
    h2{
        font-weight: bold;
    }

  }
  .pending{
      text-align: center;
      padding: 9em;
  }

  svg{
    margin: 25px;
  }
  path{
    fill: none;
    stroke: #76BF8A;
    stroke-width: 3px;
  }
</style>
