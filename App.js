import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import OnboardingScreen from "./Screens/OnboardingScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" height={35} style="dark" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const navigation = useRef();

  async function checkFirstLoad() {
    setIsLoading(true);
    const RunState = await AsyncStorage.getItem("CtimeFirstLoad");
    console.log("Runrun ", RunState);
    if (!RunState) setIsFirstLoad(true);
    await AsyncStorage.setItem("CtimeFirstLoad", "false");
    setIsLoading(false);
  }

  useEffect(() => {
    checkFirstLoad();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigation}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          // {isFirstLoad && (
          //   <Stack.Screen name="OnBoarding" component={OnBoardingStack} />
          // )}
        }
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Authenticate" component={HomeScreen} />
        {/*<Stack.Screen name="Main" component={Main} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
