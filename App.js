import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from './screens/ToDoList';
import EditList from './screens/EditList';
import Colors from "./constants/Colors";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "My Pet" component = {Home}/>
        <Stack.Screen 
        name = "ToDoList"
        component = {ToDoList}
        options = {({route}) => {
          return({
            title: route.params.title,  //버튼을 누르면 워내는 TODoList 라는 헤더가 되는데 이 줄이 버튼의 제목이 헤더로 가게 해준다 .
           /* headerStyle:{
              backgroundColor: route.params.color 
            }, */ //색깔 종속되게 해줌 
            //headerTintColor: "white" //->헤더글색
          })
        }}
        />
        <Stack.Screen
        name= "Edit" 
        component = {EditList}
        options={({route}) => {
            return({
              title: route.params.title ?  route.params.title : "Create new list"/* 'Edit ${route.params.title}' */ ,  //버튼을 누르면 워내는 TODoList 라는 헤더가 되는데 이 줄이 버튼의 제목이 헤더로 가게 해준다 .
              /* headerStyle:{
                backgroundColor: route.params.color || Colors.pink
              }, */ //색깔 종속되게 해줌 
              //headerTintColor: "white" //->헤더글색
            })
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
   );
}