import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "../screens/Authenticate/Login";
import SignUp from "../screens/Authenticate/SignUp";
import color from "../constants/color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../screens/Authenticate/ForgotPassword";

const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          // fontFamily: "montserrat-black",
          fontSize: 16,
        },
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: color.blue_title,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          title: "ĐĂNG NHẬP",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          fontSize: 14,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          title: "Lấy lại mật khẩu",
        }}
      />
   
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
