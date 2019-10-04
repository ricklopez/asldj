import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';

export function fetchMigrations(data) {
    const reqPromise = axios.get(env.MIGRATIONS_URL);

    return {
        type: types.FETCH_MIGRATIONS,
        payload: reqPromise
    };
}


export function fetchLOBMappings(data) {
    const reqPromise = axios.get(env.LOB_MAPPINGS_URL);


    return {
        type: types.FETCH_LOB_MAPPINGS,
        payload: reqPromise
    };
}

export function fetchPeriodMappings(data) {
    const reqPromise = axios.get(env.PERIOD_MAPPINGS_URL);


    return {
        type: types.FETCH_PERIODS_MAPPINGS,
        payload: reqPromise
    };
}

export function createMigration(data, callback) {
    if(data.tasks === undefined){
        data.tasks = data.tasks;
    }
    const tasks = [];
    data.tasks.forEach((t) => {
        tasks.push({name: t, complete: false});
    });
    const reqPromise = axios.post(env.MIGRATIONS_URL,{
        applicant: { name: data.applicant, company: data.applicant + " Industries"},
        type: data.type,
        title: data.title,
        funder: data.funder,
        amount: data.amount,
        paymentAmount: data.payment,
        term: data.term,
        tasks: tasks
    })
        .then(() => callback());

    return {
        type: types.CREATE_MIGRATION,
        payload: reqPromise
    };
}

export function fetchMigration(id) {
    const reqPromise = axios.get(`${env.MIGRATION_URL}/${id}?auth=xyz`);

    return {
        type: types.FETCH_MIGRATION,
        payload: reqPromise
    };
}