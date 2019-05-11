export const BackofficeGlobal = Object.freeze({
  
  // APP CONFIGURATION
  config  : [

    { 'config_coll' : 'global', 
      'title' : 'global settings',
      "is_divider" : false,
      'icon' : 'fas fa-cog',
      'tabs'  : [
        { 'tab_code' : 'gl_general' , 
          'title' : 'general',
          'fields' : [
            { 'field' : 'app_title',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_description',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            },
            { 'field' : 'app_languages',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'locale', 'type' : 'text', 'list' : false}, 
                {'subfield' : 'languages', 'type' : 'text', 'list' : true}
              ], 
            },
          ]
        },
        { 'tab_code' : 'gl_identity', 
          'title' : 'site identity',
          'fields' : [
            { 'field' : 'app_logo',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_favicon',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_welcome',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            },
            { 'field' : 'app_pitch',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            }
          ]
        },
        { 'tab_code' : 'gl_meta', 
          'title' : 'meta',
          'fields' : [
            { 'field' : 'app_keywords',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_code',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            },
          ]
        },
        { 'tab_code' : 'gl_seo', 
          'title' : 'seo',
          'fields' : [
            { 'field' : 'app_analytics',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false},
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'activated', 'type' : 'bool', 'list' : false}
              ], 
            },
            { 'field' : 'app_support',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false},
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'activated', 'type' : 'bool', 'list' : false}
              ], 
            },
            { 'field' : 'app_indexing',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false},
                {'subfield' : 'activated', 'type' : 'bool', 'list' : false}
              ], 
            },
          ]
        },
        { 'tab_code' : 'gl_lang', 
          'title' : 'international',
          'fields' : [
            {
              'field' : 'app_basic_dict',
              'type' : 'bloc', 
              'edit' : ['content'], 
            }
          ]
        },
      ]
    },

    { 'config_coll' : 'navbar',
      'title' : 'navbar',
      "is_divider" : false,
      'icon' : 'fas fa-bars',
      'tabs'  : [
        { 
          'tab_code' : 'na_logo', 
          'title' : 'logo' 
        },
        { 
          'tab_code' : 'na_links', 
          'title' : 'links' 
        },
        { 
          'tab_code' : 'na_btn'  , 
          'title' : 'call_button' 
        },
      ]
    },

    { 'config_coll' : 'routes',
      'title' : 'routes',
      "is_divider" : false,
      'icon' : 'far fa-sticky-note',
      'tabs'  : [
        { 
          'tab_code' : 'ro_home', 
          'title' : 'home page' 
        },
        { 
          'tab_code' : 'ro_data', 
          'title' : 'datasets pages' 
        },
        { 
          'tab_code' : 'ro_statics', 
          'title' : 'static pages' 
        },
      ]
    },

    { 'config_coll' : 'endpoints',
      'title' : 'API endpoints',
      "is_divider" : false,
      'icon' : 'fas fa-database',
      'tabs'  : [
        { 
          'tab_code' : 'ep_data', 
          'title' : 'datasets' 
        },
        { 
          'tab_code' : 'ep_user', 
          'title' : 'user' 
        },
        { 
          'tab_code' : 'ep_auth', 
          'title' : 'authentication' 
        },
      ]
    },

    { 'config_coll' : 'footer',
      'title' : 'footer',
      "is_divider" : false,
      'icon' : 'fas fa-link',
      'tabs'  : [
        { 
          'tab_code' : 'fo_settings', 
          'title' : 'settings' 
        },
        { 
          'tab_code' : 'fo_contents', 
          'title' : 'contents' 
        },
        { 
          'tab_code' : 'fo_ui', 
          'title' : 'ui' 
        },
        { 
          'tab_code' : 'fo_links', 
          'title' : 'links' 
        },
      ]
    },

    { 'config_coll' : 'socials',
      'title' : 'socials',
      "is_divider" : false,
      'icon' : 'fas fa-share-alt',
      'tabs'  : [
        { 
          'tab_code' : 'so_settings', 
          'title' : 'settings',
          'fields' : [
            { 'field' : 'app_twitter',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'tooltip', 'type' : 'text-lang', 'list' : false},
                {'subfield' : 'in_footer', 'type' : 'bool', 'list' : false},
              ], 
            },
            { 'field' : 'app_facebook',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'tooltip', 'type' : 'text-lang', 'list' : false},
                {'subfield' : 'in_footer', 'type' : 'bool', 'list' : false},
              ], 
            },
            { 'field' : 'app_github',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'tooltip', 'type' : 'text-lang', 'list' : false},
                {'subfield' : 'in_footer', 'type' : 'bool', 'list' : false},
              ], 
            },
          ] 
        },
      ]
    },

    { 'config_coll' : 'styles',
      'title' : 'styles',
      "is_divider" : false,
      'icon' : 'fas fa-paint-brush',
      'tabs'  : [
        { 
          'tab_code' : 'st_colors', 
          'title' : 'app colors' 
        },
        { 
          'tab_code' : 'st_typo', 
          'title' : 'app typo' 
        },
        { 
          'tab_code' : 'st_typocolors', 
          'title' : 'app typo colors' 
        },
        { 
          'tab_code' : 'st_banners', 
          'title' : 'app banners' 
        },
        { 
          'tab_code' : 'st_images', 
          'title' : 'app default images sets' 
        },
      ]
    },

    { 'config_coll' : 'users',
      'title' : 'users',
      "is_divider" : false,
      'icon' : 'fas fa-users',
      'tabs'  : [
        { 
          'tab_code' : 'us_users', 
          'title' : 'users',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'us_teams', 
          'title' : 'teams',
          'fields' : [

          ]
        },
      ]
    }
  
  ],

  // USER PREFERENCES
  user : [

    { 'config_coll' : 'u_infos', 
      'title' : 'infos',
      "is_divider" : false,
      'icon' : 'far fa-user',
    },

    { 'config_coll' : 'u_password', 
      'title' : 'password',
      "is_divider" : false,
      'icon' : 'fas fa-unlock',
    },

  ],

})