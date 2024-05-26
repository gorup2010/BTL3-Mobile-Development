import React, {useState, useEffect} from 'react';
import {View, Switch, TextInput, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import components
import InfoBox from '../components/infoBox';

const addNewWallet = async (newWallet) => {
  try {
    let storedWalletLst = await AsyncStorage.getItem('wallet_lst');
    let currBalance = await AsyncStorage.getItem('curr_balance');
    if (storedWalletLst == null) {
      storedWalletLst = [];
    } else {
      storedWalletLst = JSON.parse(storedWalletLst);
    }
    storedWalletLst.push(newWallet);
    await AsyncStorage.setItem('wallet_lst', JSON.stringify(storedWalletLst));
    await AsyncStorage.setItem('curr_balance', (parseInt(currBalance) + parseInt(newWallet['balance'])).toString());
    console.log((parseInt(currBalance) + parseInt(newWallet['balance'])).toString());
  } catch (error) {
    console.error('Error fetching data: ', error);
  }

}

const walletAdd = ({navigation}) => {
  const [isDefault, setIsDefault] = useState(false);
  const [walletName, onChangeWalletName] = useState(null);
  const [balance, onChangeBalance] = useState("0");
  const [des, onChangeDes] = useState(null);
  const toggleSwitch = () => setIsDefault(previousState => !previousState);
  
  return (
    
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-end', paddingHorizontal: 20}}>
        <Switch
          trackColor={{false: '#D5D8DE', true: '#00E879'}}
          thumbColor={isDefault ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDefault}
        />
      </View>
      <View style={{alignSelf: 'flex-start', paddingHorizontal: 20, width: '100%'}}>
        <Text style={styles.label}>Tên ví</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeWalletName}
          value={walletName}
          placeholder="Nhập tên ví"
        />
        <Text style={styles.label}>Số dư khả dụng</Text>
        <TextInput
          style={styles.input}
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
          keyboardType='text'
          blurOnSubmit={true}
        />
      </View>
      
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center', height: "15%"}}>
        <View style={{padding: 20}}>
          <Button
            title="Thoát"
            color="#181818"
            buttonStyle={{borderRadius: 20, width: 100, height: 40, backgroundColor: '#181818'}}
            onPress={() => navigation.navigate('DANH SÁCH VÍ')}  
          > 
          </Button>
        </View>
        <View style={{padding: 20}}>
          <Button
            buttonStyle={{borderRadius: 20, width: 100, height: 40, backgroundColor: '#00E879'}}
            style={{paddingHorizontal: 20}}
            title="Lưu"
            onPress={
              async () => {
                if (isDefault) await AsyncStorage.setItem('default_wallet', walletName);
                await addNewWallet({title: walletName, balance: balance, des: des,});
                navigation.navigate('DANH SÁCH VÍ');
              }
            }  
          > 
          </Button>
        </View>
      </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5E5F65'
  },
  input: {
    height: 45,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE'
  },
  input_des: {
    height: '35%',
    width: '100%',
    textAlignVertical: "top",
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
});
export default walletAdd;