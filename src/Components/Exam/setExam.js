import React  from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

function SetExam(props) {
    return(
        <View style={styles.SetExamContainer}>
            <View style={styles.contentSetExam}>
                <TouchableOpacity 
                style={styles.btnsSetExam}
                onPress={()=>props.navigation.navigate('BarCodeReader',{type:'exam'})}>
                    <Text style={styles.btnTxt}>{"סרוק ברקוד מבחן"}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.btnsSetExam} onPress={()=>props.navigation.navigate('ManualInput',{type:'exam'})}>
                    <Text style={styles.btnTxt}>{"מספר מבחן ידני"}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnCloseSetExam}
                    onPress={()=>props.navigation.navigate('ListExam')}>
                    <Image
                    source={require('../../img/icon/cancel_icon.png')}
                    style={{width:96,height:96}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    SetExamContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    contentSetExam: {
        padding : 50,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: "center",
        alignItems: 'center',
        borderWidth:1,
        borderRadius:10,
   },
    btnsSetExam:{
        width:'90%',
        marginBottom:10,
        padding:20,
        backgroundColor:'#047AF7',
        borderWidth:1,
        borderRadius:10,
    },
    btnCloseSetExam:{
        elevation: 2,
        borderRadius: 50
    },
    btnTxt:{
        color:'#fff',
        textAlign:'center',
        fontSize:14,
    },
});
export default SetExam;