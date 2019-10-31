import { UPDATE_LOB_MAPPING, FETCH_LOB_MAPPINGS } from '../constants/action-types';

// import objectAssign from 'object-assign';
//import _ from 'lodash';

export default function(state = [], action) {

    switch (action.type) {


        case FETCH_LOB_MAPPINGS:
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data.map((item, index) => {
                    item.id = index;
                    return { ...item};
                });
            } else {
                return state;
            }
        case UPDATE_LOB_MAPPING:
            return state;

        default:
            return state;
    }
}