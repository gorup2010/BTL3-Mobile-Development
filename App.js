import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen.jsx";
import OnboardingScreen from "./screens/OnboardingScreen.js";

const Stack = createNativeStackNavigator();

import RootNavigator from './Navigation/RootNavigator'

export default function App() {

   
  //Test local data. Delete this after done
  useEffect(() => {
    const createData = async () => {
      try {
        // Info Box test data
        await AsyncStorage.setItem('curr_balance', '20000000');
        await AsyncStorage.setItem('curr_income', '15000000');
        await AsyncStorage.setItem('curr_spending', '5000000');
        await AsyncStorage.setItem('curr_target', '18000000');
        await AsyncStorage.setItem('default_wallet', 'Ví chính');
        // Wallet List test data
        const dataList = [
          { title: 'Ví chính', balance: '20000000', des: '' },
          { title: 'Tiết kiệm', balance: '0', des: '' },
          { title: 'Dự phòng', balance: '0', des: '' }
          // Add more items as needed
        ];
        await AsyncStorage.setItem('wallet_lst', JSON.stringify(dataList));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    createData();
  }, []);

  return (
    <RootNavigator/>
    /*
    <>
      <StatusBar backgroundColor="white" height={35} style="dark" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
    */
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
