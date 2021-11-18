import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Album from "./Album";
import CheckPhoto from "./CheckPhoto";
import CheckRegister from "./CheckRegister";
import Snap from "./Snap";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
    </NavigationContainer>
  );
}
