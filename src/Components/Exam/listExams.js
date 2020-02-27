import React from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

function ListExams(props) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/background/background.png')} 
                style={{width: '100%', height: '100%'}}>
            <View style={styles.centerListExam}>
                {/* רשימת המבחנים */}
                <ScrollView style={{width:'100%'}}>
                    {props.children}
                </ScrollView>
            </View>
            <View style={styles.bottomListExam}>
                <TouchableOpacity
                        style={styles.btnStartExamp}
                        onPress={() => props.navigation.navigate('SetExam')}>
                        <Text style={{color:'#fff',textAlign:'center',fontSize:18}}>
                            הוסף מבחן
                        </Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flexDirection:'column',
    },
    centerListExam:{
        flex:4,
        padding: 10,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
    },
    bottomListExam :{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
   },
   btnStartExamp:{
    width:'88%',
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#047AF7',
    padding:10,
    elevation: 3
    },

});

export default ListExams;