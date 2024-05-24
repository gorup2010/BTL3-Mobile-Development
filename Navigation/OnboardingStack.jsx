import { StyleSheet } from "react-native";
import React from "react";

import Onboarding from "../screens/Onboarding/Onboarding.jsx";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
export default function OnBoardingStack({ navigation }) {
  return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={{
        gestureEnabled: true,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
        tabBarIndicatorShown: false,
      }}
    >
      <Tab.Screen name="OnBoarding1" component={Onboarding} />
      <Tab.Screen name="OnBoarding2" component={Onboarding} />
      <Tab.Screen name="OnBoarding3" component={Onboarding} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
