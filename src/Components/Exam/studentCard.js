import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image
} from 'react-native';

function StudentCard(props) {
    const img = props.student.img === null ? require('../../img/icon/person_student.png') : {uri: props.student.img};
    return (
        <Modal 
            visible={props.visible}
            transparent = {true}
            animationType = {"slide"}>
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <Image source={img} style={styles.imgStyle} />
                        <Text style={{fontSize:22}}> {props.student.first_name +" "+ props.student.last_name}</Text>
                        <Text style={{fontSize:18}}>{props.student.student_id}</Text>
                        <Text>{props.student.phone}</Text>
                        <Text>{props.student.email}</Text>
                    { props.student.isAbsorbed===0 ?
                    <TouchableOpacity style={[styles.btnAprove,{backgroundColor:'green'}]} onPress={()=>props.onSubmit(1,props.student.student_id)}>
                        <Text style={{color: '#fff'}}>שלח אישור</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={[styles.btnAprove,{backgroundColor:'#FF5B41'}]} onPress={()=>props.onSubmit(0,props.student.student_id)}>
                        <Text style={{color: '#fff'}}>הסר מהמבחן</Text>
                    </TouchableOpacity>
                    }
                    {/*close modal*/}
                    <TouchableOpacity 
                        style={styles.btnClose}
                        onPress={props.onClose}>
                        <Image
                        source={require('../../img/icon/cancel_icon.png')}
                        style={{width:50,height:50}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
export default StudentCard;


const styles = StyleSheet.create({
    modal: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    modalContent: {
        padding : 50,
        borderWidth:1,
        borderRadius: 15,
        backgroundColor: '#DADCDC',
        alignItems: 'center',
        opacity: 0.9
   },
   btnAprove:{
      marginTop: 25,
      padding: 10,
      minWidth:150,
      elevation: 5,
      alignItems: 'center',
      borderRadius: 20,
   },
  btnClose:{
        position: 'absolute',
        top: 0,
        right: 0,
        elevation: 2,
        borderRadius: 50,
    },
    imgStyle: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 10
    }
});