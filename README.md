<h2 align=center>
	<img src="./static/logos/logo_apiviz_15.png"><br>
  FRONTEND
</h2>


-------
## PRESENTATION

Visualize data coming from an API in a CMS-like app. 
If your data is stored somewhere and accessible via an API, ApiViz can transform it into a full website to show it at its best. 

ApiViz includes "out-the-box" a back-office to fully configure an original datavisualisation website : 
  - **navbar** : define the logo, links, and menus in your apiviz instance's navabr. 
  - **styles** : define the CSS styles for your apiviz instance.
  - **routes** : define the pages and routes of your apiviz instance, either statics contents or data views.
  - **data endpoints** : define the data endpoints feeding your apiviz instance and the fields you want to display.
  - **global** : define some metadata for your apiviz instance.
  - **footer** : define the links present in the apiviz instance's footer.

--------

#### warning : 

**apiviz-frontend** is only the frontend of the APIVIZ application, it only works if and only if the **[apiviz-backend](https://github.com/co-demos/apiviz-backend)** is correctly installed first.

--------

## THE APIVIZ ECOSYSTEM

ApiViz is designed to **agnosticaly display data** and provide an engine to deploy a **datavisualisation website** without (too much) pain, not regarding to the service(s) serving and storing the data. 

Nevertheless to do so an instance of ApiViz must be connected to several external services : one for authentication, one for serving the data, one for storing the static contents (html pages, images...).

The goal of ApiViz is to **work with any external service** fulfilling those roles, but we developed an **eco-system of open source applications** allowing a complete and free way to deploy such a datavisualisation service. 

<br>

| logo | <div style="text-align:center">the open source eco-system ( aka TADATA! )</div> |
|    :----:   |          :--- |
| <img src="./static/logos/logo_apiviz_icon_15.png" height="33"> | **[Apiviz](https://github.com/co-demos/ApiViz)** as the high-level app for visualisation, a sort of open source CMS for data-visualisation ;   |
| <img src="./static/logos/logo_solidata.png" height="33"> | **[Solidata](https://github.com/entrepreneur-interet-general/solidata_frontend)** to "API-fy" your data and manage open data projects ; |
| <img src="./static/logos/logo_auth_microservice.png" height="33"> | **[TokTok](https://github.com/co-demos/toktok)** for a dedicated authentication service to manage users, JWT, and roles.  |
| <img src="./static/logos/logo_openscraper_01.png" height="33"> | **[OpenScraper](https://github.com/entrepreneur-interet-general/OpenScraper)** is a generic web scraper serving the results of the scraping via its API  |


<br>

In the following illustration you can have a general idea of how those several services could work altogether. Check the [`/documentation/configurations`](./documentation/configurations) folder to have a broader look to [other configurations](./documentation/configurations/APIVIZ_CONFIGURATIONS-export.pdf).

<h2 align=center>
	<img src="./documentation/configurations/APIVIZ CONFIGURATIONS-export-details-light.jpg">
</h2>

You can also check those several projects and repository to find some layout for your specific new datavisualisation website : 
- Sonum repo ;
- CIS repo ;
- ... and more to come... 

**Note** : all the schemas were realized with [VUE - Visual Understanding Environment](https://vue.tufts.edu/index.cfm), an open source mind mapping tool. The source file for the schemas is [here](./documentation/configurations/APIVIZ_CONFIGURATIONS.vue)

--------

## HOW TO CONFIGURE YOUR APIVIZ INSTANCE

1. register an user (user data will stored and managed in TokTok, so you'd need to install Toktok locally) ;
1. make this user an `admin` (in TokTok) ;
1. log in (`admin` link in the default footer, `/login` route by default) ;
1. go to the `/backoffice` route by clicking on the button ;
1. set up your ApiViz configuration : 
    
    - set up the global variables ; 
    - set up your data endpoints ; 
    - set up your authentication endpoints ; 
    - set up your routes (pages must point out to html contents, f.e. on Github) ; 
    - set up the styles ;
    - set up your navbar ; 
    - set up your footer ;

1. save your configuration ;
1. deploy (if not done already) and enjoy ;

More detailed configuration documentation on its way...

--------

## DEVELOPERS

Please check out our *[guidelines](./GUIDELINES_DEV.md)*

--------

## INSTALLATION WALKTHROUGH 


<hr>

Before anything you need to install **[Apiviz-backend](https://github.com/co-demos/apiviz-backend)** to serve your configuration to the frontend.

## Build setup (with Nuxt)

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
# get env vars from .env file
$ npm run dev

# overwrites .env file with env vars from script in package.json
$ npm run dev-test

# get env vars from .env file but overwrites NUXT_BACKEND_MODE as local backend served with Docker
$ npm run dev-docker

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

... then check in your browser : [`localhost:3000`](localhost:3000)

## Build setup (with Docker)

``` bash
# install / stop / restart

$ make up # run app with Docker
$ make restart # restart app with Docker
$ make down # stop app with Docker
```

... then check in your browser : [`localhost:3333`](localhost:3333)

------

## TECHNICAL POINTS

#### Tech stack

- _Frontend_ : 
    - **[Nuxt.js](https://nuxtjs.org/)** as JS framework upon Vue.js, 
    - **[Vue.js](https://vuejs.org/)** as JS framework, 
    - **[Axios](https://github.com/axios/axios)** for API queries (to make queries to [Solidata](https://github.com/entrepreneur-interet-general/solidata_backend) or else), 
    - **[Bulma](https://bulma.io/)** as CSS framework, 
    <!-- - **[Leaflet](https://leafletjs.com)**, **[Vue2Leaflet](https://github.com/KoRiGaN/Vue2Leaflet)**, and **[PruneCluster](https://github.com/SINTEF-9012/PruneCluster)** for map layout -->
    - **[Mapbox-GL](https://docs.mapbox.com/mapbox-gl-js/api/)**, and **[vue-mapbox](https://soal.github.io/vue-mapbox/)** as a mapbox-gl wrapper for vue.js
<br>

- _Server_   : 
    - **[Ubuntu 18.04]()**, 
    - **[NGINX](https://www.nginx.com/)**, 
    - hosted in **[Digital Ocean](http://digitalocean.com/)**, 
    - domain name from **[NameCheap](http://namecheap.com/)**

- _Dev tools_   : 
    - **[Docker](https://www.docker.com/)**... also check this [introduction to Docker](https://guillim.github.io/docker/2018/11/18/docker-hands-on-intro.html)

-------

## CREDITS 

#### ApiViz's team thanks :

- the [EIG](https://entrepreneur-interet-general.etalab.gouv.fr/) program by [Etalab](https://www.etalab.gouv.fr/)
- the [Social Connect](https://entrepreneur-interet-general.etalab.gouv.fr/defi/2017/09/26/socialconnect/) project, aka "Carrefour des Innovations Sociales"
- the [CGET](http://www.cget.gouv.fr/)
- the [MedNum](https://lamednum.coop)
- the [Mission Société Numérique](https://societenumerique.gouv.fr)
- and all those who believed and helped in this project : 
    - Christophe N.
    - Damla S.
    - Bastien G. 
    - Mathilde B. 
    - Rémy S.
    - Cécile B.

#### Contacts - maintainance :

- [Julien Paris](<mailto:codemos.infos@gmail.com>) (aka [JPy](https://github.com/JulienParis) on Github)
- [Guillaume Lancrenon](https://guillim.github.io) (aka [Guillim](https://github.com/guillim) on Github)

#### Design UI-UX
- [Elise Lalique](https://github.com/Eliselalique)


-------

## SCREENSHOTS (development)

------------

#### MAP VIEW (Sonum client configuration)
displays your geolocalized data, given your configuration set in backoffice
<h2 align=center>
	<img src="./documentation/screenshots/map-view-sonum-03.png">
</h2>


------------

#### LIST VIEW (APCIS client configuration)
displays your data as a cards list, given your configuration set in backoffice
<h2 align=center>
	<img src="./documentation/screenshots/list-view-apcis-01.png">
</h2>

------------

#### DETAIL VIEW (Sonum client configation)
displays your data as a detailed pages, given your configuration set in backoffice
<h2 align=center>
	<img src="./documentation/screenshots/detail-view-sonum-01.png">
</h2>

------------

#### ADMIN / BACKOFFICE (in development)
<h2 align=center>
	<img src="./documentation/screenshots/backoffice-sonum-01.png">
</h2>



--------

## THE APIVIZ ECOSYSTEM - DETAILED SCHEMA

<hr>

#### OPEN SOURCE SERVICES FOR A SOVEREIGN AND DECENTRALIZED DATA FLOW
In the following illustration you can grasp a more detailed comprehension of how every application of the ApiViz's "ecosystem" are in dialog one with the other : 

- **[TokTok](https://github.com/co-demos/toktok)** centralizes requests concerning user's authentication : 

    - login : given an email and a password responds with an `access_token` and a `refresh_token`
    - register an new user : 
    - modify an user :  
    - retrieves user's infos : 
    - confirm an `access_token` is authorized, valid, or not.
  <br>

- **[Solidata](https://github.com/entrepreneur-interet-general/solidata_frontend)** centralizes data management : 

    - stores data as open data projects.
    - "API-fy" your tabular data. 
    - allows distant modifications on data thanks to its backend API.
    - allows you to gather and normalize several datasets into a single open data project / dataset output.
<br>

- **Github/Gitlab repo** centralizes html pages, images and external scripts you'll need for your original wabapp : 

    - by storing your static contents on a Github/Gitlab repo, modifying a content for your online server doesn't need to change your app source code anymore, you just need to modify your html/images/scripts on Github/Gitlab, and a few minute after your content is changed directly online.
    - that way you can separate in your team those in charge to modify contents, and those in charge of code maintenance.
<br>

- **[Apiviz](https://github.com/co-demos/ApiViz)** gathers data and app configuration to display an original website : 

    - navbar configuration : define the logo, links, and menus in your apiviz instance's navabr. 
    - footer configuration : define the links present in the apiviz instance's footer.
    - styles configuration : define the CSS styles for your apiviz instance.
    - global configuration : define some metadata for your apiviz instance.
    - routes configuration : define the pages and routes of your apiviz instance, either statics contents or data views.
    - data endpoints configuration : define the data endpoints feeding your apiviz instance and the fields you want to display.

<hr>

#### GLOBAL BLUEPRINT - MAIN DATA FLOWS AND APPS SERVICES
<h2 align=center>
	<img src="./documentation/configurations/APIVIZ CONFIGURATIONS-export-details-full.jpg">
</h2>

---------

## DEPLOYMENT CONFIGURATIONS


<h2 align=center>
	<img src="./documentation/configurations/APIVIZ CONFIGURATIONS-export-legends.jpg">
</h2>

------

#### DEPLOYMENT AS FULL MUTUALIZED MICROSERVICES SYTEM
<h2 align=center>
	<img src="./documentation/configurations/APIVIZ CONFIGURATIONS-export-paas-D.jpg">
</h2>

------

#### DEPLOYMENT AS FULL CLIENT SOVEREIGNETY ON SERVICES 
<h2 align=center>
	<img src="./documentation/configurations/APIVIZ CONFIGURATIONS-export-server-C.jpg"> 
</h2>

------

#### ALL DEPLOYMENT OPTIONS
<h2 align=center>
	<img src="./documentation/configurations/APIVIZ CONFIGURATIONS-export.jpeg">
</h2>