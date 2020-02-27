import React, { Component } from 'react';
import {StyleSheet,TouchableOpacity,Text } from 'react-native';

class CloseButon extends Component {
    render() {
        const style = (this.props.style==null) ? styles.buttonStyle : this.props.style
        const text = (this.props.text==null) ? "X" : this.props.text;
        return (
            <TouchableOpacity style={style} onPress={this.props.onClose}>
                <Text style={{fontSize:22,color:'#fff',textAlign:'center'}}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    buttonStyle: {
        position:'absolute',
        top:0,
        right:0,
        backgroundColor:'red',
        padding:5,
        zIndex:3,
        opacity:0.9,
        borderBottomLeftRadius: 10,
        elevation:5,
      }
});
export default CloseButon;