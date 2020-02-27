import {
    FETCH_SUPERVISOR,
    FETCH_SUPERVISOR_FAIL,
    FETCH_SUPERVISOR_SUCCESS,
    SUPERVISOR_DICONNECT
} from './supervisorType';
  
const initialState = {
    loading: false,
    singIn: false,
    supervisor: {},
    error: ''
}
  
const supervisorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUPERVISOR:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUPERVISOR_FAIL:
            return {
                ...state,
                loading: false,
                singIn: false,
                supervisor: {},
                error: action.payload
            }
        case FETCH_SUPERVISOR_SUCCESS:
            return {
                ...state,
                loading: false,
                singIn: true,
                supervisor: action.payload,
                error: ''
            }
        case SUPERVISOR_DICONNECT:
            return {
                ...state,
                supervisor:{},
                singIn: false
            }
      default: return state
    }
  }
  
  export default supervisorReducer;