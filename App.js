import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import RootNavigator from './Navigation/RootNavigator'

export default function App() {

   
  //Test local data. Delete this after done
  useEffect(() => {
    const createData = async () => {
      try {
        // Info Box test data
        
        await AsyncStorage.setItem('curr_balance', '150000000');
        await AsyncStorage.setItem('curr_income', '0');
        await AsyncStorage.setItem('curr_spending', '0');
        await AsyncStorage.setItem('curr_target', '0');
        await AsyncStorage.setItem('default_wallet', 'Ví chính');
        await AsyncStorage.setItem('default_plan', 'Kế hoạch chính');
        // Wallet List test data
        const dataList = [
          { title: 'Ví chính', balance: '0', des: 'Đây là ví dụ cho mục đích sử dụng của chiếc ví này',
            transaction_lst: []
          },
        ];
        /*const dataList = [
          { title: 'Ví chính', balance: '48000000', des: 'Đây là ví dụ cho mục đích sử dụng của ciếc ví này',
            transaction_lst: [
              {type: 'Ăn uống', date: '05-22-2024', isExpense: true, value: "30000000", note: 'Đây là ví dụ về ghi chú'},
              {type: 'Tiền lương', date: '05-22-2024', isExpense: false, value: "20000000", note: ''},
              {type: 'Vé số', date: '05-22-2024', isExpense: false, value: "20000000", note: ''},
              {type: 'Đầu tư', date: '05-22-2024', isExpense: false, value: "20000000", note: ''},
              {type: 'Thú cưng', date: '05-21-2024', isExpense: true, value: "15000000", note: ''},
              {type: 'Hóa đơn điện', date: '05-20-2024', isExpense: true, value: "30000000", note: ''},
              {type: 'Du lịch', date: '05-20-2024', isExpense: true, value: "15000000", note: ''},
              {type: 'Di chuyển', date: '04-19-2024', isExpense: true, value: "14000000", note: ''},
              {type: 'Tiền lương', date: '12-22-2023', isExpense: false, value: "20000000", note: ''},
              {type: 'Vé số', date: '12-22-2023', isExpense: false, value: "20000000", note: ''},
              {type: 'Đầu tư', date: '12-22-2023', isExpense: false, value: "20000000", note: ''},
              {type: 'Ăn uống', date: '12-19-2023', isExpense: true, value: "14000000", note: ''},
              {type: 'Di chuyển', date: '12-19-2023', isExpense: true, value: "14000000", note: ''},
              {type: 'Tiền lương', date: '12-18-2023', isExpense: false, value: "20000000", note: ''},
              {type: 'Vé số', date: '12-18-2023', isExpense: false, value: "20000000", note: ''},
              {type: 'Đầu tư', date: '12-18-2023', isExpense: false, value: "20000000", note: ''},
            ]
          },
          { title: 'Tiết kiệm', balance: '0', des: '', transaction_lst: [] },
          { title: 'Dự phòng', balance: '0', des: '', transaction_lst: [] }
          // Add more items as needed
        ];
        */
        const planList = [
          { title: 'Kế hoạch chính', target: "0", des: 'Đây là ví dụ cho mô tả sử dụng của kế hoạch này', target_lst: []},
        ];
        /*const planList = [
          { title: 'Kế hoạch chính', target: "15000000", des: 'Đây là ví dụ cho mục đích sử dụng của ciếc ví này', target_lst: [
            {type: 'Ăn uống', target: '2000000', note: "Ăn uống hằng ngày, 3 bữa/ngày"},
            {type: 'Di chuyển', target: '300000', note: "Di chuyển bằng xe bus"},
            {type: 'Sửa chữa', target: '700000', note: "Sửa mái nhà bị dột"},
            {type: 'Du lịch', target: '12000000', note: "Du lịch trong mơ :)"},
          ]},
          { title: 'Kế hoạch lễ Tết', target: "0", des: '', target_lst:[] },
          { title: 'Kế hoạch đi chơi', target: "0", des: '', target_lst:[] },
          { title: 'Kế hoạch lễ Quốc khánh', target: "0", des: '', target_lst:[] },
          { title: 'Kế hoạch đi nước ngoài', target: "0", des: '', target_lst:[] },
          { title: 'Kế hoạch sinh nhật', target: "0", des: '', target_lst:[] },
          // Add more items as needed
        ];*/
        await AsyncStorage.setItem('wallet_lst', JSON.stringify(dataList));
        await AsyncStorage.setItem('plan_lst', JSON.stringify(planList));
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
