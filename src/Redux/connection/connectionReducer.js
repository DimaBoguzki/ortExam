import {
    CHECK_SERVER_FAIL,
    CHECK_SERVER_SUCCESS,
    CHECK_SERVER,
    CONNECTED,
    DISCONNECTED
} from './connectionType';

const initialState = {
    connection: false,
    server: false,
    loading: false,
}

const connectionReducer = (state=initialState, action) => {
    switch (action.type) {
        case CHECK_SERVER:
            return {
                ...state,
                loading: true
            }
        case CHECK_SERVER_SUCCESS:
            return {
                ...state,
                server: true,
                loading: false
            }
        case CHECK_SERVER_FAIL:
            return {
                ...state,
                server: false,
                loading: false
            }
        case CONNECTED:
            return {
                ...state,
                connection: true
            }
        case DISCONNECTED:
            return {
                ...state,
                connection: false
            }
        default: 
            return state;
    }
}

export default connectionReducer;