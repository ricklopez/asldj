import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';

export function completeTask(data) {
    const reqPromise = axios.put(`${env.MIGRATION_URL}/${data.id}?auth=xyz`,{
        id: data.id,
        phase: data.phase
    });

    return {
        type: types.UPDATE_MIGRATION,
        payload: reqPromise
    };
}

export function createStandUpDB(migrationId, callback) {


    const reqPromise = axios.post(env.STANDUP_DB,{migrationId}) .then(r => callback(r));

    return {
        type: types.STANDUP_DB,
        payload: reqPromise
    };

}