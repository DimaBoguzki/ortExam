import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity,TextInput,Text} from 'react-native';
import CloseButon from './CloseButton';
/** 
 * הכנסה ידנית של ברקוד
 * props : type : string: id,exam
 * message : string
 */
class ManualInput extends Component {
    state = {
        input: '',
    }
    handleInput=(txt)=>{
        this.setState({input:txt})
    }
    handleOnSubmit=()=>{
        this.props.onSubmit(this.state.input,this.props.route.params.type);
    }
    handleOnClose=()=>{
        if(this.props.route.params.type==='exam')
            this.props.navigation.navigate('SetExam');
        else // else if type is set student
            this.props.navigation.navigate('student');
    }
    render() { 
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.message}
                        autoCapitalize = "none"
                        keyboardType='numeric'
                        onChangeText={this.handleInput}/>
                    <TouchableOpacity style={styles.btn} onPress={this.handleOnSubmit}>
                        <Text>אישור</Text>
                    </TouchableOpacity>
                    <CloseButon onClose={this.handleOnClose}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    content: {
        backgroundColor: '#5533ee',
        alignItems: 'center',
        width: '80%',
        elevation:5,
        borderWidth:1,
        borderRadius:10,
        padding:50
    },
    input:{
        margin:5,
        padding:5,
        borderWidth:1,
        fontSize: 16,
        backgroundColor:'#fff',
        width:'95%'
    },
    btn:{
        padding:10,
        margin: 10,
        backgroundColor:'#eee',
        borderWidth:1,
        borderRadius:5,
        elevation:5,
    }
});
export default ManualInput;