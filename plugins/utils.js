
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


// To load external librairies in components
export function loadScript(url, type, callback){

  console.log("try to load script:", url);

  var script = document.createElement('script');
  script.src = url;

  if (type !== undefined ){
    script.type = "text/javascript";
  }
  
  if (callback !== undefined){
    script.onreadystatechange = callback;
    script.onload = callback;
  }

  document.head.appendChild(script);
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