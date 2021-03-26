import axios from 'axios'

const emptyConfig = {
  'global' : {
    "app_basic_dict": {
      "_id": "5f6364ff7727e6c73f6d7bd4",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "back_to_results": [
        {
          "locale": "en",
          "text": "Back to results"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Retour aux résultats de recherche"
        }
      ],
      "dowload_file": [
        {
          "locale": "en",
          "text": "Download document"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Télécharger le document"
        }
      ],
      "field": "app_basic_dict",
      "help": "The default dict for your ApiViz instance",
      "infos": [
        {
          "locale": "en",
          "text": "Infos"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Informations pratiques"
        }
      ],
      "is_default": true,
      "more_infos": [
        {
          "locale": "en",
          "text": "More infos"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Autres informations"
        }
      ],
      "no_abstract": [
        {
          "locale": "en",
          "text": "no abstract"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "(Pas de résumé)"
        }
      ],
      "no_address": [
        {
          "locale": "en",
          "text": "no address"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Pas d'adresse enregistrée"
        }
      ],
      "no_data": [
        {
          "locale": "en",
          "text": "no data"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "non renseigné"
        }
      ],
      "no_inf o": [
        {
          "locale": "en",
          "text": "no info"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Pas d'information"
        }
      ],
      "open_infos": [
        {
          "locale": "en",
          "text": "Schedule"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Horaires"
        }
      ],
      "period": [
        {
          "locale": "en",
          "text": "Period"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Période"
        }
      ],
      "reinit_filters": [
        {
          "locale": "en",
          "text": "delete filters"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Supprimer tous les filtres"
        }
      ],
      "see_contact": [
        {
          "locale": "en",
          "text": "See the contact"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Contact"
        }
      ],
      "see_website": [
        {
          "locale": "en",
          "text": "Check the website"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Aller sur le site"
        }
      ],
      "services": [
        {
          "locale": "en",
          "text": "Services"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Services proposés"
        }
      ],
      "share_link": [
        {
          "locale": "en",
          "text": "Share this link"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Partagez ce lieu"
        }
      ],
      "source": [
        {
          "locale": "en",
          "text": "Source"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Source"
        }
      ],
      "tel": [
        {
          "locale": "en",
          "text": "Phone"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Téléphone"
        }
      ]
    },
    "app_favicon": {
      "_id": "5f6364ff7727e6c73f6d7bd6",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "content": "apiviz default favicon in browser",
      "field": "app_favicon",
      "help": "The default favicon for your ApiViz instance",
      "is_default": true,
      "url": "/favicon.ico"
    },
    "app_languages": {
      "_id": "5f6364ff7727e6c73f6d7bd3",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "field": "app_languages",
      "help": "The default homepage for your ApiViz instance",
      "is_default": true,
      "is_multi_lang": true,
      "languages": [
        "fr",
      ],
      "locale": "fr"
    },
    "app_logo": {
      "_id": "5f6364ff7727e6c73f6d7bd5",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "content": "apiviz default logo in navbar",
      "field": "app_logo",
      "help": "The official default logo for your ApiViz instance",
      "is_default": true,
      "url": null
    },
    "app_title": {
      "_id": "5f6364ff7727e6c73f6d7bd7",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "can_be_used_as_model": true,
      "content": "Enthic Frontend",
      "content_text": [
        {
          "locale": "fr",
          "text": "Enthic Frontend"
        }
      ],
      "field": "app_title",
      "help": "Choose a title for your ApiViz instance",
      "image_preview": "https://raw.githubusercontent.com/co-demos/PING-carto/master/documentation/screenshots/map-view-tiers-lieux-01.png",
      "is_default": true,
      "is_in_navbar": true
    }
  },
  'styles' : {
    "app_banners": {
      "_id": "5f6365037727e6c73f6d7d2b",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banners_set": [
        {
          "banner_uri": "apiviz_default",
          "dataset_uri": null,
          "disapearing_timeout": 5,
          "dynamic_template": "DynamicBanner",
          "is_disapearing": false,
          "is_dismisible": true,
          "is_dynamic": false,
          "is_visible": false,
          "template_url": ""
        },
        {
          "banner_uri": "banner-cis-carto",
          "dataset_uri": "cis-carto",
          "disapearing_timeout": 5,
          "dynamic_template": "DynamicBanner",
          "is_disapearing": false,
          "is_dismisible": true,
          "is_dynamic": false,
          "is_visible": false,
          "template_url": ""
        },
        {
          "banner_uri": "banner-cis-xp",
          "dataset_uri": "cis-xp",
          "disapearing_timeout": 5,
          "dynamic_template": "DynamicBanner",
          "is_disapearing": false,
          "is_dismisible": true,
          "is_dynamic": false,
          "is_visible": false,
          "template_url": ""
        }
      ],
      "field": "app_banners",
      "help": "The dataset banners for your ApiViz instance (between navbar and filter)",
      "is_default": true,
      "locale": "fr"
    },
    "app_colors": {
      "_id": "5f6365037727e6c73f6d7d29",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "content": {
        "danger": "#d24745",
        "dark": "#1b1b1b",
        "default_background_app": "#fafafa",
        "default_background_navbar": "#ffffff",
        "info": "#40529d",
        "light": "#40529d",
        "link": "#4b4d58",
        "link-hover": "#FF9300",
        "navbar-border-color": "#3D3A39",
        "primary": "#400",
        "success": "#80C2BD",
        "text-color": "#3D3A39",
        "warning": "#f3bd80"
      },
      "field": "app_colors",
      "help": "Choose a set of colors (an hexa for example) for your ApiViz instance",
      "is_default": true
    },
    "app_search_default_images_sets": {
      "_id": "5f6365037727e6c73f6d7d2c",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "field": "app_search_default_images_sets",
      "help": "The default images sets for the cards for each dataset",
      "images_sets": [
        {
          "dataset_uri": "recherche",
          "images_set": [
            {
              "credits": "Élise Lalique",
              "dft_text": "img_1",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_1.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_2",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_2.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_3",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_3.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_4",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_4.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_5",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_5.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_6",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_6.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_7",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_7.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_8",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_8.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_9",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_9.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_10",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_10.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_11",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_11.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_12",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_12.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_13",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_13.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_14",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_14.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_15",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_15.png?raw=true"
            },
            {
              "credits": "Élise Lalique",
              "dft_text": "img_16",
              "licence": "",
              "src_image": "https://raw.githubusercontent.com/co-demos/cis-data/master/illustrations/textures/medium_fiche_16.png?raw=true"
            }
          ]
        }
      ],
      "is_default": true
    }
  },
  'footer' : {
    "app_footer": {
      "_id": "5f6365057727e6c73f6d7e1c",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "credits_footer_url": "https://raw.githubusercontent.com/co-demos/carto-sonum/master/pages-html/footer-mednum.html",
      "dynamic_template": "DynamicFooter",
      "field": "app_footer",
      "has_credits_footer": false,
      "help": "The default footer for your ApiViz instance",
      "is_default": true,
      "is_dynamic": true,
      "links_options": [
        {
          "block_class": "is-3",
          "has_socials": false,
          "is_visible": false,
          "links": [],
          "position": "block_top_left",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": ""
            }
          ],
          "title_visible": true
        },
        {
          "block_class": "is-3",
          "has_socials": false,
          "is_visible": true,
          "links": [
            {
              "icon_class": "",
              "is_external_link": true,
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "CQuest's API for companies"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "API de CQuest pour les compagnies"
                }
              ],
              "link_to": "http://api.cquest.org/company/433842044",
              "link_type": "text",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "Login"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "Login"
                }
              ]
            }
          ],
          "position": "block_top_center_left",
          "title_block": [
            {
              "locale": "en",
              "text": "Open corporate facts"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "Open corporate facts"
            }
          ],
          "title_visible": true
        },
        {
          "has_socials": false,
          "is_visible": false,
          "links": [],
          "position": "block_top_center_right",
          "title_block": [
            {
              "locale": "en",
              "text": "Digital society"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "Société numérique"
            }
          ],
          "title_visible": true
        },
        {
          "block_class": "is-3",
          "has_socials": true,
          "is_visible": true,
          "links": [
            {
              "icon_class": "",
              "is_external_link": true,
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "Open Parliement"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "Parlement Ouvert"
                }
              ],
              "link_to": "https://parlement-ouvert.fr/fr/",
              "link_type": "text",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "See the source code"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "Voir le code"
                }
              ]
            }
          ],
          "position": "block_top_right",
          "title_block": [
            {
              "locale": "en",
              "text": "Participate"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "Participer"
            }
          ],
          "title_visible": true
        }
      ],
      "template_url": null,
      "ui_options": {
        "card_class": {
          "default": "",
          "value": ""
        },
        "card_color": {
          "default": "light",
          "value": "default_background_app"
        },
        "footer_logos": [
          {
            "has_link": false,
            "link_to": "/",
            "position": "block_top_left",
            "src_image": "https://github.com/co-demos/carto-sonum/blob/master/logos/bloc-web-le-maire-darmanin.png?raw=true"
          }
        ],
        "socials_class": {
          "default": "",
          "value": ""
        },
        "socials_color": {
          "default": "primary",
          "value": "primary"
        },
        "text_color": {
          "default": "black",
          "value": "grey-dark"
        },
        "title_color": {
          "custom_color": null,
          "default": "white",
          "value": "primary"
        }
      }
    }
  },
  'navbar' : {
    "app_navbar": {
      "_id": "5f6364ff7727e6c73f6d7bed",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "content": "TL navbar",
      "field": "app_navbar",
      "has_login": false,
      "help": "The navbar of your ApiViz instance",
      "is_default": true,
      "links_options": {
        "extra_buttons": [
          {
            "dropdowns": [],
            "has_dropdown": false,
            "help": "First menu in navbar",
            "icon_class": "",
            "is_external_link": false,
            "is_visible": true,
            "link_text": [
              {
                "locale": "en",
                "text": "Search"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Recherche"
              }
            ],
            "link_to": "/recherche",
            "link_type": "link",
            "position": "exterior_right",
            "tooltip": [
              {
                "locale": "en",
                "text": "Begin a search"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Lancer une recherche"
              }
            ]
          },
          {
            "dropdowns": [
              {
                "is_divider": false,
                "is_external_link": false,
                "link_text": [
                  {
                    "locale": "en",
                    "text": "The project"
                  },
                  {
                    "locale": "es",
                    "text": "pendiente"
                  },
                  {
                    "locale": "tr",
                    "text": "yapılmamış"
                  },
                  {
                    "locale": "de",
                    "text": "ungemacht"
                  },
                  {
                    "locale": "fr",
                    "text": "Le projet"
                  }
                ],
                "link_to": "/le-projet"
              },
              {
                "is_divider": false,
                "is_external_link": false,
                "link_text": [
                  {
                    "locale": "en",
                    "text": "Our tools"
                  },
                  {
                    "locale": "es",
                    "text": "pendiente"
                  },
                  {
                    "locale": "tr",
                    "text": "yapılmamış"
                  },
                  {
                    "locale": "de",
                    "text": "ungemacht"
                  },
                  {
                    "locale": "fr",
                    "text": "Les outils"
                  }
                ],
                "link_to": "/le-projet/outils"
              }
            ],
            "has_dropdown": true,
            "help": "Second menu in navbar",
            "icon_class": "",
            "is_external_link": false,
            "is_visible": true,
            "link_text": [
              {
                "locale": "en",
                "text": "Project"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Projet"
              }
            ],
            "link_to": "/le-projet",
            "link_type": "link",
            "position": "exterior_right",
            "tooltip": [
              {
                "locale": "en",
                "text": "More infos on the topic"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Plus d’informations sur ce site"
              }
            ]
          }
        ]
      },
      "logo_to": "/",
      "ui_options": {
        "background_color": {
          "bulma_color": "white"
        },
        "background_isdark": false
      }
    }
  },
  'routes' : [
    {
      "_id": "5f6f7d0447e6fcead00b7a3b",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-cis-carto"
      },
      "comment": "Main home route in french",
      "dataset_uri": "recherche",
      "dynamic_template": "DynamicStatic",
      "ext_script_urls": [],
      "field": "app_home_fr",
      "has_ext_script": false,
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "you can specify a remote template (f.e. a github url)",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": true,
      "languages": [
        "fr"
      ],
      "link_in_logo": true,
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search for a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "position": "middle_left",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "route_activated": true,
      "route_description": "apiviz default home page",
      "route_title": "Home",
      "tabs": {
        "activated": false
      },
      "tabs_uri": "",
      "template_urls": [
        {
          "locale": "fr",
          "url": "https://raw.githubusercontent.com/co-demos/OCF-website/master/pages-html/home.html"
        },
        {
          "locale": "en",
          "url": "https://raw.githubusercontent.com/co-demos/OCF-website/master/pages-html/home.html"
        }
      ],
      "urls": [
        "/"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a3c",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-TL-carto"
      },
      "comment": "Main search route in french",
      "contents_fields": [
        {
          "custom_title": null,
          "field": "sd_id",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_id"
        },
        {
          "custom_title": null,
          "field": "GEOCOD",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_address"
        },
        {
          "custom_title": null,
          "field": "NOMREG",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_city"
        },
        {
          "custom_title": null,
          "field": "NOM_TL",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_title"
        },
        {
          "custom_title": null,
          "field": "SOURCE",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_src"
        }
      ],
      "dataset_uri": "recherche",
      "deactivate_btn": false,
      "dynamic_template": "DynamicMap",
      "endpoint_type": "map",
      "field": "ocf_carte",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "you can specify a remote template (f.e. a github url)",
      "images_fields": {
        "card_img_main": {
          "default": "img_card",
          "field": "image(s) du projet",
          "is_visible": true
        },
        "card_img_top": {
          "default": null,
          "field": "",
          "is_visible": false
        }
      },
      "in_footer": false,
      "in_main_navbar": true,
      "is_dataset_homepage": true,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "is_visible": true,
      "languages": [
        "fr"
      ],
      "lat_long_fields": {
        "latitude": "lat",
        "longitude": "lon"
      },
      "links_options": {
        "block_contents_links": {
          "is_visible": false,
          "links": [],
          "position": "block_bottom_1",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": ""
            }
          ]
        },
        "block_data_infos": {
          "is_visible": false,
          "links": [],
          "position": "block_bottom_2",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": ""
            }
          ]
        },
        "block_share": {
          "is_visible": false,
          "links": [],
          "position": "block_bottom_3",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": ""
            }
          ]
        }
      },
      "map_options": {
        "attribution": "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
        "center": [
          47.4136568,
          -1.9425507
        ],
        "currentCenter": [
          47.4136568,
          -1.9425507
        ],
        "layers_visibility": {
          "is_activated": true,
          "is_drawer_open": false,
          "layers_switches": [
            {
              "default_visible": true,
              "label": "lieux",
              "layers": [
                "all-points"
              ]
            },
            {
              "default_visible": false,
              "label": "clusters",
              "layers": [
                "cluster-circles",
                "cluster-counts"
              ]
            },
            {
              "default_visible": true,
              "label": "départements",
              "layers": [
                "chorolayer-departements"
              ]
            },
            {
              "default_visible": false,
              "label": "radar",
              "layers": [
                "heatmap-layer"
              ]
            }
          ]
        },
        "mapbox_layers": {
          "all_points_layer": {
            "circle_color": "#004494",
            "circle_opacity": 0.8,
            "circle_stroke_color": "#fff",
            "is_activated": true,
            "is_clickable": true,
            "is_default_visible": true,
            "is_live_data": false,
            "is_source_distant": false,
            "layer_id": "all-points",
            "max_zoom": 14,
            "min_zoom": 4,
            "radius_max": 10,
            "radius_min": 2,
            "refresh_delay": 3000,
            "source_id": "allPointsSource"
          },
          "choropleth_layer": {
            "change_source_by_zoom": true,
            "distant_source_url": "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson",
            "is_activated": true,
            "is_clickable": false,
            "is_drawer_open": true,
            "is_live_data": false,
            "is_source_distant": true,
            "refresh_delay": 3000,
            "sources": [
              {
                "agregated_data_field": "count_dep",
                "fill_color": [
                  "interpolate",
                  [
                    "linear"
                  ],
                  [
                    "get",
                    "count_dep"
                  ],
                  0,
                  "#888888",
                  1,
                  "#EED322",
                  3,
                  "#E6B71E",
                  5,
                  "#DA9C20",
                  10,
                  "#CA8323",
                  20,
                  "#B86B25",
                  35,
                  "#A25626",
                  50,
                  "#8B4225",
                  100,
                  "#723122"
                ],
                "fill_opacity": 0.4,
                "fill_outline_color": "#004494",
                "has_popup": true,
                "is_activated": true,
                "is_default_visible": true,
                "join_polygon_id_to_field": "INSEEDEP",
                "layer_id": "chorolayer-departements",
                "legend": {
                  "position": "bottom-right",
                  "scales": [
                    {
                      "color": "#723122",
                      "value": ">100 lieux"
                    },
                    {
                      "color": "#8B4225",
                      "value": "50 lieux"
                    },
                    {
                      "color": "#A25626",
                      "value": "35 lieux"
                    },
                    {
                      "color": "#B86B25",
                      "value": "20 lieux"
                    },
                    {
                      "color": "#CA8323",
                      "value": "10 lieux"
                    },
                    {
                      "color": "#DA9C20",
                      "value": "5 lieux"
                    },
                    {
                      "color": "#E6B71E",
                      "value": "3 lieux"
                    },
                    {
                      "color": "#EED322",
                      "value": "1 lieu"
                    },
                    {
                      "color": "#888888",
                      "value": "0 lieu"
                    }
                  ],
                  "title": "Tiers-lieux / département"
                },
                "max_zoom": 9,
                "min_zoom": 0,
                "need_aggregation": true,
                "polygon_prop_id": "code",
                "popup_config": {
                  "action": "mousemove",
                  "fields": [
                    {
                      "field": "nom",
                      "position": "field_title",
                      "prefix": null,
                      "suffix": null
                    },
                    {
                      "field": "code",
                      "position": "field_title_post",
                      "prefix": " (",
                      "suffix": ")"
                    },
                    {
                      "field": "count_dep",
                      "position": "field_value",
                      "prefix": "total : ",
                      "suffix": " lieux"
                    }
                  ]
                },
                "source_id": "chorosource-departements",
                "source_url": "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson",
                "update_src_from_previous_layer": false
              },
              {
                "agregated_data_field": "count_com",
                "fill_color": [
                  "interpolate",
                  [
                    "linear"
                  ],
                  [
                    "get",
                    "count_com"
                  ],
                  0,
                  "#888888",
                  1,
                  "#EED322",
                  2,
                  "#DA9C20",
                  5,
                  "#B86B25",
                  7,
                  "#8B4225",
                  10,
                  "#723122"
                ],
                "fill_opacity": 0.5,
                "fill_outline_color": "rgb(256,256,256)",
                "has_popup": true,
                "is_activated": false,
                "is_default_visible": true,
                "join_polygon_id_to_field": "INSEECOM",
                "layer_id": "chorolayer-communes",
                "legend": {
                  "position": "bottom-right",
                  "scales": [
                    {
                      "color": "#723122",
                      "value": ">10 lieux"
                    },
                    {
                      "color": "#8B4225",
                      "value": "7 lieux"
                    },
                    {
                      "color": "#B86B25",
                      "value": "5 lieux"
                    },
                    {
                      "color": "#DA9C20",
                      "value": "2 lieux"
                    },
                    {
                      "color": "#EED322",
                      "value": "1 lieu"
                    },
                    {
                      "color": "#888888",
                      "value": "0 lieu"
                    }
                  ],
                  "title": "Tiers-lieux / communes"
                },
                "max_zoom": 18,
                "min_zoom": 8,
                "need_aggregation": true,
                "polygon_prop_id": "code",
                "popup_config": {
                  "action": "mousemove",
                  "fields": [
                    {
                      "field": "nom",
                      "position": "field_title",
                      "prefix": null,
                      "suffix": null
                    },
                    {
                      "field": "code",
                      "position": "field_title_post",
                      "prefix": " (",
                      "suffix": ")"
                    },
                    {
                      "field": "count_com",
                      "position": "field_value",
                      "prefix": "total : ",
                      "suffix": " lieux"
                    }
                  ]
                },
                "source_id": "chorosource-communes",
                "source_url": "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/communes-avec-outre-mer.geojson",
                "update_src_from_previous_source": true,
                "update_src_options": [
                  {
                    "response_format": "geojson",
                    "slugs_map": [
                      {
                        "value_property": "code",
                        "value_slug_code": "dep_code"
                      }
                    ],
                    "upper_layer_id": "chorolayer-departements",
                    "upper_load_feat": "only_center",
                    "upper_load_method": "zoom",
                    "upper_main_matching_prop": "code",
                    "upper_source_id": "chorosource-departements",
                    "url_base": "https://geo.api.gouv.fr/departements/<dep_code>/communes?geometry=contour&format=geojson&type=commune-actuelle"
                  }
                ]
              }
            ]
          },
          "cluster_circles_layer": {
            "circle_color": "#e5ecf4",
            "circle_color_100": "#b2c6de",
            "circle_color_250": "#668ebe",
            "circle_color_500": "#3269a9",
            "circle_color_750": "#004494",
            "circle_radius": 15,
            "circle_radius_100": 20,
            "circle_radius_250": 25,
            "circle_radius_500": 30,
            "circle_radius_750": 35,
            "circle_stroke_color": "#fff",
            "circle_stroke_width": 1,
            "is_activated": true,
            "is_clickable": true,
            "is_default_visible": false,
            "is_source_distant": false,
            "layer_id": "cluster-circles",
            "source_\nid": "clusterSource"
          },
          "cluster_count_layer": {
            "is_activated": true,
            "is_clickable": true,
            "is_default_visible": false,
            "is_source_distant": false,
            "layer_id": "cluster-counts",
            "source_id": "clusterSource",
            "text_color": "#ffffff",
            "text_size": 11
          },
          "cluster_unclustered_layer": {
            "circle_color": "#fff",
            "circle_radius": 5,
            "circle_stroke_color": "#004494",
            "circle_stroke_width": 5,
            "is_activated": false,
            "is_clickable": true,
            "is_default_visible": true,
            "is_source_distant": false,
            "layer_id": "unclustered-point",
            "source_id": "clusterSource"
          },
          "heatmap_layer": {
            "is_activated": true,
            "is_default_visible": false,
            "layer_id": "heatmap-layer",
            "max_zoom": 18,
            "prop_weight": "weight",
            "radius_max": 25,
            "radius_min": 6,
            "source": "all-points",
            "source_id": "allPointsSource"
          }
        },
        "maxZoom": 18,
        "minZoom": 2,
        "pinIconSize": {
          "highlighted": [
            46,
            46
          ],
          "normal": [
            29,
            29
          ]
        },
        "pinIconUrl": "/static/icons/icon_pin_plein_violet.svg",
        "subdomains": "abcd",
        "url": "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        "useMarkerCluster": true,
        "zoom": 8
      },
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search for a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "only_in_navbar_for_this_dataset": false,
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "route_activated": true,
      "route_description": "Page de recherche d'Apiviz",
      "route_title": "Rechercher",
      "tabs_uri": "cis-tabs",
      "template_urls": [],
      "ui_options": {
        "card_color": {
          "default": "white",
          "value": null
        },
        "link_to_detail": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document"
            }
          ]
        },
        "link_to_next": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the next document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le prochain document"
            }
          ]
        },
        "link_to_previous": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the previous document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document précédent"
            }
          ]
        },
        "text_color": {
          "default": "black",
          "value": null
        }
      },
      "urls": [
        "/recherche/carte"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a3d",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-TL-carto"
      },
      "comment": "Table search route in french",
      "contents_fields": [
        {
          "field": "id",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_id_field": true,
          "is_visible": false,
          "position": "col_id"
        },
        {
          "field": "Name",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": 50,
            "type": "object"
          },
          "has_link_to_detail": true,
          "is_sortable": false,
          "is_table_head": true,
          "is_visible": true,
          "position": "col_1"
        },
        {
          "field": "CompanyNumber",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_sortable": false,
          "is_visible": true,
          "position": "col_2"
        }
      ],
      "dataset_uri": "recherche",
      "deactivate_btn": false,
      "dynamic_template": "DynamicTable",
      "endpoint_type": "table",
      "field": "ocf_table",
      "has_footer": true,
      "has_navbar": true,
      "has_shuffle": false,
      "has_tabs": false,
      "help": "you can specify a remote template (f.e. a github url)",
      "images_fields": {
        "card_img_main": {
          "default": "img_card",
          "field": "",
          "is_visible": true
        },
        "card_img_top": {
          "default": null,
          "field": "",
          "is_visible": false
        }
      },
      "in_footer": false,
      "in_main_navbar": false,
      "is_dataset_homepage": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "is_visible": true,
      "languages": [
        "fr"
      ],
      "links_options": {},
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search for a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "only_in_navbar_for_this_dataset": true,
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "pagination": {
        "feedback": "bottom",
        "is_visible": true,
        "position": "top_and_bottom"
      },
      "route_activated": true,
      "route_description": "Page de recherche de OCF",
      "route_title": "Rechercher",
      "shuffle_minnmax": {
        "max": 2000,
        "min": 0
      },
      "table_options": {
        "has_link_col": true
      },
      "tabs_uri": "TL-tabs",
      "template_urls": [],
      "ui_options": {
        "card_color": {
          "default": "white",
          "value": null
        },
        "link_to_detail": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document"
            }
          ]
        },
        "link_to_next": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the next document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le prochain document"
            }
          ]
        },
        "link_to_previous": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the previous document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document précédent"
            }
          ]
        },
        "text_color": {
          "default": "black",
          "value": null
        }
      },
      "urls": [
        "/recherche",
        "/recherche/table"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a3e",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-TL-carto"
      },
      "comment": "Main search route in french",
      "contents_fields": [
        {
          "field": "sd_id",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "position": "block_id"
        },
        {
          "field": "Name",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": 50,
            "type": "object"
          },
          "is_visible": true,
          "position": "block_title"
        },
        {
          "field": "CompanyNumber",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": 15,
            "type": "object"
          },
          "is_visible": false,
          "position": "block_src"
        }
      ],
      "dataset_uri": "recherche",
      "deactivate_btn": false,
      "dynamic_template": "DynamicList",
      "endpoint_type": "list",
      "field": "ocf_liste",
      "has_footer": true,
      "has_navbar": true,
      "has_shuffle": false,
      "has_tabs": false,
      "help": "you can specify a remote template (f.e. a github url)",
      "images_fields": {
        "card_img_main": {
          "default": "img_card",
          "field": "",
          "is_visible": true
        },
        "card_img_top": {
          "default": null,
          "field": "",
          "is_visible": false
        }
      },
      "in_footer": false,
      "in_main_navbar": false,
      "is_dataset_homepage": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "is_visible": true,
      "languages": [
        "fr"
      ],
      "links_options": {
        "block_contents_links": {
          "is_visible": false,
          "links": [],
          "position": "block_bottom_1",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": ""
            }
          ]
        },
        "block_data_infos": {
          "is_visible": false,
          "links": [],
          "position": "block_bottom_2",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": ""
            }
          ]
        },
        "block_share": {
          "is_visible": false,
          "links": [],
          "position": "block_bottom_3",
          "title_block": [
            {
              "locale": "en",
              "text": "share this place"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": "Partagez ce lieu"
            }
          ]
        }
      },
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search for a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "only_in_navbar_for_this_dataset": true,
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "pagination": {
        "feedback": "top_and_bottom",
        "is_visible": true,
        "position": "top_and_bottom"
      },
      "route_activated": false,
      "route_description": "Page de recherche OCF list",
      "route_title": "Rechercher",
      "shuffle_minnmax": {
        "max": 4000,
        "min": 0
      },
      "tabs_uri": "cis-tabs",
      "template_urls": [],
      "ui_options": {
        "card_color": {
          "default": "white",
          "value": null
        },
        "link_to_detail": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemac\nht"
            },
            {
              "locale": "fr",
              "text": "voir le document"
            }
          ]
        },
        "link_to_next": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the next document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le prochain document"
            }
          ]
        },
        "link_to_previous": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the previous document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document précédent"
            }
          ]
        },
        "text_color": {
          "default": "black",
          "value": null
        }
      },
      "urls": [
        "/recherche/liste"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a3f",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-sonum-carto"
      },
      "comment": "Main search route in french",
      "contents_fields": [
        {
          "custom_title": null,
          "field": "Name",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_title"
        }
      ],
      "dataset_uri": "recherche",
      "deactivate_btn": false,
      "dynamic_template": "DynamicDetail",
      "endpoint_type": "detail",
      "field": "ocf_detail",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "you can specify a remote template (f.e. a github url)",
      "images_fields": {
        "card_img_main": {
          "default": "img_card",
          "field": "",
          "is_visible": true,
          "position": "block_right_top_1"
        },
        "card_img_top": {
          "default": null,
          "field": "",
          "is_visible": false,
          "position": "block_right_middle"
        }
      },
      "in_footer": false,
      "in_main_navbar": false,
      "is_dataset_homepage": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "is_visible": true,
      "languages": [
        "fr"
      ],
      "links_options": {
        "block_contents_links": {
          "is_visible": true,
          "links": [
            {
              "field": "website",
              "icon_class": "",
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "website"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "website"
                }
              ],
              "link_type": "text",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "check the website"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "voir le site"
                }
              ]
            },
            {
              "field": "contact",
              "icon_class": "",
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "contact"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "contact"
                }
              ],
              "link_type": "text",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "contact the structure"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "contacter la structure"
                }
              ]
            }
          ],
          "position": "block_left_middle_2",
          "title_block": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": false,
              "locale": "fr",
              "text": ""
            }
          ]
        },
        "block_share": {
          "is_visible": true,
          "links": [
            {
              "icon_class": "fas fa-link",
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "link"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "lien"
                }
              ],
              "link_type": "icon",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "share this page"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "partager cette page (copier le lien)"
                }
              ]
            },
            {
              "icon_class": "fab fa-facebook-f",
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "facebook"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "facebook"
                }
              ],
              "link_type": "icon",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "share on facebook"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "partager sur facebook"
                }
              ]
            },
            {
              "icon_class": "fab fa-twitter",
              "is_visible": true,
              "link_text": [
                {
                  "locale": "en",
                  "text": "twitter"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "twitter"
                }
              ],
              "link_type": "icon",
              "tooltip": [
                {
                  "locale": "en",
                  "text": "share on twitter"
                },
                {
                  "locale": "es",
                  "text": "pendiente"
                },
                {
                  "locale": "tr",
                  "text": "yapılmamış"
                },
                {
                  "locale": "de",
                  "text": "ungemacht"
                },
                {
                  "locale": "fr",
                  "text": "partager sur twitter"
                }
              ]
            }
          ],
          "position": "block_left_bottom_2",
          "title_block": [
            {
              "locale": "en",
              "text": "Share this place"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "is_visible": true,
              "locale": "fr",
              "text": "Partagez ce lieu"
            }
          ]
        }
      },
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search for a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "only_in_navbar_for_this_dataset": true,
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "route_activated": true,
      "route_description": "Page de recherche d'Apiviz",
      "route_title": "Rechercher",
      "tabs_uri": "cis-tabs",
      "template_urls": [],
      "ui_options": {
        "card_color": {
          "default": "white",
          "value": null
        },
        "link_to_detail": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document"
            }
          ]
        },
        "link_to_next": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the next document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le prochain document"
            }
          ]
        },
        "link_to_previous": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the previous document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document précédent"
            }
          ]
        },
        "text_color": {
          "default": "black",
          "value": null
        }
      },
      "urls": [
        "/recherche/detail"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a40",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-apcis-carto"
      },
      "charts_list": [
        {
          "chart_options": {
            "chart": {
              "stacked": true,
              "toolbar": {
                "show": true
              }
            },
            "fill": {
              "opacity": 1
            },
            "legend": {
              "horizontalAlign": "left",
              "offsetX": 40,
              "position": "top"
            },
            "plotOptions": {
              "bar": {
                "horizontal": true
              }
            },
            "stroke": {
              "colors": [
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff"
              ],
              "width": 1
            },
            "theme": {
              "palette": "palette8"
            },
            "title": {
              "text": "Typologies / Régions"
            },
            "tooltip": {
              "y": {}
            },
            "xaxis": {
              "labels": {}
            },
            "yaxis": {
              "title": {}
            }
          },
          "chart_texts": {
            "inner_col_size": 3,
            "is_activated": true,
            "placement": "left",
            "text_content_a": [
              {
                "locale": "en",
                "text": "Text test h-chart"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Test texte h-chart"
              }
            ],
            "text_title": [
              {
                "locale": "en",
                "text": "Title h-chart"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Titre h-chart"
              }
            ]
          },
          "chart_type": "bar",
          "col_size": 12,
          "data_mapping": {
            "serie_chart_options": [],
            "serie_data": {
              "add_missing_values": false,
              "data_value": "count",
              "label_field": "tag_name",
              "labels_mapping": {
                "chart_options_label_path": "xaxis/categories",
                "labels_dict": {
                  "ART": "arts",
                  "COM": "communication",
                  "CON": "consommation",
                  "DEM": "démocratie",
                  "EDU": "éducation",
                  "EMP": "emploi",
                  "ENV": "environnement",
                  "FIN": "finance",
                  "GOU": "gouvernance",
                  "NUM": "numérique",
                  "None": "( non renseigné )",
                  "PAT": "patrimoine",
                  "SAN": "santé",
                  "SOL": "solidarité",
                  "SPO": "sport",
                  "TER": "territoires",
                  "TOU": "tourisme"
                }
              },
              "missing_data_by": {
                "val_fields_list": [
                  "EDU",
                  "EMP",
                  "ENV",
                  "SAN",
                  "SOL",
                  "TER",
                  "ART",
                  "COM",
                  "CON",
                  "DEM",
                  "GOU",
                  "NUM",
                  "SPO",
                  "TOU",
                  "FIN",
                  "PAT"
                ]
              },
              "need_labels_remap": false,
              "need_labels_rename": false,
              "need_list_only": false,
              "need_remap": true,
              "need_sorting": true,
              "sorting_by": {
                "sort_field": "tag_name"
              },
              "subpath": "subcounts"
            },
            "serie_name_field": "_id",
            "serie_path": "results/data"
          },
          "height": "400px",
          "help": "bar horiz + stacked example",
          "is_activated": true,
          "position": 1,
          "serie_id": "tl-stat-bar-horiz",
          "width": "100%"
        },
        {
          "chart_options": {
            "chart": {
              "toolbar": {
                "show": true
              }
            },
            "responsive": [
              {
                "breakpoint": 480,
                "options": {
                  "chart": {
                    "width": 200
                  },
                  "legend": {
                    "position": "bottom"
                  }
                }
              }
            ],
            "theme": {
              "palette": "palette8"
            },
            "title": {
              "text": "Typologies\n (%)"
            }
          },
          "chart_texts": {
            "inner_col_size": 5,
            "is_activated": true,
            "placement": "right",
            "text_content_a": [
              {
                "locale": "en",
                "text": "Text test donut"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Test texte donut"
              }
            ],
            "text_title": [
              {
                "locale": "en",
                "text": "Title donut"
              },
              {
                "locale": "es",
                "text": "pendiente"
              },
              {
                "locale": "tr",
                "text": "yapılmamış"
              },
              {
                "locale": "de",
                "text": "ungemacht"
              },
              {
                "locale": "fr",
                "text": "Titre donut"
              }
            ]
          },
          "chart_type": "donut",
          "col_size": 12,
          "data_mapping": {
            "serie_chart_options": [
              {
                "build_list_from": "_id",
                "options_field_path": "labels",
                "step": "before_list"
              }
            ],
            "serie_data": {
              "add_missing_values": false,
              "data_value": "count",
              "label_field": null,
              "missing_data_by": {},
              "need_list_only": true,
              "need_remap": false,
              "need_sorting": false,
              "sorting_by": {
                "sort_field": "_id"
              },
              "subpath": null
            },
            "serie_name_field": "_id",
            "serie_path": "results/data"
          },
          "height": "250px",
          "is_activated": true,
          "position": 0,
          "serie_id": "tl-stat-donut",
          "width": "100%"
        }
      ],
      "comment": "Main search route in french",
      "contents_fields": [
        {
          "field": "sd_id",
          "field_format": {
            "retrieve": [
              0
            ],
            "trim": null,
            "type": "object"
          },
          "is_visible": true,
          "locale": "fr",
          "position": "block_id"
        }
      ],
      "dataset_uri": "recherche",
      "deactivate_btn": false,
      "dynamic_template": "DynamicStats",
      "endpoint_type": "stat",
      "field": "ocf_stats",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "helper stats...",
      "images_fields": {
        "card_img_main": {
          "default": "img_card",
          "field": "",
          "is_visible": true
        },
        "card_img_top": {
          "default": null,
          "field": "",
          "is_visible": false
        }
      },
      "in_footer": false,
      "in_main_navbar": false,
      "is_dataset_homepage": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "is_visible": true,
      "languages": [
        "fr"
      ],
      "links_options": {},
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "only_in_navbar_for_this_dataset": true,
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "route_activated": true,
      "route_description": "Page de recherche stats LM d'Apiviz",
      "route_title": "Rechercher stats",
      "tabs_uri": null,
      "template_urls": [],
      "ui_options": {
        "card_color": {
          "default": "white",
          "value": null
        },
        "link_to_detail": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document"
            }
          ]
        },
        "link_to_next": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the next document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir prochain document"
            }
          ]
        },
        "link_to_previous": {
          "is_visible": true,
          "tooltip": [
            {
              "locale": "en",
              "text": "see the previous document"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir le document précédent"
            }
          ]
        },
        "text_color": {
          "default": "black",
          "value": null
        }
      },
      "urls": [
        "/recherche/stats"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a41",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": "banner-sonum-carto"
      },
      "comment": "Main project route in french",
      "dataset_uri": "project-cis",
      "dynamic_template": "DynamicStatic",
      "ext_script_urls": [
        {
          "at_mount": true,
          "script_id": "js-car",
          "type": null,
          "url": "https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.4/dist/js/bulma-carousel.min.js"
        },
        {
          "at_mount": false,
          "script_id": "js-project",
          "type": null,
          "url": "https://cdn.jsdelivr.net/gh/co-demos/apiviz-website-demo/scripts/le-projet.js"
        }
      ],
      "field": "ocf_project",
      "has_ext_script": true,
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": true,
      "help": "you can specify a remote template (f.e. a github url)",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": true,
      "languages": [
        "fr"
      ],
      "link_in_logo": true,
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "Search for a place"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Recherher un lieu"
          }
        ],
        "link_type": "link",
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "Search"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": "Rechercher"
          }
        ]
      },
      "route_activated": true,
      "route_description": "apiviz default home page",
      "route_title": "Home",
      "tabs_uri": "tabs-tl-test",
      "template_urls": [
        {
          "locale": "fr",
          "url": "https://raw.githubusercontent.com/co-demos/apiviz-website-demo/master/pages-html/le-projet.html"
        },
        {
          "locale": "en",
          "url": "https://raw.githubusercontent.com/co-demos/apiviz-website-demo/master/pages-html/le-projet.html"
        }
      ],
      "urls": [
        "/le-projet"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a42",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": ""
      },
      "comment": "Main apiviz tools route in french",
      "dynamic_template": "DynamicStatic",
      "ext_script_urls": "",
      "field": "ocf_tools",
      "has_ext_script": false,
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": true,
      "help": "you can specify a remote template (f.e. a github url)",
      "in_footer": true,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": true,
      "languages": [
        "fr"
      ],
      "link_in_logo": false,
      "navbar_btn_options": {
        "icon_class": "",
        "link_text": [
          {
            "locale": "en",
            "text": "todo"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": ""
          }
        ],
        "link_type": "link",
        "position": "middle_right",
        "tooltip": [
          {
            "locale": "en",
            "text": "todo"
          },
          {
            "locale": "es",
            "text": "pendiente"
          },
          {
            "locale": "tr",
            "text": "yapılmamış"
          },
          {
            "locale": "de",
            "text": "ungemacht"
          },
          {
            "locale": "fr",
            "text": ""
          }
        ]
      },
      "route_activated": true,
      "route_description": "apiviz default tools page",
      "route_title": "Outils",
      "tabs_uri": "tabs-tl-test",
      "template_urls": [
        {
          "locale": "fr",
          "url": "https://raw.githubusercontent.com/co-demos/apiviz-website-demo/master/pages-html/les-outils.html"
        },
        {
          "locale": "en",
          "url": "https://raw.githubusercontent.com/co-demos/apiviz-website-demo/master/pages-html/les-outils-en.html"
        }
      ],
      "urls": [
        "/le-projet/outils"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a43",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": ""
      },
      "comment": "Main login route ",
      "dynamic_template": "Login",
      "field": "app_login",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "default login page for Apiviz",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "languages": [
        "fr"
      ],
      "link_in_logo": false,
      "navbar_btn_options": {},
      "route_activated": true,
      "route_description": "apiviz default login page",
      "route_title": "Login",
      "tabs_uri": "tabs-cis-default",
      "template_urls": [],
      "urls": [
        "/login"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a44",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": ""
      },
      "comment": "Main register route ",
      "dynamic_template": "Register",
      "field": "app_register",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "default register page for Apiviz",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "languages": [
        "fr"
      ],
      "link_in_logo": false,
      "navbar_btn_options": {},
      "route_activated": true,
      "route_description": "apiviz default register page",
      "route_title": "Register",
      "tabs_uri": "tabs-cis-default",
      "template_urls": [],
      "urls": [
        "/register"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a45",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": ""
      },
      "comment": "Main logout route ",
      "dynamic_template": "Logout",
      "field": "app_logout",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "default logout page for Apiviz",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "languages": [
        "fr"
      ],
      "link_in_logo": false,
      "navbar_btn_options": {},
      "route_activated": true,
      "route_description": "apiviz default logout page",
      "route_title": "logout",
      "tabs_uri": "tabs-cis-default",
      "template_urls": [],
      "urls": [
        "/logout"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a46",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": ""
      },
      "comment": "Main\n backoffice route ",
      "dynamic_template": "BackOffice",
      "field": "app_backoffice",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "default backoffice page for Apiviz",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "languages": [
        "fr"
      ],
      "link_in_logo": false,
      "navbar_btn_options": {},
      "route_activated": true,
      "route_description": "apiviz default backoffice page",
      "route_title": "backoffice",
      "tabs_uri": "tabs-cis-default",
      "template_urls": [],
      "urls": [
        "/backoffice"
      ]
    },
    {
      "_id": "5f6f7d0447e6fcead00b7a47",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "banner": {
        "activated": false,
        "banner_uri": ""
      },
      "comment": "Main user preferences route",
      "dynamic_template": "Preferences",
      "field": "app_preferences",
      "has_footer": true,
      "has_navbar": true,
      "has_tabs": false,
      "help": "default preferences page for Apiviz",
      "in_footer": false,
      "in_main_navbar": false,
      "is_default": true,
      "is_dynamic": true,
      "is_global_app_homepage": false,
      "languages": [
        "fr"
      ],
      "link_in_logo": false,
      "navbar_btn_options": {},
      "route_activated": true,
      "route_description": "apiviz default user preferences page",
      "route_title": "preferences",
      "tabs_uri": "tabs-cis-default",
      "template_urls": [],
      "urls": [
        "/preferences"
      ]
    }
  ],
  'tabs' : [
    {
      "_id": "5f6f7cfe47e6fcead00b7833",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "content": "apiviz tabs test",
      "field": "app_tabs_test",
      "help": "The tabs of your ApiViz instance",
      "is_default": true,
      "tabs_options": [
        {
          "has_icon": false,
          "icon_class": "",
          "is_activated": true,
          "is_visible": true,
          "link_text": [
            {
              "locale": "en",
              "text": "The project"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "Le projet"
            }
          ],
          "link_to": "/le-projet",
          "tab_code": "tab-1",
          "tooltip": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir la carte"
            }
          ]
        },
        {
          "has_icon": false,
          "icon_class": "",
          "is_activated": true,
          "is_visible": true,
          "link_text": [
            {
              "locale": "en",
              "text": "Our tools"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "Les outils techniques"
            }
          ],
          "link_to": "/le-projet/outils",
          "tab_code": "tab-2",
          "tooltip": [
            {
              "locale": "en",
              "text": "todo"
            },
            {
              "locale": "es",
              "text": "pendiente"
            },
            {
              "locale": "tr",
              "text": "yapılmamış"
            },
            {
              "locale": "de",
              "text": "ungemacht"
            },
            {
              "locale": "fr",
              "text": "voir les outils"
            }
          ]
        }
      ],
      "tabs_uri": "tabs-tl-test",
      "ui_options": {
        "background_color": {
          "value": "white"
        },
        "bottom_margin": {
          "value": 1
        },
        "class": {
          "value": "tabs"
        },
        "position": {
          "value": "is-centered"
        },
        "size": {
          "value": "is-small"
        },
        "top_margin": {
          "value": 2
        }
      }
    }
  ],
  'endpoints' : [
    {
      "_id": "5f6f7d0147e6fcead00b7920",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [],
      "auth_activated": true,
      "content": "apiviz default API endpoint for user authentication (root urls)",
      "data_type": "user",
      "endpoint_type": "auth_root",
      "field": "app_data_API_root_auth",
      "help": "define the endpoints for authentication",
      "is_default": true,
      "method": "GET",
      "request_header_auth_options": [
        {
          "app_var_name": null,
          "header_field": "Accept",
          "header_value": "application/json",
          "header_value_prefix": null,
          "is_var": false
        }
      ],
      "root_url": {
        "default": "http://localhost:4100/api",
        "default_docker": "http://host.docker.internal:4100/api",
        "distant_preprod": "https://preprod.toktok-auth.com/api",
        "distant_prod": "https://toktok-auth.com/api",
        "server": "http://localhost:4100/api",
        "server_docker": "http://host.docker.internal:4100/api"
      }
    },
    {
      "_id": "5f6f7d0147e6fcead00b7921",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for user authentication (confirm acces)",
      "data_type": "user",
      "endpoint_type": "confirm_jwt",
      "field": "app_data_API_user_auth",
      "help": "define the endpoint for a JWT check",
      "is_default": true,
      "method": "GET",
      "resp_fields": {
        "access_token": {
          "path": "tokens/access_token"
        },
        "msg": {
          "path": "msg"
        },
        "refresh_token": {
          "path": "tokens/refresh_token"
        },
        "user_email": {
          "path": "data/infos/email"
        },
        "user_id": {
          "path": "data/_id"
        },
        "user_name": {
          "path": "data/infos/name"
        },
        "user_pseudo": {
          "path": "data/infos/pseudo"
        },
        "user_role": {
          "path": "data/auth/role"
        },
        "user_surname": {
          "path": "data/infos/surname"
        }
      },
      "roles": {
        "admin": {
          "help": "can access all backoffice (lox level access)",
          "resp_role": "admin"
        },
        "anonymous": {
          "help": "logged as anonymous",
          "resp_role": "anonymous"
        },
        "guest": {
          "help": "logged but not registred",
          "resp_role": "guest"
        },
        "registred": {
          "help": "registred user",
          "resp_role": "registred"
        },
        "staff": {
          "help": "can access backoffice (high level access)",
          "resp_role": "staff"
        }
      },
      "root_url": "/auth/tokens/confirm_access"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7922",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for user authentication (new acces token) : needs a valid refresh token as token ",
      "data_type": "user",
      "endpoint_type": "new_access_token",
      "field": "app_data_API_user_new_access_token",
      "help": "define the endpoint for a new access JWT ",
      "is_default": true,
      "method": "GET",
      "resp_fields": {},
      "root_url": "/auth/tokens/new_access_token"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7923",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "name",
          "arg": "name",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "surname",
          "arg": "surname",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "email",
          "arg": "email",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "password",
          "arg": "pwd",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "agreement",
          "arg": "agreement",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "locale",
          "arg": "lang",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "u_data",
          "arg": "u_data",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for registering a new user",
      "data_type": "user",
      "endpoint_type": "register",
      "field": "app_data_API_user_register",
      "help": "define the endpoint for registering a new user",
      "is_default": true,
      "method": "POST",
      "needs_form": true,
      "resp_fields": {},
      "root_url": "/usr/register"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7924",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "email",
          "arg": "email",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "password",
          "arg": "pwd",
          "default": "",
          "in": [
            "payload"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for login",
      "data_type": "user",
      "endpoint_type": "login",
      "field": "app_data_API_user_login",
      "help": "define the endpoint for login an user",
      "is_default": true,
      "method": "POST",
      "needs_form": true,
      "resp_fields": {},
      "root_url": "/auth/login"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7925",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "pageUser",
          "arg": "page",
          "default": 1,
          "in": [
            "url"
          ],
          "optional": true,
          "type": "int"
        },
        {
          "app_arg": "perPageUser",
          "arg": "per_page",
          "default": 50,
          "in": [
            "url"
          ],
          "optional": true,
          "type": "int"
        }
      ],
      "content": "apiviz default API endpoint for users list",
      "data_type": "user",
      "endpoint_type": "user_modif",
      "field": "app_data_API_user_list",
      "help": "define the endpoint to get data for : an user ",
      "is_default": true,
      "method": "GET",
      "resp_fields": {},
      "root_url": "/usr/infos/list"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7926",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "userID",
          "arg": "doc_id",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for user infos",
      "data_type": "user",
      "endpoint_type": "user_modif",
      "field": "app_data_API_user_infos",
      "help": "define the endpoint to get data for : an user ",
      "is_default": true,
      "method": "GET",
      "resp_fields": {},
      "root_url": "/usr/infos/get_one"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7927",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "userID",
          "arg": "doc_id",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for editing an user",
      "data_type": "user",
      "endpoint_type": "user_modif",
      "field": "app_data_API_user_edit",
      "help": "define the endpoint to get data for : an user ",
      "is_default": true,
      "method": "PUT",
      "needs_form": true,
      "resp_fields": {},
      "root_url": "/auth/edit/"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7928",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "userID",
          "arg": "doc_id",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for deleting an user",
      "data_type": "user",
      "endpoint_type": "user_modif",
      "field": "app_data_API_user_delete",
      "help": "define the endpoint to get data for : an user ",
      "is_default": true,
      "method": "DELETE",
      "resp_fields": {},
      "root_url": "/auth/edit/"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7929",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "authToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for changing password",
      "data_type": "user",
      "endpoint_type": "user_modif",
      "field": "app_data_API_forgot_pwd",
      "help": "define the endpoint to get data for : an user ",
      "is_default": true,
      "method": "GET",
      "needs_form": true,
      "resp_fields": {},
      "root_url": "/auth/password/password_forgotten"
    },
    {
      "_id": "5f6f7d0147e6fcead00b792a",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "dataToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": true,
          "type": "str"
        },
        {
          "app_arg": "filtersList",
          "arg": "get_filters",
          "default": true,
          "in": [
            "url"
          ],
          "optional": false,
          "type": "bool"
        },
        {
          "app_arg": "filterChoices",
          "arg": "get_uniques",
          "default": "tag",
          "in": [
            "url"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "available_views": [
        "VIEW_LIST",
        "VIEW_MAP"
      ],
      "content": "apiviz default API endpoint for navbar filters",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "filters",
      "field": "ocf_data_API_filters",
      "filter_options": [],
      "has_export": true,
      "has_infinite_scroll": true,
      "has_order_by": false,
      "has_pagination": false,
      "has_shuffle": false,
      "help": "define the endpoint to get data for : filters in search navbar",
      "is_default": true,
      "is_disabled": false,
      "is_visible": true,
      "items_found": [
        {
          "locale": "en",
          "text": "companies found"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "sociétés trouvées"
        }
      ],
      "method": "GET",
      "order_by_options": {
        "order_by_list": []
      },
      "pagination_options": {
        "per_page": [
          30,
          50,
          100
        ]
      },
      "placeholder": [
        {
          "locale": "en",
          "text": "Enter the name of a society"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "Tapez le nom d'une société"
        }
      ],
      "reset": [
        {
          "locale": "en",
          "text": "reset"
        },
        {
          "locale": "es",
          "text": "pendiente"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "effacer"
        }
      ],
      "root_url": "https://solidata-api.co-demos.com/api/dsi/infos/get_one/5d5fca92328ed71684ce1785",
      "stats_text": [
        {
          "locale": "en",
          "text": "experimental"
        },
        {
          "locale": "es",
          "text": "experimental"
        },
        {
          "locale": "tr",
          "text": "yapılmamış"
        },
        {
          "locale": "de",
          "text": "ungemacht"
        },
        {
          "locale": "fr",
          "text": "expérimental"
        }
      ]
    },
    {
      "_id": "5f6f7d0147e6fcead00b792b",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "page",
          "arg": "page",
          "default": 1,
          "in": [
            "url"
          ],
          "optional": true,
          "type": "int"
        },
        {
          "app_arg": "perPage",
          "arg": "per_page",
          "authorized": [
            30
          ],
          "default": 30,
          "in": [
            "url"
          ],
          "optional": true,
          "type": "int"
        },
        {
          "app_arg": "query",
          "arg": "probe",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for list results",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "table",
      "field": "ocf_data_API_table",
      "has_resp_callbacks": true,
      "help": "define the endpoint to get data for : a view list",
      "is_default": true,
      "is_disabled": false,
      "is_visible": true,
      "method": "GET",
      "request_header_options": [
        {
          "app_var_name": null,
          "header_field": "Accept",
          "header_value": "application/ld+json",
          "header_value_prefix": null,
          "is_var": false
        }
      ],
      "resp_callbacks": [
        {
          "root_sufix": [
            {
              "default": null,
              "in": [
                "url"
              ],
              "optional": false,
              "resp_field_id": "CompanyNumber",
              "type": "str"
            }
          ],
          "root_url": "http://api.cquest.org/apicompany/"
        }
      ],
      "resp_fields": {
        "projects": {
          "path": "hydra:member",
          "resp_format": "list"
        },
        "total": {
          "path": "hydra:totalItems",
          "resp_format": "int"
        }
      },
      "root_url": "https://opencorporatefacts.fr/api/corporates"
    },
    {
      "_id": "5f6f7d0147e6fcead00b792c",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "dataToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": true,
          "type": "str"
        },
        {
          "app_arg": "itemId",
          "arg": "id",
          "default": "",
          "in": [
            "url"
          ],
          "optional": false,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for detailled results",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "detail",
      "field": "ocf_data_API_detail",
      "has_resp_callbacks": true,
      "help": "define the endpoint to get data for : a detailled data",
      "is_default": true,
      "is_disabled": false,
      "is_visible": true,
      "method": "GET",
      "resp_callbacks": [
        {
          "root_sufix": [
            {
              "default": null,
              "in": [
                "url"
              ],
              "optional": false,
              "resp_field_id": "CompanyNumber",
              "type": "str"
            }
          ],
          "root_url": "http://api.cquest.org/apicompany/"
        }
      ],
      "resp_fields": {
        "projects": {
          "path": "hydra:member",
          "resp_format": "list"
        },
        "total": {
          "path": "hydra:totalItems",
          "resp_format": "int"
        }
      },
      "root_url": "https://opencorporatefacts.fr/api/corporates"
    },
    {
      "_id": "5f6f7d0147e6fcead00b792d",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "page",
          "arg": "page",
          "default": 1,
          "in": [
            "url"
          ],
          "optional": true,
          "type": "int"
        },
        {
          "app_arg": "perPage",
          "arg": "per_page",
          "authorized": [
            30
          ],
          "default": 30,
          "in": [
            "url"
          ],
          "optional": true,
          "type": "int"
        },
        {
          "app_arg": "query",
          "arg": "probe",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for list results",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "list",
      "field": "ocf_data_API_list",
      "has_resp_callbacks": true,
      "help": "define the endpoint to get data for : a view list",
      "is_default": true,
      "is_disabled": false,
      "is_visible": true,
      "method": "GET",
      "request_header_options": [
        {
          "app_var_name": null,
          "header_field": "Accept",
          "header_value": "application/ld+json",
          "header_value_prefix": null,
          "is_var": false
        }
      ],
      "resp_callbacks": [
        {
          "root_sufix": [
            {
              "default": null,
              "in": [
                "url"
              ],
              "optional": false,
              "resp_field_id": "CompanyNumber",
              "type": "str"
            }
          ],
          "root_url": "http://api.cquest.org/apicompany/"
        }
      ],
      "resp_fields": {
        "projects": {
          "path": "hydra:member",
          "resp_format": "list"
        },
        "total": {
          "path": "hydra:totalItems",
          "resp_format": "int"
        }
      },
      "root_url": "https://opencorporatefacts.fr/api/corporates"
    },
    {
      "_id": "5f6f7d0147e6fcead00b792e",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "dataToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": true,
          "type": "str"
        },
        {
          "app_arg": "query",
          "arg": "search_for",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        },
        {
          "app_arg": "filters",
          "arg": "search_filters",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for stats results",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "stat",
      "field": "ocf_data_API_stats",
      "help": "define the endpoint to get data for : a stat about the dataset",
      "is_default": true,
      "is_disabled": false,
      "is_visible": false,
      "method": "POST",
      "payload_options": {
        "payload_queries": [
          {
            "agg_fields": [
              {
                "agg_field": "TYPO_CODE",
                "agg_needs_unwind": false,
                "agg_sum_type": "count_items",
                "agg_unwind_separator": "-"
              },
              {
                "agg_field": "NOMREG",
                "agg_needs_unwind": false,
                "agg_sum_type": "count_items",
                "agg_unwind_separator": "-"
              }
            ],
            "serie_id": "tl-stat-bar-horiz"
          },
          {
            "agg_fields": [
              {
                "agg_field": "TYPO_CODE",
                "agg_needs_unwind": false,
                "agg_sum_type": "count_items",
                "agg_unwind_separator": "-"
              }
            ],
            "serie_id": "tl-stat-donut"
          }
        ]
      },
      "resp_fields": {
        "stats": {
          "path": "series",
          "resp_format": "dict"
        }
      },
      "root_url": "https://solidata-api.co-demos.com/api/dsi/infos/get_one_stats/5d63b8d1328ed71684ce24b9"
    },
    {
      "_id": "5f6f7d0147e6fcead00b792f",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "dataToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": true,
          "type": "str"
        },
        {
          "app_arg": "forMap",
          "arg": "map_list",
          "default": true,
          "in": [
            "url"
          ],
          "optional": false,
          "type": "bool"
        },
        {
          "app_arg": "defaultValue",
          "arg": "fields_to_return",
          "default": "INSEEDEP,INSEECOM",
          "in": [
            "url"
          ],
          "optional": false,
          "type": "str"
        },
        {
          "app_arg": "query",
          "arg": "search_for",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        },
        {
          "app_arg": "filters",
          "arg": "search_filters",
          "default": "",
          "in": [
            "url"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for map results",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "map",
      "field": "ocf_data_API_map",
      "help": "define the endpoint to get data for : map results",
      "is_default": true,
      "is_disabled": false,
      "is_visible": false,
      "method": "GET",
      "resp_fields": {
        "projects": {
          "path": "data/data_raw/f_data",
          "resp_format": "list"
        },
        "total": {
          "path": "data/data_raw/f_data_count",
          "resp_format": "int"
        }
      },
      "root_url": "https://solidata-api.co-demos.com/api/dsi/infos/get_one/5d63b8d1328ed71684ce24b9"
    },
    {
      "_id": "5f6f7d0147e6fcead00b7930",
      "apiviz_front_uuid": "305ab50d-c976-44d7-a8f2-a7594155c292",
      "app_version": "v.0.10 beta",
      "args_options": [
        {
          "app_arg": "dataToken",
          "arg": "token",
          "default": "",
          "in": [
            "url",
            "header"
          ],
          "optional": true,
          "type": "str"
        }
      ],
      "content": "apiviz default API endpoint for export results",
      "data_type": "data",
      "dataset_uri": "recherche",
      "endpoint_type": "export",
      "field": "ocf_data_API_export",
      "help": "define the endpoint to get data for : export dataset as csv",
      "is_default": true,
      "is_disabled": false,
      "is_visible": false,
      "method": "GET",
      "resp_fields": {},
      "root_url": "https://solidata-api.co-demos.com/api/dsi/exports/as_csv/5d63b8d1328ed71684ce24b9"
    }
  ],
}

