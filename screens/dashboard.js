import React, {useState, useEffect} from 'react';
import { Button } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';

import dashboardDetail from './dashboardDetail';
import transactionHistory from './transactionHistory';
import transactionDetail from './transactionDetail';
import transactionEdit from './transactionEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const dashboard = ({navigation}) => {
  const onLogout = async () => {
    await AsyncStorage.removeItem("MoneyTrackerToken");
    await AsyncStorage.removeItem("MoneyTrackerId");

    navigation.navigate("Authenticate");
  }

  return  (
    <Stack.Navigator  
      screenOptions={{ 
        headerTitleAlign: 'center',
        cardStyle: {
            backgroundColor: '#ffffff',
        },
      }}
    >
      <Stack.Screen 
        name="DASHBOARD" 
        component={dashboardDetail} 
        options={{
          headerTitle: 'GIAO DỊCH',
          headerLeft: null, // Hide go back button for DetailsScreen
          headerRight: () => (
            <Button
              onPress={onLogout}
              title="LOGOUT"
              type='clear'
            />
          ),
        }}
      />
      <Stack.Screen 
        name="LỊCH SỬ GIAO DỊCH" 
        component={transactionHistory} 
      />
      <Stack.Screen 
        name="CHI TIẾT GIAO DỊCH" 
        component={transactionDetail} 
      />
      <Stack.Screen 
        name="CHỈNH SỬA GIAO DỊCH" 
        component={transactionEdit} 
      />
    </Stack.Navigator>
  );
}

export default dashboard;