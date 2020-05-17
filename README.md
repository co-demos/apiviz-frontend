

## FRONTEND

![APIVIZ-BRAND](./static/logos/logo_apiviz_15.png)

-------
## PRESENTATION

Visualize data coming from an API in a CMS-like app : in short we aim to develop a Wordpress for data-visualisation. 

If your data is stored somewhere and accessible via an API, ApiViz can transform it into a full website to show it at its best. 

ApiViz includes "out-the-box" a back-office to fully configure/customize an original datavisualisation website 

--------

#### WARNINGS : 

**apiviz-frontend** is only the frontend of the APIVIZ application, it only works if (and only) if a **[apiviz-backend](https://github.com/co-demos/apiviz-backend)** is correctly installed first or is serving configurations to the frontend.

To fully enjoy Apiviz frontend's features if you're not using Solidata's API, ***your own API Rest might propose all or some of the following parameters***, or equivalent when querying a dataset : 

- ***for the research navbar :***
  - `query` : full text searrch
  - `search_filter` : to filter out your results given a field name and a value. For instance querying all items in a 'my-data' dataset in which the field 'category' has the value 'categ01' could be similar to : `https://my-api.com/my-data?search_filter=category__categ01`

- ***for detail view :*** 
  - `item_id` : to search an item by its id inside a dataset

- ***for table and list views :***
  - `page_number` : the page number
  - `results_per_page` : the number of items per page
  - `sort_by` : field to sort your result by
  - `sort_order` : sorting order
  - `shuffle_seed` (optionnal) : if you want to shuffle the results

- ***for the map view :***
  - `results_for_map` : getting all the results in a condensed format, like `{ id : <item_id>, lat: <latittude>, lng: <longitude>}`
  - `fields_to_return` : to return additional fields, for instance when using `results_for_map=true` if you need another field(s) to link an item to a choropleth layer 

--------

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

#### DEPLOYED WEBSITES : 

Main apiviz demo website : 
- [Apiviz.io](https://apiviz.io) : [![Netlify Status](https://api.netlify.com/api/v1/badges/851f6ce8-91bb-43e6-b6c6-80b66c9328cd/deploy-status)](https://app.netlify.com/sites/apiviz-demo-site/deploys)

Official websites : 
- [PiNG - carto](https://tierslieux.cartes.pingbase.net) : [![Netlify Status](https://api.netlify.com/api/v1/badges/23e061dc-c6f6-4b8b-bd03-a3cd4dd622a1/deploy-status)](https://app.netlify.com/sites/ping-carto/deploys)
- [CONUMM - carto](https://conumm.netlify.app) : [![Netlify Status](https://api.netlify.com/api/v1/badges/a60524d7-bfe3-478f-9537-344f5830f70b/deploy-status)](https://app.netlify.com/sites/conumm/deploys)
- [Décider ensemble - ressources](https://decider-ensemble.netlify.app) : [![Netlify Status](https://api.netlify.com/api/v1/badges/f39c62de-075d-4f52-ad43-41cfd23b46ff/deploy-status)](https://app.netlify.com/sites/decider-ensemble/deploys)
- [Covid-initiatives](https://covid-initiatives.org) : [![Netlify Status](https://api.netlify.com/api/v1/badges/653aa511-7abc-4a74-ab71-6ba9f5d599a0/deploy-status)](https://app.netlify.com/sites/covid-initiatives/deploys)
- [TERNUM](https://bfc-carto.netlify.app/) : [![Netlify Status](https://api.netlify.com/api/v1/badges/cbd34edb-344d-4b16-9782-079050650128/deploy-status)](https://app.netlify.com/sites/bfc-carto/deploys)

Main Apiviz instances with public data : 
- [France Tiers-Lieux - carto](https://tiers-lieux-dataviz.netlify.app/recherche/carte) : [![Netlify Status](https://api.netlify.com/api/v1/badges/7fc48ec3-148f-46a9-9151-6f78996cfd37/deploy-status)](https://app.netlify.com/sites/tiers-lieux-dataviz/deploys)
- [Codes Etalab](https://etalab-codes.netlify.app/) : [![Netlify Status](https://api.netlify.com/api/v1/badges/c0a9ad0c-6969-403c-80bb-2e4f262d7703/deploy-status)](https://app.netlify.com/sites/etalab-codes/deploys)
- [Inventaire des orgues](https://orgues-apiviz.netlify.app/) : [![Netlify Status](https://api.netlify.com/api/v1/badges/e91ca7c3-3426-4467-b92c-1e371d8b038c/deploy-status)](https://app.netlify.com/sites/orgues-apiviz/deploys)
- [sonum-preprod](https://apiviz-preprod-sonum.netlify.app/sonum-carto/carte) : [![Netlify Status](https://api.netlify.com/api/v1/badges/1e4ddb5c-9df8-4903-a100-6f8ba054b4e8/deploy-status)](https://app.netlify.com/sites/apiviz-preprod-sonum/deploys)


Test websites : 
- [OpenCompaniesData - OpenCompaniesData branch](https://opencompaniesdata.netlify.app/) : [![Netlify Status](https://api.netlify.com/api/v1/badges/cef36329-5ed1-49a6-b567-d3dfd79d9fe8/deploy-status)](https://app.netlify.com/sites/opencompaniesdata/deploys)
- [apcis-preprod](https://apiviz-preprod-cis.netlify.app/recherche/carte) : [![Netlify Status](https://api.netlify.com/api/v1/badges/abb54fbc-01c6-4c48-9f1b-8ff5b9ef00b1/deploy-status)](https://app.netlify.com/sites/apiviz-preprod-cis/deploys)
- [apcis-preprod (CIS migration )](https://carrefour-innovations-sociales.fr/recherche) : [![Netlify Status](https://api.netlify.com/api/v1/badges/f5ff305b-52c1-4fb1-be79-17a7494705ac/deploy-status)](https://app.netlify.com/sites/apiviz-preprod-apcis-url-migration/deploys)


--------

## DOCUMENTATION 

Check out our brand new Apiviz presentation website : https://apiviz.io

Check out our brand new documentation website on Github pages : https://co-demos.github.io/apiviz-frontend/

[![DOC_SITE](./documentation/documentation_website.png)](https://co-demos.github.io/apiviz-frontend/)
<!-- -------- -->

<!-- ![MAP VIEW](./documentation/screenshots/map-view-sonum-03.png) -->

--------

## THE APIVIZ ECOSYSTEM

ApiViz is designed to **agnosticaly display data** and provide an engine to deploy a **datavisualisation website** without (too much) pain, not regarding to the service(s) serving and storing the data. 

Nevertheless to do so an instance of ApiViz must be connected to several external services : one for authentication, one for serving the data, one for storing the static contents (html pages, images...).

The goal of ApiViz is to **work with any external service** fulfilling those roles, but we developed an **eco-system of open source applications** allowing a complete and free way to deploy such a datavisualisation service. 

<br>

| logo | the open source eco-system ( aka TADATA! ) |
|    :----:   |          :--- |
| <img src="./static/logos/logo_apiviz_icon_15.png" height="33"> | **[Apiviz](https://github.com/co-demos/ApiViz)** as the high-level app for visualisation, a sort of open source CMS for data-visualisation ;   |
| <img src="./static/logos/logo_solidata.png" height="33"> | **[Solidata](https://github.com/entrepreneur-interet-general/solidata_frontend)** to "API-fy" your data and manage open data projects ; |
| <img src="./static/logos/logo_auth_microservice.png" height="33"> | **[TokTok](https://github.com/co-demos/toktok)** for a dedicated authentication service to manage users, JWT, and roles.  |
| <img src="./static/logos/logo_openscraper_01.png" height="33"> | **[OpenScraper](https://github.com/entrepreneur-interet-general/OpenScraper)** is a generic web scraper serving the results of the scraping via its API  |


--------

## DEVELOPERS

Please check out our *[guidelines](./GUIDELINES_DEV.md)*

You can also check the *[development roadmap for future features](https://github.com/co-demos/apiviz-frontend/projects/1)*

--------

## INSTALLATION WALKTHROUGH 

--------

Before anything, if you want to use the whole Apiviz stack as a stand-alone app you need to install **[Apiviz-backend](https://github.com/co-demos/apiviz-backend)** to serve your configuration to the frontend.

Otherwise, if you just want to run Apiviz frontend and plya with it, you just need to add a `.env` file at the root of your cloned repo. The `.env`file must contain the following : 

```env

### ENV VARIABLES FOR APIVIZ FRONTEND ### 
### - - - - - - - - - - - - - - - - - ### 

APIVIZ_REPO=/apiviz-frontend/
DEPLOY_ENV=NETLIFY

### Apiviz backend's preprod server to serrve configs
NUXT_BACKEND_MODE=preprod

### Apiviz's distant preprod auth server to deal with login and auth
NUXT_AUTH_MODE=distant_preprod

### Apiviz's UUID to retrieve the corresponding configuration elements 

### you can comment / de-comment the pair of following vars of your choice 
### so you'll get the corresponding instance's specific configuration

NUXT_APP_CONFIG_NAME=DEMO_APIVIZ
NUXT_APIVIZ_UUID=89edbf7d-8b63-4088-ad14-ae6779d7698f

# NUXT_APP_CONFIG_NAME=SONUM
# NUXT_APIVIZ_UUID=c5efafab-1733-4ad1-9eb8-d529bc87c481

# NUXT_APP_CONFIG_NAME=APCIS
# NUXT_APIVIZ_UUID=f0a482da-28be-4929-a443-f22ecb03ee68

# NUXT_APP_CONFIG_NAME=TIERS_LIEUX
# NUXT_APIVIZ_UUID=fd9d4302-bddb-4fb1-8f13-d64dfdb66b91

# NUXT_APP_CONFIG_NAME=PING_CARTO
# NUXT_APIVIZ_UUID=0278419c-558e-43d5-a4d6-c836afd10445

# NUXT_APP_CONFIG_NAME=CONUMM
# NUXT_APIVIZ_UUID=2f658fb8-f00a-4b1a-ab73-7064433c98bc

# NUXT_APP_CONFIG_NAME=DECIDER_ENSEMBLE
# NUXT_APIVIZ_UUID=b8b52f0c-e66f-4018-bc0b-9ec7d17f8ccc

# NUXT_APP_CONFIG_NAME=BFC_TERNUM
# NUXT_APIVIZ_UUID=e8aff5a7-64b1-46b0-942a-8b16ac53aa3b

# NUXT_APP_CONFIG_NAME=COVID
# NUXT_APIVIZ_UUID=ebd7910d-5c98-4701-883a-6003a288b37d

# NUXT_APP_CONFIG_NAME=ETALAB_CODES
# NUXT_APIVIZ_UUID=a44de08d-12a1-4182-a06e-78058928c1e1

# NUXT_APP_CONFIG_NAME=ASSO_ORGUES
# NUXT_APIVIZ_UUID=3f3fd562-5202-427f-8ba3-f58d5660aabf

# NUXT_APP_CONFIG_NAME=OPEN_CORPORATE_FACTS
# NUXT_APIVIZ_UUID=305ab50d-c976-44d7-a8f2-a7594155c292

```

## Build setup (with Nuxt)

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3001
# note : gets env vars from .env file
$ npm run dev
```
... then check in your browser : [`localhost:3001`](localhost:3001) (see the `nuxt.config.js` file to know more)
<br>

You can also use those other commands
``` bash
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


## Build setup (with Docker)

``` bash
# install / stop / restart

$ make up # run app with Docker
$ make restart # restart app with Docker
$ make down # stop app with Docker
```

... then check in your browser : [`localhost:3333`](localhost:3333)

---------

### Linting

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Run dev with Standard lint messages :

```
npm run dev-lint
```


Lint what could be automatically linted 

```
npx standard --fix
```
