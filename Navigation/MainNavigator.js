import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import screens
import wallet from '../screens/wallet';
import statis from '../screens/statis';
import plan from '../screens/plan';
import dashboard from '../screens/dashboard';

import transaction from '../screens/transaction';


const Tab = createBottomTabNavigator();
const tabBarOptions = {
  showLabel: false,
  activeTintColor: '#ffffff',
  style: {
    height: '10%',
    backgroundColor: '#ffffff',
  },
};
const MainNavigator = () => {


  return (
    
      <Tab.Navigator tabBarOptions={tabBarOptions}
      >
        
        <Tab.Screen
          name="GIAO DỊCH"
          component={dashboard}
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
          component={transaction}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="add-circle" color={"#181818"} size={50} />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        
        
        <Tab.Screen
          name="THỐNG KÊ"
          component={statis}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="bar-chart" color={"#FE9900"} size={size} />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />

        
        <Tab.Screen
          name="KẾ HOẠCH"
          component={plan}
          options={{
            tabBarIcon: ({size}) => (
              <MaterialIcons name="next-plan" color={"#FE92A3"} size={size} />
            ),
            headerShown: false
          }}
        />
        

      </Tab.Navigator>
       
  );
};
export default MainNavigator;
