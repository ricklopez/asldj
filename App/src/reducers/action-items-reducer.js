import {
    FETCH_ACTION_ITEMS,
    UPDATE_ACTION_ITEM
} from '../constants/action-types';

export default function(state = [], action) {

    switch (action.type) {
        case FETCH_ACTION_ITEMS:
            if (action.payload.status === 200 && action.payload.data) {
                return action.payload.data.map((item, index) => {return { id: index, ...item};});
            } else {
                return state;
            }
        case UPDATE_ACTION_ITEM:
            return state;

        default:
            return state;
    }
}