export const MENUITEMS = [
  {
    state: '/',
    name: 'dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: '/',
    name: 'event',
    type: 'link',
    icon: 'event'
  },
  {
    state: 'uploader',
    name: 'uploader',
    type: 'link',
    icon: 'file_upload',
    badge: [
      {
        type: 'yellow',
        value: '?'
      }
    ],
  },
  {
    state: 'articles',
    name: 'article',
    type: 'sub',
    icon: 'text_format',
    badge: [
      {
        type: 'red',
        value: '!'
      }
    ],
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
    icon: 'list'
  },
  {
    state: 'clubs',
    name: 'club',
    type: 'link',
    icon: 'business'
  },
  {
    state: 'locations',
    name: 'location',
    type: 'sub',
    icon: 'location_on',
    badge: [
      {
        type: 'yellow',
        value: '?'
      }
    ],
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
      }/*,
      {
        state: 'edit',
        name: 'create',
        icon: 'note_add'
      }*/
    ]
  },
  {
    state: 'members',
    name: 'member',
    type: 'sub',
    icon: 'nature_people',
    badge: [
      {
        type: 'red',
        value: '!'
      }
    ],
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
    badge: [
      {
        type: 'yellow',
        value: '?'
      }
    ]
  },
  {
    state: 'sponsors',
    name: 'sponsor',
    type: 'sub',
    icon: 'euro_symbol',
    badge: [
      {
        type: 'yellow',
        value: '?'
      }
    ],
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
    badge: [
      {
        type: 'red',
        value: '!'
      }
    ],
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
    type: 'link',
    icon: 'people'
  }
];
