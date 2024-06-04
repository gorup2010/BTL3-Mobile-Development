import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import screens
import LogoScreen from "../screens/LogoScreen";

import MainNavigator from "./MainNavigator";
import OnBoardingStack from "./OnboardingStack.jsx";
import AuthStack from "./AuthStack.jsx";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization (e.g., fetching data, setting up resources)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after initialization tasks
    }, 2000); // Adjust timeout as needed
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("isFirstLaunch");

        if (value === null || value === "false") {
          //await AsyncStorage.setItem('isFirstLaunch', 'false');
          setIsFirstLaunch(true);
          //console.log("Set isFirstLaunch true");
        } else if (value === true) {
          setIsFirstLaunch(false);
          //console.log("Set isFirstLaunch false");
        }
      } catch (error) {
        console.error("Failed to fetch the data from storage", error);
      }
    };

    checkFirstLaunch();
  }, []);

  //console.log("Is first launch? ", isFirstLaunch);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Loading"
            component={LogoScreen}
            options={{ headerShown: false }}
          />
        ) : null}
        {isFirstLaunch ? (
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingStack}
            options={{ headerShown: false }}
          />
        ) : null}

        <Stack.Screen
          name="Authenticate"
          component={AuthStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
