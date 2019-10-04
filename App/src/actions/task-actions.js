import * as types from '../constants/action-types';
import * as env from '../constants/app-environment';
import axios from 'axios';

export function completeTask(data) {
    const reqPromise = axios.patch(`${env.COMPLETE_TASK_URL}/${data.id}/tasks/${data.taskId}?auth=xyz`,{
        loanId: data.id,
        taskId: data.taskId,
        completed: data.completed
    });

    return {
        type: types.TASK_COMPLETED,
        payload: reqPromise
    };
}