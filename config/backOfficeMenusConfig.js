export const BackofficeGlobal = Object.freeze({
  
  /* 
    // MODEL CONFIG BACK OFFICE EDITOR
    { 
      'config_coll' : 'global',       // DB COLLECTION - ALSO TO CHECK IF IS ACTIVE
      'title' : 'global settings',    // TITLE IN SIDEBAR
      "is_divider" : false,           // IS DIVIDER IN SIDEBAR
      'icon' : 'fas fa-cog',          // ICON IN SIDEBAR

      'tabs'  : [                     // TABS LIST ONCE SIDEBAR SELECTED
        
        { 
          'tab_code' : 'gl_general' , // CODE TAB - TO CHECK IF IS ACTIVE
          'tab_type' : 'docs',         // TAB EDIT TYPE
          'title' : 'general',        // TAB TITLE
          'fields' : [                // LIST FIELDS TO EDIT
            
            { 
              'field' : 'app_title',  // FIELD CODE IN DOCUMENT
              'title' : 'app title',  // FIELD TITLE TO DISPLAY
              'type' : 'bloc',        // FIELD TYPE : 'bloc' | 'list'
              'edit' : [              // LIST SUBFIELDS TO EDIT
                { 
                  'subfield' : 'content',   // SUBFIELD TO EDIT
                  'type' : 'text',          // TYPE OF EDIT BLOC
                  'list' : false            // IF SUBFIELD CONTENT IS LIST
                }
              ], 
            },

          ]
        },

      ]
    },
  */

  // APP CONFIGURATION
  config  : [

    // GLOBAL
    { 'config_coll' : 'global', 
      'title' : 'global settings',
      "is_divider" : false,
      'icon' : 'fas fa-cog',
      'tabs'  : [
        { 'tab_code' : 'gl_general' , 
          'tab_type' : 'docs',
          'title' : 'general',
          'fields' : [
            { 'field' : 'app_title',
              'title' : 'app title',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_description',
              'title' : 'app description',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            },
            { 'field' : 'app_languages',
              'title' : 'app languages',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'locale', 'type' : 'text', 'list' : false}, 
                {'subfield' : 'languages', 'type' : 'text', 'list' : true}
              ], 
            },
          ]
        },
        { 'tab_code' : 'gl_identity', 
          'tab_type' : 'docs',
          'title' : 'site identity',
          'fields' : [
            { 'field' : 'app_logo',
              'title' : 'app logo',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_favicon',
              'title' : 'app favicon',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_welcome',
              'title' : 'app welcome',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            },
            { 'field' : 'app_pitch',
              'title' : 'app pitch',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            }
          ]
        },
        { 'tab_code' : 'gl_meta',
          'tab_type' : 'docs', 
          'title' : 'meta',
          'fields' : [
            { 'field' : 'app_keywords',
              'title' : 'app logo',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false}
              ], 
            },
            { 'field' : 'app_code',
              'title' : 'app logo',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'content', 'type' : 'text-lang', 'list' : false}
              ], 
            },
          ]
        },
        { 'tab_code' : 'gl_seo',
          'tab_type' : 'docs', 
          'title' : 'seo',
          'fields' : [
            { 'field' : 'app_analytics',
              'title' : 'app analytics',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false},
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'activated', 'type' : 'bool', 'list' : false}
              ], 
            },
            { 'field' : 'app_support',
              'title' : 'app support',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false},
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'activated', 'type' : 'bool', 'list' : false}
              ], 
            },
            { 'field' : 'app_indexing',
              'title' : 'app indexing',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'content', 'type' : 'text', 'list' : false},
                {'subfield' : 'activated', 'type' : 'bool', 'list' : false}
              ], 
            },
          ]
        },
        { 'tab_code' : 'gl_lang',
          'tab_type' : 'docs', 
          'title' : 'international',
          'fields' : [
            {
              'field' : 'app_basic_dict',
              'title' : 'app basic dictionary',
              'type' : 'bloc', 
              'edit' : ['content'], 
            }
          ]
        },
      ]
    },
    // NAVBAR
    { 'config_coll' : 'navbar',
      'title' : 'navbar',
      "is_divider" : false,
      'icon' : 'fas fa-bars',
      'tabs'  : [
        { 'tab_code' : 'na_logo', 
          'tab_type' : 'docs',
          'title' : 'logo link',
          'fields' : [
            { 'field' : 'app_navbar',
              'title' : 'app navbar logo',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'logo_to', 'type' : 'text', 'list' : false}
              ], 
            },
          ]
        },
        { 'tab_code' : 'na_links', 
          'tab_type' : 'docs',
          'title' : 'links buttons',
          'fields' : [
            { 'field' : 'app_navbar',
              'title' : 'app navar buttons',
              'type' : 'object', 
              'edit' : [
                {
                  'subfield' : 'links_options.extra_buttons', 
                  'type' : 'list', 
                  'object_model' : [
                    {'subfield' : 'is_divider', 'type' : 'bool', 'list' : false},
                    {'subfield' : 'is_external_link', 'type' : 'bool', 'list' : false},
                    {'subfield' : 'link_to', 'type' : 'text', 'list' : false},
                    {'subfield' : 'link_text', 'type' : 'text', 'list' : true},
                  ],
                }
              ], 
            },
          ]
        },
        { 'tab_code' : 'na_btn'  , 
          'tab_type' : 'docs',
          'title' : 'call_button',
          'fields' : [

          ]
        },
      ]
    },

    // ROUTES
    { 'config_coll' : 'routes',
      'title' : 'routes',
      "is_divider" : false,
      'icon' : 'far fa-sticky-note',
      'tabs'  : [
        { 
          'tab_code' : 'ro_home', 
          'tab_type' : 'docs_list',
          'title' : 'home page',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'ro_data', 
          'tab_type' : 'docs_list',
          'title' : 'datasets pages',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'ro_statics', 
          'tab_type' : 'docs_list',
          'title' : 'static pages',
          'fields' : [

          ]
        },
      ]
    },

    // ENDPOINTS
    { 'config_coll' : 'endpoints',
      'title' : 'API endpoints',
      "is_divider" : false,
      'icon' : 'fas fa-database',
      'tabs'  : [
        { 
          'tab_code' : 'ep_data', 
          'tab_type' : 'docs_list',
          'title' : 'datasets',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'ep_user', 
          'tab_type' : 'docs_list',
          'title' : 'user',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'ep_auth', 
          'tab_type' : 'docs_list',
          'title' : 'authentication',
          'fields' : [

          ]
        },
      ]
    },

    // FOOTER
    { 'config_coll' : 'footer',
      'title' : 'footer',
      "is_divider" : false,
      'icon' : 'fas fa-link',
      'tabs'  : [
        { 
          'tab_code' : 'fo_settings', 
          'tab_type' : 'docs',
          'title' : 'settings',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'fo_contents', 
          'tab_type' : 'docs',
          'title' : 'contents',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'fo_ui', 
          'tab_type' : 'docs',
          'title' : 'ui',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'fo_links', 
          'tab_type' : 'docs',
          'title' : 'links',
          'fields' : [

          ]
        },
      ]
    },

    // SOCIALS
    { 'config_coll' : 'socials',
      'title' : 'socials',
      "is_divider" : false,
      'icon' : 'fas fa-share-alt',
      'tabs'  : [
        { 
          'tab_code' : 'so_settings', 
          'tab_type' : 'docs',
          'title' : 'settings',
          'fields' : [
            { 'field' : 'app_twitter',
              'title' : 'app twitter',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'tooltip', 'type' : 'text-lang', 'list' : false},
                {'subfield' : 'in_footer', 'type' : 'bool', 'list' : false},
              ], 
            },
            { 'field' : 'app_facebook',
              'title' : 'app facebook',
              'type' : 'bloc', 
              'edit' : [
                {'subfield' : 'url', 'type' : 'text', 'list' : false},
                {'subfield' : 'tooltip', 'type' : 'text-lang', 'list' : false},
                {'subfield' : 'in_footer', 'type' : 'bool', 'list' : false},
              ], 
            },
            { 'field' : 'app_github',
              'title' : 'app github',
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

    // STYLES
    { 'config_coll' : 'styles',
      'title' : 'styles',
      "is_divider" : false,
      'icon' : 'fas fa-paint-brush',
      'tabs'  : [
        { 
          'tab_code' : 'st_colors', 
          'tab_type' : 'docs',
          'title' : 'app colors',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'st_typo', 
          'tab_type' : 'docs',
          'title' : 'app typo',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'st_typocolors', 
          'tab_type' : 'docs',
          'title' : 'app typo colors',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'st_banners', 
          'tab_type' : 'docs',
          'title' : 'app banners',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'st_images', 
          'tab_type' : 'docs',
          'title' : 'app default images sets',
          'fields' : [

          ]
        },
      ]
    },
    
    // USERS
    { 'config_coll' : 'users',
      'title' : 'users',
      "is_divider" : false,
      'icon' : 'fas fa-users',
      'tabs'  : [
        { 
          'tab_code' : 'us_users', 
          'tab_type' : 'docs',
          'title' : 'users',
          'fields' : [

          ]
        },
        { 
          'tab_code' : 'us_teams', 
          'tab_type' : 'docs',
          'title' : 'teams',
          'fields' : [

          ]
        },
      ]
    },
  
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