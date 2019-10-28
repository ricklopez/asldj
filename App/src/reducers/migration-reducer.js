import { FETCH_MIGRATIONS, FETCH_MIGRATION, CREATE_MIGRATION, STANDUP_DB, UPDATE_MIGRATION, FETCH_MAPPINGS } from '../constants/action-types';
// import objectAssign from 'object-assign';
import _ from 'lodash';

export default function(state = {
    standUpComplete:false,
    migrationName: null
}, action) {

    switch (action.type) {


        case FETCH_MIGRATION:
            return action.payload.data[0] ; //ES6

        case UPDATE_MIGRATION:
            debugger;
            return state;

        case CREATE_MIGRATION:
            console.log(action);
            debugger;
            return {migrationId: action.payload.data[0], ...action.meta};

        case STANDUP_DB:

            return {standUpComplete: true, ...state};

        default:
            return state;
    }
}