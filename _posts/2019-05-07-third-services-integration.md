---
title : INTEROPERABILITY
layout: single
classes: wide
categories:
  - lexicon
tags:
  - documentation
  - schema
  - principles
  - services
toc: true
toc_label: " contents"
toc_sticky: true
# cf : https://mmistakes.github.io/minimal-mistakes/post%20formats/post-gallery/
lightInt:
  - url: ./documentation/configurations/DATA_WORKFLOW-light.jpg
    image_path: ./documentation/configurations/DATA_WORKFLOW-light.jpg
    alt: "light details"
    title: "integration / modularity with other services"
detailInt:
  - url: ./documentation/configurations/DATA_WORKFLOW-details.jpg
    image_path: ./documentation/configurations/DATA_WORKFLOW-details.jpg
    alt: "full details"
    title: "integration / modularity with other services"
---

------

### BASIC DATA WORKFLOW THROUGH SERVICES

This simplified illustration aims to explain the role of each service we can encounter in a data-visualisation project, from the raw data on your desktop (CSV, XLS...) to an online interactive data-visualisation/valorisation service (a website for instance).

**Note** : this illustration simply lists all those services, but an online data-visualisation service could either contain all those necessary services (as a monolithic app) or be just one part of inter-operable services (as Apiviz).

<!-- {% include figure image_path="/documentation/configurations/DATA_WORKFLOW-light.jpg" %} -->

{% include gallery id="lightInt" caption="click for fullscreen view" %}

------

### INTEGRATION TO OTHER SERVICES

Apiviz aims to allow integration with third party services, either open sourced or closed. 

This illustrations shows various possibilities of interoperability between services.

<!-- {% include figure image_path="/documentation/configurations/DATA_WORKFLOW-details.jpg" %} -->

{% include gallery id="detailInt" caption="click for fullscreen view" %}