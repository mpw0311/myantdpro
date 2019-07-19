export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './Login/Login' },
      { path: '/user/register', name: 'register', component: './Login/Register' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      { path: '/', redirect: '/home' },
      // home
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './Home/Home',
      },
      // system
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        authority: ['admin'],
        routes: [
          {
            path: '/system/users',
            name: 'user',
            component: './System/User',
          },
          {
            path: '/system/menus',
            name: 'menu',
            component: './System/Menu',
          },
          {
            path: '/system/interfaces',
            name: 'interface',
            component: './System/Interface',
          },
          {
            path: '/system/dictionaries',
            name: 'dictionary',
            routes: [
              {
                path: '/system/dictionaries',
                component: './System/Dict',
              },
              {
                path: '/system/dictionaries/:id',
                hideInMenu: true,
                component: './System/Dict',
              },
            ],
          },
        ],
      },
      // exception
      {
        path: '/exception',
        name: 'exception',
        icon: 'warning',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
