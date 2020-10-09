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
        <div class="columns">
          <div class="column">
            <div class="box has-background-warning">
              <h1 id="block-title" class="title is-3">
                {{ displayableItem.Enthic.denomination.value }}
              </h1>
              <ul>
                <li v-for="data in displayableEnthicData.flatData">{{ data.description }} : {{ data.value }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="displayableItem.Enthic.comptesDeResultats" class="box has-background-grey-lighter">
          <h1 class="title is-6">
            Voici les données des bilans comptables présentées de façon arborescente :
          </h1>
          <p class="subtitle">Cliquer sur une ligne permet de découvrir les détails de sa composition</p>
          <div class="tile is-ancestor is-vertical">
            <div class="tile is-parent">
              <div class="tile is-6"></div>
              <div class="tile" v-for="oneYeardata in displayableItem.Enthic.comptesDeResultats"> Année {{ oneYeardata.year }}</div>
            </div>
            <FoldingArray
              :rowItem="displayableItem.Enthic.comptesDeResultats"
            ></FoldingArray>
            <div class="tile is-parent">
              <p class="tile" style="color: #194;">Une valeur en vert est une valeur officielle et qui peut être retrouvée avec les autres valeurs fournies
                (erreur de maximum 0,5% ou 10€ tolérée)</p>
              <p class="tile" style="color: #419;">Une valeur en bleu est une valeur non fournie mais qui peut être retrouvée avec les autres valeurs</p>
              <p class="tile" style="color: #941;">Une valeur en rouge est une valeur non fournie, ou officielle mais ne correspondant pas aux autres valeurs</p>
            </div>
          </div>
        </div>
        <div v-if="displayableItem.Enthic.treeRepresentations" class="box has-background-info">
          <h1 id="block-title" class="title is-6">
            Répartition du chiffre d'affaire
          </h1>
          <p>Ce graphique montre la répartition des charges payées par le chiffre d'affaire de l'entreprise. La hauteur de chaque colonne correspond au chiffre d'affaire.</p>
          <apexchart type="bar" height="350" :options="chartDetails.chartOptionsCA" :series="chartDetails.seriesCA"></apexchart>
          <p>Listes des problèmes pour afficher le graphique</p>
          <ul>
            <li v-for="item in chartDetails.undisplayables">
              {{ item }}
            </li>
          </ul>
        </div>
        <div v-if="displayableItem.Enthic.treeRepresentations" class="box has-background-info">
          <h1 id="block-title" class="title is-6">
            Répartition de la marge de l'entreprise
          </h1>
          <p>Ce graphique montre comment la marge de l'entreprise sur son activité principale (résultat d'exploitation) est répartie entre :</p>
          <ul>
            <li>les salarié⋅es (participation)</li>
            <li>la collectivité (impôts)</li>
            <li>l'entreprise (Résultat pour les propriétaires de l'entreprise)</li>
            <li>les créanciers, les marchés, etc... (Résultat financier et exceptionnel)</li>
            </ul>
          <apexchart type="bar" height="350" :options="chartDetails.chartOptionsMargin" :series="chartDetails.seriesMargin"></apexchart>
          <p>Un montant positif signifie que l'entreprise a donné de l'argent à l'acteur économique en question, un montant négatif signifie que l'acteur économique donne de l'argent à l'entreprise.</p>
        </div>
        <div class="columns">

          <!-- //// COLUMN LEFT //// -->
          <div class="column">
            <div class="box">
              <h1 class="tile title is-6">
                Autres données présentes dans la base Enthic, mais pas valorisées ici :
              </h1>
              <p v-for="year in displayableEnthicData.yearData">
                {{ year.year }}
              <ul>
                <li v-for="data in year.data">{{ data.description }} : {{ data.value }}</li>
              </ul>
              </p>
              <div class="description">
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
          </div>

          <!-- //// COLUMN RIGHT //// -->
          <div class="column">
            <div class="box has-background-grey-lighter">
              <h1 class="tile title is-6 ">
                Autre représentation des comptes de résultat
              </h1>
              <ul v-for="oneYeardata in displayableItem.Enthic.treeRepresentations"
                  v-bind:key="oneYeardata.year">
                <p> Année {{ oneYeardata.year }} </p>
                <TreeItem
                  class="item"
                  :item="oneYeardata"
                ></TreeItem>
              </ul>

              <!-- BLOCK SOURCE -->
              <div class="added" id="block-src" v-if="isPositionFilled('block_src')">
                <div class="columns">
                  <div class="column is-12">
                    <div>
                              <span
                                class="has-text-weight-semibold has-text-primary has-text-primary-c">
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
              <div class="added" id="block-scale"
                   v-if="isPositionFilled('block_scale') || isPositionFilled('block_scale_address')">
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
                              <span
                                class="has-text-weight-semibold has-text-primary has-text-primary-c">
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
                              <span
                                class="has-text-weight-semibold has-text-primary has-text-primary-c">
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
              <div class="added" id="block-RB1"
                   v-if="isPositionFilled('block_right_bottom_1') || isPositionFilled('block_rb1_tags') || isPositionFilled('block_right_bottom_2') ">
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
            </div>
          </div>
        </div><!-- end column right -->
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
import FoldingArray from './FoldingArray.vue'

