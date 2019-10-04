import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SignIn from './sign-in-reducer';
import Migrations from './migration-reducer';
import LOBMappings from './lob-mappings-reducer';
import PeriodsMappings from './periods-mappings-reducer';

const rootReducer = combineReducers({
    signIn: SignIn,
    form: formReducer,
    migrations: Migrations,
    lobMappings: LOBMappings,
    periodsMappings: PeriodsMappings,
});

export default rootReducer;