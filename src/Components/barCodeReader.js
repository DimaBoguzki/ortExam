import React from 'react';
import { StyleSheet,View,TouchableOpacity,Text,Image} from 'react-native';
import { RNCamera } from 'react-native-camera';

function BarCodeReader(props) {
  const handleOnClose = () => {
    console.log(props.route.params.type)
    if(props.route.params.type==='exam')
      props.navigation.navigate('SetExam');
    else // else if type is set student
      props.navigation.navigate('exam');
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContent}>
        <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                props.onSubmit(barcodes[0].data,props.route.params.type);
            }}>
        </RNCamera>
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={styles.clsBtn} onPress={handleOnClose}>
            <Image
              source={require('../img/icon/cancel_icon.png')}
              style={{width:96,height:96}}
            />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cameraContent: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    width:'90%',

    padding:50,
},
  camera: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
    height: "40%",
  },
  clsBtn: {
    elevation: 2,
    borderRadius: 50
  }
});

export default BarCodeReader;

