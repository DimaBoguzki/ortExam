import React from 'react';
import {StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
/**
 * header of main page with button disconnect
 * recive: props.text: string  
 */
function MainHeader(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.text}</Text>
            <TouchableOpacity style={styles.btnDisconect} onPress={props.onDisconect}>
                <Text style={{color:'#fff',fontSize:14}}>
                    {"התנתק"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:10,
        alignItems:'center',
        flexDirection:'row-reverse',
        justifyContent: 'space-between'
    },
    btnDisconect:{
        backgroundColor:'rgba(255,0,0,0.9)',
        padding:5,
        borderWidth:1,
        borderRadius:10,
        marginRight: 15,
        elevation:5
    },
    title:{
        color: '#0000aa',
        fontSize:16,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
});
export default MainHeader;