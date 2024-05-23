import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import screens
import Movies from '../screens/Movies';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  showLabel: false,
  activeTintColor: '#9381ff',
  style: {
    height: '10%',
    backgroundColor: 'rgba(34,36,40,1)',
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
          }}
        />

        <Tab.Screen
          name="VÍ TIỀN"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="wallet" color={"#BFD641"} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="THÊM GIAO DỊCH"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="add-circle" color={"#FED840"} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="THỐNG KÊ"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="bar-chart" color={"#FE9900"} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="KẾ HOẠCH"
          component={Movies}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="next-plan" color={"#FE92A3"} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;