// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDn8wfxEjBylgNnqCvRMcK0uR8gSpE3GFs',
    authDomain: 'sfw-dev.firebaseapp.com',
    databaseURL: 'https://sfw-dev.firebaseio.com',
    projectId: 'sfw-dev',
    storageBucket: 'sfw-dev.appspot.com',
    messagingSenderId: '241078219173'
  },
  envName: 'development',
  routerTracing: true
};
