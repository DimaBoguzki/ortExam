import { 
    FETCH_ALL_EXAMS_SUCCESS,
    FETCH_EXAM_FAIL,
    FETCH_EXAM_SUCCESS,
    CLOSE_EXAM_FAIL,
    CLOSE_EXAM_SUCCESS,
    TOGGLE_STUDENT_FAIL,
    TOGGLE_STUDENT_SUCCESS
 } from './examType';

 const initialState = {
    exams: [],
    error: ''
 }
 const examsReducer = (state=initialState, action) => {
     switch (action.type) {
        case FETCH_EXAM_SUCCESS: // fetcj one exam
            return {
                exams: [...state.exams, action.payload],
            }
        case FETCH_ALL_EXAMS_SUCCESS: // when fetch all exam at first time
            return {
                exams: action.payload,
            }
        case FETCH_EXAM_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case CLOSE_EXAM_SUCCESS:
            return {
                exams: state.exams.filter(exam=>exam.examData.exam_code!==action.payload),
                error: ''
            }
        case CLOSE_EXAM_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case TOGGLE_STUDENT_SUCCESS:
            return {
                ...state,
                state: state.exams[action.payload.indexExam].students[action.payload.indexStudent].isAbsorbed=action.payload.isAbsorbed
            }
        case TOGGLE_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default: return state
            
     }
 }
 export default examsReducer;