//import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import transactionExpenseAdd from './transactionExpenseAdd';
import transactionIncomeAdd from './transactionIncomeAdd';

//const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const transaction = () => {
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
        component={transactionExpenseAdd} 
      />
      <Tab.Screen 
        name="THU NHẬP" 
        component={transactionIncomeAdd} 
      />
    
    </Tab.Navigator>
  );
}

export default transaction;