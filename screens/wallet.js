import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import walletList from './walletList';
import walletAdd from './walletAdd';

const Stack = createStackNavigator();

const wallet = () => {
  return  (
    <Stack.Navigator  
      screenOptions={{ 
        headerTitleAlign: 'center',
        cardStyle: {
            backgroundColor: '#ffffff',
        },
      }}
    >
      <Stack.Screen name="DANH SÁCH VÍ" component={walletList} />
      <Stack.Screen name="THÊM VÍ MỚI" component={walletAdd} />
    </Stack.Navigator>
  );
}

export default wallet;