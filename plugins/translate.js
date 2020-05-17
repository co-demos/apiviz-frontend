import Vue from 'vue'

// console.log('+ + + plugins/translate... ')

Vue.prototype.$Translate = (textsList, locale, field) => {
  // console.log("::: textFromLocale / textsList : ", textsList)
  // console.log("::: textFromLocale / locale : ", locale)
  // console.log("::: textFromLocale / field : ", field)
  const textObject = textsList && textsList.find(t => t.locale === locale)
  const textOut = textObject && textObject[field]
  // console.log("::: textFromLocale / textOut : ", textOut)
  return textOut
}
