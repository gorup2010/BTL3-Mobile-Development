import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import walletList from './walletList';
import walletAdd from './walletAdd';
import walletDetail from './walletDetail';
import walletEdit from './walletEdit';
import walletTransactionDetail from './walletTransactionDetail';
import walletTransactionEdit from './walletTransactionEdit';


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
      <Stack.Screen name="DANH SÁCH VÍ" component={walletList} options={{headerLeft: ()=> null}}/>
      <Stack.Screen name="THÊM VÍ MỚI" component={walletAdd} />
      <Stack.Screen name="CHI TIẾT VÍ" component={walletDetail} />
      <Stack.Screen name="CHỈNH SỬA VÍ" component={walletEdit} />
      <Stack.Screen name="CHI TIẾT GIAO DỊCH" component={walletTransactionDetail} />
      <Stack.Screen name="CHỈNH SỬA GIAO DỊCH" component={walletTransactionEdit} />
    </Stack.Navigator>
  );
}

export default wallet;