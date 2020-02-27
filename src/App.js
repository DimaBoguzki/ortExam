import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import NetInfo from "@react-native-community/netinfo";
import Welcome from './Components/welcome';
import axios from 'axios';
import { HOST, PORT } from 'react-native-dotenv';
import {
  checkServerFail,
  checkServerSuccess,
  checkServer,
  connected,
  disConnected
} from './Redux/connection/connectionAction';
import { 
  hideNotifocation,
  notifocationError,
  notifocationSuccess,
 } from './Redux/notificationApp/notificationAppAction';
import Notification from './Components/notification';

function App() {
  // state object connection
  const [objConn, setObjConn] = useState(null);
  const stateConnection = useSelector(state=>state.connectionReducer);

  const dispatch = useDispatch();

  // subscribe varible to listener connection
  let unSubscribe=null
  // compennt did mount
  useEffect(()=>{
    // subscribe to connetion
    unSubscribe = NetInfo.addEventListener(state => {
      setObjConn(state);
    });
  },[]);

  // component wil unmount
  useEffect(()=> {
    //  call back function when component unmout
    return () => {
      unSubscribe();
    }
  },[]);

  // component did  update
  useEffect(()=>{
    if(objConn!==null){
      if(objConn.isConnected===true && stateConnection.connection===false){
        console.log("connectd App...");
        // app is connected
        dispatch(connected());
        // nofication is conected
        dispatch(notifocationSuccess("מחובר"));
        setTimeout(()=>{
          // jide notification of connection 
          dispatch(hideNotifocation());
          // check server
          fetchServer();
        },2000);
      }
      else if(objConn.isConnected===false && stateConnection.connection===true){
        console.log("disconnectd App...");
        dispatch(notifocationError('אין חיבור לרשת'));
        dispatch(disConnected());
      }
    }
  });
  // check if there responsed of server
  const fetchServer=()=> {
    dispatch(checkServer());
    axios.get('http://'+HOST+':'+PORT+'/test')
    .then( (res) => {
        if(res) {
          dispatch(checkServerSuccess());
          console.log("server is on.... "+ HOST);
        }
        else {
          dispatch(checkServerFail('אין תגובה מהשרת'));
          dispatch(notifocationError("אין תגובה מהשרת"));
          console.log("server is on.... "+ HOST);
        }
    })
    .catch((error) => {
      dispatch(checkServerFail());
      dispatch(notifocationError("אין תגובה מהשרת"));
      console.log(error,"error to get server");
    })
  }
  return (
    <>
      <Notification/>
      <Welcome/>
    </>
  );
}

export default App;
