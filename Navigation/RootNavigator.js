import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import screens
import Movies from '../screens/Movies';
import wallet from '../screens/wallet';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  showLabel: false,
  activeTintColor: '#ffffff',
  style: {
    height: '10%',
    backgroundColor: '#ffffff',
  },
};
const RootNavigator = () => {
  return (
    <NavigationContainer>

      <Tab.Navigator tabBarOptions={tabBarOptions}
      >
        <Tab.Screen
          name="GIAO DỊCH"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="attach-money" color={"#0BD7DF"} size={size} />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="VÍ TIỀN"
          component={wallet}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="wallet" color={"#BFD641"} size={size} />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="THÊM GIAO DỊCH"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="add-circle" color={"#FED840"} size={size} />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="THỐNG KÊ"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="bar-chart" color={"#FE9900"} size={size} />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="KẾ HOẠCH"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="next-plan" color={"#FE92A3"} size={size} />
            ),
            headerShown: false
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;