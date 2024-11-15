import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home";
import UploadScreen from "./upload";
import ResultsScreen from "./results";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6200ee",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: "Music Note Recognizer" }}
        />
        <Stack.Screen
          name='Upload'
          component={UploadScreen}
          options={{ title: "Upload Sheet Music" }}
        />
        <Stack.Screen
          name='Results'
          component={ResultsScreen}
          options={{ title: "Recognized Notes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
