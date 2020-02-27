import {
    FETCH_SUPERVISOR,
    FETCH_SUPERVISOR_FAIL,
    FETCH_SUPERVISOR_SUCCESS,
    SUPERVISOR_DICONNECT
} from './supervisorType';

export const fetchSupervisor = () =>{
    return {
        type: FETCH_SUPERVISOR
    }
}
export const fetchSupervisorSuccess = (supervisor) =>{
    return {
        type: FETCH_SUPERVISOR_SUCCESS,
        payload: supervisor
    }
}
export const fetchSupervisorFail = (error) =>{
    return {
        type: FETCH_SUPERVISOR_FAIL,
        payload: error
    }
}
export const supervisorDisconnect = () => {
    return {
        type: SUPERVISOR_DICONNECT
    }
}
