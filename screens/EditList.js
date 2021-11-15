import { CommonActions } from '@react-navigation/routers';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Colors from "../constants/Colors";

export default ({navigation, route}) => {
    const [title, setTitle] = useState(route.params.title || "");
    const [color, setTColor] = useState(route.params.color  || Colors.gray);
    const [isValid, setvalidity] = useState(true);
    
    return (
    <View style = {styles.container}>
        <View>
        <View  style = {{flexDirection: "row"}} >
            <Text style = {styles.label}> Profile Name </Text>
            {!isValid && <Text style = {{marginLeft:8, color: Colors.red, fonstSize: 6 }}>*Dog name cannot be empty </Text>} 
        </View>
            <Text 
                style = {styles.label}
            >
                          강아지 이름
            </Text>
            <TextInput
                underlineColorAndroid = {"transparent"}
                selectionColor = {"transparent"}
                autoFocus = {true}
                value = {title}
                onChangeText = {(text) =>{
                    setTitle(text);
                    setvalidity(true);
                }}
                placeholder = {"New name"}
                maxLength = {30}
                style = {[styles.input, { outline: "none" }]}
            />
        </View>
        <TouchableOpacity style = {styles.saveButton} onPress = {() => {
            if (title.length > 1){
                route.params.saveChanges({title, color});
                navigation.dispatch(CommonActions.goBack());
            } else {
                setvalidity(false); 
            }
        }}>
        <Text style = {{color: "black", fontSize:24, fontWeight: "bold"}}>
          Save
        </Text>
      </TouchableOpacity> 
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between",
    },
    input: {
      color: Colors.darkGray,
      borderBottomColor: Colors.lightGray,
      borderBottomWidth: 0.5,
      marginHorizontal: 5,
      padding: 3,
      height: 30,
      fontSize: 24, 
    },
    saveButton:{
        borderRadius: 25,
        backgroundColor: "#FCA098",
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: Colors.black,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8
    },

});