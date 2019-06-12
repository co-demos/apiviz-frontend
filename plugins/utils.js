
// console.log('+ + + plugins/utils... ')

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
  export function getItemById(id, endpointConfig){

    // const url = searchEnpointCreator({
    //   page:1,
    //   per_page:1,
    //   baseUrl:root_url,
    //   item_id:id
    // })
    console.log("\nPL-getItemById ..." )
    console.log("\PL-getItemById / endpointConfig : ", endpointConfig )

    const url = searchEndpointGenerator({
      endpointConfig : endpointConfig,
      questionParams : { itemId : id },
      selectedFilters : [],
    })
    console.log("\PL-getItemById / url : ", url )

    return fetch(url)
    .then(r => r.json())
    .then(({data, query}) =>
      data && data.data_raw && data.data_raw.f_data  && Array.isArray(data.data_raw.f_data)
        ? data.data_raw.f_data[0]
        : undefined
    )
  }

// cf : https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
export function resolvePathString(path, obj=self, separator='/') {
  // console.log("\n+ + + resolvePathString ... ");
  // console.log("+ + + resolvePathString / path : ", path);
  // console.log("+ + + resolvePathString / obj : ", obj);

  var properties = Array.isArray(path) ? path : path.split(separator)
  // console.log("+ + + resolvePathString / properties : ", properties);

  return properties.reduce((prev, curr) => prev && prev[curr], obj)

}

export function searchItems(url=undefined, responsePaths=undefined){

  console.log("\n+ + + searchItems ... ");

  console.log("+ + + searchItems / url : ", url);

  // abort fetch if this is supported
  // abort manually when response arrives otherwise
  const ac = abortableFetchSupported ? new AbortController() : undefined
  let searchAborted = false

  return {
    abort(){
      searchAborted = true
      if(ac)
          ac.abort()
    },
    promise: (ac ? fetch(url, {signal: ac.signal} ) : fetch(url))
    .then(r => r.json())
    .then(({data, query}) => {
      if(searchAborted){
        const error = new Error('Search aborted')
        error.name = 'AbortError'
        throw error
      }
      else{
        // console.log("+ + + searchItems (response) / data :", data);
        
        // read responsePath and populate dataStrcture correspondingly
        // console.log("+ + + searchItems / responsePaths : ", responsePaths);
        let responseProjects = resolvePathString(responsePaths.projects.path, data, '/')
        // console.log("+ + + searchItems / responseProjects : ", responseProjects);
        let responseTotal = resolvePathString(responsePaths.total.path, data, '/')
        let dataStructure = {
          projects : responseProjects,
          total : responseTotal
        }

        // return {
        //   projects: data
        //   && data.data_raw
        //   && data.data_raw.f_data
        //   && Array.isArray(data.data_raw.f_data)
        //   ? data.data_raw.f_data
        //   : [],
        //   total: (data && data.data_raw && data.data_raw.f_data_count) ? data.data_raw.f_data_count : 0
        // }

        return dataStructure

      }
    })

  }

}

