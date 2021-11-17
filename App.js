import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import PetInfo from "./screens/PetInfo";
import EnrollPet from "./screens/EnrollPet";
import Colors from "./constants/Colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={Platform.OS === "ios" ? -80 : 0}
      >
        <Stack.Navigator initialRouteName="My Pet">
          <Stack.Screen
            name="My Pet"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pet Info"
            component={PetInfo}
            options={({ route }) => {
              return {
                title: route.params.title, //버튼을 누르면 워내는 TODoList 라는 헤더가 되는데 이 줄이 버튼의 제목이 헤더로 가게 해준다 .
                headerShown: false,
                /* headerStyle:{
              backgroundColor: route.params.color 
            }, */ //색깔 종속되게 해줌
                //headerTintColor: "white" //->헤더글색
              };
            }}
          />
          <Stack.Screen
            name="Enroll Pet"
            component={EnrollPet}
            options={({ route }) => {
              return {
                title: route.params.title
                  ? route.params.title
                  : "Create new list" /* 'Edit ${route.params.title}' */, //버튼을 누르면 워내는 TODoList 라는 헤더가 되는데 이 줄이 버튼의 제목이 헤더로 가게 해준다 .
                headerShown: false,
                /* headerStyle:{
                backgroundColor: route.params.color || Colors.pink
              }, */ //색깔 종속되게 해줌
                //headerTintColor: "white" //->헤더글색
              };
            }}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
