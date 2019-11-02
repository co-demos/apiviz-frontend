export const VIEW_TABLE = 'VIEW_TABLE';
export const VIEW_LIST = 'VIEW_LIST';
export const VIEW_MAP  = 'VIEW_MAP';
export const VIEW_STAT = 'VIEW_STAT';

export const defaultPagination = {
  page : 1,
  perPage : 10,
  perPageOptions : [ 10, 25, 50, 100 ]
}

export const responsiveBreakpoint = 1023
export const bulmaBreakpoints = {
  xs : { codename : 'xs', fullname : 'mobile',     btnsAsAddons: false, marginContainer : '15px', minWidth : 0,    maxWidth : 768,  } ,
  s :  { codename : 's',  fullname : 'tablet',     btnsAsAddons: true,  marginContainer : '20px', minWidth : 769,  maxWidth : 1023, } ,
  m :  { codename : 'm',  fullname : 'desktop',    btnsAsAddons: true,  marginContainer : 'auto', minWidth : 1024, maxWidth : 1215, } ,
  l :  { codename : 'l',  fullname : 'widescreen', btnsAsAddons: true,  marginContainer : 'auto', minWidth : 1216, maxWidth : 1407, } ,
  xl : { codename : 'xl', fullname : 'fullHD',     btnsAsAddons: true,  marginContainer : 'auto', minWidth : 1408, maxWidth : false, } ,
}

// find windowBreakPoint
export function findBulmaBreakpointByWidth( width ){
  switch (true) {
    case ( width <= bulmaBreakpoints.xs.maxWidth ) : return bulmaBreakpoints.xs
    case ( width <= bulmaBreakpoints.s.maxWidth  ) : return bulmaBreakpoints.s
    case ( width <= bulmaBreakpoints.m.maxWidth  ) : return bulmaBreakpoints.m
    case ( width <= bulmaBreakpoints.l.maxWidth  ) : return bulmaBreakpoints.l
    default : return bulmaBreakpoints.xl
  }
}

export const GeoCenters = {

  // AS : [<LAT>, <LONG>]

  // FRANCE : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  FRANCE : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  // FRANCE : { center : [2.2137, 46.2276], zoom : 6, maxZoom : 18, minZoom : 2 },
  // EUROPE : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  // AMERICAS : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  // AFRICA : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  // ASIA : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  // OCEANIA : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
  // WORLD : { center : [46.2276, 2.2137], zoom : 6, maxZoom : 18, minZoom : 2 },
};

