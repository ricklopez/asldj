import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';
import download from 'downloadjs'
let sessionKey = sessionStorage.getItem('adal.idtoken');


export function completeTask(data) {
    sessionKey = data.token || sessionKey;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/migrations/${data.id}`,{
        IsPhase1: true
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`
        }});

    return {
        type: types.UPDATE_MIGRATION,
        payload: reqPromise
    };
}

export function updateLOBMapping(data) {
    sessionKey = data.token || sessionKey;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/lob-mappings`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`

        }});

    return {
        type: types.UPDATE_LOB_MAPPING,
        payload: reqPromise
    };
}

export function updatePeriodMapping(data) {
    sessionKey = data.token || sessionKey;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/period-mappings`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`

        }});

    return {
        type: types.UPDATE_PERIOD_MAPPING,
        payload: reqPromise
    };
}

export function updateOfficeMapping(data) {
    sessionKey = data.token || sessionKey;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/office-mappings`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`

        }});

    return {
        type: types.UPDATE_OFFICE_MAPPING,
        payload: reqPromise
    };
}

export function updateActionItem(data) {
    sessionKey = data.token || sessionKey;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/migration-action-item/${data.id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`

        }});

    return {
        type: types.UPDATE_OFFICE_MAPPING,
        payload: reqPromise
    };
}

export function createStandUpDB(migration, data) {
    sessionKey = data.token || sessionKey;
    migration.isPhase1 = true;
    const reqPromise = axios.put(`${env.AUTH_ROOT_URL}/migrations/${migration.migrationId}`,migration, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`
        }});

    return {
        type: types.STANDUP_DB,
        payload: reqPromise
    };
}

export function downloadActionItemDetailsData(migration, data) {
    sessionKey = data.token || sessionKey;
    var url = `${env.AUTH_ROOT_URL}/migrations/${migration.migrationId}/action-item-details`;

    const reqPromise = axios.get(url, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionKey}`
        }})
        .then(response => {
           const content = response.headers['content-type'];
           download(response.data, "report.csv", content)
        })
        .catch(error => console.log(error));

    return {
        type: types.DOWNLOAD_ACTION_ITEM_DETAILS,
        payload: reqPromise
    }
}