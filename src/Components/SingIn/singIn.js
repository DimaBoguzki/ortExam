import React,{ useState }from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,ImageBackground,Image} from "react-native";

function SingIn(props) {
    const [id, setId] = useState(1);
    const [password, setPassword] = useState("12345678");
    const onSubmit=()=>{
        if(id===null || id===""){
            alert("שדה תעודת זהות ריק");
            return;
        }
        if(password===null || password===""){
            alert("שדה סיסמא ריק");
            return;
        }
        // callback to roteSingIn.....
        props.onSignIn({
            id:id,
            password:password
        });
    }
    return (
        <ImageBackground
        source={require('../../img/background/background.png')} 
        style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Text style={styles.textHeader}>התחברות</Text>
                <Image source={require('../../img/icon/person_icon.png')} style={styles.img}/>
                <View style={styles.form}>
                    <TextInput 
                        placeholder="תעודת זהות"
                        style={styles.textInput}
                        autoCapitalize = "none"
                        keyboardType='numeric'
                        onChangeText={(txt)=>setId(txt)}/>
                    <TextInput 
                        placeholder="סיסמא" 
                        secureTextEntry={true} 
                        style={styles.textInput}
                        onChangeText={(txt)=>setPassword(txt)}/>
                </View>
                <TouchableOpacity style={styles.btnSubmit} onPress={onSubmit}>
                        <Text style={{textAlign:'center',fontSize:18,color:'#fff'}}>
                            הכנס
                        </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:50
    },
    textHeader:{
        fontSize:26,
        textAlign:'center',
        color:'#cccccc',
    },
    img:{
        width:100,
        height:100,
        marginBottom:20,
    },
    form:{
        width:'95%',
    },
    textInput:{
        backgroundColor:'#ffffff',
        fontSize: 16,
        borderWidth:1,
        elevation:5,
        direction:'ltr',width:'100%'
    },
    btnSubmit:{
        backgroundColor:'rgba(0,0,0,0.3)',
        width:"95%",
        borderWidth:1,
        margin:10,
        elevation:1,
        padding:10,
    },
    loading:{
        alignSelf:'center',
        marginBottom:100,
    }
});
export default SingIn;