---
layout : home 
title : DEPLOYMENT CONFIGURATIONS
permalink : /docs/deployments
---


-----
## THE APIVIZ ECOSYSTEM - DETAILED SCHEMA

-----

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

- **client's Github/Gitlab repo** centralizes html pages, images and external scripts you'll need for your original wabapp : 

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

![FULL_DETAILS](../documentation/configurations/APIVIZ-CONFIGURATIONS-export-details-full.jpg)

---------

## DEPLOYMENT CONFIGURATIONS

![LEGENDS](../documentation/configurations/APIVIZ-CONFIGURATIONS-export-legends.jpg)

------

#### DEPLOYMENT AS FULL MUTUALIZED MICROSERVICES SYTEM
![PAAS_D](../documentation/configurations/APIVIZ-CONFIGURATIONS-export-paas-D.jpg)

------

#### DEPLOYMENT AS FULL CLIENT SOVEREIGNETY ON SERVICES 

![SERVER_C](../documentation/configurations/APIVIZ-CONFIGURATIONS-export-server-C.jpg)

------

#### ALL DEPLOYMENT OPTIONS

![ALL_EXPORTS](../documentation/configurations/APIVIZ-CONFIGURATIONS-export.jpeg)
