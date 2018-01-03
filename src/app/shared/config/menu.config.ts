export const MENUITEMS = [
  {
    state: '/',
    name: 'dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'media',
    name: 'media',
    type: 'link',
    icon: 'file_upload'
  },
  {
    state: 'articles',
    name: 'article',
    type: 'sub',
    icon: 'text_format',
    children: [
      {
        state: '',
        name: 'list',
        icon: 'textsms'
      },
      {
        state: 'matches',
        name: 'match',
        icon: 'games'
      },
      {
        state: 'dashboard',
        name: 'dashboard',
        icon: 'trending_up'
      }
    ]
  },
  {
    state: 'categories',
    name: 'category',
    type: 'link',
    icon: 'list',
  },
  {
    state: 'clubs',
    name: 'club',
    type: 'link',
    icon: 'business',
  },
  {
    state: 'locations',
    name: 'location',
    type: 'sub',
    icon: 'location_on',
    children: [
      {
        state: '',
        name: 'list',
        icon: 'list'
      },
      {
        state: 'map',
        name: 'map',
        icon: 'map'
      }
    ]
  },
  {
    state: 'members',
    name: 'member',
    type: 'sub',
    icon: 'nature_people',
    children: [
      {
        state: '',
        name: 'main',
        icon: 'list',
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      }
    ]
  },
  {
    state: 'settings',
    name: 'setting',
    type: 'link',
    icon: 'settings',
  },
  {
    state: 'sponsors',
    name: 'sponsor',
    type: 'sub',
    icon: 'euro_symbol',
    children: [
      {
        state: '',
        name: 'list',
        icon: 'list',
      },
      {
        state: 'create',
        name: 'create',
        icon: 'euro_symbol'
      }
    ]
  },
  {
    state: 'teams',
    name: 'team',
    type: 'sub',
    icon: 'people_outline',
    children: [
      {
        state: '',
        name: 'main',
        icon: 'list',
      },
      {
        state: 'teamOfTheMonth',
        name: 'teamOfTheMonth',
        icon: 'event'
      },
      {
        state: 'media',
        name: 'media',
        icon: 'cloud_upload'
      }
    ]
  },
  {
    state: 'users',
    name: 'user',
    type: 'sub',
    icon: 'people',
    children: [
      {
        state: '',
        name: 'main',
        icon: 'accessibility'
      },
      {
        state: 'roles',
        name: 'roles',
        icon: 'people'
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      }
    ]
  },
  {
    state: 'tasks',
    name: 'task',
    type: 'sub',
    icon: 'bug_report',
    children: [
      {
        state: '',
        name: 'open',
        icon: 'lock_open'
      },
      {
        state: 'closed-tasks',
        name: 'closed',
        icon: 'close'
      },
      {
        state: 'own-tasks',
        name: 'my',
        icon: 'person'
      }
    ]
  },
  {
    state: 'apps',
    name: 'APPS',
    type: 'sub',
    icon: 'apps',
    badge: [
      {
        type: 'red',
        value: '5'
      }
    ],
    children: [
      {
        state: 'calendar',
        name: 'CALENDAR'
      },
      {
        state: 'media',
        name: 'MEDIA'
      },
      {
        state: 'messages',
        name: 'MESSAGES'
      },
      {
        state: 'social',
        name: 'SOCIAL'
      },
      {
        state: 'chat',
        name: 'CHAT'
      }
    ]
  },
  {
    state: 'widgets',
    name: 'WIDGETS',
    type: 'link',
    icon: 'photo'
  },
  {
    state: 'material',
    name: 'MATERIAL',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      {
        type: 'purple',
        value: '10'
      }
    ],
    children: [
      {
        state: 'button',
        name: 'BUTTON'
      },
      {
        state: 'cards',
        name: 'CARDS'
      },
      {
        state: 'select',
        name: 'SELECT'
      },
      {
        state: 'autocomplete',
        name: 'AUTOCOMPLETE'
      },
      {
        state: 'datepicker',
        name: 'DATEPICKER'
      },
      {
        state: 'expansion',
        name: 'EXPANSION'
      },
      {
        state: 'table',
        name: 'TABLE'
      },
      {
        state: 'chips',
        name: 'CHIPS'
      },
      {
        state: 'input',
        name: 'INPUT'
      },
      {
        state: 'checkbox',
        name: 'CHECKBOX'
      },
      {
        state: 'radio',
        name: 'RADIO'
      },
      {
        state: 'toolbar',
        name: 'TOOLBAR'
      },
      {
        state: 'lists',
        name: 'LISTS'
      },
      {
        state: 'grid',
        name: 'GRID'
      },
      {
        state: 'progress',
        name: 'PROGRESS'
      },
      {
        state: 'tabs',
        name: 'TABS'
      },
      {
        state: 'switch',
        name: 'SWITCH'
      },
      {
        state: 'tooltip',
        name: 'TOOLTIP'
      },
      {
        state: 'menu',
        name: 'MENU'
      },
      {
        state: 'slider',
        name: 'SLIDER'
      },
      {
        state: 'snackbar',
        name: 'SNACKBAR'
      },
      {
        state: 'dialog',
        name: 'DIALOG'
      }
    ]
  },
  {
    state: 'forms',
    name: 'FORMS',
    type: 'sub',
    icon: 'looks_3',
    children: [
      {
        state: 'editor',
        name: 'EDITOR'
      },
      {
        state: 'validation',
        name: 'VALIDATION'
      },
      {
        state: 'upload',
        name: 'UPLOAD'
      },
      {
        state: 'tree',
        name: 'TREE'
      },
    ]
  },
  {
    state: 'tables',
    name: 'DATATABLE',
    type: 'sub',
    icon: 'format_line_spacing',
    badge: [
      {
        type: 'blue-grey', value: '8'
      }
    ],
    children: [
      {
        state: 'fullscreen',
        name: 'FULLSCREEN'
      },
      {
        state: 'editing',
        name: 'EDITING'
      },
      {
        state: 'filter',
        name: 'FILTER'
      },
      {
        state: 'paging',
        name: 'PAGING'
      },
      {
        state: 'sorting',
        name: 'SORTING'
      },
      {
        state: 'pinning',
        name: 'PINNING'
      },
      {
        state: 'selection',
        name: 'SELECTION'
      },
    ]
  },
  {
    state: 'ecommerce',
    name: 'ECOMMERCE',
    type: 'sub',
    icon: 'looks_3',
    badge: [
      {
        type: 'red', value: 'new'
      }
    ],
    children: [
      {
        state: 'products',
        name: 'PRODUCTS'
      },
      {
        state: 'compact',
        name: 'COMPACT'
      },
      {
        state: 'detail',
        name: 'DETAIL'
      },
    ]
  },
  {
    state: 'taskboard',
    name: 'TASKBOARD',
    type: 'link',
    icon: 'view_column',
  },
  {
    state: 'charts',
    name: 'CHARTS',
    type: 'link',
    icon: 'show_chart',
  },
  {
    state: 'maps',
    name: 'MAPS',
    type: 'sub',
    icon: 'navigation',
    children: [
      {
        state: 'google',
        name: 'GOOGLE'
      },
      {
        state: 'leaflet',
        name: 'LEAFLET'
      }
    ]
  },
  {
    state: 'dragndrop',
    name: 'DND',
    type: 'link',
    icon: 'show_chart',
  },
  {
    state: 'pages',
    name: 'PAGES',
    type: 'sub',
    icon: 'pages',
    children: [
      {
        state: 'invoice',
        name: 'INVOICE'
      },
      {
        state: 'timeline',
        name: 'TIMELINE'
      },
      {
        state: 'user',
        name: 'USER'
      },
      {
        state: 'blank',
        name: 'BLANK'
      },
      {
        state: 'pricing',
        name: 'PRICING'
      },
    ]
  },
  {
    state: 'session',
    name: 'SESSION',
    type: 'sub',
    icon: 'face',
    children: [
      {
        state: '404',
        name: '404'
      },
      {
        state: 'error',
        name: 'ERROR'
      },
      {
        state: 'signin',
        name: 'SIGNIN'
      },
      {
        state: 'signup',
        name: 'SIGNUP'
      },
      {
        state: 'forgot',
        name: 'FORGOT'
      },
      {
        state: 'lockscreen',
        name: 'LOCKSCREEN'
      },
    ]
  },
  {
    state: 'http://primer.nyasha.me/docs',
    name: 'DOCS',
    type: 'extTabLink',
    icon: 'local_library'
  }
];
