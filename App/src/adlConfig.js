import { AuthenticationContext, adalFetch } from 'react-adal';
import * as env from './constants/app-environment';


let redirectUrl = './dashboard';

switch (window.location.hostname) {
    case 'qqmigration.qqsolutions.com':
        redirectUrl = 'https://qqmigration.qqsolutions.com/dashboard';
        break;
    case 'qqmigration-qa.qqsolutions.com':
        redirectUrl = 'https://qqmigration-qa.qqsolutions.com/dashboard';
        break;
    case 'qqmigration-dev.qqsolutions.com':
        redirectUrl = 'https://qqmigration-dev.qqsolutions.com/dashboard';
        break;
    case 'localhost':
        redirectUrl = 'http://localhost:3000/dashboard';
        break;
    default:
        redirectUrl = 'http://localhost:3000/dashboard';
        break;
}

const adlConfigValue = {
    tenant: '9abc9a0d-17f0-4f74-9195-ec797d5dd726',
    clientId: 'fe92e92e-24c3-4eab-870b-49b1308d46b9',
    redirectUri: redirectUrl,
    endpoints: {
        api: `${env.AUTH_ROOT_URL}/User/current`
    },
    cacheLocation: 'sessionStorage'
};


export const adalConfig = adlConfigValue;

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const user = {...authContext.getCachedUser(), token:sessionStorage.getItem('adal.idtoken') };
