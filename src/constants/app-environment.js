//export const AUTH_ROOT_URL = 'http://5d834a49c9e3410014071357.mockapi.io/api/v1';
export const AUTH_ROOT_URL = `${process.env.REACT_APP_AUTH_ROOT_URL}/api/v1` || 'https://localhost:44307/api/v1';
export const SIGN_IN_URL = `${AUTH_ROOT_URL}/login?auth=xyz`;
export const MIGRATIONS_URL = `${AUTH_ROOT_URL}/migrations`;
export const PERIOD_MAPPINGS_URL = `${AUTH_ROOT_URL}/period-mappings?auth=xyz`;
export const LOB_MAPPINGS_URL = `${AUTH_ROOT_URL}/lob-mappings?auth=xyz`;
export const DEST_LOB_URL = `${AUTH_ROOT_URL}/migrations?auth=xyz`;
export const MIGRATION_URL = `${AUTH_ROOT_URL}/migrations`;
export const STANDUP_DB = `${AUTH_ROOT_URL}/migrations`;