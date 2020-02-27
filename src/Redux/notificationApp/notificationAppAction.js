import {
    NOTIFICATION_ERROR,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_WAITING,
    HIDE_NOTIFICATION
} from './notificationAppType';

export const notifocationError = (message) => {
    return {
        type: NOTIFICATION_ERROR,
        payload: message
    }
}
export const notifocationSuccess = (message) => {
    return {
        type: NOTIFICATION_SUCCESS,
        payload: message
    }
}
export const notifocationWaiting = (message) => {
    return {
        type: NOTIFICATION_WAITING,
        payload: message
    }
}
export const hideNotifocation = () => {
    return {
        type: HIDE_NOTIFICATION,
    }
}