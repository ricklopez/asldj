import {
    FETCH_PERIODS_MAPPINGS,
    UPDATE_PERIOD_MAPPING
} from '../constants/action-types';
// import objectAssign from 'object-assign';
import _ from 'lodash';

export default function(state = [], action) {

    switch (action.type) {


        case FETCH_PERIODS_MAPPINGS:
            console.log('Reducer: ', action);
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data;//_.mapKeys(action.payload.data, 'id');
            } else {
                return state;
            }
        case UPDATE_PERIOD_MAPPING:
            return state;

        default:
            return state;
    }
}