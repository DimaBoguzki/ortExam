import React, { useEffect } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import RouteExams from './Exam/routeExams';
import MainHeader from './mainHeader';
import {useSelector, useDispatch} from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { supervisorDisconnect } from '../Redux/supervisor/supervisorAction';
import axios from 'axios';
import { HOST,PORT } from 'react-native-dotenv';
import { 
    fetchAllExamsSuccess,
    fetchExamFail
 } from '../Redux/exam/examAction';
 import { 
    hideNotifocation,
    notifocationError,
    notifocationSuccess,
    notifocationWaiting
} from '../Redux/notificationApp/notificationAppAction';

const Tab = createBottomTabNavigator();


function RouteMain() {
    const supervisorState = useSelector(state=>state.supervisorReducer);
    const dispatch = useDispatch();

    // function to fetxh all open exam off supervisor
    const getAllExams = () => {
        // notification loading all exams
        dispatch(notifocationWaiting("טוען נתונים..."));
        // fetch exams
        axios.post("http://"+HOST+":"+PORT+"/exam/getAllOpenExamsBySupervisor",
            {supervisor_id:supervisorState.supervisor.supervisor_id})
        .then((response)=>{
            dispatch(notifocationSuccess("הנתנוים נקלטו בהצלחה"));
            setTimeout(()=>dispatch(hideNotifocation()),1000);
            dispatch(fetchAllExamsSuccess(response.data));
        })
        .catch((err)=>{
            console.log(err,"fetch all exams");
            dispatch(notifocationError("לא צלח טעינת הנתונים"));
            setTimeout(()=>dispatch(hideNotifocation()),4000);
            dispatch(fetchExamFail(err));
        })
    }
    useEffect(() => {
        getAllExams();
    },[]);

    let text = supervisorState.supervisor.gender===1 ? ' ברוכה הבאה ' : ' ברוך הבא ';
            text+=supervisorState.supervisor.first_name;

    const tabStyle = {
        backgroundColor:"white",
    }
    const labelStyle = {
        fontSize: 20,
        padding: 0,
    }
    return (
        <View style={styles.container}>
            <MainHeader text={text} onDisconect={()=>{dispatch(supervisorDisconnect())}}/>
            <NavigationContainer>   
                <Tab.Navigator 
                    initialRouteName='RouteExams'
                    tabBarOptions={{activeTintColor: '#ff0000',tabStyle:tabStyle,labelStyle:labelStyle}}>
                    <Tab.Screen name='About' component={About} options={{title:"אודות"}} />
                    <Tab.Screen name="RouteExams" component={RouteExams} options={{title:"מבחנים"}}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}
const About = () =>{
    return (
        <View>
            <Text>בפיתוח...</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tabsBar:{
        backgroundColor:'#ffffff',
        padding:10,
    },
    navBar: {
        backgroundColor: '#ffffff',
      },
      navBarTitle:{
        alignSelf:'center',
        width:'90%',
        textAlign:'right',
      }
});
export default RouteMain;