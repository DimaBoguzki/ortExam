import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
    Text,
    ActivityIndicator,
    StyleSheet,
    Animated
} from 'react-native';

function Notification() {
    // state of notifocation
    const sn = useSelector(state=> state.notificationAppReducer);
    const [heightAnimate] = useState(new Animated.Value(0));
    const [display, setDisplay] = useState('none');
    let listenerHegth;
    useEffect(()=>{
        listenerHegth = heightAnimate.addListener(({value}) => {
            if(value===0)
                setDisplay('none');
            else
                setDisplay('flex');
        });
    },[]);
    useEffect(() => {
        if(sn.toggle===true){
            Animated.timing(heightAnimate, {toValue: 35, duration: 200}).start();
        }
        else {
            Animated.timing(heightAnimate,{toValue: 0,duration: 200}).start();
        }
    });
    useEffect(()=>{
        return ()=>{
            heightAnimate.removeListener(listenerHegth);
        }
    },[]);

    return (
        <Animated.View  style=
            {[styles.container,
                {height: heightAnimate, display:display, backgroundColor:sn.bg}]}>
                <ActivityIndicator style={{marginRight:10}} animating={sn.loading} size="small" color='#000'/>
                <Text style={[styles.text,{color:sn.bg!=='white'?'white':'black'}]}>
                    {sn.message}
                </Text>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        width: '100%',
        borderBottomWidth: 1,
        elevation: 6,
        fontSize:50
    },
    text: {
        fontSize: 20,
    }
});
export default Notification;