export const state = () => ({

  // CONSOLE LOG ALLOWED
  log: process.env.ConsoleLog,

  // FOR NEW INSTANCES - DEFAULT MODELS
  apivizModels : {
    modelUuids : [],
  },

  // APIVIZ CONFIG
  uuidAuth : undefined,
  isConfigComplete : false,
  config : emptyConfig,

  localRouteConfig : undefined,

  localEndpointConfig : undefined,
  localFiltersConfig : undefined,
  currentDatasetURI : undefined,

})

export const getters = {

  // NEW INSTANCES
  // - - - - - - - - - - - - - - - //
    getApivizModels : state => {
      return state.apivizModels
    },

  // APP CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getConfig : state => {
      // state.log && console.log( "S-config-G-getConfig / here comes the app config : \n", state.config )
      return state.config
    },
    getUuidAuth : state => {
      // state.log && console.log( "S-config-G-getUuidAuth / here comes the uuidAuth : \n", state.uuidAuth )
      return state.uuidAuth
    },
    getIsConfigComplete : state => {
      // state.log && console.log( "S-config-G-getConfig / getIsConfigComplet / isConfigComplete :", isConfigComplete )
      return state.isConfigComplete
    },
    getEndpointConfigAuthUsers : state => {
      // state.log && console.log("S-config-G-getEndpointConfigAuthUsers...")
      return state.config.endpoints.filter(function(r) {
        return r.data_type === "user"
      });
    },
    getEndpointConfigAuthSpecific : (state, getters) => (endpointType) => {
      // state.log && console.log("S-config-G-getEndpointConfigAuthSpecific / endpointType : ", endpointType)
      let allAuthEndpoints =  getters.getEndpointConfigAuthUsers
      // state.log && console.log("S-config-G-getEndpointConfigAuthSpecific / allAuthEndpoints", allAuthEndpoints)
      return allAuthEndpoints.find(function(r) {
        return r.endpoint_type === endpointType
      });
    },

  // GLOBAL RELATED
    getGlobalConfig : state => {
      return state.config.global
    },
    getAppLocales : state => {
      return (state.config.global) ? state.config.global.app_languages : 'fr'
    },

  // STYLES RELATED
    getStylesConfig : state => {
      return state.config.styles
    },
    getStylesConfigColors : state => {
      return state.config.styles.app_colors.content
    },

  // NAVBAR RELATED
    hasNavbar : (state) => {
      // state.log && console.log('S-config-G-hasNavbar ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.has_navbar : false
    },
    getNavbarConfig : state => {
      return (state.config.navbar) ? state.config.navbar.app_navbar : undefined
    },
    getNavbarLogo : state => {
      return (state.config.global) ? state.config.global.app_logo : undefined
    },
    getNavbarBrand : state => {
      return (state.config.global) ? state.config.global.app_title : undefined
    },

  // FOOTER RELATED
    hasFooter : (state) => {
      return (state.localRouteConfig) ? state.localRouteConfig.has_footer : false
    },
    hasCreditsFooter : (state) => {
      // state.log && console.log('S-config-G-hasCreditsFooter ... state.localRouteConfig : \n', state.localRouteConfig)
      return state.config.footer.app_footer.has_credits_footer
    },
    getFooterConfig : state => {
      return (state.config.footer) ? state.config.footer.app_footer : undefined
    },

  // BANNER RELATED
    hasBanner : state => {
      // state.log && console.log('S-config-G-hasBanner ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.banner.activated : false
    },
    getCurrentBanner : (state, getters) => {
      // state.log && console.log('S-config-G-getCurrentBanner ...')
      let bannersSet = getters.getStylesConfig.app_banners.banners_set
      const routeBannerUri = state.localRouteConfig.banner.banner_uri
      let resultSet = bannersSet.find(function(b) {
        return b.banner_uri == routeBannerUri
      })
      // state.log && console.log('S-config-getCurrentBanner ... resultSet : \n', resultSet)
      return resultSet
    },

    // TABS RELATED
    hasTabs : state => {
      // state.log && console.log('S-config-G-hasTabs ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.has_tabs : false
    },
    getTabConfig : (state) => (tabsUri) => {
      // state.log && console.log('S-config-G-getTabConfig ... tabsUri : ', tabsUri)
      // state.log && console.log('S-config-G-getTabConfig ... state.config.tabs : \n', state.config.tabs)
      let tabsConfig = state.config.tabs.find( tabs => {
        return tabs.tabs_uri == tabsUri
      })
      // state.log && console.log('S-config-G-getTabConfig ... tabsConfig : \n', tabsConfig)
      return tabsConfig
    },


  // ROUTE CONFIG GETTERS
    // - - - - - - - - - - - - - - - //
    getRouteConfigByField : (state) => (field) => {
      return state.config.routes.find(function(r){
        return r.field === field
      })
    },
    getCurrentRouteConfig : (state) => (currentRoute) => {
      try {
        return state.config.routes.find(function(r) {
          return r.urls.indexOf(currentRoute) !== -1;
        });
      } catch (e) {
        state.log && console.log('err',e);
        return undefined
      }
    },
    getLocalRouteConfig : state => {
      return state.localRouteConfig
    },
    getRouteConfigTableForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'table'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigTableForDataset / config : ", config )
      return config
    },
    getRouteConfigListForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigListForDataset / config : ", config )
      return config
    },
    getRouteConfigMapForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log("S-config-G-getRouteConfigMapForDataset / config", config )
      return config
    },
    getRouteConfigStatForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigStatForDataset / config : ", config )
      return config
    },
    getRouteConfigCalendarForDataset : (state, getters, rootState) => {
      let config = state.config.routes.find(function(r) {
        return r.endpoint_type === 'calendar'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      })
      // state.log && console.log( "S-config-G-getRouteConfigCalendarForDataset / config : ", config )
      return config
    },
    getRouteConfigDefaultDatasetImages : (state, getters, rootState) => {
      return state.config.styles.app_search_default_images_sets.images_sets.find(function(r) {
        return r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },

  // ENDPOINTS CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getEndpointConfig : (state, getters, rootState, rootGetters) => {
      state.log && console.log("\nS-config-getEndpointConfig - state.config.endpoints : \n", state.config.endpoints)
      state.log && console.log("S-config-getEndpointConfig - rootState.search.search.dataset_uri : ", rootState.search.search.dataset_uri)
      state.log && console.log("S-config-getEndpointConfig - rootState.search.search.endpoint_type : ", rootState.search.search.endpoint_type)
      // state.log && console.log("S-config-getEndpointConfig - rootGetters['search/getSearchDatasetURI'] : ", rootGetters['search/getSearchDatasetURI'])
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === rootState.search.search.endpoint_type
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigByType : (state, getters, rootState) => (endpointType) => {
      // state.log && console.log("S-config-getEndpointConfigFilters - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === endpointType
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigFilters : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigFilters - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'filters'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigFilters - config : ", config)
      return config
    },
    getEndpointConfigTable : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigTable - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'table'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigTable - config : ", config)
      return config
    },
    getEndpointConfigList : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigList - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigList - config : ", config)
      return config
    },
    getEndpointConfigMap : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigMap - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigMap - config : ", config)
      return config
    },
    getEndpointConfigDetail : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigDetail - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'detail'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigDetail - config : ", config)
      return config
    },
    getEndpointConfigStat : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigStat - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigStat - config : ", config)
      return config
    },
    getEndpointConfigCalendar : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigCalendar - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'calendar'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigCalendar - config : ", config)
      return config
    },
    getEndpointConfigExport : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfigExport - state.config.endpoints : \n", state.config.endpoints)
      let config = state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'export'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
      // state.log && console.log("S-config-getEndpointConfigExport - config : ", config)
      return config
    },

    getLocalEndpointConfig : state => {
      return state.localEndpointConfig
    },
    getLocalFiltersConfig : state => {
      return state.localFiltersConfig
    },
    getCurrentDatasetURI : state => {
      return state.currentDatasetURI
    },

  // DEFAULT TEXTS GETTERS
  // - - - - - - - - - - - - - - - //
    defaultText : (state, getters, rootState) => (field) => {
      // state.log && console.log("\nS-config-G-defaultText ..." )
      // state.log && console.log("S-config-G-defaultText / field : ", field )

      // default texts fields are :
      // 'reinit_filters', 'no_abstract', 'no_address'
      // 'source', 'no_info'

      // state.log && console.log("S-config-G-defaultText / field : ", field )

      const f = field.txt
      // state.log && console.log("S-config-G-defaultText / f : ", f )

      const noAbstractDict = state.config.global.app_basic_dict[f]
      // state.log && console.log("S-config-G-defaultText / noAbstractDict : ", noAbstractDict )
      let text = noAbstractDict.find( t=>t.locale == rootState.locale )
      return text.text
    },


}

