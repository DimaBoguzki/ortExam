import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
function NavigationHeader(props) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginRight: 25
    },
    title: {
        fontSize: 20
    }
})
export default NavigationHeader;