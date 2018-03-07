// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  aws: {
    cognito: {
      region: 'eu-central-1',
      identityPoolId: 'eu-central-1:a84a03f8-e2e9-4469-a80b-100aadb02aac',
      userPoolId: 'eu-central-1_CrJj0k3Qq',
      clientId: 'e3jrlecbgp3lbt5jg74akbc59'
    },
    s3: {
      user: {
        region: 'us-east-2',
        bucket: 'app.dev.store'
      },
      provider: {
        region: 'us-east-2',
        bucket: 'provider.dev.store'
      }
    }
  },
  api: {
    url: 'https://api.tech-stm.net/dev'
  },
  skylink: {
    appKey: '9aaa8a58-c193-4569-bdba-940e5e9f3d31',
    secret: 'kmmzsqicvetdq'
  },
  endPoints: {
    freegeoip: 'https://freegeoip.net/json',
    restcountries: 'https://restcountries.eu/rest/v2/alpha',
    listOfCountries: 'https://api.vk.com/api.php?oauth=1',
    listOfCities: 'https://api.vk.com/api.php?oauth=1'
  }
};
