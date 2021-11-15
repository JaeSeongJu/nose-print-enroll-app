import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from  "@expo/vector-icons"
import Colors from "../constants/Colors";
/* import { Avatar } from 'react-native-image-avatars'; */
import { Avatar } from 'react-native-paper';



const ListButton = ( {title, color, onPress, onDelete, onOptions} ) => {
 
  logoPath = require('../assets/dog.png'); //Editlist 이미지 

  return(
    <TouchableOpacity 
        style = {[styles.itemContainer, {backgroundColor: color}]}
        onPress = {onPress}
    >
      
    <View >
    <Avatar.Image
      source = {require('../assets/권푸근.jpg')}
      size={80}
      style={styles.avatarImg}
    />
    </View>
    <View>
      <Text style = {styles.profileTitle}> {title} </Text>
    </View>
    <View style = {{flexDirection : "row", paddingRight : 100}}> 
    <TouchableOpacity onPress = {onOptions}>
      {/*  <Ionicons name = "dog" size = {24} color = "#000000"/> */}
      <Image style = {styles.editImage} source={logoPath} size = {20}  />
    </TouchableOpacity> 
      <TouchableOpacity onPress = {onDelete}>
        <Ionicons name = "trash-outline" size = {30} color = "#000000"/>
      </TouchableOpacity> 
    </View>

    </TouchableOpacity>
  );
}

const renderAddListIcon = (navigation, addItemToLists) => {
    return (
      <TouchableOpacity onPress ={() => navigation.navigate("Edit", {saveChanges: addItemToLists})}>
       <Text style= {styles.icon}> + </Text>
      </TouchableOpacity>

    )
} // +버튼 

export default ( {navigation} ) => {
    const [lists, setLists] = useState([
      {title: "권푸근", color: Colors.gray},
      {title: "최몽실", color: Colors.gray},
     // {title: "강아지3", color: Colors.gray},
    ]);
    
    const addItemToLists = (item) =>{
      lists.push(item);
      setLists([...lists]);
    }

    const removeItemFromLists = (index) =>{
      lists.splice(index, 1);
      setLists([...lists]);
    }

    const updateItemFromLists = (index, item) => {
      lists[index] = item;
      setLists([...lists]);
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight:() => renderAddListIcon(navigation, addItemToLists)
      })
    })

    return (
        <View style={ styles.container }>
         <FlatList 
         data = {lists}
         renderItem = {({item: {title, color}, index} ) => {
          return(
            <ListButton 
              title = {title}
              color = {color} 
              navigation = {navigation}
              onPress = {() => {navigation.navigate("ToDoList", {title, color})}}
              onOptions = {() => {
                navigation.navigate(
                  "Edit",
                  {
                    title, 
                    color, 
                    saveChanges: (item) => updateItemFromLists(index, item) 
                  })
                }} //editLISt navigation 
              onDelete = {() => removeItemFromLists(index)} // delete 기능 
            />
          );
         }}
         />
        </View>
     );
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    avatarImg: {
      /* marginTop: 5, */
    },
    editImage: {
      width: 30,
      height: 30,
      flex: 1,
    },
    profileTitle: {
      marginRight: 150,
      fontSize: 20,
      padding: 5,
      color: "black"
    },

    itemContainer: {
      flexDirection : "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 100,
      flex: 1,
      borderRadius: 20,
      marginHorizontal:20,
      marginVertical: 10,
      padding: 15,
     },
    icon: {
      padding: 5,
      fontSize: 24,
    },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });