import { 
    FETCH_ALL_EXAMS_SUCCESS,
    FETCH_EXAM_FAIL,
    FETCH_EXAM_SUCCESS,
    CLOSE_EXAM_FAIL,
    CLOSE_EXAM_SUCCESS,
    TOGGLE_STUDENT_FAIL,
    TOGGLE_STUDENT_SUCCESS
 } from './examType';

 export const fetchAllExamsSuccess=(exam)=>{
    return {
        type: FETCH_ALL_EXAMS_SUCCESS,
        payload: exam,
    }
}
export const fetchExamSuccess=(exam)=>{
    return {
        type: FETCH_EXAM_SUCCESS,
        payload: exam,
    }
}
export const fetchExamFail=(error)=>{
    return {
        type: FETCH_EXAM_FAIL,
        payload: error,
    }
}
export const closeExamSuccsess = (exam_code) => {
    return {
        type: CLOSE_EXAM_SUCCESS,
        payload: exam_code
    }
}
export const closeExamFail = (error) => {
    return {
        type: CLOSE_EXAM_FAIL,
        payload: error,
    }
}

export const toggleStudentSuccess = (obj) => {
    return {
        type: TOGGLE_STUDENT_SUCCESS,
        payload: obj
    }
}
export const toggledStudentFail = (err) => {
    return {
        type: TOGGLE_STUDENT_FAIL,
        payload: err
    }
}