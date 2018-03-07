export const MENUITEMS = [
  {
    state: '/',
    name: 'dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'calendar',
    name: 'event',
    type: 'link',
    icon: 'event'
  },
  {
    state: 'uploader',
    name: 'uploader',
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
      },
      {
        state: 'fame',
        name: 'fame',
        icon: 'alarm_on'
      }
    ]
  },
  {
    state: 'settings',
    name: 'setting',
    type: 'link',
    icon: 'settings'
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
        state: 'fame',
        name: 'fame',
        icon: 'alarm_on'
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
