import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';

export function completeTask(data) {
    const reqPromise = axios.put(`http://localhost:51044/api/v1/migrations/${data.id}`,{
        IsPhase1: true
    }, {
        headers: {
            'Content-Type': 'application/json'
        }});

    return {
        type: types.UPDATE_MIGRATION,
        payload: reqPromise
    };
}


export function updateLobMapping(data) {
    debugger;
    const reqPromise = axios.put(`http://localhost:51044/api/v1/lob-mappings`, data, {
        headers: {
            'Content-Type': 'application/json'
        }});

    console.log(data);

    return {
        type: types.UPDATE_LOB_MAPPING,
        payload: reqPromise
    };
}

export function createStandUpDB(migration) {

    migration.isPhase1 = true;
    const reqPromise = axios.put(`http://localhost:51044/api/v1/migrations/${migration.migrationId}`,migration, {
        headers: {
            'Content-Type': 'application/json'
        }});

    return {
        type: types.STANDUP_DB,
        payload: reqPromise
    };

}