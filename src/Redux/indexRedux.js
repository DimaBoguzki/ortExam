import examsReducer from './exam/examReducer';
import supervisorReducer from './supervisor/supervisorReducer';
import connectionReducer from './connection/connectionReducer';
import notificationAppReducer from './notificationApp/notificationAppReducer';

import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    supervisorReducer: supervisorReducer,
    examsReducer : examsReducer,
    connectionReducer: connectionReducer,
    notificationAppReducer: notificationAppReducer
});

export default rootReducers;