export default {

  name: 'DynamicDetail',

  components: {
    NotFoundError,
    apexchart: VueApexCharts,
    TreeItem : TreeView,
    FoldingArray,
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
      var formatter = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0
      });
      let displayableEnthicData = { flatData : {}, yearData : []}
      for (var property in this.displayableItem.Enthic){
        if (["siren", "ape", "postal_code", "town"].includes(property) ){
          displayableEnthicData.flatData[property] = this.displayableItem.Enthic[property]
        }
      }
      for ( let enthicDeclaration of  this.displayableItem.Enthic.declarations)
      {
        let yearData = { year : enthicDeclaration.declaration.value, data : {} }
        for (var yearProp in enthicDeclaration.financial_data_refined)
        {
          yearData.data[yearProp] = { description : enthicDeclaration.financial_data_refined[yearProp].description,
                                      value : formatter.format(enthicDeclaration.financial_data_refined[yearProp].value)
                                    }
        }
        displayableEnthicData.yearData.push(yearData)
      }
      this.log && console.log(" - - DynamicDetail / computed / displayableEnthicData :", displayableEnthicData)
      return displayableEnthicData
    },

    chartDetails(){
      // Find perfect unit for CA graphic (€, k€ or M€)
      var beneficeItem = this.displayableItem.Enthic.treeRepresentations[0]
      var factorCA = 1;
      var unitCA = '€';
      var CADeReference = beneficeItem.children.ResultatExploitation.children.ProduitsExploitation.children.ChiffresAffairesNet.data.value
      if (CADeReference > 10000000){
        var factorCA = 1000000;
        var unitCA = 'millions d\'€';
      }
      else if (CADeReference > 300000) {
        var factorCA = 1000;
        var unitCA = 'milliers d\'€';
      }

      // Find perfect unit for margin graphic (€, k€ or M€)
      var factor = 1;
      var unitMargin = '€';
      var resultatDeReference = beneficeItem.children.ResultatExploitation.data.value
      if (isNaN(resultatDeReference))
      {
        resultatDeReference = beneficeItem.data.value
      }
      if (resultatDeReference > 3000000 || resultatDeReference < -3000000){
        var factor = 1000000;
        var unitMargin = 'millions d\'€';
      }
      else if (resultatDeReference > 30000 || resultatDeReference < -100000) {
        var factor = 1000;
        var unitMargin = 'milliers d\'€';
      }

      var xLabels = [];

      var dataSeriesMargin = {
        resultatExceptionnelEtFinancier : [],
        Participation : [],
        ImpotsSurLesSocietes : [],
        resultatPourProprietaire : []
      }

      var dataSeriesCA = {
        salaires : [],
        cotisationSociale : [],
        taxesMoinsSubventions : [],
        marchandisesTotalAfficher : [],
        autreChargesMoinsAutresProduitsAffiches : [],
        resultatExploitation : []
      }
      var euroFormatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
      });
      var listOfUndisplayableData = []
      var showResultatExploitation = true
      var showTaxeVsSubvention = true
      for(var i = 0; i < this.displayableItem.Enthic.treeRepresentations.length; i++){
          xLabels.push(this.displayableItem.Enthic.compteResultatRefined[i].year)

          // Local variables for code visibility
          var rootItem = this.displayableItem.Enthic.treeRepresentations[i]
          var resultExploit = rootItem.children.ResultatExploitation
          var produits = resultExploit.children.ProduitsExploitation
          var charges = resultExploit.children.ChargesExploitation

          // Get all needed values for first graphic (about Chiffre d'Affaire)
          var impotsEtAssimiles = this.cleanUndefinedDataForGraphicalDisplay(charges.children.ImpotTaxesEtVersementsAssimiles, listOfUndisplayableData, xLabels[i])
          var subventions = this.cleanUndefinedDataForGraphicalDisplay(produits.children.SubventionsExploitation, listOfUndisplayableData, xLabels[i])
          var achatMarchandises = this.cleanUndefinedDataForGraphicalDisplay(charges.children.AchatsDeMarchandises, listOfUndisplayableData, xLabels[i])
          var variationMarchandises = this.cleanUndefinedDataForGraphicalDisplay(charges.children.VariationStockMarchandises, listOfUndisplayableData, xLabels[i])
          var achatMatierePremiere = this.cleanUndefinedDataForGraphicalDisplay(charges.children.AchatMatierePremiereAutreAppro, listOfUndisplayableData, xLabels[i])
          var variationMatierePremiere = this.cleanUndefinedDataForGraphicalDisplay(charges.children.VariationStockMatierePremiereEtAppro, listOfUndisplayableData, xLabels[i])
          var salaire = this.cleanUndefinedDataForGraphicalDisplay(charges.children.SalairesEtTraitements, listOfUndisplayableData, xLabels[i])
          var cotisation = this.cleanUndefinedDataForGraphicalDisplay(charges.children.ChargesSociales, listOfUndisplayableData, xLabels[i])
          var resultatExploitation = this.cleanUndefinedDataForGraphicalDisplay(resultExploit, listOfUndisplayableData, xLabels[i])

          // Affichage des taxes uniquement si elles sont supérieures aux subventions
          if (impotsEtAssimiles < subventions) {
            dataSeriesCA.taxesMoinsSubventions[i] = 0
            listOfUndisplayableData.push("subventions (" + euroFormatter.format(subventions) + ") supérieur aux taxes (" + euroFormatter.format(impotsEtAssimiles) + ") en " + xLabels[i])
            showTaxeVsSubvention = false
          }
          else {
            dataSeriesCA.taxesMoinsSubventions.push(impotsEtAssimiles - subventions)
          }

          // Display only if positive
          if (resultatExploitation < 0 )
          {
            showResultatExploitation = false
            resultatExploitation = 0
            listOfUndisplayableData.push("résultat d'exploitation négatif en " + xLabels[i])
          }

          // Compute other complexe data to display
          dataSeriesCA.marchandisesTotalAfficher.push(achatMarchandises + variationMarchandises + achatMatierePremiere + variationMatierePremiere);
          dataSeriesCA.autreChargesMoinsAutresProduitsAffiches.push(produits.children.ChiffresAffairesNet.data.value - salaire - cotisation - dataSeriesCA.taxesMoinsSubventions[i] - dataSeriesCA.marchandisesTotalAfficher[i] - resultatExploitation);

          // Application du ratio pour l'affichage du graphe sur le CA
          dataSeriesCA.salaires.push(Math.round(1000 * salaire / factorCA) / 1000);
          dataSeriesCA.cotisationSociale.push(Math.round(1000 * cotisation / factorCA) / 1000);
          dataSeriesCA.taxesMoinsSubventions[i] = Math.round(1000 * dataSeriesCA.taxesMoinsSubventions[i] / factorCA) / 1000;
          dataSeriesCA.marchandisesTotalAfficher[i] = Math.round(1000 * dataSeriesCA.marchandisesTotalAfficher[i] / factorCA) / 1000;
          dataSeriesCA.autreChargesMoinsAutresProduitsAffiches[i] = Math.round(1000 * dataSeriesCA.autreChargesMoinsAutresProduitsAffiches[i] / factorCA) / 1000;
          dataSeriesCA.resultatExploitation.push(Math.round(1000 * resultatExploitation / factorCA) / 1000);

          // Application du ratio pour l'affichage du graphe sur le résultat d'exploitation
          dataSeriesMargin.Participation.push(Math.round(1000 *  rootItem.children.ParticipationSalariesAuxResultats.data.value / factor) / 1000);
          dataSeriesMargin.ImpotsSurLesSocietes.push(Math.round(1000 * rootItem.children.ImpotsSurLesBenefices.data.value / factor) / 1000);
          dataSeriesMargin.resultatPourProprietaire.push(Math.round(1000 * rootItem.data.value / factor) / 1000);
          dataSeriesMargin.resultatExceptionnelEtFinancier.push(Math.round(1000 * (-rootItem.children.ResultatExceptionnel.data.value - rootItem.children.ResultatFinancier.data.value) / factor) / 1000);
      }

      // Build data series to pass to graphical plugin
      let seriesCA = [ {
          name: 'Autres charges retranchées des autres produits',
          data: dataSeriesCA.autreChargesMoinsAutresProduitsAffiches
        }, {
          name: 'Salaires Bruts',
          data: dataSeriesCA.salaires
        }, {
          name: 'Cotisations Sociales',
          data: dataSeriesCA.cotisationSociale
        }, {
          name: 'Achat de marchandises, matières premières et autre approvisionnement',
          data: dataSeriesCA.marchandisesTotalAfficher
        }]
      if (showTaxeVsSubvention)
      {
        console.log("showing taxe and sub")
        seriesCA.push({
          name: 'Taxes diverses retranchées des subventions',
          data: dataSeriesCA.taxesMoinsSubventions
        })
      }
      if (showResultatExploitation)
      {
        seriesCA.push({
          name: 'Résultat d\'exploitation (marge de l\'entreprise)',
          data: dataSeriesCA.resultatExploitation
        })
      }
      let seriesMargin = [{
          name: 'Participation',
          data: dataSeriesMargin.Participation
        }, {
          name: 'Impôts',
          data: dataSeriesMargin.ImpotsSurLesSocietes
        }, {
          name: 'Résultat pour les propriétaires de l\'entreprise',
          data: dataSeriesMargin.resultatPourProprietaire
        }, {
          name: 'Résultat financier et exceptionnel',
          data: dataSeriesMargin.resultatExceptionnelEtFinancier
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
                offsetX: -5,
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
        chartOptionsMargin: chartOptionsMargin,
        undisplayables : listOfUndisplayableData
      }
    }
  },

  methods : {
    cleanUndefinedDataForGraphicalDisplay(item, undefinedDataList, year){
      if (isNaN(item.data.value))
      {
        undefinedDataList.push(item.name + " non fournis pour l'année " + year)
        return 0
      }
      return item.data.value
    },

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
