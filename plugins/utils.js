
console.log('+ + + plugins/utils... ')

import axios from 'axios'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// feature test for AbortController that works in Safari 12
let abortableFetchSupported = false;

try{
  const ac = new AbortController()

  fetch('.', {signal: ac.signal})
  .then(r => r.text())
  .then(result => {
    abortableFetchSupported = false;
  })
  .catch(err => {
    abortableFetchSupported = err.name === 'AbortError'
  })

  ac.abort();
}
catch(e){
  abortableFetchSupported = false;
}

export function getJson( fetchUrl ){

  console.log("+ + + getJson / fetchUrl : ", fetchUrl)

  return axios({
    method : 'get',
    url : fetchUrl,
  })
  .then( resp => {
    // console.log("+ + + getJson / resp :", resp);
    return resp
  })
  .catch( err => {
    console.log("+ + + getJson / (axios)  err :", err);
  })
}

// choose error template if needed
export function chooseTemplate(templates, locale){
  if (templates) {
    let template = templates.find(t => {
      return t.locale === locale
    })
    return template.url
  } else {
    return "https://raw.githubusercontent.com/co-demos/structure/master/pages-html/tools-fr.html"
  }
}

// To load external librairies in components
export function loadScript(url, type, script_id, callback){

  // console.log("loadScript / script_id :", script_id);
  // console.log("loadScript / url :", url);

  var script = document.createElement('script');
  script.src = url;
  script.id = script_id;

  if (type !== undefined ){
    script.type = "text/javascript";
  }

  if (callback !== undefined){
    script.onreadystatechange = callback;
    script.onload = callback;
  }

  document.head.appendChild(script);
}

export function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

export function deleteScript(script_id){

  try {
    // console.log("deleteScript / script_id :", script_id);
    var elem = document.getElementById(script_id)
    // console.log("deleteScript / elem:", elem);

    elem.parentNode.removeChild(elem)
  } catch(error) {
    console.log("deleteScript / error:", error);
  }

}

// To activate carousels from components
export function activateCarousel(slidesNumber=2, isInfinite=true, hasPagination=false){
  console.log("activate carousel from utils")
  var carousels = bulmaCarousel.attach('.carousel', {
    // TODO: give the parameters as args?
    slidesToShow: 2,
    infinite: true,
    pagination: false

    // slidesToShow: slidesNumber,
    // infinite: isInfinite,
    // pagination: hasPagination
  });

  // "hacky" way to get custom icons
  document.getElementsByClassName("slider-navigation-previous")[0].childNodes[0].remove();
  document.getElementsByClassName("slider-navigation-next")[0].childNodes[0].remove();
}

export function activateBulmaExtension(extension, pointer, options){
  console.log("plugins / utils / activate extension from utils")
  console.log("plugins / utils / activate extension from utils / options : \n", options)
  let bulmaExtension = extension.attach( pointer, options)
  console.log("plugins / utils / activate extension from utils / bulmaExtension : \n", bulmaExtension)
  return bulmaExtension
}

// SEARCH RELATED

// TO DO => COMMENT ALL THAT SHIT / getItemById
// server-side end-point to get only one project
export function getItemById(id, endpointConfig, userAccessToken, endpointAuthConfig){

  // const url = searchEnpointCreator({
  //   page:1,
  //   per_page:1,
  //   baseUrl:root_url,
  //   item_id:id
  // })
  console.log("\nPL-getItemById ..." )
  console.log("\PL-getItemById / endpointConfig : ", endpointConfig )

  const endPointUrlAndPayload = searchEndpointGenerator({
    endpointConfig : endpointConfig,
    questionParams : { itemId : id },
    selectedFilters : [],
    authConfig : endpointAuthConfig,
    accesToken : userAccessToken
  })
  let url = endPointUrlAndPayload.requestUrl
  console.log("\PL-getItemById / url : ", url )

  let payload = endPointUrlAndPayload.requestPayload
  console.log("\PL-getItemById / payload : ", payload )

  return fetch( url )
  .then(r => r.json())
  .then(({data, query}) =>
    data && data.data_raw && data.data_raw.f_data  && Array.isArray(data.data_raw.f_data)
      ? data.data_raw.f_data[0]
      : undefined
  )
}

export const setValueToField = (fields, value) => {
  const reducer = (acc, item, index, arr) => ({ [item]: index + 1 < arr.length ? acc : value });
  return fields.reduceRight(reducer, {});
};

export function setValueToNestedObject(obj, path, value, separator='/') {
  const pList = path.split(separator);
  const key = pList.pop();
  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);
  pointer[key] = value;
  return obj;
}

export function objectFromPath( obj, path, separator='/'){

  console.log("+ + + objectFromPath / path : ", path)
  let object

  if ( path ){

    var properties = Array.isArray(path) ? path : path.split(separator)
    console.log("+ + + objectFromPath / properties : ", properties)

    object = properties.reduce((prev, curr) => prev && prev[curr], obj)
    console.log("+ + + objectFromPath / object : ", object)

  } else {
    object = obj
  }

  return object
}

// cf : https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
export function resolvePathString( respField , respFieldsPaths, obj=self, separator='/') {

  console.log("\n+ + + resolvePathString / respField : ", respField)
  console.log("+ + + resolvePathString / respFieldsPaths : ", respFieldsPaths)

  try {
    let path = respFieldsPaths[ respField  ].path

    // console.log("\n+ + + resolvePathString ... ");
    console.log("+ + + resolvePathString / path : ", path)
    console.log("+ + + resolvePathString / obj : ", obj)

    // var properties = Array.isArray(path) ? path : path.split(separator)
    // console.log("+ + + resolvePathString / properties : ", properties);
    // let dataObject = properties.reduce((prev, curr) => prev && prev[curr], obj)
    let dataObject = objectFromPath( obj, path, separator )

    return dataObject
  }
  catch {
    return {}
  }

}

