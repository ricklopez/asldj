import { FETCH_MIGRATIONS, FETCH_MIGRATION, CREATE_MIGRATION, STANDUP_DB, UPDATE_MIGRATION, FETCH_MAPPINGS } from '../constants/action-types';
// import objectAssign from 'object-assign';
import _ from 'lodash';

export default function(state = [], action) {

    switch (action.type) {

        case FETCH_MIGRATIONS:
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data;//_.mapKeys(action.payload.data, 'id');
            } else {
                return state;
            }

        case FETCH_MIGRATION:
            if(action.payload.data && action.payload.data.hasOwnProperty('migrationId'))
                return { ...state, [action.payload.data.migrationId]: action.payload.data }; //ES6
            return state;

        // case TASK_COMPLETED:
        //
        //     if (action.payload.status === 200 && action.payload.data) {
        //         return _.mapKeys(action.payload.data, 'id');
        //     } else {
        //         return state;
        //     }

        default:
            return state;
    }
}