// eslint-disable-next-line
import { delay } from 'redux-saga/effects';
// eslint-disable-next-line
import { all, take } from 'redux-saga/effects';
import * as types from '../constants/action-types';

export function* helloSaga() {
    yield delay(1000);
}

export function* loadMigrationRequestSaga() {
    try{
        // // Step 1 Get Migration Request
        // const MigrationRequest = yield take(types.FETCH_MIGRATION);

        // Step 2 Get Tasks from Migration Request
        // const migration = yield MigrationRequest.payload.data;
        // const tasks = migration.isPhase1;//put({type: 'FETCH_Migration_REQUEST_SUCCESS', payload: MigrationRequest});


        // Step 3 Take TASK_COMPLETED then take action if a dependency
        const newTasksState = yield take(types.STANDUP_DB);
        if (newTasksState)
            window.alert("Stand Up Acknowledged");
    } catch(error) {
        yield console.log("Fetch_Failed", error);//put({type: 'FETCH_FAILED', error});
    }
}

// Single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        loadMigrationRequestSaga()
    ]);
}