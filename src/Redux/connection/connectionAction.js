import {
    CHECK_SERVER_FAIL,
    CHECK_SERVER_SUCCESS,
    CHECK_SERVER,
    CONNECTED,
    DISCONNECTED
} from './connectionType';
export const checkServer = () => {
    return {
        type: CHECK_SERVER
    }
}
export const checkServerSuccess = () => {
    return {
        type: CHECK_SERVER_SUCCESS
    }
}
export const checkServerFail = () => {
    return {
        type: CHECK_SERVER_FAIL
    }
}
export const connected = () => {
    return {
        type: CONNECTED
    }
}
export const disConnected = () => {
    return {
        type: DISCONNECTED
    }
}