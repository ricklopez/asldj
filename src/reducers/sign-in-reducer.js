import { SIGN_IN } from '../constants/action-types';
import objectAssign from 'object-assign';
import { user  } from '../adlConfig';
import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export default function(state = {...user }, action) {
    switch (action.type) {
        case SIGN_IN:
            if(action.payload.status === 200 && action.payload.data ) {
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