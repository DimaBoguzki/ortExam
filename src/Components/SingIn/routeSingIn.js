import React from 'react';
import axios from 'axios';
import {View,Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HOST,PORT } from 'react-native-dotenv';
import {useSelector, useDispatch} from 'react-redux';
import SingIn from './singIn';
import {
    fetchSupervisor,
    fetchSupervisorFail,
    fetchSupervisorSuccess
} from '../../Redux/supervisor/supervisorAction';
import { 
    hideNotifocation,
    notifocationError,
    notifocationWaiting
} from '../../Redux/notificationApp/notificationAppAction';

const Tab = createBottomTabNavigator();

function RouteLogIn() {
    // state
    const supervisorState = useSelector(state=>state.supervisorReducer);
    const connection = useSelector(state=>state.connectionReducer); 
    // dispatch
    const dispatch = useDispatch();

    const checkSupervisor=(s)=>{
        dispatch(fetchSupervisor());
        dispatch(notifocationWaiting("בודק..."));
        axios.post("http://"+HOST+":"+PORT+"/supervisor/login",
        {id:s.id,password:s.password})
        .then(response => {
            if(response.data.logIn===false){
                dispatch(notifocationError(response.data.res));
                setTimeout(()=>{dispatch(hideNotifocation());},3000)
                dispatch(fetchSupervisorFail(response.res))
            }
            else {
                dispatch(fetchSupervisorSuccess(response.data.obj));
                setTimeout(()=>dispatch(hideNotifocation()),1000);
            }
        })
        .catch(error => {
            dispatch(fetchSupervisorFail("תקלה בהתחברות"));
            dispatch(fetchSupervisorFail(error));
        });
    }
    const handleOnSignIn=(e)=>{
        if(!connection.connection) {
            dispatch(notifocationError("אין חיבור לרשת"));
        }
        else if(!connection.server) {
            dispatch(notifocationError("אין תגובה מהשרת"));
            setTimeout(()=>{dispatch(hideNotifocation());},5000);
        }
        else checkSupervisor(e);
    }
    const tabStyle = {
        backgroundColor:"white",
    }
    const labelStyle = {
        fontSize: 20,

        padding: 0,
    }
    return (
        <>
        <NavigationContainer>   
            <Tab.Navigator 
                initialRouteName='התחברות ידנית' 
                tabBarOptions={{activeTintColor: '#ff0000',tabStyle:tabStyle,labelStyle:labelStyle}}>
                <Tab.Screen name="QR" component={QR} />
                <Tab.Screen name='התחברות ידנית' >
                    {(props)=> <SingIn {...props} onSignIn={handleOnSignIn} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
            {supervisorState.loading===true ? 
                <ActivityIndicator 
                animating={supervisorState.loading}
                size="large"
                color='#ff0000'/> : null
            }
        </>

    );
}

const QR = () => {
    return (
        <View style={{backgroundColor:'yellow',flex:1}}>
            <TouchableOpacity style = {{ margin: 128 }}>
                <Text>THIS IS LOGIN WITH QR</Text>
            </TouchableOpacity>
       </View>
    )
 }
export default RouteLogIn;