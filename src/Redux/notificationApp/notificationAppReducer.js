import {
    NOTIFICATION_ERROR,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_WAITING,
    HIDE_NOTIFICATION
} from './notificationAppType';

const initialState = {
    toggle: false,
    bg: 'white',
    loading: false,
    message: ''
}

const notificationAppReducer = (state=initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_ERROR:
            return {
                ...state,
                message: action.payload,
                bg: 'red',
                toggle: true,
                loading: false
            }
        case NOTIFICATION_SUCCESS:
            return {
                ...state,
                message: action.payload,
                bg: 'green',
                toggle: true,
                loading: false
            }
        case NOTIFICATION_WAITING:
            return {
                ...state,
                message: action.payload,
                bg: 'white',
                toggle: true,
                loading: true,
            }
        case HIDE_NOTIFICATION:
            return {
                ...state,
                message: '',
                toggle: false,
                loading: false
            }

    
        default:
            return state;
    }
}

export default notificationAppReducer;