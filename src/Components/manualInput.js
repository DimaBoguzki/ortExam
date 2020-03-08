import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity,TextInput,Image} from 'react-native';
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
        this.props.navigation.pop();
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
                        <Image
                            source={require('../img/icon/ok_icon.png')}
                            style={{width:50,height:50}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clsBtn} onPress={this.handleOnClose}>
                        <Image
                            source={require('../img/icon/cancel_icon.png')}
                            style={{width:45,height:45}}
                        />
                    </TouchableOpacity>
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
        backgroundColor: '#fff' 
    },
    content: {
        backgroundColor: '#069DF3',
        alignItems: 'center',
        width: '80%',
        elevation:5,
        borderWidth:1,
        borderRadius: 20,
        padding: 50
    },
    input:{
        margin: 10,
        padding: 15,
        borderWidth:1,
        fontSize: 16,
        backgroundColor:'#fff',
        width:'100%',
        borderRadius:10,
    },
    btn:{
        padding:5,
        justifyContent:'center',
        alignItems: 'center',
        margin: 10,
        width: '50%',
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:10,
        elevation:5,
    },
    clsBtn: {
        position: 'absolute',
        top: 0,
        right: 0,

    }
});
export default ManualInput;