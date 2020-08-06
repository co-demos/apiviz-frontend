## FRONTEND
Code source du site https://opencompaniesdata.netlify.app qui permet de rechercher les résultats financiers des entreprises françaises, et faire de la dataviz dessus, notamment :
 - comment se réparti la marge de l'entreprise entre les salarié⋅es, les impôts, les dividendes
 - comment évolue le chiffre d'affaire, et quelle part sert à payer des salarié⋅es

Si vous voulez poser d'autres questions au site, ouvrez des issues :-)

## BACKEND
Les données sont stockées et accessible sur https://www.enthic.fr (et son API) dont le code source est hébergé sur https://github.com/phe-sto/enthic

-------
## PRESENTATION
Le but de ce projet est de rendre accessible, explorable, exploitable et parlant les données sur les entreprises rendues publiques par l'État pour pouvoir répondre à des questions simples : 
 - à qui appartiennent les entreprises
 - lesquelles payent leur impôts en France
 - lesquelles embauchent en France
 - lesquelles touchent des subventions
 - lesquelles ne remplissent pas leur déclaration
 - lesquelles sont les plus transparentes, ou les plus opaques.
 
### À qui ça sert ?
Les ultimes bénéficiaires du projet seront les consommateur/trices qui veulent consommer mieux pour contribuer à la relocalisation de l'économie.
Mais aussi les salarié⋅es qui veulent savoir comment leur entreprise réparti la valeur ajoutée produite entre les salarié⋅es, l'État, les investissements et les actionnaires.
Mais avant d'atteindre un tel niveau de service, l'objectif intermédiaire est de rendre facilement récupérable et analysable les données sans requérir de écrire du code : un des buts du projet est de rendre accessible les données à n'importe qui sachant utiliser un tableur. Pour que les data-journalistes, les syndicats, les associations, et même des élu⋅es puissent faire usage de ces données.

La forme du projet serait une base de données opendata, accessible via une API, pour que les données soit ouvertes à tous⋅tes informaticien⋅nes.
Un site web permettant de chercher des entreprises, voir leur statistiques avec de la dataviz pertinente, les comparer entre elles, télécharger les données en .csv, etc...

### Comment ça marche ?
Le projet Enthic (https://www.enthic.fr) et son code source (https://github.com/phe-sto/enthic) permettent de constituer une base de données à partir des sources officielles, et de rendre cette base accessible via une API (https://api.enthic.fr/).
Le site https://opencompaniesdata.netlify.app utilise cette API pour permettre de faire des recherches dans la base à n'importe qui, et afficher les données mise en forme.

## ROADMAP

--------
[OpenCompaniesData - OpenCompaniesData branch](https://opencompaniesdata.netlify.com/) : [![Netlify Status](https://api.netlify.com/api/v1/badges/cef36329-5ed1-49a6-b567-d3dfd79d9fe8/deploy-status)](https://app.netlify.com/sites/opencompaniesdata/deploys)

--------
## INSTALLATION WALKTHROUGH
If you just want to run the frontend and play with it, you just need to add a `.env` file at the root of your cloned repo. The `.env`file must contain the following : 

```env

### ENV VARIABLES FOR APIVIZ FRONTEND ### 
### - - - - - - - - - - - - - - - - - ### 

APIVIZ_REPO=/apiviz-frontend/
DEPLOY_ENV=NETLIFY

### Apiviz backend's preprod server to serve configs
NUXT_BACKEND_MODE=preprod

### Apiviz's distant preprod auth server to deal with login and auth
NUXT_AUTH_MODE=distant_preprod

### Apiviz's UUID to retrieve the corresponding configuration elements 
NUXT_APP_CONFIG_NAME=OPEN_CORPORATE_FACTS
NUXT_APIVIZ_UUID=305ab50d-c976-44d7-a8f2-a7594155c292

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
