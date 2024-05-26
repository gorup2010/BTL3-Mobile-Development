//import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import statisExpenseMonth from './staticExpenseMonth';
import statisIncomeMonth from './staticIncomeMonth';

//const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const statis = () => {
  return  (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold', 
        },
      }}
    >
      
      <Tab.Screen
        name="CHI TIÊU" 
        component={statisExpenseMonth} 
      />
      <Tab.Screen 
        name="THU NHẬP" 
        component={statisIncomeMonth} 
      />
    
    </Tab.Navigator>
  );
}

export default statis;