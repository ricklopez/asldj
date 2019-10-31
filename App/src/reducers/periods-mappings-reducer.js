import {
    FETCH_PERIODS_MAPPINGS,
    UPDATE_PERIOD_MAPPING
} from '../constants/action-types';
// import objectAssign from 'object-assign';
//import _ from 'lodash';

export default function(state = [], action) {

    switch (action.type) {


        case FETCH_PERIODS_MAPPINGS:
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data.map((item, index) => {return { id: index, ...item};});
            } else {
                return state;
            }
        case UPDATE_PERIOD_MAPPING:
            return state;

        default:
            return state;
    }
}