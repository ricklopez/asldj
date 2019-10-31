import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';


let sessionKey = sessionStorage.getItem('adal.idtoken');


export function fetchMigrations(data) {
    sessionKey = data.token || sessionKey;
    const headers = {
        Authorization: `Bearer ${sessionKey}`
    };

    const reqPromise = axios.get(env.MIGRATIONS_URL, {headers} );

    return {
        type: types.FETCH_MIGRATIONS,
        payload: reqPromise
    };
}


export function fetchLOBMappings(data) {
    sessionKey = data.token || sessionKey;
    const headers = {
        Authorization: `Bearer ${sessionKey}`
    };
    const reqPromise = axios.get(`${env.MIGRATIONS_URL}/${data.id}/lob-mappings`, {headers});


    return {
        type: types.FETCH_LOB_MAPPINGS,
        payload: reqPromise
    };
}

export function fetchPeriodMappings(data) {
    sessionKey = data.token || sessionKey;
    const headers = {
        Authorization: `Bearer ${sessionKey}`
    };
    const reqPromise = axios.get(`${env.MIGRATIONS_URL}/${data.id}/period-mappings`, {headers});


    return {
        type: types.FETCH_PERIODS_MAPPINGS,
        payload: reqPromise
    };
}

export function createMigration(data) {


    const reqPromise = axios.post(env.MIGRATIONS_URL,data, {
        headers: {
            'Content-Type': 'application/json'
        }});

    return {
        type: types.CREATE_MIGRATION,
        payload:reqPromise,
        meta: data
    };

}

export function editMigration(migration, token) {
    sessionKey = token || sessionKey;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/migrations/${migration.migrationId}`,migration, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`
        }});

    return {
        type: types.UPDATE_MIGRATION,
        payload: reqPromise
    };

}

export function fetchMigration(data) {
    sessionKey = data.token || sessionKey;
    const headers = {
        Authorization: `Bearer ${sessionKey}`
    };
    const reqPromise = axios.get(`${env.MIGRATION_URL}/${data.id}`, {headers});

    return {
        type: types.FETCH_MIGRATION,
        payload: reqPromise
    };
}