export const mutations = {

  setDefaultApivizModels(state, models) {
    state.apivizModels.modelUuids = models
  },

  setConfig(state, {type,result}) {
    // state.log && console.log("S-config-M-setConfig ... result : ", result)
    state.config[type] = result
  },
  setUuidAuth(state, uuidAuth) {
    // state.log && console.log( "S-config-M-setUuidAuth / uuidAuth : \n", uuidAuth )
    state.uuidAuth = uuidAuth
  },
  setIsConfigComplete(state, isComplete) {
    // state.log && console.log("S-config-M-setIsConfigComplete ... isComplete : ", isComplete)
    state.isConfigComplete = isComplete
  },
  setLocalRouteConfig(state, routeConfig) {
    // state.log && console.log("S-config-M-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    // state.log && console.log("S-config-M-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },
  setLocalEndpointConfig(state, localEndpointConfig) {
    // state.log && console.log("S-config-M-setLocalEndpointConfig...")
    // state.log && console.log("S-config-M-setLocalEndpointConfig / localEndpointConfig : ", localEndpointConfig)
    state.localEndpointConfig = localEndpointConfig
  },
  setCurrentDatasetURI(state, currentDatasetURI) {
    // state.log && console.log("S-config-M-setCurrentDatasetURI...")
    state.currentDatasetURI = currentDatasetURI
  },
  setLocalFiltersConfig(state, localFiltersConfig) {
    // state.log && console.log("S-config-M-setLocalFiltersConfig...")
    state.localFiltersConfig = localFiltersConfig
  },

  // completly reset/empty config
  resetConfig(state){
    state.log && console.log("S-config-M-resetConfig...")
    state.config = emptyConfig
    state.isComplete = false
  }

}

export const actions = {

  // - - - - - - - - - - - - - //
  // CONFIG - RELATED
  // - - - - - - - - - - - - - //

  getConfigType({commit, state, getters, rootGetters},{type, configTypeEndpoint, args}) {
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    const authMode = rootGetters['getAuthMode']

    // get user access token if any
    const userAccessToken = rootGetters['user/getAccessToken']

    let firstArgs = configTypeEndpoint+"?uuid="+apivizFrontUUID+"&auth_mode="+authMode+"&token="+userAccessToken
    let fullUrl   = rootURLbackend+'/config/'+firstArgs+args
    state.log && console.log("S-config-A-getConfigType / fullUrl : ", fullUrl)

    // get one collection's config items
    return axios
    .get(fullUrl)
    .then(response => {
      state.log && console.log("S-config-A-getConfigType / type -", type," - response.data : ", response.data)
      let app_config = (response && response.data && response.data.app_config) ? response.data.app_config : undefined
      commit('setConfig', {type:type,result:app_config});
      return app_config
    })
    .catch( err =>
      state.log && console.log('there was an error trying to fetch some configuration file', err)
    )
  },

  editConfig({commit, state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-editConfig / request : \n", request)

    const authMode        = rootGetters['getAuthMode']
    const rootURLbackend  = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const currentColl = request.currentColl
    let payload = request.payload
    payload['auth_mode'] = authMode

    // build request URL
    let requestUrl = rootURLbackend+'/config/'+currentColl+"?uuid="+apivizFrontUUID
    state.log && console.log('S-config-A-editConfig / requestUrl : ', requestUrl)

    // INTERNATIONALIZATION
    if (currentColl === 'global' ) {
      let appLocales = getters['getAppLocales']
      commit('setLocale', appLocales.locale, { root: true })
    }

    // post update request
    return axios
    .post( requestUrl, payload )
    .catch( (error) => {
      state.log && console.log('S-config-A-editConfig / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-editConfig / response : \n', response)
      return response
    })

  },

  deleteConfig({state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-deleteConfig / request : \n", request)

    const authMode = rootGetters['getAuthMode']
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const currentColl = request.currentColl
    const docId = request.doc_id
    const accessToken = request.token

    // build request URL
    let requestUrl = rootURLbackend+'/config/'+currentColl+"/"+docId+"?uuid="+apivizFrontUUID
    state.log && console.log('S-config-A-deleteConfig / requestUrl : ', requestUrl)

    let payload = {
      data : {
        token : accessToken,
        auth_mode : authMode,
      }
    }

    // post update request
   return axios
    .delete( requestUrl, payload )
    .catch( (error) => {
      state.log && console.log('S-config-A-deleteConfig / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-deleteConfig / response : \n', response)
      // reset config after update
      return response
      }
    )

  },

  addConfigDoc({commit, state, getters, rootGetters}, request){

    state.log && console.log("S-config-A-addConfigDoc / request : \n", request)

    const authMode = rootGetters['getAuthMode']
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    const currentColl = request.currentColl
    const payload = request.payload
    payload['apiviz_front_uuid'] = apivizFrontUUID
    payload['auth_mode'] = authMode

    // build request URL
    let requestUrl = rootURLbackend+'/add_document/'+currentColl
    state.log && console.log('S-config-A-addConfigDoc / requestUrl : ', requestUrl)

    // post update request
    return axios
    .post( requestUrl, payload )
    .catch( (error) => {
      state.log && console.log('S-config-A-addConfigDoc / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-addConfigDoc / response : \n', response)
      return response
      }
    )

  },

  resetConfig({state, commit}){
    state.log && console.log("S-config-A-resetConfig ... ")
    commit('resetConfig')
  },

  // - - - - - - - - - - - - - //
  // NEW CONFIG GIVEN UUID - RELATED
  // - - - - - - - - - - - - - //

  getDefaultApivizModels({commit, state, getters, rootGetters}){

    // state.log && console.log("S-config-A-getDefaultApivizModels ...")

    // build request URL
    const rootURLbackend = rootGetters['getRootUrlBackend']
    let requestUrl = rootURLbackend+'/get_default_models'
    // state.log && console.log('S-config-A-getDefaultApivizModels / requestUrl : ', requestUrl)

    // send axios request to backend
    axios.get(requestUrl)
    .catch( (error) => {
      state.log && console.log('S-config-A-getDefaultApivizModels / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-getDefaultApivizModels / response.data : \n', response.data)
      let defaultModels = response.data.models
      commit('setDefaultApivizModels', defaultModels)
    })

  },

  getModelFromUuid({state, getters, rootGetters}, uuid){
    state.log && console.log("S-config-A-getModelFromUuid / uuid :", uuid)

    // build request URL
    const rootURLbackend = rootGetters['getRootUrlBackend']
    let requestUrl = rootURLbackend+'/get_config_model/'+uuid
    // state.log && console.log('S-config-A-getModelFromUuid / requestUrl : ', requestUrl)

    // send axios request to backend
    return axios.get(requestUrl)
    .catch( (error) => {
      state.log && console.log('S-config-A-getModelFromUuid / error :', error)
    })
    .then(response => {
      state.log && console.log('S-config-A-createNewConfig / response.data : \n', response.data)
      return response
    })

  },

  createNewConfig({state, getters, rootGetters}, request){

    // state.log && console.log("S-config-A-createNewConfig / request : \n", request)

    // retrieve current uuid
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']

    // prepare the payload with uuid to copy
    let payload = {
      new_uuid : apivizFrontUUID,
      model_uuid : request.modelUuid,
      new_title : request.new_title,
      new_logoUrl : request.new_logoUrl,
      model_admin_email : request.new_admin,
      model_admin_name : request.new_admin_name,
      model_admin_surname : request.new_admin_surname,
    }
    // state.log && console.log("S-config-A-createNewConfig / payload : \n", payload)

    // build request URL
    const rootURLbackend = rootGetters['getRootUrlBackend']
    let requestUrl = rootURLbackend+'/create_new_config'
    // state.log && console.log('S-config-A-createNewConfig / requestUrl : ', requestUrl)

    // send axios request to backend
    return axios.post( requestUrl, payload )
    .catch( (error) => {
      state.log &&console.log('S-config-A-createNewConfig / error :', error)
    })
    .then(response => {
      // state.log &&console.log('S-config-A-createNewConfig / response.data : \n', response.data)
      return response
      }
    )

  }

}
