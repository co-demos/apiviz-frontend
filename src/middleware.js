const middleware = {}

middleware['getAppConfig'] = require('@/middleware/getAppConfig.js');
middleware['getAppConfig'] = middleware['getAppConfig'].default || middleware['getAppConfig']

middleware['getRouteConfig'] = require('@/middleware/getRouteConfig.js');
middleware['getRouteConfig'] = middleware['getRouteConfig'].default || middleware['getRouteConfig']

middleware['setAppMode'] = require('@/middleware/setAppMode.js');
middleware['setAppMode'] = middleware['setAppMode'].default || middleware['setAppMode']

export default middleware
