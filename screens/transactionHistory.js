import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MonthPicker from 'react-native-month-picker';

// import components
import InfoBox from '../components/infoBox';
import ScrollList from '../components/scrollList';
// import services
import { getDefaultWalletInfo, getDefaultWalletName } from '../services/dataFetching';

const transactionHistory = ({ navigation }) => {
  const [currTime, setCurrTime] = useState('');
  const [balance, setBalance] = useState('0');
  const [income, setIncome] = useState('0');
  const [spending, setSpending] = useState('0');
  const [target, setTarget] = useState('0');
  const [des, setDes] = useState('');
  const [wallet, setWallet] = useState([]);
  const [transactionLst, setTransactionLst] = useState([]);
  const [value, setValue] = useState(null);
  const [isPickerVisible, setPickerVisibility] = useState(false);

  const toogleDatePicker = () => {
    setPickerVisibility((prevState) => !prevState);
  };

  const handleMonthChange = async (newDate) => {
    setValue(newDate);
    //console.log('New Date: ', newDate);
    const currFullDate = new Date(newDate);

    const currMonth = (await currFullDate.getMonth()) + 1;
    const currYear = await currFullDate.getUTCFullYear();
    const getTime = 'Tháng ' + currMonth.toString() + '/' + currYear.toString();
    //console.log("Time: ", getTime);
    setCurrTime(getTime);

    let defaultWalletInfo = await getDefaultWalletInfo(currMonth, currYear);
    let defaultWalletName = await getDefaultWalletName();

    //console.log('Expense: ', defaultWalletInfo['expense']);
    //setBalance(defaultWalletInfo['balance']);
    setSpending(defaultWalletInfo['expense']);
    setIncome(defaultWalletInfo['income']);
    setTransactionLst(defaultWalletInfo['transactionLst']);
    setWallet(defaultWalletName);
  };

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          let defaultWalletName = await getDefaultWalletName();
          const currFullDate = new Date();
          const currMonth = (await currFullDate.getMonth()) + 1;
          const currYear = await currFullDate.getUTCFullYear();
          const getTime =
            'Tháng ' + currMonth.toString() + '/' + currYear.toString();
          //console.log("Time: ", getTime);
          setCurrTime(getTime);

          let defaultWalletInfo = await getDefaultWalletInfo(
            currMonth,
            currYear
          );
          console.log('Expense: ', defaultWalletInfo['expense']);
          //setBalance(defaultWalletInfo['balance']);
          setSpending(defaultWalletInfo['expense']);
          setIncome(defaultWalletInfo['income']);
          setTransactionLst(defaultWalletInfo['transactionLst']);
          setWallet(defaultWalletName);

        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Lịch sử giao dịch is unfocused');
      };
    }, [])
  );

  //console.log("Curr Time: ", currTime);

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-start', paddingHorizontal: 20 }}>
        <Button
          title={currTime}
          color="#181818"
          buttonStyle={{
            borderRadius: 20,
            width: 150,
            height: 40,
            backgroundColor: '#181818',
          }}
          onPress={toogleDatePicker}></Button>
      </View>
      <InfoBox
        balance={balance}
        income={income}
        spending={spending}
        target={target}
        option="3"
      />
      {isPickerVisible ? (
        <View style={{ width: '90%', height: '65%' }}>
          <MonthPicker
            selectedDate={value || new Date()}
            onMonthChange={handleMonthChange}
            maxDate={new Date()}
            minDate={new Date('1900-01-01')}
          />
        </View>
      ) : (
        <ScrollList
          dataList={transactionLst}
          navigation={navigation}
          wallet={wallet}
          opheight="78%"
          option="2"></ScrollList>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default transactionHistory;
