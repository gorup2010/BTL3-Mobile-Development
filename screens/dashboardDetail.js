import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
// import components
import InfoBox from '../components/infoBox';
import ScrollList from '../components/scrollList';
// import services
import {
  getTarget,
  getDefaultWalletInfo,
  getDefaultPlan,
  compareTarget,
} from '../services/dataFetching';

const dashboardDetail = ({ navigation }) => {
  const [currDate, setCurrDate] = useState(new Date());
  const [balance, setBalance] = useState('0');
  const [income, setIncome] = useState('0');
  const [spending, setSpending] = useState('0');
  const [compareLst, setCompare] = useState([]);
  const [target, setTarget] = useState('0');
  
  // Get infoBox data from local storage. Run every time Screen is focused
  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          let currMonth = currDate.getMonth() + 1;
          let currYear = currDate.getUTCFullYear();

          let defaultWalletInfo = await getDefaultWalletInfo(
            currMonth,
            currYear
          );
          
          setBalance(defaultWalletInfo['balance']);
          setSpending(defaultWalletInfo['expense']);
          setIncome(defaultWalletInfo['income']);

          const storedTarget = await getTarget();
          //console.log('Target List: ', storedTarget);
          
          const storedDefaultPlan = await getDefaultPlan();

          let compareResult = await compareTarget(
            storedDefaultPlan['target_lst'],
            defaultWalletInfo['expenseLst']
          );
          //console.log('Compare List: ', compareResult);
          setTarget(storedTarget);
          setCompare(compareResult);


        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Dashboard is unfocused');
      };
    }, [])
  );

  //console.log('Compare List: ', Array.isArray(compareLst));


  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#181818',
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 13,
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
        }}>
        Ngày {currDate.getUTCDate()} tháng {currDate.getUTCMonth() + 1}, năm{' '}
        {currDate.getUTCFullYear()}
      </Text>
      <InfoBox
        balance={balance}
        income={income}
        spending={spending}
        target={target}
        option="2"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          paddingVertical: 10,
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#5E5F65' }}>
          Kế hoạch tháng này
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 30,
            width: 90,
            height: 40,
            backgroundColor: '#181818',
          }}
          title="Lịch sử"
          onPress={() => navigation.navigate('LỊCH SỬ GIAO DỊCH')}></Button>
      </View>
      
      <ScrollList dataList={compareLst} option="7">
      </ScrollList>
      
    </View>
  );
};
/*
<ScrollList
        dataList={compareLst}
        navigation={navigation}
        option="7"
        opheight="65%"></ScrollList>
*/
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default dashboardDetail;