export function searchItems( endpointGenerated=undefined, endpointRawConfig=undefined ){

  console.log("\n+ + + searchItems ... ")
  console.log("+ + + searchItems / endpointGenerated : ", endpointGenerated)
  console.log("+ + + searchItems / endpointRawConfig : ", endpointRawConfig)

  let methodsWithPayload = [ "POST", "PUT", "PATCH" ]
  let fetchMethod = endpointRawConfig.method
  console.log("+ + + searchItems / fetchMethod : ", fetchMethod)

  let fetchHeader = endpointGenerated.requestHeader
  fetchHeader['Accept'] = 'application/ld+json'
  console.log("+ + + searchItems / fetchHeader : ", fetchHeader)

  let fetchUrl = endpointGenerated.requestUrl
  console.log("+ + + searchItems / fetchUrl : ", fetchUrl)

  let fetchPayload = endpointGenerated.requestPayload
  console.log("+ + + searchItems / fetchPayload : ", fetchPayload)

  let responsePaths = endpointRawConfig.resp_fields
  console.log("+ + + searchItems / responsePaths : ", responsePaths)

  // abort fetch if this is supported
  // abort manually when response arrives otherwise
  const ac = abortableFetchSupported ? new AbortController() : undefined
  let searchAborted = false

  // set up fetch options
  let fetchOptions = {
    method : fetchMethod.toLowerCase(),
    signal: ac.signal,
    header : fetchHeader
  }
  // set up axios options
  let axiosOptions = {
    url : fetchUrl,
    method : fetchMethod.toLowerCase(),
    header : fetchHeader
  }

  let payloadJson = JSON.stringify( fetchPayload )
  console.log("+ + + searchItems / payloadJson : ", payloadJson)
  if ( methodsWithPayload.includes(fetchMethod) ){
    fetchOptions.body = payloadJson
    // fetchOptions.body = fetchPayload
    axiosOptions.data = payloadJson
  }

  console.log("+ + + searchItems / fetchOptions : ", fetchOptions)
  console.log("+ + + searchItems / axiosOptions : ", axiosOptions)
  console.log("+ + + searchItems / ac : ", ac)

  // try {
    return {
      abort(){
        searchAborted = true
        if( ac )
          ac.abort()
      },
      promise : axios({
        method: fetchMethod.toLowerCase(),
        url: fetchUrl,
        data : payloadJson,
        headers : fetchHeader,
        // headers: {
        //   'Accept' : 'application/json',
        //   'Content-Type' : 'application/json'
        // }
      })
      .then( resp => {
        console.log("+ + + searchItems / (axios) / resp :", resp);
        console.log("+ + + searchItems / (axios) / responsePaths : ", responsePaths);

        let responseProjects = resolvePathString( 'projects', responsePaths, resp.data, '/')
        console.log("+ + + searchItems / (axios) / responseProjects : ", responseProjects);

        let responseTotal = resolvePathString( 'total', responsePaths, resp.data, '/')
        console.log("+ + + searchItems / (axios) / responseTotal : ", responseTotal);

        let responseStats = resolvePathString( 'stats', responsePaths, resp.data, '/')
        console.log("+ + + searchItems / (axios) / responseStats : ", responseStats);

        // TO DO => remap responseStats ...

        let dataStructure = {
          projects : responseProjects,
          stats : responseStats,
          total : responseTotal
        }
        return dataStructure
      })
      .catch( err => {
        console.log("+ + + searchItems / (axios)  err :", err);
      })
    }
}

export function populateDisplayedItem( item, endpointGenerated, endpointRawConfig ){
    console.log("+ + + populateDisplayedItem : ", item)

    let fetchMethod = endpointRawConfig.method

    let fetchHeader = endpointGenerated.requestHeader
    fetchHeader['Accept'] = 'application/ld+json'

    // abort fetch if this is supported
    // abort manually when response arrives otherwise
    const ac = abortableFetchSupported ? new AbortController() : undefined
    let searchAborted = false

    let payloadJson = JSON.stringify( endpointGenerated.requestPayload )

    let axiosRequests = [axios({
      method: fetchMethod.toLowerCase(),
      url: "https://api.cquest.org/company/" + item.CompanyNumber,
      data : payloadJson,
      headers : fetchHeader
    }).catch( err => {
      console.log("+ + + populateDisplayedItem / (axios)  error on cquest API :", err);
      return "Error on cquest API : " + err
    })]

    axiosRequests.push(axios({
      method: fetchMethod.toLowerCase(),
      url: "https://api.enthic.fr/company/siren/" + item.CompanyNumber,
      data : payloadJson,
      headers : fetchHeader
    }).catch( err => {
      console.log("+ + + populateDisplayedItem / (axios)  error on enthic API :", err);
      return "Error on enthic API : " + err
    }))

    for (let compte of item.ComptesDeResultats)
    {
      axiosRequests.push(axios({
        method: fetchMethod.toLowerCase(),
        url: "https://opencorporatefacts.fr" + compte,
        data : payloadJson,
        headers : fetchHeader
      }))
    }

    console.log("+ + + populateDisplayedItem / sending multiple axiosRequests : ", axiosRequests)

    return {
      abort(){
        searchAborted = true
        if( ac )
          ac.abort()
      },
      promise : axios.all(axiosRequests)
      // Populate item with data fetched
      .then( responsesArray => {
        console.log("+ + + populateDisplayedItem / (axios) / all responses :", responsesArray);

        // Handle cQuest API response
        let cQuestApiResponse = responsesArray[0].data
        if (cQuestApiResponse)
        {
          for (const resultElement of cQuestApiResponse.result) {
            // Populate data from RNCS IMR database
            if('rncs' in resultElement){
              item.RncsImr = resultElement.rncs;
              // Cleanup null fields in 'representants'
              for (const representant of item.RncsImr.representants) {
                for (var property in representant){
                  if (representant[property]===null || ["created_at", "updated_at", "code_greffe", "numero_gestion"].includes(property) ){
                    delete representant[property]
                  }
                }
              }
            }
            // Populate data from sirene database
            else if('sirene' in resultElement){
              item.Sirene = resultElement.sirene;
            }
          }
        }

        // Handle Enthic API response
        item.Enthic = responsesArray[1].data
        for ( let enthicDeclaration of item.Enthic.declarations)
        {
          enthicDeclaration.financial_data_refined = {}
          for (var enthicOneData of enthicDeclaration.financial_data)
          {
            for (var property in enthicOneData)
            {
              enthicDeclaration.financial_data_refined[property] = enthicOneData[property]
            }
          }
        }
        if (item.Enthic.declarations.length)
        {
          item.Enthic.compteResultatRefined = formatEnthicData(item.Enthic.declarations)
          item.Enthic.treeRepresentations = createTreeRepresentation(item.Enthic.compteResultatRefined)
        }
        console.log("Enthic data refined :", item.Enthic)

        // Handle compte de résultat API response
        for (let i = 2; i < responsesArray.length; i++) {
          item.ComptesDeResultats[i-2] = responsesArray[i].data
          console.log("+ + + populateDisplayedItem / ecrasing compte: ", item);
        }
        console.log("+ + + populateDisplayedItem / returning : ", item);
        return item
      })
      .catch( err => {
        console.log("+ + + populateDisplayedItem / (axios)  err :", err);
        return item
      })
    }
}

