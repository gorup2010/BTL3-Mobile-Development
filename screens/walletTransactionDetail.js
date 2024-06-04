import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import components
import transactionIconPaths from '../components/transactionIcon';
// import services
import {deleteTransaction} from '../services/dataUpdate';

const showConfirmDeleteDialog = (navigation, transaction, wallet) =>
  Alert.alert(
    'Xác nhận xóa giao dịch',
    'Bạn có chắc chắn muốn xóa giao dịch này?',
    [
      {
        text: 'Không',
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          await deleteTransaction(transaction, wallet);
          navigation.navigate('CHI TIẾT VÍ', {walletName: wallet});
        },
      },
    ],
    {
      cancelable: true,
    }
  );

const walletTransactionDetail = ({ navigation }) => {
  const route = useRoute();
  const { transaction } = route.params;
  const { wallet } = route.params;

  console.log("Transaction: ", transaction);
  console.log("Wallet: ", wallet);

  //console.log("Wallet 1: ", wallet);

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Chi tiết mục tiêu is unfocused');
      };
    }, [route.params])
  );

  //console.log('curr target: ', target);
  //console.log('note: ', note);

  return (
    <View style={styles.container}>
      <View style={styles.infocon}>
        <View style={styles.smallcon}>
          <Image source={transactionIconPaths[transaction['type']]} />

          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: 20,
              color: '#181818',
            }}>
            {transaction['type']}
          </Text>
        </View>
        <View style={styles.smallcon}>
          <Text style={styles.info_title}>Phân loại: </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 15,
            }}>
            {(transaction['isExpense']) ? 'Chi tiêu': 'Thu nhập'}
          </Text>
        </View>
        <View style={styles.smallcon}>
          <Text style={styles.info_title}>Số tiền: </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 15,
            }}>
            {transaction['value']} VND
          </Text>
        </View>
        <View style={styles.smallcon}>
          <Text style={styles.info_title}>Ngày: </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 15,
            }}>
            {transaction['date']}
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '90%', height: 400, alignItems: 'flex-start', paddingVertical: 10,}}>
          <Text style={styles.info_title}>Ghi chú: </Text>
          <Text style={{ paddingHorizontal: 5, fontSize: 15, width: '65%' }}>
            {transaction['note']}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',

          }}>
          <View style={{padding: 5}}>
            <Button
              buttonStyle={{
                borderRadius: 30,
                width: 150,
                height: 50,
                backgroundColor: '#00D2EE',
              }}
              title = 'Sửa'
              onPress={() =>
                navigation.navigate('CHỈNH SỬA GIAO DỊCH', { transaction: transaction, wallet: wallet })
              }></Button>
          </View>
          <View style={{padding: 5}}>
            <Button
              buttonStyle={{
                borderRadius: 30,
                width: 150,
                height: 50,
                backgroundColor: '#EF7A6D',
                
              }}
              title = 'Xóa'
              onPress={() =>
                showConfirmDeleteDialog(navigation, transaction, wallet)
              }></Button>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  info_title: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  smallcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  infocon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    padding: 3,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default walletTransactionDetail;
