import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';

export function signIn(data) {
    const reqPromise = axios.post(env.SIGN_IN_URL,{
        useremail: data.useremail,
        password: data.password
    });

    // Note: Redux Promise (Loaded in App.js) Intercepts this action and handles Promise for us
    // then dispatches another action of the same types but with a payload
    // set to the request response, so when this reached the Reducer it won't
    // be a Promise anymore

    return {
        type: types.SIGN_IN,
        payload: reqPromise
    };
}