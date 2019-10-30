import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig =  {
    tenant: '9abc9a0d-17f0-4f74-9195-ec797d5dd726',
    clientId: 'fe92e92e-24c3-4eab-870b-49b1308d46b9',
    redirectUri: process.env.NODE_ENV === 'production' ? 'https://qqmigration-dev.qqsolutions.com/dashboard' :  'http://localhost:5000/dashboard',
    endpoints: {
        api:  process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_AUTH_ROOT_URL}/api/v1/User/current` : 'https://localhost:44307/api/User/current'
    },
    cacheLocation: 'sessionStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const user = {...authContext.getCachedUser()cd , token:sessionStorage.getItem('adal.idtoken') };