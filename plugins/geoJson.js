
console.log('+ + + plugins/geoJson... ')

export function createGeoJsonDataPoints(dataArray){

  console.log("\n+ + + createGeoJsonData ... ")
  console.log("+ + + createGeoJsonData / dataArray : ", dataArray)

  // geojson wrappeer
  let geoJSON = {
    type : 'FeatureCollection',
    features : [],
  }
  const notAllowedKeys = ['lon', 'lat']
  // remap items array
  let dataGeoJson = dataArray.map(item => {
    let trimmedItem = Object.keys(item)
                      .filter(key => !notAllowedKeys.includes(key))
                      .reduce((obj, key) => {
                        obj[key] = item[key];
                        return obj;
                      }, {} );
    const tempObject = {
      type : 'Feature',
      properties : trimmedItem,
      geometry : {
        type : 'Point',
        coordinates : [item.lon, item.lat]
      }
    }
    return tempObject
  })
  geoJSON.features = dataGeoJson

  console.log("")
  return geoJSON
  
}