import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';




export function fetchMigrations(data) {
    const headers = {
    };

    const reqPromise = axios.get('http://localhost:51044/api/v1/migrations', {headers});

    return {
        type: types.FETCH_MIGRATIONS,
        payload: reqPromise
    };
}


export function fetchLOBMappings(data) {
    const reqPromise = axios.get(`${env.MIGRATIONS_URL}/${data}/lob-mappings`);


    return {
        type: types.FETCH_LOB_MAPPINGS,
        payload: reqPromise
    };
}

export function fetchPeriodMappings(data) {
    const reqPromise = axios.get(`${env.MIGRATIONS_URL}/${data}/period-mappings`);


    return {
        type: types.FETCH_PERIODS_MAPPINGS,
        payload: reqPromise
    };
}

export function createMigration(data) {


    const reqPromise = axios.post('http://localhost:51044/api/v1/migrations',data, {
        headers: {
            'Content-Type': 'application/json'
        }});
    debugger;
    return {
        type: types.CREATE_MIGRATION,
        payload:reqPromise,
        meta: data
    };

}

export function fetchMigration(id) {
    const reqPromise = axios.get(`${env.MIGRATION_URL}/${id}?auth=xyz`);

    return {
        type: types.FETCH_MIGRATION,
        payload: reqPromise
    };
}