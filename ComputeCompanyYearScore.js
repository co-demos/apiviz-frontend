/**
The function computeScore takes an filled CompteDeResultat tree like in "arbreCompteDeResultat.json" file,
and compute company's score from it's data.
*/
export function computeScore(yearTreeData) {
  var transparencyScore = computeTransparencyScore(yearTreeData)
  if (transparencyScore >= 25)
  {
    var sharingScore = computeSharingScore(yearTreeData)
  }
  if (transparencyScore >= 70)
  {
    var realEconomyScore = computeRealEconomyScore(yearTreeData)
  }
  return {
    "transparencyScore" : transparencyScore,
    "sharingScore" : Math.round(100*sharingScore),
    "realEconomyScore" : Math.round(100*realEconomyScore)
  }
}

function computeTransparencyScore(yearTreeData) {
  var transparencyScore = 0.0

  // Checking existence of data needed to compute sharing score
  if (checkValueExist(yearTreeData.children.ParticipationSalariesAuxResultats)) {
    transparencyScore += 5.0
  }
  if (checkValueExist(yearTreeData.children.ImpotsSurLesBenefices)) {
    transparencyScore += 5.0
  }
  if (checkValueExist(yearTreeData.children.ResultatExceptionnel)) {
    transparencyScore += 2.5
  }
  if (checkValueExist(yearTreeData.children.ResultatAvantImpot.children.ResultatFinancier)) {
    transparencyScore += 2.5
  }
  if (checkValueExist(yearTreeData)) {
    transparencyScore += 5.0
  }
  if (checkValueExist(yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation)) {
      transparencyScore += 5.0
  }

  // If there is missing data, transparency score cannot go higher than 25
  if (transparencyScore < 25)
  {
    return transparencyScore
  }

  // Checking existence of data needed to compute the real economy score
  var charges = yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation.children.ChargesExploitation
  if (checkValueExist(charges.children.SalairesEtTraitements)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(charges.children.ChargesSociales)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(charges.children.ImpotTaxesEtVersementsAssimiles)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(charges.children.AchatsDeMarchandises)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(charges.children.VariationStockMarchandises)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(charges.children.AchatMatierePremiereAutreAppro)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(charges.children.VariationStockMatierePremiereEtAppro)) {
      transparencyScore += 5.0
  }

  var produits = yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation.children.ProduitsExploitation
  if (checkValueExist(produits.children.SubventionsExploitation)) {
      transparencyScore += 5.0
  }
  if (checkValueExist(produits.children.ChiffresAffairesNet)) {
      transparencyScore += 5.0
  }
  return transparencyScore
}

function computeSharingScore(yearTreeData) {
  var sharedPart = yearTreeData.children.ParticipationSalariesAuxResultats.data.value + yearTreeData.children.ImpotsSurLesBenefices.data.value
  var resultatCapitaux = yearTreeData.children.ResultatExceptionnel.data.value + yearTreeData.children.ResultatAvantImpot.children.ResultatFinancier.data.value
  var benefice = yearTreeData.data.value
  var resultatExploitation = yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation.data.value
  if (sharedPart > 0)
  {
    if(resultatCapitaux < 0)
    {
      if (sharedPart < 10 * resultatExploitation)
      {
        return sharedPart / resultatExploitation
      }
      else {
        console.log("computeSharingScore / cannot compute because participation + impot too high for resultatExploit :", sharedPart / resultatExploitation);
      }
    }
    else {
      if (sharedPart < 10 * benefice)
      {
        return sharedPart / benefice
      }
      else {
        console.log("computeSharingScore / cannot compute because participation + impot too high for benef :", sharedPart / benefice);
      }
    }
  }
  else {
    console.log("computeSharingScore / cannot compute because participation + impot negative :", sharedPart);
  }
  return "N/A"
}

function computeRealEconomyScore(yearTreeData) {
  var charges = yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation.children.ChargesExploitation.children
  return (charges.SalairesEtTraitements.data.value + charges.ChargesSociales.data.value + charges.ImpotTaxesEtVersementsAssimiles.data.value + charges.AchatsDeMarchandises.data.value + charges.VariationStockMarchandises.data.value + charges.AchatMatierePremiereAutreAppro.data.value + charges.VariationStockMatierePremiereEtAppro.data.value - yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation.children.ProduitsExploitation.children.SubventionsExploitation.data.value) / yearTreeData.children.ResultatAvantImpot.children.ResultatExploitation.children.ChargesExploitation.data.value
}

function checkValueExist(item)
{
  if(typeof item.data.value !== "undefined"){
      return true
  }
  else {
    console.log("checkValueExist / missing :", item);
  }
}
