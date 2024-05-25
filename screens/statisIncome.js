import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import components
import staticIncomeMonth from './staticIncomeMonth';
import staticIncomeYear from './staticIncomeYear';

const Tab = createMaterialTopTabNavigator();

const staticIncome = () => {
  
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
          lineHeight: 15,
          
        },
      }}
    >
      <Tab.Screen name="THÁNG" component={staticIncomeMonth} />
      <Tab.Screen name="NĂM" component={staticIncomeYear} />
    </Tab.Navigator>
  );
};

export default staticIncome;