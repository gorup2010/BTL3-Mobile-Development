import React, {useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
// import components
import InfoBox from '../components/infoBox';
import ScrollList from '../components/scrollList';

const walletList = ({navigation}) => {
  const [balance, setBalance] = useState("0");
  const [income, setIncome] = useState("0");
  const [spending, setSpending] = useState("0");
  const [target, setTarget] = useState("0");
  const [defaultWallet, setDefaultWallet] = useState("Ví chính");
  const [walletLst, setWalletLst] = useState([]);
  // Get infoBox data from local storage. Run every time Screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
      try {
        /* Unit Test 
        await AsyncStorage.setItem('curr_balance', '12.0000');
        */
        const storedBalance = await AsyncStorage.getItem('curr_balance');
        console.log(storedBalance);
        if (storedBalance !== null) {
          setBalance(storedBalance);
        }
        const storedIncome = await AsyncStorage.getItem('curr_income');
        if (storedIncome !== null) {
          setIncome(storedIncome);
        }
        const storedSpending = await AsyncStorage.getItem('curr_spending');
        if (storedSpending !== null) {
          setSpending(storedSpending);
        }
        const storedTarget = await AsyncStorage.getItem('curr_target');
        if (storedTarget !== null) {
          setTarget(storedTarget);
        }
        const storedDefaultWallet = await AsyncStorage.getItem('default_wallet');
        if (storedDefaultWallet !== null) {
          setDefaultWallet(storedDefaultWallet);
        }
        const storedWalletLst = await AsyncStorage.getItem('wallet_lst');
        if (storedWalletLst !== null) {
          setWalletLst(JSON.parse(storedWalletLst));
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();

    return () => {
      console.log('Danh sách ví is unfocused');
    };
  }, [])
);

  return (
    <View style={styles.container}>
      <InfoBox balance={balance} income={income} spending={spending} target={target}/>
      <View style={{alignSelf: 'flex-end', padding: 20}}>
        <Button
        
          buttonStyle={{borderRadius: 30, width: 40, height: 40, backgroundColor: '#00D2EE'}}
          icon={<MaterialIcons name="add" color="#ffffff" size={20} />}
          onPress={() => navigation.navigate('THÊM VÍ MỚI')}  
        > 
        </Button>
      </View>
      <ScrollList dataList={walletLst} default_wallet={defaultWallet} navigation={navigation} option="1">
      </ScrollList>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
});
export default walletList;