function formatEnthicData( enthicDeclarations ) {
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
  for (var declaration of enthicDeclarations){
    var localData = JSON.parse(JSON.stringify(prototypeRefinedData));
    for ( var mapping of codeToArrayMappings)
    {
      var value = {
        code : mapping.codeAlternatives.toString(),
        description : "non fourni",
        value : undefined,
        status : "missing" }
      for ( var code of mapping.codeAlternatives)
      {
        if (code in declaration.financial_data_refined)
        {
          value = declaration.financial_data_refined[code]
          value.code = code
          value.status = "official"
          delete declaration.financial_data_refined[code]
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
}

function createTreeRepresentation( compteResultatRefined ) {
  var result = []
  for (var oneYearData of compteResultatRefined){
    var oneYearTree =
      {
        name : 'Année ' + oneYearData.year + ' : ',
        data : oneYearData.Benefice,
        children : {
          ResultatExploitation : {
           name : 'Résultat d\'exploitation ',
           data : oneYearData.ResultatExploitation,
           children : {
              ProduitsExploitation : {
                name : 'Produits d\'exploitation ',
                data : oneYearData.ProduitsExploitation,
                children : {
                  ChiffresAffairesNet : {
                    name : 'Chiffres d\'affaires nets ',
                    data : oneYearData.ChiffresAffairesNet,
                    children : {
                      VenteMarchandises : {
                        name: 'Ventes de marchandises ',
                        data : oneYearData.VenteMarchandises
                      },
                      ProductionVendueDeBiens : {
                         name: 'Production vendues de biens ',
                         data : oneYearData.ProductionVendueDeBiens
                      },
                      ProductionVendueDeServices : {
                        name: 'Production vendue de services ',
                        data : oneYearData.ProductionVendueDeServices
                      }
                    }
                  },
                  ProductionStocked : {
                    name: 'Production stockée ',
                    data : oneYearData.ProductionStocked
                  },
                  ProductionImmobilisee : {
                    name: 'Production immobilisée ',
                    data : oneYearData.ProductionImmobilisee
                  },
                  SubventionsExploitation : {
                    name: 'Subvention d\'exploitation ',
                    data : oneYearData.SubventionsExploitation
                  },
                  RepriseDepreciationProvisionsTransfertChargesExploitation : {
                    name: 'Reprises sur dépréciations, provisions (et amortissements), transfert de charges ',
                    data : oneYearData.RepriseDepreciationProvisionsTransfertChargesExploitation
                  },
                  AutresProduits : {
                    name: 'Autres produits ',
                    data : oneYearData.AutresProduits
                  }
                }
              },
              ChargesExploitation : {
                name : 'Charges d\'exploitation ',
                data : oneYearData.ChargesExploitation,
                sign : -1,
                children : {
                    AchatsDeMarchandises : {
                      name: 'Achats de marchandise (y compris droits de douane)',
                      data : oneYearData.AchatsDeMarchandises
                     },
                    VariationStockMarchandises : {
                      name: 'Variation de stock (marchandises)',
                      data : oneYearData.VariationStockMarchandises
                     },
                    AchatMatierePremiereAutreAppro : {
                      name: 'Achat de matières premières et autres approvisionnements (et droit de douane)',
                      data : oneYearData.AchatMatierePremiereAutreAppro
                    },
                    VariationStockMatierePremiereEtAppro : {
                      name: 'Variation de stock (matières premières et approvisionnements)',
                      data : oneYearData.VariationStockMatierePremiereEtAppro
                     },
                    AutresAchatEtChargesExternes : {
                      name: 'Autres achats et charges externes ',
                      data : oneYearData.AutresAchatEtChargesExternes
                     },
                    ImpotTaxesEtVersementsAssimiles : {
                      name: 'Impôts, taxes et versements assimilés ',
                      data : oneYearData.ImpotTaxesEtVersementsAssimiles
                     },
                    SalairesEtTraitements : {
                      name: 'Salaires et traitements ',
                      data : oneYearData.SalairesEtTraitements
                    },
                    ChargesSociales : {
                      name: 'Cotisations sociales ',
                      data : oneYearData.ChargesSociales
                     },
                    DotationExploitation : {
                      name : 'DOTATIONS D\'EXPLOITATION ',
                      data : {
                        code : '',
                        description : "non fourni",
                        value : undefined,
                        status : "missing" },
                      children : {
                        DotationAmortissementImmobilisations : {
                          name: 'Sur immobilisations : dotations aux amortissements ',
                          data : oneYearData.DotationAmortissementImmobilisations
                        },
                        DotationDepreciationImmobilisations : {
                          name: 'Sur immobilisations : dotations aux dépréciations ',
                          data : oneYearData.DotationDepreciationImmobilisations
                         },
                        DotationDepreciationActifCirculant : {
                          name: 'Sur actif circulant : dotations aux dépréciations ',
                          data : oneYearData.DotationDepreciationActifCirculant
                         },
                        DotationProvisions : { name: 'Dotations aux provisions ',
                          data : oneYearData.DotationProvisions
                         }
                      }
                    },
                    AutresCharges : {
                      name: 'Autres charges ',
                      data : oneYearData.AutresCharges
                     }
                  }
              },
            }
          },
          ResultatFinancier : {
            name : 'Résultat financier ',
            data : oneYearData.ResultatFinancier,
            children : {
              ProduitsFinanciers : {
                name : 'Produits financiers ',
                data : oneYearData.ProduitsFinanciers,
                children : {
                  ProduitsFinanciersParticipations : {
                    name: 'Produits financiers de participations',
                    data : oneYearData.ProduitsFinanciersParticipations
                   },
                  ProduitsAutresValeursMobiliereEtCreancesActifImmobilise : {
                    name: 'Produits des autres valeurs mobilières et créances de l\'actif immobilisé',
                    data : oneYearData.ProduitsAutresValeursMobiliereEtCreancesActifImmobilise
                   },
                  AutreInteretEtProduitAssimile : {
                    name: 'Autres intérêts et produits assimilés',
                    data : oneYearData.AutreInteretEtProduitAssimile
                   },
                  RepriseDepreciationEtProvisionTransfertsChargesFinancier : {
                    name: 'Reprises sur dépréciations et provisions, transferts de charges',
                    data : oneYearData.RepriseDepreciationEtProvisionTransfertsChargesFinancier
                   },
                  DifferencesPositivesChange : {
                    name: 'Différences positives de change',
                    data : oneYearData.DifferencesPositivesChange
                  },
                  ProduitsNetsCessionsValeursMobilesPlacement : {
                    name: 'Produits nets sur cessions de valeurs mobilières de placement',
                    data : oneYearData.ProduitsNetsCessionsValeursMobilesPlacement }
                }
              },
              ChargesFinancieres : {
                name : 'Charges financières ',
                data : oneYearData.ChargesFinancieres,
                sign : -1,
                children : {
                  DotationsFinancieresAmortissementDepreciationProvision : {
                    name: 'Dotations financières aux amortissements, dépréciations et provisions',
                    data : oneYearData.DotationsFinancieresAmortissementDepreciationProvision
                  },
                  InteretEtChargeAssimilees : {
                    name: 'Intérêts et charges assimilées',
                    data : oneYearData.InteretEtChargeAssimilees
                  },
                  DifferenceNegativeChange : {
                    name: 'Différences négatives de change',
                    data : oneYearData.DifferenceNegativeChange
                   },
                  ChargesNetteCessionValeurMobiliereDePlacement : {
                    name: 'Charges nettes sur cessions de valeurs mobilières de placement',
                    data : oneYearData.ChargesNetteCessionValeurMobiliereDePlacement
                   },
                }
              }
            }
          },
          ResultatExceptionnel : {
            name : 'Résultat exceptionnel ',
            data : oneYearData.ResultatExceptionnel,
            children : {
              ProduitsExceptionnels : {
                name : 'Produits exceptionnels ',
                data : oneYearData.ProduitsExceptionnels,
                children : {
                  ProduitExceptionnelOperationCapital : {
                    name: 'Produits exceptionnels sur opérations en capital',
                    data : oneYearData.ProduitExceptionnelOperationCapital
                  },
                  ProduitExceptionnelOperationGestion : {
                    name: 'Produits exceptionnels sur opérations de gestion',
                    data : oneYearData.ProduitExceptionnelOperationGestion
                   },
                  RepriseDepreciationProvisionTransfertChargeExceptionnel : {
                    name: 'Reprises sur dépréciations et provisions, transferts de charges',
                    data : oneYearData.RepriseDepreciationProvisionTransfertChargeExceptionnel
                  }
                }
              },
              ChargesExceptionnelles : {
                name : 'Charges exceptionnelles ',
                data : oneYearData.ChargesExceptionnelles,
                sign : -1,
                children : {
                  ChargesExceptionnelleOperationGestion : {
                    name: 'Charges exceptionnelles sur opérations de gestion',
                    data : oneYearData.ChargesExceptionnelleOperationGestion
                   },
                  ChargesExceptionnelleOperationCapital : {
                    name: 'Charges exceptionnelles sur opérations en capital',
                    data : oneYearData.ChargesExceptionnelleOperationCapital
                   },
                  DotationExceptionnelleAmortissementDepreciationProvision : {
                    name: 'Dotations exceptionnelles aux amortissements, dépréciations et provisions',
                    data : oneYearData.DotationExceptionnelleAmortissementDepreciationProvision
                   },
                }
              }
            }
          },
          ParticipationSalariesAuxResultats : { name: 'Participation des salarié⋅es aux résultats de l\'entreprise ',
            data : oneYearData.ParticipationSalariesAuxResultats,
            sign : -1 },
          ImpotsSurLesBenefices : { name: 'Impôts sur les bénéfices ',
            data : oneYearData.ImpotsSurLesBenefices,
            sign : -1 }
        }
      }
      checkTreeData(oneYearTree)
      result.push(oneYearTree)
  }
  console.log("computed / treeData:", result);

  return result
}

function checkTreeData( item )
{
  if (item.children)
  {
    for (var childName in item.children)
    {
      checkTreeData(item.children[childName])
    }

    // Compute ourself item's value from its children
    var computedSum = 0 // Result from official children's value
    var computedSumFromComputed = 0 // Result from computed children's value
    for (var childName in item.children)
    {
      var child = item.children[childName]
      console.log("child : ", child, " from item :", item)
      if (child.data.value)
      {
        computedSum += child.data.value * (child.sign ? -1 : 1)
        computedSumFromComputed += child.data.value * (child.sign ? -1 : 1)
      }
      else
      {
        computedSumFromComputed += child.data.computedValue * (child.sign ? -1 : 1)
      }
    }

    // If official value match computed value from official children's value with less than 0.1% error
    if (Math.abs((computedSum - item.data.value) / item.data.value) < 0.0001)
    {
      item.data.status = "checked"
      // Fix children values if needed
      for (var childName in item.children)
      {
        setToZeroComputed(item.children[childName])
      }
    }
    // If official value match computed value from computed children's value with less than 0.1% error
    else if (Math.abs((computedSumFromComputed - item.data.value) / item.data.value) < 0.0001)
    {
      item.data.status = "checked"
      // Fix children values if needed
      for (var childName in item.children)
      {
        if (item.data.value == undefined )
        {
          item.data.value = item.data.computedValue
          item.data.status = "computed"
        }
      }
    }
    else {
      item.data.status = "error"
    }
    if (computedSum != item.data.value)
    {
      console.log("computed sum : ", computedSum, "computed sum from computed : ", computedSumFromComputed, " and given sum : ", item.data.value, " diff en pour 100 : ", ((computedSum - item.data.value)*100 / item.data.value))
      item.data.computedValue = computedSum
    }
  }
}

function setToZeroComputed ( item )
{
  console.log("setToZeroComputed called for : ", item.name, item.data)
  if (item.data.value == undefined && (item.data.computedValue == undefined || item.data.computedValue == 0))
  {
    item.data.value = 0
    item.data.status = "computed"
    for (var childName in item.children)
    {
      setToZeroComputed(item.children[childName])
    }
  }
}

export function rawRequest( endpointGenerated=undefined, endpointRawConfig=undefined ){

  console.log("\n+ + + rawRequest ... ")
  console.log("+ + + rawRequest / endpointGenerated : ", endpointGenerated)
  console.log("+ + + rawRequest / endpointRawConfig : ", endpointRawConfig)

  let methodsWithPayload = [ "POST", "PUT", "PATCH" ]
  let fetchMethod = endpointRawConfig.method
  console.log("+ + + rawRequest / fetchMethod : ", fetchMethod)

  let fetchHeader = endpointGenerated.requestHeader
  // let fetchHeader = {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  //   // "Access-Control-Allow-Origin" : "*",
  // }
  console.log("+ + + rawRequest / fetchHeader : ", fetchHeader)

  let fetchUrl = endpointGenerated.requestUrl
  console.log("+ + + rawRequest / fetchUrl : ", fetchUrl)

  let fetchPayload = endpointGenerated.requestPayload
  console.log("+ + + rawRequest / fetchPayload : ", fetchPayload)

  let responsePaths = endpointRawConfig.resp_fields
  console.log("+ + + rawRequest / responsePaths : ", responsePaths)

  // abort fetch if this is supported
  // abort manually when response arrives otherwise
  const ac = abortableFetchSupported ? new AbortController() : undefined
  let searchAborted = false

  // set up fetch options
  let fetchOptions = {
    method : fetchMethod,
    signal: ac.signal,
    header : fetchHeader
  }
  // set up axios options
  let axiosOptions = {
    url : fetchUrl,
    method : fetchMethod.toLowerCase(),
    header : fetchHeader
  }

  let payloadJson = JSON.stringify( fetchPayload )
  console.log("+ + + rawRequest / payloadJson : ", payloadJson)
  if ( methodsWithPayload.includes(fetchMethod) ){
    fetchOptions.body = payloadJson
    // fetchOptions.body = fetchPayload
    axiosOptions.data = payloadJson
  }

  console.log("+ + + rawRequest / fetchOptions : ", fetchOptions)
  console.log("+ + + rawRequest / axiosOptions : ", axiosOptions)
  console.log("+ + + rawRequest / ac : ", ac)

  // try {
    return {
      abort(){
        searchAborted = true
        if( ac )
          ac.abort()
      },
      promise : axios({
        method: fetchMethod.toLowerCase(),
        url: fetchUrl,
        data : payloadJson,
        headers : fetchHeader,
      })
      .then( resp => {
        console.log("+ + + rawRequest / (axios) / resp :", resp);
        return resp
      })
      .catch( err => {
        console.log("+ + + rawRequest / (axios)  err :", err);
      })
    }

}


export function buildRequestHeader( token, endpointConfigHeaderAuth, endpointConfig=undefined ){

  console.log("+ + + buildRequestHeader / token : ", token)
  console.log("+ + + buildRequestHeader / endpointConfigHeaderAuth : ", endpointConfigHeaderAuth)

  let endpointHeaderOptions = endpointConfig.request_header_options
  console.log("+ + + buildRequestHeader / endpointHeaderOptions : ", endpointHeaderOptions)

  let headers = {}

  for (let header_arg of endpointConfigHeaderAuth ){

    // let headerField = header_arg.header_field
    let headerField = header_arg.header_field
    console.log("+ + + buildRequestHeader / headerField : ", headerField)

    let headerVal = header_arg.header_value
    console.log("+ + + buildRequestHeader / headerVal : ", headerVal)

    if ( headerVal && header_arg.app_var_name !== 'token' ) {
      headers[ headerField ] = headerVal
    }

    if ( header_arg.is_var && header_arg.app_var_name === 'token' && token ){
      headers[ headerField ] = header_arg.header_value_prefix + token
      headerVal = header_arg.header_value_prefix + token
    }

    // myHeaders.append( headerField, headerVal )
    // myHeaders[ headerField ] = headerVal

  }

  if ( endpointHeaderOptions ){

    for (let header_arg of endpointHeaderOptions ){

      // let headerField = header_arg.header_field
      let headerField = header_arg.header_field
      console.log("+ + + buildRequestHeader / (options) headerField : ", headerField)

      let headerVal = header_arg.header_value
      console.log("+ + + buildRequestHeader / (options) headerVal : ", headerVal)

      if ( headerVal && header_arg.app_var_name !== 'token' ) {
        headers[ headerField ] = headerVal
      }

      if ( header_arg.is_var && header_arg.app_var_name === 'token' && token ){
        headers[ headerField ] = header_arg.header_value_prefix + token
        headerVal = header_arg.header_value_prefix + token
      }

    }

  }


  // console.log("+ + + buildRequestHeader / myHeaders : ", myHeaders)
  // return myHeaders

  console.log("+ + + buildRequestHeader / headers : ", headers)
  return headers

}

export function buildRequestPayload( endpointConfig ){

  console.log("+ + + buildRequestPayload / endpointConfig : \n ", endpointConfig)

  // let payloadIsArray = endpointConfig.payload_format === 'list'
  // let payload = payloadIsArray ? [] : {}
  let payload = endpointConfig.payload_queries
  // for (let payloadArg of endpointConfig.payload_args ){
  //   if ( payloadIsArray ) {

  //     let payloadItem = {}
  //     for ( let payloadSubArg of payloadArg ){
  //       let payloadValue = payloadSubArg.payload_value
  //       payloadItem[ payloadSubArg.payload_field ] = payloadValue
  //     }
  //     payload.push( payloadItem )
  //   }
  //   else {
  //     payload[ payloadArg.payload_field ] = payloadArg.payload_value
  //   }
  // }
  return payload
}

export function searchEndpointGenerator( obj ) {
  if ( !obj ) { throw 'error in searchEndpointGenerator: no parameter defined' }

  console.log("+ + + searchEndpointGenerator / obj : \n ", obj)

  // endpoint config related
  const endpointConfig = obj.endpointConfig
  console.log("+ + + searchEndpointGenerator / endpointConfig : ", endpointConfig)

  const endpointConfigHeaderAuth = obj.authConfig.request_header_auth_options
  console.log("+ + + searchEndpointGenerator / endpointConfigHeaderAuth : ", endpointConfigHeaderAuth)

  const endpointConfigArgs = endpointConfig.args_options
  console.log("+ + + searchEndpointGenerator / endpointConfigArgs : ", endpointConfigArgs)

  let fetchMethod = endpointConfig.method
  console.log("+ + + searchEndpointGenerator / fetchMethod : ", fetchMethod)

  // question related
  const questionParams = obj.questionParams
  console.log("+ + + searchEndpointGenerator / questionParams : ", questionParams)

  const selectedFilters = obj.selectedFilters
  console.log("+ + + searchEndpointGenerator / selectedFilters : ", selectedFilters)

  const accessToken = obj.accesToken
  console.log("+ + + searchEndpointGenerator / accessToken : ", accessToken)

  let fetchPayloadOptions = endpointConfig.payload_options
  console.log("+ + + searchEndpointGenerator / fetchPayloadOptions : ", fetchPayloadOptions)


  // base query to be completed with args + questions
  // let baseQuery = endpointConfig.root_url + '?'

  const appArgs = [
    'query',
    'forMap',
    'forStats',
    'page',
    'perPage',
    'sortBy',
    'sortIsDescending',
    'onlyGeocoded',
    'itemId',
    'shuffleSeed',

    'defaultValue' // takes default value from endpointconfig
  ]

  // loop in routeArgs + queries then append to baseQuery
  let argsArray = []
  for (let key in endpointConfigArgs ) {
    const EndpointArg = endpointConfigArgs[key]
    console.log("+ + + searchEndpointGenerator / EndpointArg.app_arg : ", EndpointArg.app_arg)
    if ( !EndpointArg.optional || appArgs.indexOf(EndpointArg.app_arg) !== -1 ){
      if ( questionParams[EndpointArg.app_arg] || !EndpointArg.optional ) {
        let argVal = EndpointArg.app_arg === "defaultValue" ? EndpointArg.default : String(questionParams[EndpointArg.app_arg])
        let argString = EndpointArg.arg + '=' + argVal // String(questionParams[EndpointArg.app_arg])
        argsArray.push(argString)
      }
    }
  }

  // loop in selectedFilters to add filters request if any
  // find corresponding mapper in endPointConfig
  const filterMapper = endpointConfigArgs.find( c => c.app_arg === 'filters')
  // console.log("+ + + searchEndpointGenerator / filterMapper : \n ", filterMapper)
  if (filterMapper && selectedFilters.length > 0 ){
    const EndpointArg = filterMapper.arg
    for (let index in selectedFilters) {
      let argFilterString = EndpointArg + '=' + selectedFilters[index]
      argsArray.push(argFilterString)
    }
  }

  let baseQuery = endpointConfig.root_url
  if ( argsArray.length > 0 ){
    baseQuery += '?'
    let argsLongString = argsArray.join('&')
    console.log("+ + + searchEndpointGenerator / argsLongString :  ", argsLongString)
    baseQuery += argsLongString
  }

  // console.log("+ + + searchEndpointGenerator / baseQuery : \n ", baseQuery)

  // build header from endpointConfig
  let header = buildRequestHeader( accessToken, endpointConfigHeaderAuth, endpointConfig )


  // build payload from endpointConfig
  let payload = fetchPayloadOptions && buildRequestPayload( fetchPayloadOptions )

  let endPointUrlAndPayload = {
    requestHeader : header,
    requestUrl : baseQuery,
    requestPayload : payload
  }
  console.log("+ + + searchEndpointGenerator / endPointUrlAndPayload : ", endPointUrlAndPayload)

  // return baseQuery
  return endPointUrlAndPayload
}

// FILTER RELATED
export function makeEmptySelectedFilters(filterDescriptions){
  // console.log("::: makeEmptySelectedFilters / filterDescriptions : ", filterDescriptions)
  const selectedFilters = new Map()
  for(const f of filterDescriptions){
    selectedFilters.set(f.name, new Set())
  }
  return selectedFilters;
}

export function createSelectedFiltersForSearch(selectedFiltersMap){
  let filtersUri = []
  selectedFiltersMap.forEach( (val,key,map) => {
    // console.log('val,key,map',val,key,map);
    val.forEach( (v) => {
      filtersUri.push(key + v)
    })
  })
  // console.log(filtersUri);
  return filtersUri
}

// OBJECT RELATED
// FUNCTION TO PARSE AN OBJECT GIVEN A PATH
export function getObjectDataFromPath(obj, path, splitter='/') {
  let current = obj;
  // console.log("+ + + getObjectDataFromPath / current raw : \n", current )
  try {
    let current_temp = current
    path.split(splitter).forEach( function(p) {
      current_temp = current_temp[p];
    });
    // console.log("+ + + getObjectDataFromPath / current final : \n", current )
    return current_temp
  } catch (e) {
    return ""
  }
}

export function filterObjectByKey(raw, allowedKeys ) {
  // console.log("+ + + filterObjectByKey / raw : \n", raw )
  // console.log("+ + + filterObjectByKey / allowedKeys : ", allowedKeys )
  const filtered = Object.keys(raw)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: raw[key]
      };
    }, {});
  // console.log("+ + + filterObjectByKey / filtered : \n", filtered )
  // console.log()
  return filtered
}

export function getItemContent(fieldBlock, displayableItem, contentFields, noData, filterDescriptions, locale='fr'){

  const contentField = contentFields.find(f=> f.position == fieldBlock)

  // const log = true
  let blocktags = [
    'block_tags',
    'block_rb1_tags',
  ]
  let blocksToLog = [
    'block_tags',
    // 'block_abstract',
    // 'block_image',
  ]
  let typesToLog = [
    'object',
    // 'list',
    // 'list_tags'
  ]

  if ( contentField && contentField.is_visible ){

    const field = contentField.field
    const field_format = contentField.field_format

    const log = typesToLog.includes(field_format.type) && blocksToLog.includes(fieldBlock)
    // const log = blocksToLog.includes(fieldBlock)
    // const log = contentField && contentField.field_format.type === 'list_tags'

    // log && console.log("\ngetItemContent / contentField : ", contentField)

    // log && console.log("\ngetItemContent / fieldBlock : ", fieldBlock)


    // log && console.log("getItemContent / field_format : ", field_format)

    let content = displayableItem[field]
    // log && console.log("getItemContent / content A : ", content)

    if ( content && content !== "None" && content !== "" ){

      const trimming = contentField.field_format.trim
      // log && console.log("getItemContent / trimming : ", trimming)

      try {

        // DEALING WITH LIST-LIKE RESULTS (TAGS)
        // slice tags in array
        if ( field_format.type === 'list_tags' ){

          // log && console.log("getItemContent / list_tags content ", content)

          if ( contentField.filter_correspondance ) {
            // log && console.log("getItemContent / list_tags content filterDescriptions : ", filterDescriptions)
            // choose filter corresponding to field

            let corrFilter = filterDescriptions.find( f => f.col_name === contentField.field )
            // log && console.log("getItemContent / list_tags content corrFilter : ", corrFilter)

            let filterChoices = corrFilter.choices
            // log && console.log("getItemContent / list_tags content filterChoices : ", filterChoices)

            content = content.map( c => {
              let tagDict = filterChoices.find( t => t.name === c )
              // log && console.log("getItemContent / list_tags content tagDict : ", tagDict)
              let tagText = tagDict && tagDict.choice_title.find( ct => ct.locale === locale )
              // log && console.log("getItemContent / list_tags content tagText : ", tagText)
              let corrContent = tagText.text
              // log && console.log("getItemContent / list_tags content corrContent : ", corrContent)
              return corrContent ? corrContent : c
            })
          }

          content = content.map( tag => {
            let trim = ( trimming && tag.length > trimming ) ? trimming : tag.length
            const tail = ( trimming && tag.length > trimming) ? '...' : ''
            // log && console.log("getItemContent / trim : ", trim)
            return tag.slice(0, trim) + tail
          })
          // log && console.log("getItemContent / content B : ", content)

          return content
        }

        // DEALING WITH LIST TO STRING RESULTS
        // get item from array if type == list
        else if ( field_format.type === 'list'){

          // log && console.log("getItemContent / list content : ", content)

          let begin = field_format.retrieve[0]

          // choose in array
          if ( begin === -1 ){
            content = content.join(' ')
          }
          else if ( field_format.retrieve.length === 1 ) {
            content = content[ begin ]
          }
          else {
            let end = field_format.retrieve[1] ? field_format.retrieve[1] : content.length
            content = content.slice( begin, end )
            content = content.join(' ')
          }

          // log && console.log("getItemContent / content C : ", content)

          // string is tag-like and needs to be splitten
          if ( contentField.is_tag_like ) {
            content = content.split(contentField.tags_separator).filter(c => c != "")

            if ( contentField.filter_correspondance ) {
              // log && console.log("getItemContent / list content filterDescriptions : ", filterDescriptions)
              // choose filter corresponding to field

              let corrFilter = filterDescriptions.find( f => f.col_name === contentField.field )
              // log && console.log("getItemContent / list content corrFilter : ", corrFilter)

              let filterChoices = corrFilter.choices
              // log && console.log("getItemContent / list content filterChoices : ", filterChoices)

              content = content.map( c => {
                let tagDict = filterChoices.find( t => t.name === c )
                // log && console.log("getItemContent / list content tagDict : ", tagDict)
                let tagText = tagDict && tagDict.choice_title.find( ct => ct.locale === locale )
                // log && console.log("getItemContent / list content tagText : ", tagText)
                let corrContent = tagText.text
                // log && console.log("getItemContent / list content corrContent : ", corrContent)
                return corrContent ? corrContent : c
              })
            }

            content = content.map( tag => {
              let trim = ( trimming && tag.length > trimming ) ? trimming : tag.length
              const tail = ( trimming && tag.length > trimming ) ? '...' : ''
              return tag.slice(0, trim) + tail
            })



            return content
          }

          // trim string
          else {
            // log && console.log("getItemContent / string content : ", content)
            let trim = ( trimming && content.length > trimming ) ? trimming : content.length
            // log && console.log("getItemContent / trim : ", trim)
            const tail = ( trimming && content.length > trimming) ? '...' : '';
            content = content.slice(0, trim) + tail
            return content
          }

        }

        // DEALING WITH NATIVE STRING RESULTS
        else if ( field_format.type === 'object' ) {
          // log && console.log("getItemContent / object content : ", content)

          // string is tag-like and needs to be splitten
          if ( contentField.is_tag_like ) {
            content = content.split(contentField.tags_separator).filter(c => c != "")
            content = content.map( tag => {
              let trim = ( trimming && tag.length > trimming ) ? trimming : tag.length
              const tail = ( trimming && tag.length > trimming ) ? '...' : ''
              return tag.slice(0, trim) + tail
            })

            // log && console.log("getItemContent / object content is_tag_like : ", content)

            if ( contentField.filter_correspondance ) {
              // log && console.log("getItemContent / object content filterDescriptions : ", filterDescriptions)
              // choose filter corresponding to field

              let corrFilter = filterDescriptions.find( f => f.col_name === contentField.field )
              // log && console.log("getItemContent / object content corrFilter : ", corrFilter)

              let filterChoices = corrFilter.choices
              // log && console.log("getItemContent / object content filterChoices : ", filterChoices)

              content = content.map( c => {
                let tagDict = filterChoices.find( t => t.name === c )
                // log && console.log("getItemContent / object content tagDict : ", tagDict)
                let tagText = tagDict && tagDict.choice_title.find( ct => ct.locale === locale )
                // log && console.log("getItemContent / object content tagText : ", tagText)
                let corrContent = tagText.text
                // log && console.log("getItemContent / object content corrContent : ", corrContent)
                return corrContent ? corrContent : c
              })
            }

            content = content.map( tag => {
              let trim = ( trimming && tag.length > trimming ) ? trimming : tag.length
              const tail = ( trimming && tag.length > trimming ) ? '...' : ''
              return tag.slice(0, trim) + tail
            })

            // log && console.log("getItemContent / object content is_tag_like : ", content)

            return content
          } else {
            // log && console.log("getItemContent / object content : ", content)
            let trim = ( trimming && content.length > trimming ) ? trimming : content.length
            const tail = ( trimming && content.length > trimming )? '...' : '' ;
            content = content.slice(0, trim) + tail
            // log && console.log("getItemContent / object content not tag like : ", content)
            return content
          }
        }

      } catch(e){
        content = noData
      }

    }

    else {
      // content is none
      if ( fieldBlock === 'block_image'){
        return undefined
      }
      else if ( blocktags.includes(fieldBlock) ) {
        return [ noData ]
      }
      else {
        return noData
      }
    }

  }
  else {
    // no contentField or is_visible === false
    return undefined
  }

}

export function getDefaultImage(defaultImages, item, idField='id'){

  let d = defaultImages
  let image
  let images_set  = (d) ? d.images_set : undefined

  console.log("getDefaultImage / item : ", item)
  console.log("getDefaultImage / images_set : ", images_set)

  if (images_set && images_set.length > 0) {
    const textureCount = images_set.length + 1
    let id = (item[idField]) ? parseInt(item[idField].substr(item[idField].length - 6), 16) % textureCount : 111111111111111111
    console.log("getDefaultImage / id : ", id)
    let tail = id % images_set.length + 1;
    let imageObj = images_set.find(function(i){
      return i.dft_text === 'img_'+tail;
    })
    image = imageObj.src_image
  }
  // else {
  //   let id = 111111111111111111
  //   image = `/static/illustrations/textures/medium_fiche_${ (parseInt(id.substr(id.length - 6), 16) % textureCount) + 1}.png`
  // }
  return image

}
