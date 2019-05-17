
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

    let trimmedItemProps = Object.keys(item)
                      .filter(key => !notAllowedKeys.includes(key))
                      .reduce((obj, key) => {
                        obj[key] = item[key];
                        return obj;
                      }, {} );
    trimmedItemProps.iconMapbox = "marker"
    trimmedItemProps.weigth = 0.1

    const tempObject = {
      type : 'Feature',
      properties : trimmedItemProps,
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