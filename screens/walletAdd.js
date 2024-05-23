import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import components
import InfoBox from '../components/infoBox';

const walletAdd = () => {
  const [balance, setBalance] = useState("0.000");
  const [income, setIncome] = useState("0.000");
  const [spending, setSpending] = useState("0.000");
  const [target, setTarget] = useState("0.000");
  // Get infoBox data from local storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        /* Unit Test 
        await AsyncStorage.setItem('curr_balance', '12.0000');
        */
        const storedBalance = await AsyncStorage.getItem('curr_balance');
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
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <InfoBox balance={balance} income={income} spending={spending} target={target}/>
      <View style={{alignSelf: 'flex-end', padding: 20}}>
        <Button
        
          buttonStyle={{borderRadius: 30, width: 40, height: 40, backgroundColor: '#00D2EE'}}
          icon={<MaterialIcons name="add" color="#ffffff" size={20} />}
          onPress={() => navigation.navigate('Movies')}  
        > 
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default walletAdd;