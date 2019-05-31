export const BackofficeGlobal = Object.freeze({

  // APP CONFIGURATION
  config  : [

    // GLOBAL
    { config_coll : 'global', 
      activated : true, 
      code : 'bo_global',
      title : 'global settings',
      is_divider : false,
      icon : 'fas fa-cog',
      tabs  : [
        { tab_code : 'gl_general' , 
          tab_type : 'docs',
          title : 'general',
          docs : [
            { field : 'app_title',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                {subfield : 'can_be_used_as_model'},
                {subfield : 'image_preview'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_description',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_languages',
              title : '',
              type : 'blocs', 
              canAddToList : true,
              edit : [
                {subfield : 'locale'}, 
                {subfield : 'is_multi_lang'},
                {subfield : 'languages'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'gl_identity', 
          tab_type : 'docs',
          title : 'site identity',
          docs : [
            { field : 'app_logo',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'url'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_favicon',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'url'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_welcome',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_pitch',
              title : 'app pitch',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            }
          ]
        },
        { tab_code : 'gl_meta',
          tab_type : 'docs', 
          title : 'meta',
          docs : [
            { field : 'app_keywords',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_code',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'url'},
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'gl_seo',
          tab_type : 'docs', 
          title : 'seo',
          docs : [
            { field : 'app_analytics',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                {subfield : 'url'},
                {subfield : 'activated'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_support',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                {subfield : 'url'},
                {subfield : 'activated'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_indexing',
              title : '',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                {subfield : 'activated'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'gl_lang',
          tab_type : 'docs', 
          title : 'international',
          docs : [
            // {
            //   field : 'app_basic_dict',
            //   title : 'basic dict as default',
            //   type : 'blocs', 
            //   edit : [
            //     //{subfield : 'is_default'},
            //   ], 
            // },
            {
              field : 'app_basic_dict',
              title : 'basic dict values',
              type : 'blocs', 
              canAddKeys : true,
              edit : [
                {subfield : 'no_data'},
                {subfield : 'reinit_filters'},
                {subfield : 'no_abstract'},
                {subfield : 'no_address'},
                {subfield : 'source'},
                {subfield : 'back_to_results'},
                {subfield : 'see_website'},
                {subfield : 'see_contact'},
                {subfield : 'see_website'},
                {subfield : 'share_link'},
                {subfield : 'infos'},
                {subfield : 'open_infos'},
                {subfield : 'more_infos'},
                {subfield : 'name'},
                {subfield : 'surname'},
                {subfield : 'tel'},
                {subfield : 'period'},
                {subfield : 'services'},
                {subfield : 'dowload_file'},
                {subfield : 'hello'},
                {subfield : 'pref_user'},
                {subfield : 'backoffice'},
                {subfield : 'email'},
                {subfield : 'login'},
                {subfield : 'connect'},
                {subfield : 'connected'},
                {subfield : 'reconnect'},
                {subfield : 'disconnect'},
                {subfield : 'disconnect_msg'},
                {subfield : 'want_disconnect'},
                {subfield : 'is_account'},
                {subfield : 'no_account'},
                {subfield : 'register'},
                {subfield : 'is_registered'},
                {subfield : 'logout'},
                {subfield : 'name'},
                {subfield : 'surname'},
                {subfield : 'password'},
                {subfield : 'password_bis'},
                {subfield : 'remember_me'},
                {subfield : 'forgot_password'},
                {subfield : 'create_account'},
                {subfield : 'accept_cgu'},
              ], 
            },
          ]
        },
      ]
    },
    
    // NAVBAR
    { config_coll : 'navbar',
      activated : true, 
      code : 'bo_navbar',
      title : 'navbar',
      is_divider : false,
      icon : 'fas fa-bars',
      tabs  : [
        { tab_code : 'na_global', 
          tab_type : 'docs',
          title : 'navbar settings',
          docs : [
            { field : 'app_navbar',
              title : 'settings',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                {subfield : 'logo_to'},
                {subfield : 'ui_options'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'na_links', 
          tab_type : 'docs',
          title : 'navbar links',
          docs : [
            { field : 'app_navbar', // doc retrieved in collection
              title : 'navar buttons',
              type : 'blocs', 
              canAddToList : true,
              help_field : 'help',
              edit : [
                {subfield : 'links_options'}, 
                //{subfield : 'is_default'},
              ],
            },
            // { field : 'app_navbar', // doc retrieved in collection
            //   title : 'navar buttons',
            //   type : 'blocs_list', 
            //   add_delete : true,
            //   help_field : 'help',
            //   edit : [
            //     {
            //       subfield : 'links_options.extra_buttons', 
            //       // list_filters : [
            //       // ],
            //       object_model : [
            //         {subfield : 'is_divider'},
            //         {subfield : 'is_external_link'},
            //         {subfield : 'link_to'},
            //         {subfield : 'link_text'},
            //       ],
            //     }
            //   ], 
            // },
          ]
        },
      ]
    },

    // ROUTES
    { config_coll : 'routes',
      activated : true, 
      code : 'bo_routes',
      title : 'routes',
      is_divider : false,
      icon : 'far fa-sticky-note',
      tabs  : [
        { tab_code : 'ro_data', 
          tab_type : 'docs_list',
          title : 'datasets routes',
          docs : [
            { field : '',
              title : 'dynamic routes',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'is_dynamic', is : [true] },
                { field : 'dynamic_template', isNot : ['DynamicStatic', 'Login', 'Register', 'Logout', 'BackOffice'] },
              ],
              help_field : 'route_description',
              add_delete : true,
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },
        { tab_code : 'ro_statics', 
          tab_type : 'docs_list',
          title : 'static routes',
          docs : [
            { field : '',
              title : 'static routes',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'dynamic_template', is : ['DynamicStatic'] },
              ],
              help_field : 'route_description',
              add_delete : true,
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },
        { tab_code : 'ro_user', 
          tab_type : 'docs_list',
          title : 'auth routes',
          docs : [
            { field : '',
              title : 'auth routes',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'is_dynamic', is : [true] },
                { field : 'dynamic_template', is : ['Login', 'Register', 'Logout', 'BackOffice'] },
              ],
              help_field : 'route_description',
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },
      ]
    },

    // ENDPOINTS
    { config_coll : 'endpoints',
      activated : true, 
      code : 'bo_endpoints',
      title : 'API endpoints',
      is_divider : false,
      icon : 'fas fa-database',
      tabs  : [
        { tab_code : 'ep_data_filters', 
          tab_type : 'docs_list',
          title : 'filters',
          docs : [
            { field : '-',
              title : 'data filters',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'data_type', is : ['data'] },
                { field : 'endpoint_type', is : ['filters'] },
              ],
              help_field : 'content',
              add_delete : true,
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },
        { tab_code : 'ep_data', 
          tab_type : 'docs_list',
          title : 'datasets',
          docs : [
            { field : '-',
              title : 'data endpoints',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'data_type', is : ['data'] },
                { field : 'endpoint_type', isNot : ['filters'] },
              ],
              help_field : 'content',
              add_delete : true,
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },
        { tab_code : 'ep_auth', 
          tab_type : 'docs_list',
          title : 'authentication',
          docs : [
            { field : '-',
              title : 'auth endpoints',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'endpoint_type', is : ['auth_root'] },
              ],
              help_field : 'content',
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },
        { tab_code : 'ep_user', 
          tab_type : 'docs_list',
          title : 'user',
          docs : [
            { field : '-',
              title : 'user endpoints',
              type : 'docs_list', 
              canAddToList : true,
              list_filters : [
                { field : 'data_type', is : ['user'] },
                { field : 'endpoint_type', isNot : ['auth_root'] },
              ],
              help_field : 'content',
              fields_not_in_model : [
                {subfield : '_id'},
                {subfield : 'apiviz_front_uuid'},
                // //{subfield : 'is_default'},
                {subfield : 'help'},
                {subfield : 'app_version'},
              ],
            }
          ]
        },

      ]
    },

    // FOOTER
    { config_coll : 'footer',
      activated : true, 
      code : 'bo_footer',
      title : 'footer',
      is_divider : false,
      icon : 'fas fa-link',
      tabs  : [
        { tab_code : 'fo_settings', 
          tab_type : 'docs',
          title : 'settings',
          docs : [
            { field : 'app_footer',
              title : 'footer settings',
              type : 'blocs', 
              edit : [
                // {subfield : 'active_columns'},
                // {subfield : 'has_credits_footer'},
                {subfield : 'ui_options'},
                {subfield : 'contents_fields'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'fo_links', 
          tab_type : 'docs',
          title : 'links',
          docs : [
            { field : 'app_footer',
              title : 'footer links',
              type : 'blocs', 
              edit : [
                {subfield : 'links_options'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
      ]
    },

    // SOCIALS
    { config_coll : 'socials',
      activated : true, 
      code : 'bo_socials',
      title : 'socials',
      is_divider : false,
      icon : 'fas fa-share-alt',
      tabs  : [
        { tab_code : 'so_settings', 
          tab_type : 'docs',
          title : 'socials links',
          docs : [
            { field : 'app_twitter',
              title : 'app twitter',
              type : 'blocs', 
              edit : [
                {subfield : 'url'},
                {subfield : 'tooltip'},
                {subfield : 'in_footer'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_facebook',
              title : 'app facebook',
              type : 'blocs', 
              edit : [
                {subfield : 'url'},
                {subfield : 'tooltip'},
                {subfield : 'in_footer'},
                //{subfield : 'is_default'},
              ], 
            },
            { field : 'app_github',
              title : 'app github',
              type : 'blocs', 
              edit : [
                {subfield : 'url'},
                {subfield : 'tooltip'},
                {subfield : 'in_footer'},
                //{subfield : 'is_default'},
              ], 
            },
          ] 
        },
      ]
    },

    // STYLES
    { config_coll : 'styles',
      activated : true, 
      code : 'bo_styles',
      title : 'styles',
      is_divider : false,
      icon : 'fas fa-paint-brush',
      tabs  : [
        { tab_code : 'st_colors', 
          tab_type : 'docs',
          title : 'colors',
          docs : [
            { field : 'app_colors',
              title : 'colors',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'st_typo', 
          tab_type : 'docs',
          title : 'typo',
          docs : [
            { field : 'app_typo',
              title : 'typos',
              type : 'blocs', 
              edit : [
                {subfield : 'content'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        // { tab_code : 'st_typocolors', 
        //   tab_type : 'docs',
        //   title : 'typo colors',
        //   docs : [
        //     { field : 'app_typo_colors',
        //       title : 'typo colors',
        //       type : 'blocs', 
        //       edit : [
        //         {subfield : 'content'},
        //         //{subfield : 'is_default'},
        //       ], 
        //     },
        //   ]
        // },
        { tab_code : 'st_banners', 
          tab_type : 'docs',
          title : 'banners',
          docs : [
            { field : 'app_banners',
              title : 'banners',
              type : 'blocs', 
              canAddToList : true,
              edit : [
                {subfield : 'banners_set'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
        { tab_code : 'st_images', 
          tab_type : 'docs',
          title : 'default images',
          canAddToList : true,
          docs : [
            { field : 'app_search_default_images_sets',
              title : 'images',
              type : 'blocs', 
              edit : [
                {subfield : 'images_sets'},
                //{subfield : 'is_default'},
              ], 
            },
          ]
        },
      ]
    },
    
    // USERS
    { config_coll : 'users',
      activated : true, 
      code : 'bo_users',
      title : 'users',
      is_divider : false,
      icon : 'fas fa-users',
      tabs  : [
        { tab_code : 'us_users', 
          tab_type : 'docs',
          title : 'users',
          docs : [

          ]
        },
        { tab_code : 'us_teams', 
          tab_type : 'docs',
          title : 'teams',
          docs : [

          ]
        },
      ]
    },
  
  ],


})