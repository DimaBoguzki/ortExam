import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { HOST,PORT } from 'react-native-dotenv';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import ListExams from './listExams';
import SetExam from './setExam';
import ManualInput from '../manualInput';
import BarCodeReader from '../barCodeReader';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationHeader from '../navigationHeader';
import {
    fetchExamFail,
    fetchExamSuccess,
} from '../../Redux/exam/examAction';
import Exam from './exam';
import { 
    hideNotifocation,
    notifocationError,
    notifocationSuccess,
    notifocationWaiting

} from '../../Redux/notificationApp/notificationAppAction';


function RouteExams(props) {
    // hooks state
    const [indexExam, setIndexExam] = useState(-1);
    // state of exam redux
    const stateExams = useSelector(state=>state.examsReducer);
    // state supervisor
    const supervosirID = useSelector(state=>state.supervisorReducer.supervisor.supervisor_id);
    // state connection nd server
    const connection = useSelector(state=>state.connectionReducer); 
    // navigations stack
    const Stack = createStackNavigator();
    // use action to redux
    const dispatch = useDispatch();
    // function fetch new exam
    const getExamByCode=(code) => {
        if(examIsExist(parseInt(code))===true) { // if exam is exist then return from function
            dispatch(notifocationError("מבחן כבר קיים ברשימה"));
            setTimeout(()=>{dispatch(hideNotifocation())},3000);
            return;
        }
        if(!connection.connection) {// if do not have connection to intenet
            dispatch(notifocationError("אין חיבור לרשת"));
            return;
        }
        else if(!connection.server) { // if sever is not connected
            dispatch(notifocationError("אין תגובה מהשרת"));
            setTimeout(()=>{dispatch(hideNotifocation())},3000);
            return;
        }
        dispatch(notifocationWaiting("מחפש מבחן"));
        axios.post('http://'+HOST+':'+PORT+'/exam/getExam',{exam_code:code,supervisor_id: supervosirID})
        .then(response => {
            if(response.data.examData!==null){
                dispatch(notifocationSuccess("מבחן נפתח"));
                setTimeout(()=>{dispatch(hideNotifocation())},2000);
                dispatch(fetchExamSuccess(response.data));
            }
            else{
                dispatch(fetchExamFail("exam not exist"));
                dispatch(notifocationError("מבחן לא קיים במאגר"));
                setTimeout(()=>{dispatch(hideNotifocation())},3000);
            };
        })
        .catch((err) => {
            console.log(err,"fetch exams");
            dispatch(fetchExamFail(err));
            dispatch(notifocationError("תקלה פנה לאחראי"));
            setTimeout(()=>{dispatch(hideNotifocation())},3000);
        })
    }

    // handle wjen user chice witch exam to open
    const handlePressExam=(exam_code,toClose)=>{
        const index = stateExams.exams.findIndex((el)=>el.examData.exam_code==exam_code);
        setIndexExam(index);
        // toClose: true or false to close exam
        props.navigation.navigate("exam",{closeExam:toClose,exam_code:exam_code,setStudent:false});
    }
    const examIsExist=(code)=>{
        let obj=null;
        obj = stateExams.exams.find((el)=>el.examData.exam_code===code);
        if(obj==null)
            return false;
        return true;
    }
    const handleOnSubmit = (code,type) => {
        // prevent submit if there not connection or disconnected server
        if(connection.server===false || connection.connection===false)
            return;  // prevent submit
        if(type==='exam') { // new input from manual input
            getExamByCode(code);
            props.navigation.navigate('ListExam');
        }
        else if(type==='student'){ // new input from barcodereader
            props.navigation.navigate('exam',{
                student_id: code,
                closeExam: false,
                setStudent: true
            });
        }
    }
    return (
        <>
        <Stack.Navigator initialRouteName="ListExam">
            <Stack.Screen name="ListExam" options={{headerShown: false}}>
                {
                (props)=>
                    <ListExams {...props}>
                    { 
                        stateExams.exams.map((el,i)=>{
                            let exfd = new Date(el.examData.date);
                            let date = (exfd.getDate()+'/'+(exfd.getMonth()+1)+'/'+exfd.getFullYear());
                            return (
                                <View key={i} style={styles.examItemContainer}>
                                    <TouchableOpacity style={styles.btnPanel}
                                        onPress={()=>{handlePressExam(el.examData.exam_code,true)}}>
                                        <Image 
                                            source={require('../../img/icon/save_icon.png')}
                                            style={{width:60,height:60}}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.examBtnItems} 
                                        onPress={()=>handlePressExam(el.examData.exam_code,false)}>
                                        <Text style={{fontSize:18}}>{el.examData.exam_name }</Text>
                                        <Text style={{fontSize:16}}>{el.examData.exam_code }</Text>
                                        <Text style={{fontSize:14}}>{date}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                    </ListExams>
                }
            </Stack.Screen>
            <Stack.Screen name="SetExam" component={SetExam}
                    options={{
                        title:"",
                        headerRight:()=> <NavigationHeader title="הוספת מבחן חדש"/>,
                        headerStyle: {backgroundColor:'#fff'},
                        headerShown: false
                    }}/>
            <Stack.Screen name="ManualInput"
                    options={{
                        title:"",
                        headerRight:()=> <NavigationHeader title="הכנס קוד מבחן ידני"/>,
                        headerStyle: {backgroundColor:'#fff'},
                    }}>
                {(props) => <ManualInput {...props} onSubmit={handleOnSubmit} type="exam" message={"הכנס ברקוד ידני"}/>}
            </Stack.Screen>
            <Stack.Screen name="BarCodeReader" options={{headerShown: false}}>
                {(props)=> <BarCodeReader {...props} onSubmit={handleOnSubmit} />}
            </Stack.Screen>
            {/*exam recive props exam data and indexExam*/}
            <Stack.Screen name="exam" options={{headerShown: false}}>
                    {(props)=><Exam {...props} onCloseExam={()=>setIndexExam(-1)}
                        exam={stateExams.exams[indexExam]}
                        indexExam={indexExam}/>}
            </Stack.Screen>
        </Stack.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flexDirection:'column',
    },
    btnOpenExam:{
        marginTop: 20,
        padding:30,
        flexDirection:"column",
        justifyContent: 'center',
        alignItems:"center",
        width:"95%",
        borderRadius:10,
        backgroundColor:'#eef',
    },
    examItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 3,
        padding: 10,
    },
    examBtnItems: {
        justifyContent: "flex-start",
        alignItems: 'center',
        width: '70%',
        padding: 2,
        borderWidth: 0.1,
        borderRadius: 10,
        elevation: 3
    },
    btnPanel: {
        padding: 3,
        alignItems:'center',
        justifyContent: 'center',
        margin: 1,
        elevation: 5,
        borderWidth: 0.5,
        width: '20%',
        backgroundColor: '#fff',
        borderRadius: 10
    },
});

export default RouteExams;