import { FETCH_MIGRATIONS, FETCH_MIGRATION, CREATE_MIGRATION, TASK_COMPLETED, FETCH_LOB_MAPPINGS } from '../constants/action-types';
// import objectAssign from 'object-assign';
import _ from 'lodash';

export default function(state = [], action) {

    switch (action.type) {


        case FETCH_LOB_MAPPINGS:
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data;//_.mapKeys(action.payload.data, 'id');
            } else {
                return state;
            }

        default:
            return state;
    }
}