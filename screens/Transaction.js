import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import TransactionAdd from './TransactionAdd';
import SelectSpendingGroup from './SelectSpendingGroup';
import TransactionDetail from './TransactionDetail';
import SelectIncomeGroup from './SelectIncomeGroup';
import SelectWallet from './SelectWallet';
import TransactionHistory from './TransactionHistory'

const Stack = createStackNavigator();
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
      <Icon name="chevron-back" size={24} />
    </TouchableOpacity>
  );
};

const Transaction = () => {
  return  (
    <Stack.Navigator  screenOptions={{ headerTitleAlign: 'center',  headerTitleStyle: {fontSize: 20 } }}>
      <Stack.Screen name="THÊM GIAO DỊCH" component={TransactionAdd} options={{headerLeft: () => <BackButton />}} />
      <Stack.Screen name="CHỌN NHÓM CHI TIÊU" component={SelectSpendingGroup} options={{headerLeft: () => <BackButton />}} />
      <Stack.Screen name="CHỌN NHÓM THU NHẬP" component={SelectIncomeGroup} options={{headerLeft: () => <BackButton />}} />
      <Stack.Screen name="CHỌN VÍ TIỀN" component={SelectWallet} options={{headerLeft: () => <BackButton />}} />
      <Stack.Screen name="LỊCH SỬ GIAO DỊCH" component={TransactionHistory} options={{headerLeft: () => <BackButton />}} />
      <Stack.Screen name="CHI TIẾT GIAO DỊCH" component={TransactionDetail} options={{headerLeft: () => <BackButton />}} />
    </Stack.Navigator>
  );
}
export default Transaction;