import React, { useState, useEffect, useCallback } from 'react';
import { View, Modal, Text, StyleSheet, DatePickerAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MonthPicker from 'react-native-month-picker';

// import components
import { ChartBox } from '../components/infoBox';
import ScrollList from '../components/scrollList';

let chartdata = [
  {
    key: 1,
    value: 0,
    svg: { fill: '#EF7A6D' },
    arc: { padAngle: 0 },
    name: '---',
  },
  {
    key: 2,
    value: 0,
    svg: { fill: '#FFBB00' },
    arc: { padAngle: 0 },
    name: '---',
  },
  {
    key: 3,
    value: 0,
    svg: { fill: '#00E879' },
    arc: { padAngle: 0 },
    name: '---',
  },
  {
    key: 4,
    value: 0,
    svg: { fill: '#29E5FE' },
    arc: { padAngle: 0 },
    name: '---',
  },
  {
    key: 5,
    value: 0,
    svg: { fill: '#ffffff' },
    arc: { padAngle: 0 },
    name: '---',
  },
];

const refresh = () => {
  for (i in chartdata) {
    chartdata[i]['name'] = "---";
    chartdata[i]['value'] = 0;
  }
}

const statisExpenseMonth = ({ navigation }) => {
  const [spending, setSpending] = useState('0');
  const [defaultWallet, setDefaultWallet] = useState('Ví chính');
  const [transaction, setTransaction] = useState([]);
  const [chartData, setChartData] = useState(chartdata);
  const [statisLst, setStatisLst] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [currTime, setCurrTime] = useState(null);

  const [value, setValue] = useState(null);
  const [isPickerVisible, setPickerVisibility] = useState(false);

  const toogleDatePicker = () => {
    setPickerVisibility((prevState) => !prevState);
  };

  const handleMonthChange = async (newDate) => {
    setValue(newDate);
    console.log('New Date: ', newDate);
    const date = new Date(newDate);

    const new_month = date.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
    const new_year = date.getFullYear();
    let storedDefaultWallet = defaultWallet;
    //console.log('Default wallet: ', storedDefaultWallet);
    let storedWalletLst = JSON.parse(await AsyncStorage.getItem('wallet_lst'));
    let tempTransactionLst = null;
    for (let i in storedWalletLst) {
      if (storedWalletLst[i]['title'] == storedDefaultWallet) {
        setTransaction(storedWalletLst[i]['transaction_lst']);
        tempTransactionLst = storedWalletLst[i]['transaction_lst'];
      }
    }
    //console.log('Transaction list: ', tempTransactionLst);
    let tempStatisLst = {};
    for (let i in tempTransactionLst) {
      let [temp_month, temp_day, temp_year] =
        tempTransactionLst[i]['date'].split('-');

      if (
        tempTransactionLst[i]['isExpense'] &&
        new_month == parseInt(temp_month) &&
        new_year == parseInt(temp_year)
      ) {
        if (!tempStatisLst[tempTransactionLst[i]['type']]) {
          tempStatisLst[tempTransactionLst[i]['type']] = parseInt(
            tempTransactionLst[i]['value']
          );
        } else {
          tempStatisLst[tempTransactionLst[i]['type']] += parseInt(
            tempTransactionLst[i]['value']
          );
        }
        //console.log ('value: ',  parseInt(tempTransactionLst[i]['value']), tempStatisLst[tempTransactionLst[i]['type']]);
      }
    }
    //console.log('Statis transaction list: ', tempStatisLst);
    let finalStatisLst = [];
    let j = 0;
    let total = 0;
    for (let i in tempStatisLst) {
      finalStatisLst[j] = {
        type: i,
        value: tempStatisLst[i],
      };
      j++;
      total += tempStatisLst[i];
    }
    setTotalExpense(total);
    // Sort - De
    finalStatisLst.sort((a, b) => b.value - a.value);
    setStatisLst(finalStatisLst);
    let other_percent = 100;
    refresh();
    let new_chartdata = chartdata;

    //console.log("chart data", chartdata);
    for (let i in finalStatisLst) {
      if (i == 4) {
        new_chartdata[i]['name'] = 'Khác';
        let value_percent = other_percent.toFixed(2);
        new_chartdata[i]['value'] = value_percent.toString();
      } else {
        new_chartdata[i]['name'] = finalStatisLst[i]['type'];
        let value_percent = Math.round(
          (finalStatisLst[i]['value'] / total) * 100
        ).toFixed(2);
        new_chartdata[i]['value'] = value_percent.toString();
        other_percent -= value_percent;
      }
    }
    setChartData(new_chartdata);
    //console.log(chartData);
    setMonth(new_month);
    setYear(new_year);
    setCurrTime('Tháng ' + new_month.toString() + '/' + new_year.toString());
  };

  const fetchData = async () => {
    try {
      const currFullDate = new Date();
      const currMonth = currFullDate.getMonth() + 1;
      const currYear = currFullDate.getUTCFullYear();
      // Get Default Wallet
      let storedDefaultWallet = await AsyncStorage.getItem('default_wallet');
      if (storedDefaultWallet != null) {
        setDefaultWallet(storedDefaultWallet);
      }
      //console.log('Default wallet: ', storedDefaultWallet);
      let storedWalletLst = JSON.parse(
        await AsyncStorage.getItem('wallet_lst')
      );
      let tempTransactionLst = null;
      for (let i in storedWalletLst) {
        if (storedWalletLst[i]['title'] == storedDefaultWallet) {
          setTransaction(storedWalletLst[i]['transaction_lst']);
          tempTransactionLst = storedWalletLst[i]['transaction_lst'];
        }
        //console.log('Wallet transaction: ', storedWalletLst[i]['transaction_lst']);
      }
      //console.log('Transaction list: ', tempTransactionLst);
      let tempStatisLst = {};
      for (let i in tempTransactionLst) {
        let [temp_month, temp_day, temp_year] =
          tempTransactionLst[i]['date'].split('-');
        //console.log("Try: ", currMonth == parseInt(temp_month), currYear == parseInt(temp_year));
        if (
          tempTransactionLst[i]['isExpense'] &&
          currMonth == parseInt(temp_month) &&
          currYear == parseInt(temp_year)
        ) {
          if (!tempStatisLst[tempTransactionLst[i]['type']]) {
            tempStatisLst[tempTransactionLst[i]['type']] = parseInt(
              tempTransactionLst[i]['value']
            );
          } else {
            tempStatisLst[tempTransactionLst[i]['type']] += parseInt(
              tempTransactionLst[i]['value']
            );
          }
          //console.log ('value: ',  parseInt(tempTransactionLst[i]['value']), tempStatisLst[tempTransactionLst[i]['type']]);
        }
      }
      //console.log('Statis transaction list: ', tempStatisLst);
      let finalStatisLst = [];
      let j = 0;
      let total = 0;
      for (let i in tempStatisLst) {
        finalStatisLst[j] = {
          type: i,
          value: tempStatisLst[i],
        };
        j++;
        total += tempStatisLst[i];
      }
      setTotalExpense(total);
      // Sort - De
      finalStatisLst.sort((a, b) => b.value - a.value);
      setStatisLst(finalStatisLst);
      let other_percent = 100;
      chartdata[i]['name'] = "---";
      let new_chartdata = chartdata;

      //console.log("chart data", chartdata);
      for (let i in finalStatisLst) {
        if (i == 4) {
          new_chartdata[i]['name'] = 'Khác';
          let value_percent = other_percent.toFixed(2);
          new_chartdata[i]['value'] = value_percent.toString();
        } else {
          new_chartdata[i]['name'] = finalStatisLst[i]['type'];
          let value_percent = Math.round(
            (finalStatisLst[i]['value'] / total) * 100
          ).toFixed(2);
          new_chartdata[i]['value'] = value_percent.toString();
          other_percent -= value_percent;
        }
      }
      setChartData(new_chartdata);
      //console.log(chartData);

      setMonth(currMonth);

      setYear(currYear);
      setCurrTime('Tháng ' + currMonth.toString() + '/' + currYear.toString());
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useFocusEffect(
    useCallback(async () => {
      await fetchData();

      return () => {
        console.log('Thống kê chi tiêu tháng is unfocused');
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ChartBox chartdata={chartData} />
      <View style={styles.container_2}>
        <View>
          <Text style={{ color: '#181818', fontSize: 15, fontWeight: 'bold' }}>
            Tổng chi tiêu
          </Text>
          <Text style={{ color: '#EF736D', fontSize: 13, fontWeight: 'bold' }}>
            -{totalExpense} VND
          </Text>
        </View>
        <View>
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
      </View>
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
          dataList={statisLst}
          isExpense={true}
          navigation={navigation}
          option="3"></ScrollList>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  container_2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    paddingVertical: 5,
  },
});
export default statisExpenseMonth;
