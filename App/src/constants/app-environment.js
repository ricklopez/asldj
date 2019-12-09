let apiUrl = 'http://localhost:60526/api/v1';
//let env = process.env.REACT_NODE_ENV ? process.env.REACT_NODE_ENV : process.env.NODE_ENV;
let env = window.location.hostname;

console.log(env);
switch (env) {
    case 'qqmigration.qqsolutions.com':
        apiUrl = 'https://qqmigrationapi.qqsolutions.com';
        break;
    case 'qqmigration-qa.qqsolutions.com':
        apiUrl = 'https://qqmigrationapi-qa.qqsolutions.com';
        break;
    case 'qqmigration-dev.qqsolutions.com':
        apiUrl = 'https://qqmigrationapi-dev.qqsolutions.com';
        break;
    case 'localhost':
        apiUrl = 'http://localhost:60526';
        break;
    default:
        apiUrl = 'http://localhost:60526';
        break;
}
export const AUTH_ROOT_URL = `${apiUrl}/api/v1` || 'https://localhost:44307/api/v1';
export const SIGN_IN_URL = `${AUTH_ROOT_URL}/login?auth=xyz`;
export const MIGRATIONS_URL = `${AUTH_ROOT_URL}/migrations`;
export const PERIOD_MAPPINGS_URL = `${AUTH_ROOT_URL}/period-mappings?auth=xyz`;
export const LOB_MAPPINGS_URL = `${AUTH_ROOT_URL}/lob-mappings?auth=xyz`;
export const DEST_LOB_URL = `${AUTH_ROOT_URL}/migrations?auth=xyz`;
export const MIGRATION_URL = `${AUTH_ROOT_URL}/migrations`;
export const STANDUP_DB = `${AUTH_ROOT_URL}/migrations`;

