import React, { useState, useEffect, useCallback } from 'react';
import { View, Switch, TextInput, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// import components
import InfoBox from '../components/infoBox';
// import style sheet
import styles from '../assets/styleSheet';

const walletEdit = ({ navigation }) => {
  const route = useRoute();
  const { walletName } = route.params;

  const [isDefault, setIsDefault] = useState(false);
  const [name, onChangeName] = useState(walletName);
  const [walletNameError, setWalletNameError] = useState(false);
  const [balance, onChangeBalance] = useState(null);
  const [balanceError, setBalanceError] = useState(false);
  const [des, onChangeDes] = useState(null);
  const toggleSwitch = () => setIsDefault((previousState) => !previousState);

  const editWallet = async (newWallet, navigation) => {
    try {
      let storedWalletLst = await AsyncStorage.getItem('wallet_lst');
      if (storedWalletLst == null) {
        storedWalletLst = [];
      } else {
        storedWalletLst = JSON.parse(storedWalletLst);
      }
      for (let i in storedWalletLst) {
        if (storedWalletLst[i]['title'] == walletName) {
          storedWalletLst[i]['title'] = newWallet['title'];
          storedWalletLst[i]['balance'] = newWallet['balance'];
          storedWalletLst[i]['des'] = newWallet['des'];
          break;
        }
      }

      await AsyncStorage.setItem('wallet_lst', JSON.stringify(storedWalletLst));
      await AsyncStorage.setItem('curr_balance', currBalance);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          const storedDefaultWallet = await AsyncStorage.getItem(
            'default_wallet'
          );
          if (storedDefaultWallet !== null && storedDefaultWallet == name) {
            await setIsDefault(true);
          }
          const storedWalletLst = JSON.parse(
            await AsyncStorage.getItem('wallet_lst')
          );
          let currBalance = '0';
          let description = '';
          for (let i in storedWalletLst) {
            if (storedWalletLst[i]['title'] == name) {
              currBalance = storedWalletLst[i]['balance'];
              description = storedWalletLst[i]['des'];
              break;
            }
          }
          await onChangeBalance(currBalance);
          await onChangeDes(description);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Danh sách ví is unfocused');
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-end', paddingHorizontal: 20 }}>
        <Switch
          trackColor={{ false: '#D5D8DE', true: '#00E879' }}
          thumbColor={isDefault ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDefault}
        />
      </View>
      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Tên ví</Text>
          <Text style={styles.errorMessage}>
            {' '}
            {walletNameError ? 'Không để trống mục này' : null}{' '}
          </Text>
        </View>
        <TextInput
          style={[styles.input, walletNameError ? styles.inputError : null]}
          onChangeText={onChangeName}
          value={name}
          placeholder="Nhập tên ví"
        />
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Số dư khả dụng</Text>
          <Text style={styles.errorMessage}>
            {' '}
            {balanceError ? 'Không để trống mục này' : null}{' '}
          </Text>
        </View>
        <TextInput
          style={[styles.input, balanceError ? styles.inputError : null]}
          onChangeText={onChangeBalance}
          value={balance}
          placeholder="Nhập số dư"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Mục đích sử dụng</Text>
        <TextInput
          style={styles.input_des}
          onChangeText={onChangeDes}
          value={des}
          placeholder="Nhập mục đích sử dụng của ví"
          multiline
          keyboardType="text"
          blurOnSubmit={true}
        />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '15%',
        }}>
        <View style={{ padding: 20 }}>
          <Button
            title="Thoát"
            color="#181818"
            buttonStyle={{
              borderRadius: 20,
              width: 100,
              height: 40,
              backgroundColor: '#181818',
            }}
            onPress={() =>
              navigation.navigate('CHI TIẾT VÍ', { walletName: walletName })
            }></Button>
        </View>
        <View style={{ padding: 20 }}>
          <Button
            buttonStyle={{
              borderRadius: 20,
              width: 100,
              height: 40,
              backgroundColor: '#00E879',
            }}
            style={{ paddingHorizontal: 20 }}
            title="Lưu"
            onPress={async () => {
              setWalletNameError(false);
              setBalanceError(false);
              let haveError = false;
              if (name == null || name.trim() == 0) {
                setWalletNameError(true);
                haveError = true;
              }
              if (balance == null || balance.trim() == 0) {
                setBalanceError(true);
                haveError = true;
              }
              if (haveError) return;
              let newWallet = { title: name, balance: balance, des: des };
              await editWallet(newWallet, navigation);
              if (isDefault) await AsyncStorage.setItem('default_wallet', name);
              await navigation.navigate('CHI TIẾT VÍ', { walletName: name });
            }}></Button>
        </View>
      </View>
    </View>
  );
};

export default walletEdit;
