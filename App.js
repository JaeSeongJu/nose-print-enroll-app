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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Enroll Pet"
            component={EnrollPet}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
