import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import components
import staticExpenseMonth from './staticExpenseMonth';
import staticExpenseYear from './staticExpenseYear';

const Tab = createMaterialTopTabNavigator();

const staticExpense = () => {
  
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
          lineHeight: 15,
          
        },
      }}
    >
      <Tab.Screen name="THÁNG" component={staticExpenseMonth} />
      <Tab.Screen name="NĂM" component={staticExpenseYear} />
    </Tab.Navigator>
  );
};

export default staticExpense;