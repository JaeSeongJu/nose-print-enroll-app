import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import EnrollPet from "./screens/EnrollPet";
import Home from "./screens/Home";
import PetInfo from "./screens/PetInfo";
import PhotoOption from "./screens/PhotoOption";
import RefFrist from "./screens/RefFirst";
import RefSecond from "./screens/RefSecond";

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
          <Stack.Screen
            name="Ref 1"
            component={RefFrist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Ref 2"
            component={RefSecond}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Photo Option"
            component={PhotoOption}
            options={{ headerShown: false }}
          />
            <Stack.Screen
          name="Snap"
          component={Snap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckPhoto"
          component={CheckPhoto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckRegister"
          component={CheckRegister}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
