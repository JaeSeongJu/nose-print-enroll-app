import React, {useState, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, unstable_batchedUpdates, ScrollView} from 'react-native';
import { Ionicons } from  "@expo/vector-icons"
import ToDoItem from "../components/ToDoItem"
import Colors from "../constants/Colors";
import { FloatingLabelInput } from 'react-native-floating-label-input';



const renderAddListIcon = (addItem) => {
    return (
    
      <TouchableOpacity onPress = {() => addItem({ text: "", isChecked: false, isNewItem: true })}>
         <Text style= {styles.icon}> + </Text>
      </TouchableOpacity>

    )
} // +버튼 


export default ({navigation}) => {

    const [toDoItems, setToDoItems] = useState([{text: "Memo for your dog", isChecked: false }])
    
    const addItemToLists = (item) => {
        toDoItems.push(item);
        setToDoItems([...toDoItems]);
      }
  
      const removeItemFromLists = (index) => {
        toDoItems.splice(index, 1);
        setToDoItems([...toDoItems]);
      }
    
    const updateItem = (index, item) => {
      toDoItems[index] = item;
      setToDoItems([...toDoItems])
    }

      useLayoutEffect( () => {
        navigation.setOptions({
          headerRight:() => renderAddListIcon(addItemToLists)
        })
      })
    
    const [name, setName] = useState("");
    const [age, setAge ] = useState("");
    const [idNumber, setIdNumber]= useState();
    const [breed, setBreed] = useState();

    return(
    <View style = {styles.container}>
      <View>
      <Text style = {styles.topText1} >
      INFO      
      </Text>
      <Text style = {styles.topText2} >
                    비문을 등록해주세요
      </Text>
      <ScrollView>
      <Text  style = {styles.infoprofile}> 
      {name}{"\n"}
      {breed}/{age}
      </Text>   
      <FloatingLabelInput
        label="ID NUMBER"
        value={idNumber}
        staticLabel
        onTogglePassword={(bool) => {
          console.log(bool);
        }}
        customShowPasswordComponent={<Text>Show</Text>}
        customHidePasswordComponent={<Text>Hide</Text>}
        hintTextColor={'#aaa'}
        //mask="99 (99) 99999-9999"
        hint="98765-4321"
        /* containerStyles={{
          borderWidth: 2,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          borderColor: '#white',
          borderRadius: 8,
        }} */
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        inputStyles={{
          padding: 8,
          color: 'black',
          paddingHorizontal: 10,
        }}
        onChangeText={(value) => {
          setIdNumber(value);
        }}
      />
      <FloatingLabelInput
        label="이름"
        value={name}
        staticLabel
        onTogglePassword={(bool) => {
          console.log(bool);
        }}
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        inputStyles={{
          padding: 8,
          color: 'black',
          paddingHorizontal: 10,
        }}
        onChangeText={(value) => {
          setName(value);
        }}
      />
      <FloatingLabelInput
        label="품종"
        value={breed}
        staticLabel
        onTogglePassword={(bool) => {
          console.log(bool);
        }}
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        inputStyles={{
          padding: 8,
          color: 'black',
          paddingHorizontal: 10,
        }}
        onChangeText={(value) => {
          setBreed(value);
        }}
      />
      <FloatingLabelInput
        label="나이"
        value={age}
        staticLabel
        onTogglePassword={(bool) => {
          console.log(bool);
        }}
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        inputStyles={{
          padding: 8,
          color: 'black',
          paddingHorizontal: 10,
        }}
        onChangeText={(value) => {
          setAge(value);
        }}
      />
  
      <FlatList
          data = {toDoItems}
            renderItem = { ({ item: {text, isChecked, isNewItem}, index}) => {
                return <ToDoItem
                 text={text}
                 isChecked = {isChecked}
                 isNewItem = {isNewItem}
                 onChecked={() => {
                  const toDoItem = toDoItems[index];
                  toDoItem.isChecked = !isChecked
                  updateItem(index, toDoItem);
                }}
                onChangeText = {(newText) => {
                  const toDoItem = toDoItems[index];
                  toDoItem.text = newText;
                  updateItem(index, toDoItem);
                }}
              onDelete = {() => {
                removeItemFromLists(index)
              }}
            />
          }}
        />
        </ScrollView>
      </View>
      
      <TouchableOpacity style = {styles.saveButton} onPress = {() => {}}>
        <Text style = {{color: "black", fontSize:24, fontWeight: "bold"}}>
          Save
        </Text>
      </TouchableOpacity>     
      </View>
      
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    icon: {
        padding: 5,
        fontSize: 32,
        //color: "black",
    },
    topText1: {
      fontSize: 24,
      fontWeight: "bold"
    },
    topText2: {
      fontSize: 10,
      //fontWeight: "bold"
    },
    infoprofile: {
      borderWidth: 0.3,
      //borderColor: '#777',
      backgroundColor: Colors.gray,
      padding: 20,
      margin: 15,
      width: 350,
      
    },
    input: {
      borderWidth: 0.5,
      borderColor: '#777',
      padding: 8,
      margin: 15,
      width: 350,
      shadowColor: "rgb(50, 50, 50)",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
      height: -1,
      width: 0
      },
    },
    saveButton: {
      borderRadius: 25,
      backgroundColor: "#FCA098",
      height: 48,
      margin: 16,
      justifyContent: "center",
      alignItems: "center",
    },
  });