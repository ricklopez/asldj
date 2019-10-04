import { SIGN_IN } from '../constants/action-types';
import objectAssign from 'object-assign';

export default function(state = {}, action) {
    switch (action.type) {
        case SIGN_IN:
            if(action.payload.status === 200 && action.payload.data.auth === true ) {
                const newState = objectAssign({}, state, {user: action.payload.data});
                return newState;
            }else{
                const newState = objectAssign({}, state, {user: {auth:false}});
                return newState;
            }

        default:
            return state;
    }
}