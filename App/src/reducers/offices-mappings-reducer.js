import {
    FETCH_OFFICE_MAPPINGS,
    UPDATE_OFFICE_MAPPING
} from '../constants/action-types';
// import objectAssign from 'object-assign';
//import _ from 'lodash';

export default function(state = [], action) {

    switch (action.type) {


        case FETCH_OFFICE_MAPPINGS:
            debugger;
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data.map((item, index) => {return { id: index, ...item};});
            } else {
                return state;
            }
        case UPDATE_OFFICE_MAPPING:
            return state;

        default:
            return state;
    }
}