export function searchEndpointGenerator(obj) {
  if (!obj) { throw 'error in searchEndpointGenerator: no parameter defined' }

  // console.log("+ + + searchEndpointGenerator / ...")
  // console.log("+ + + searchEndpointGenerator / obj : \n ", obj)

  // endpoint config related
  const endpointConfig = obj.endpointConfig
  const endpointConfigArgs = endpointConfig.args_options

  // question related
  const questionParams = obj.questionParams
  const selectedFilters = obj.selectedFilters

  // base query to be completed with args + questions
  let baseQuery = endpointConfig.root_url + '?'

  const appArgs = ['query', 'forMap', 'page', 'perPage', 'onlyGeocoded', 'itemId', 'shuffleSeed' ]
  
  // loop in routeArgs + queries then append to baseQuery
  let argsArray = []
  for (let key in endpointConfigArgs ) {
    const EndpointArg = endpointConfigArgs[key]
    // console.log("+ + + searchEndpointGenerator / EndpointArg : ", EndpointArg)
    if ( !EndpointArg.optional || appArgs.indexOf(EndpointArg.app_arg) !== -1 ){
      if ( questionParams[EndpointArg.app_arg] ) {
        let argString = EndpointArg.arg + '=' + questionParams[EndpointArg.app_arg]
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

  let argsLongString = argsArray.join('&')
  baseQuery += argsLongString


  // console.log("+ + + searchEndpointGenerator / baseQuery : \n ", baseQuery)

  return baseQuery
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

export function getItemContent(fieldBlock, displayableItem, contentFields, noData){
  
  const contentField = contentFields.find(f=> f.position == fieldBlock)
  
  // const log = true
  let blocktags = [
    'block_tags',
    'block_rb1_tags',
  ]
  let blocksToLog = [
    // 'block_tags',
    // 'block_abstract',
    // 'block_image',
  ]
  let typesToLog = [
    // 'object',
    // 'list',
    // 'list_tags'
  ]
  
  if ( contentField && contentField.is_visible ){

    const field = contentField.field
    const field_format = contentField.field_format

    const log = typesToLog.includes(field_format.type) && blocksToLog.includes(fieldBlock)
    // const log = blocksToLog.includes(fieldBlock)
    // const log = contentField && contentField.field_format.type === 'list_tags'
    
    log && console.log("\ngetItemContent / fieldBlock : ", fieldBlock)

    
    // log && console.log("getItemContent / field_format : ", field_format)
    
    let content = displayableItem[field]
    log && console.log("getItemContent / content A : ", content)
    
    if ( content && content !== "None" && content !== "" ){

      const trimming = contentField.field_format.trim
      log && console.log("getItemContent / trimming : ", trimming)
      
      try {
        
        // DEALING WITH LIST-LIKE RESULTS (TAGS)
        // slice tags in array
        if ( field_format.type === 'list_tags' ){
          log && console.log("getItemContent / list_tags content ", content)
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
  
          log && console.log("getItemContent / list content : ", content)
  
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
  
          log && console.log("getItemContent / content C : ", content)
          
          // string is tag-like and needs to be splitten
          if ( contentField.is_tag_like ) {
            content = content.split(contentField.tags_separator).filter(c => c != "")
            content = content.map( tag => {
              let trim = ( trimming && tag.length > trimming ) ? trimming : tag.length 
              const tail = ( trimming && tag.length > trimming ) ? '...' : ''
              return tag.slice(0, trim) + tail
            })
            return content
          } 
  
          // trim string
          else {
            log && console.log("getItemContent / string content : ", content)
            let trim = ( trimming && content.length > trimming ) ? trimming : content.length 
            log && console.log("getItemContent / trim : ", trim)
            const tail = ( trimming && content.length > trimming) ? '...' : '';
            content = content.slice(0, trim) + tail
            return content
          }
  
        }
  
        // DEALING WITH NATIVE STRING RESULTS
        else if ( field_format.type === 'object' ) {
          // string is tag-like and needs to be splitten
          if ( contentField.is_tag_like ) {
            content = content.split(contentField.tags_separator).filter(c => c != "")
            content = content.map( tag => {
              let trim = ( trimming && tag.length > trimming ) ? trimming : tag.length 
              const tail = ( trimming && tag.length > trimming ) ? '...' : ''
              return tag.slice(0, trim) + tail
            })
            return content
          } else {
            log && console.log("getItemContent / object content : ", content)
            let trim = ( trimming && content.length > trimming ) ? trimming : content.length 
            const tail = ( trimming && content.length > trimming )? '...' : '' ;
            content = content.slice(0, trim) + tail        
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

export function getDefaultImage(defaultImages, item){

  let d = defaultImages
  let image
  let images_set  = (d) ? d.images_set : undefined

  if (images_set && images_set.length > 0) {
    const textureCount = images_set.length + 1
    let id = (item.id) ? parseInt(item.id.substr(item.id.length - 6), 16) % textureCount : 111111111111111111
    let tail = id % images_set.length + 1;
    let imageObj = images_set.find(function(i){
      return i.dft_text === 'img_'+tail;
    })
    image = imageObj.src_image
  } else {
    image = `/static/illustrations/textures/medium_fiche_${ (parseInt(id.substr(id.length - 6), 16)%textureCount) + 1}.png`
  }
  return image

}