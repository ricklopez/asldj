import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SignIn from './sign-in-reducer';
import Migrations from './migrations-reducer';
import Migration from './migration-reducer';
import LOBMappings from './lob-mappings-reducer';
import PeriodsMappings from './periods-mappings-reducer';
import OfficeMappings from './offices-mappings-reducer';
import ActionItems from './action-items-reducer';

const rootReducer = combineReducers({
    auth: SignIn,
    form: formReducer,
    migrations: Migrations,
    migration: Migration,
    lobMappings: LOBMappings,
    periodsMappings: PeriodsMappings,
    officeMappings:  OfficeMappings,
    actionItems:  ActionItems
});

export default rootReducer;