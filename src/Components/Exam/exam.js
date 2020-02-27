import React,{ useState } from 'react';
import axios from 'axios';
import { HOST,PORT } from 'react-native-dotenv';
import { useSelector, useDispatch } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground
    
} from 'react-native';
import { 
    hideNotifocation,
    notifocationError,
    notifocationSuccess,
    notifocationWaiting
} from '../../Redux/notificationApp/notificationAppAction';
import { 
    closeExamFail,
    closeExamSuccsess,
    toggleStudentSuccess,
    toggledStudentFail
} from '../../Redux/exam/examAction';
import StudentCard from './studentCard';


function Exam(props) {
    const dispatch = useDispatch();
    const [indexStudent, setStudentIndex] = useState(-1)
    const [isShow, setIsShow] = useState(false);
    // state connection nd server
    const connection = useSelector(state=>state.connectionReducer);
    const exfd = new Date(props.exam.examData.date);
    const date = (exfd.getDate()+'/'+(exfd.getMonth()+1)+'/'+exfd.getFullYear());
    
    //function close exam
    const setExamToClose = (exam_code) => {
        // notifacation set exam
        dispatch(notifocationWaiting("סוגר מבחן..."));
        axios.post('http://'+HOST+':'+PORT+'/exam/closeExam',
            {exam_code:exam_code})
        .then((res)=> {
            if(res.data===true) {
                 // return to exam list component
                props.navigation.navigate('ListExam');
                // save changed in state reducer exam
                dispatch(closeExamSuccsess(exam_code));
                // notifocation exam is closed
                dispatch(notifocationSuccess("המבחן נסגר"));
                // hide notification after 2 sec
                setTimeout(()=>dispatch(hideNotifocation()),2000);
                props.onCloseExam();
            }
            else {
                // state exam do not chage....
                dispatch(closeExamFail("המבחן לא נסגר"));
                // notifocation error the exam do noe saved ind data base
                dispatch(notifocationError("המבחן לא נסגר"));
                // hide notification after 5 sec
                setTimeout(()=>dispatch(hideNotifocation()),5000);
            }
        })
        .catch((err)=> {
            console.log("$ error with close exams $",err);
            // state exam do not chage....
            dispatch(closeExamFail(err));
            // notifocation error the exam do noe saved ind data base
            dispatch(notifocationError("המבחן לא נשמר"));
            // hide notification after 5 sec
            setTimeout(()=>dispatch(hideNotifocation()),5000);
        })
    }

    // function set Student to exam
    const setStudent=(objToServer,objToState) => {
        dispatch(notifocationWaiting("המתן..."))
        axios.post('http://'+HOST+':'+PORT+'/exam/toggleStudent',objToServer)
        .then((res)=> {
            if(res.data===true) {
                // success absord
                dispatch(toggleStudentSuccess(objToState));
                // success absord notification
                dispatch(notifocationSuccess("הסטודנט נקלט"));
                // hide notification
                setTimeout(()=>{
                    dispatch(hideNotifocation());
                    handleCloseCardStudent();
                },600);
            }
            else {
                // fail absord student
                dispatch(toggledStudentFail('קליטת הסטודנט נכשלה'));
                dispatch(notifocationError("קליטת הסטודנט נכשלה"));
                // hide notification
                setTimeout(()=>{dispatch(hideNotifocation())},4000);
            }
        })
        .catch((err)=> {
                // fail absord student
                dispatch(toggledStudentFail(err));
                dispatch(notifocationError("קליטת הסטודנט נכשלה"));
                // hide notification
                setTimeout(()=>{dispatch(hideNotifocation())},4000);
        })
    }
    // on close exam
    const onCloseExam = (exam_code) => {
        if(!connection.connection){
            dispatch(notifocationError("אין חיבור לרשת"));
            return;
        }
        if(!connection.server){
            dispatch(notifocationError("אין תגובה מהשרת"));
            return;
        }
        setExamToClose(exam_code);
    }
    // handle to open student card
    const handleOpenStudentCard = (index) => {
        // set student index in array
        setStudentIndex(index);
        setIsShow(true);
    }
    // handle clode student card
    const handleCloseCardStudent= () => {
        setIsShow(false);
    }

    // to : is to remove or to absord
    const handleOnSubmitStudent = (to, studentId) => {
        const objServer = {
            exam_code: props.exam.examData.exam_code,
            student_id: studentId,
            isAbsorbed: to
        }
        const objState = {
            indexExam: props.indexExam,
            indexStudent: indexStudent,
            isAbsorbed: to
        }
        if(!connection.connection){
            dispatch(notifocationError("אין חיבור לרשת"));
            return;
        }
        if(!connection.server){
            dispatch(notifocationError("אין תגובה מהשרת"));
            return;
        }
        setStudent(objServer,objState);
    }
    return(
        <ImageBackground
        source={require('../../img/background/background.png')} 
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
            {/* header of exam */}
            <View style={styles.headerExam}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>{props.exam.examData.exam_name}</Text>
                <View style={styles.panel}>
                <TouchableOpacity style={styles.btnPanel}
                    onPress={()=>{onCloseExam(props.exam.examData.exam_code)}}>
                    <Image 
                        source={require('../../img/icon/save_icon.png')}
                        style={{width:48,height:48}}
                    />
                </TouchableOpacity>
                <View style={styles.panelCenter}>
                    <Text>{props.exam.examData.exam_code}</Text>
                    <Text style={{fontSize:14}}>{date}</Text>
                </View>
                <TouchableOpacity style={styles.btnPanel}
                    onPress={()=>props.navigation.navigate("ListExam")}>
                    <Image 
                        source={require('../../img/icon/back_icon.png')}
                        style={{width:48,height:48}}
                    />
                </TouchableOpacity>
                </View>
            </View>
            {/* list of all students */}
            <ScrollView style={{width:'90%'}} contentContainerStyle={styles.containerList}>
            {   
                props.exam.students.map((el,i)=> {
                    return (
                    <TouchableOpacity key={i} 
                        // i this is index student in array
                        onPress={()=>handleOpenStudentCard(i)} 
                        style={[styles.studentsBtn,{backgroundColor:el.isAbsorbed===0 ? '#FF5B41':'#029E00'}]}>
                        <Text style={[styles.text,{fontSize:24}]}>{el.first_name+" "+el.last_name}</Text>
                        <Text style={[styles.text,{fontSize:20}]}>{el.student_id}</Text>
                    </TouchableOpacity>)
                })
            }
            </ScrollView>
            {/**כפתור המצלמה */}
            <TouchableOpacity
                onPress={()=>{props.navigation.navigate('BarCodeReader',{type:'student'})}} 
                style={[styles.btnSetStudent,{right:10}]}>
                <Image
                    source={require('../../img/icon/camera_icon.png')}
                    style={{width:50,height:50}}
                />
            </TouchableOpacity>
            {/*כפתור הכנסת בר קוד ידנית */}
            <TouchableOpacity
                onPress={()=>{props.navigation.navigate('ManualInput',{type:'student'})}} 
                style={[styles.btnSetStudent,{left:10}]}>
                <Image
                    source={require('../../img/icon/pencil_icon.png')}
                    style={{width:50,height:50}}
                />
            </TouchableOpacity>
        </View>
        {/*student card */}
        { indexStudent !== -1 ?
        <StudentCard 
            onClose={handleCloseCardStudent}
            visible={isShow} 
            onSubmit={handleOnSubmitStudent}
            student={props.exam.students[indexStudent]}/> : null
        }       
        </ImageBackground>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        width: '100%',
        justifyContent:"center",
        alignItems:'center',
        flexDirection:"column",
    },
    containerList: {
        padding: 5,
    },
    studentsBtn: {
        padding: 10,
        marginTop: 5,
        backgroundColor: 'rgba(0,0,255,0.7)',
        alignItems: 'center',
        width: '100%',
        borderColor:'#000',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 3,
    },
    text: {
       color: '#ffff',
    },
    headerExam: {
        justifyContent: 'center',
        alignItems:'center',
        width: '100%',
        elevation: 5,
        padding: 10,
        backgroundColor: '#F4F4F4',
    },
    imgStyle: {
        position:"absolute", 
        top: 10,
        left:10,
        width:50,
        height:50,
    },
    panel: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    panelCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
    txtBtn: {
        fontSize: 12,
    },
    btnSetStudent: {
        position: 'absolute',
        bottom: 5,
        padding: 13,
        alignItems: 'center',
        elevation: 1,
        borderRadius: 50,
        zIndex:2
      },
 })

export default Exam;