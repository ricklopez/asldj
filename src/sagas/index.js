// eslint-disable-next-line
import { delay } from 'redux-saga/effects';
// eslint-disable-next-line
import { all, put, takeEvery, take } from 'redux-saga/effects';
import * as types from '../constants/action-types';

export function* helloSaga() {
    yield delay(1000);
    console.log('Hello Sagas!');
}

export function* loadMigrationRequestSaga() {
    try{
        // Step 1 Get Migration Request
        const MigrationRequest = yield take(types.FETCH_MIGRATION);
        console.log("Saga Migration Req:", MigrationRequest);

        // Step 2 Get Tasks from Migration Request
        const migration = yield MigrationRequest.payload.data;
        const tasks = migration.tasks;//put({type: 'FETCH_Migration_REQUEST_SUCCESS', payload: MigrationRequest});
        console.log("Tasks:", tasks);
        console.log("Migration:", migration);

        // Step 3 Take TASK_COMPLETED then take action if a dependency
        const newTasksState = yield take(types.STANDUP_DB);
        //const taskB = newTasksState.payload.data[migration.id - 1].tasks[1];
        console.log("New Task State:", newTasksState);
        //console.log("Task B:", taskB);
        if (newTasksState)
            window.alert("Task C Now Enabled");
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