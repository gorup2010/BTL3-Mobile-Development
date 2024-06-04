import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import dashboardDetail from './dashboardDetail';
import transactionHistory from './transactionHistory';
import transactionDetail from './transactionDetail';
import transactionEdit from './transactionEdit';

const Stack = createStackNavigator();

const dashboard = () => {
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
          headerTitle: '',
          headerLeft: null, // Hide go back button for DetailsScreen
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