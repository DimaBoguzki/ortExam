import React,{ useEffect, useState} from 'react';
import {ImageBackground,View,StyleSheet,Text} from 'react-native';
import RouteLogIn from './SingIn/routeSingIn';
import RouteMain from './routeMain';
import {useSelector} from 'react-redux';

function Welcome () {
    const supervisorSingIn = useSelector(state=>state.supervisorReducer.singIn)
    const [flag, setFlag] = useState(true); // flag for openn application
    useEffect(() => {
        setTimeout(()=>{
            setFlag(false)
          },2000)
    },[]);
    if(flag)
        return(
            <View style={styles.container}>
                <ImageBackground
                    source={require('../img/icon/ort_logo.png')} 
                    style={{width: 200, height: 200,backgroundColor:'#fff'}}/>
                <Text style={styles.devolopedText}>Developed by Dima Boguzki</Text>
            </View>
    )
    else if(flag===false && supervisorSingIn===true)
        return <RouteMain/>
    else
        return <RouteLogIn/>
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        justifyContent:"center",
        alignItems:"center",
    },
    devolopedText:{
        position:'absolute',
        bottom:50,
        left:20,
        fontSize:24,
        fontWeight: "bold",
        color:'#000',
        fontFamily: 'sans-serif-light'
    }
});
export default Welcome;