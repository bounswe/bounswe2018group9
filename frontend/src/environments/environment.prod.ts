import { secret } from './environment.private';

export const environment = {
  production: true,
  endpoint: 'http://46.101.223.116/api',
  googleApiKey: secret.googleApiKey
};
