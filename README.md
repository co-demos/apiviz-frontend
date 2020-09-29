## FRONTEND
Code source du site [OpenCompaniesData](https://opencompaniesdata.netlify.app) [![Netlify Status](https://api.netlify.com/api/v1/badges/cef36329-5ed1-49a6-b567-d3dfd79d9fe8/deploy-status)](https://app.netlify.com/sites/opencompaniesdata/deploys) qui permet de rechercher les résultats financiers des entreprises françaises, et faire de la dataviz dessus, notamment :
 - comment se réparti la marge de l'entreprise entre les salarié⋅es, les impôts, les dividendes
 - comment évolue le chiffre d'affaire, et quelle part sert à payer des salarié⋅es

Si vous voulez poser d'autres questions au site, ouvrez des issues :-)

## BACKEND
Les données sont stockées et accessible sur [Enthic.fr](https://www.enthic.fr) (et son [API](https://api.enthic.fr)) dont le code source est hébergé sur https://github.com/phe-sto/enthic

-------
## PRÉSENTATION
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

### Comment ça marche ?
Le projet [Enthic](https://www.enthic.fr) et son [code source](https://github.com/phe-sto/enthic) permettent de constituer une base de données opendata à partir des sources officielles, et de rendre cette base accessible via une [API](https://api.enthic.fr/), pour que les données soit ouvertes à tous⋅tes informaticien⋅nes.
Le site https://opencompaniesdata.netlify.app utilise cette API pour permettre à n'importe qui de faire des recherches dans la base, et afficher les données mise en forme.

### Quelles sont les données officiellement disponible?

| Nom officiel | Explication | Exemple de contenu | Source |
| ------------ | ----------- | ------------------ | ------ |
| RNCS CA | Comptes annuels des entreprises françaises depuis 2017 | **Compte de résultat** (chiffre d'affaire, masse salariale, cotisation sociale, nombre d'employé⋅es, impôts, prime de participation, subvention, etc...), **Bilan actif et passif** (dette, capital social, etc...) | [FTP avec identifiant](https://www.inpi.fr/fr/licence-registre-national-du-commerce-et-des-societes-rncs) |
| RNCS IMR | Immatriculations, modifications, radiations des sociétés françaises | Les adresses, secteur d'activité et taille des différents établissements de l'entreprise, les membres du Conseil d'Administration y compris s'ils représentent une autre entreprise | [API](https://entreprise.data.gouv.fr/api_doc/rncs) ou [FTP avec identifiant](https://www.inpi.fr/fr/immatriculations-modifications-radiations-des-societes-imr) |
| base SIRENE | Base de données sur les entreprises | Une carte d'identité assez concise pour chaque entreprises | [API](https://entreprise.data.gouv.fr/api_doc/sirene) |

Surveiller [cette page](https://entreprise.data.gouv.fr/api_doc) présentant les API officielles sur des données d'entreprises

### Comment aider ?
Venez en discute sur le [chat Code For France](https://chat.codefor.fr/home) ou entamez la discussion via une *issue*.

#### Pour celleux qui ne sont pas développeur⋅ses
Si les données ci-dessus attisent votre curiosité, vous pouvez aider en nous disant ce que vous aimeriez voir comme fonctionnalités sur le site.

#### Pour les développeur⋅ses
Toutes les bonnes volontés et idées sont les bienvenues.
Le front est actuellement développé en vuejs et déployé automatiquement via netlify.
Le back est une base de données MariaDB alimenté via des scripts python. Son API est aussi codée en python.
Mais nous sommes ouverts au dialogue :-)

## ROADMAP
### Fonctionnel
 - Permettre de naviguer d'une entreprise à une autre quand elles ont un lien actionnarial
 - Permettre de comparer les résultats d'une entreprise avec d'autres entreprises du même secteur et/ou même taille
 - Faire un classement des entreprises plus ou moins transparente (données officielles bien remplie, etc...)
 - Faire un classement des entreprises plus ou moins partageuse/vertueuse (profil du compte de résultat, etc...)
 - Permettre le téléchargement des données sous la forme d'un tableur intelligible

## Synergies potentielles :
Audit d'entreprises pour noter leurs actions positives : https://www.gen-ethic.com/
Notation d'entreprises sur la base de leur déclaration. Note proportionnelle à l'impact positif en matière de social et d'écologie : https://noussommesdemain.com/content/impact-score
Site valorisant les déclarations de patrimoines et d'intérêts des personnages politiques, ainsi que les lobbyistes : http://integritywatch.fr/

--------

## Documentation du code
### Partie affichage du site
Le fichier pages/index.vue contient le code de la page d'accueil, ainsi que le code de routage vers les autres pages du site.
Le fichier layouts/default.vue contient la ligne de footer vraiment tout en bas du site.
Le dossier components/dynamicUX contient des éléments visuels génériques du site, comme le footer, le header, la barre de navigation, ...
Le dossier components/dynamicData contient des éléments visuels utilisés par le site pour afficher de la donnée, notamment tous les éléments qu'on trouve dans une page détaillant une entreprise.

### Partie tuyauterie du site
Le fichier store/config.js contient la configuration du site. Il va actuellement la chercher sur un serveur distant, mais l'objectif est de stocker la configuration directement dans le code.
Le fichier store/search.js contient le code pour chercher les données aux backend via les API, selon la recherche de l'utilisateur.
Le fichier plugins/utils.js contient des fonctions utilitaires, et notamment les fonctions permettant de vérifier et mieux formater les données d'une entreprises. Ces fonctions incluent :
La fonction populateDisplayedItem qui fait la requête sur l'API d'Enthic
La fonction formatEnthicData qui reconstitue un objet JSON par année, en remplaçant les codes par des noms humainement compréhensibles
La fonction createTreeRepresentation qui créer un objet JSON représentant le compte de résultat sous la forme d'un arbre, ce qui permet de facilement vérifier si les valeurs sont cohérentes les unes avec les autres, et de compléter les manques si possible.


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
