import React , {useEffect, useState, useCallback}from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { useFocusEffect, useRoute } from '@react-navigation/native';


const InfoBox = ({ balance, income, spending, target, option="1" }) => {
  
  return (
    <View style={styles.card}>
      { (option != "3") ?
      <>
      <View style={styles.item}>
        <Text style={styles.name}>{(option == "1") ? 'Tổng số dư các ví: ' : 'Số dư ví: '}</Text>
        <Text style={styles.balance}>{balance} VND</Text>
      </View>
      </>: null
      }
      { (option == '2' || option == "3") ?
      <>
      <View style={styles.item}>
        <Text style={styles.name}>{(option == "1") ? 'Tổng thu nhập tháng: ' : 'Thu nhập tháng: '}</Text>
        <Text style={styles.income}>+{income} VND</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>{(option == "1") ? 'Tổng chi tiêu tháng: ' : 'Chi tiêu tháng: '}</Text>
        <Text style={styles.spending}>-{spending} VND</Text>
      </View>
      { (option == "2") ?
      <>
      <View style={styles.item}>
        <Text style={styles.name}>Mục tiêu chi tiêu:</Text>
        <Text style={styles.target}>-{target} VND</Text>
      </View></>:null}</> : null
      }
    </View>
  );
};

const ChartBox = ({chartdata}) => {
  return (
    <View style={styles.card_chart}>
      <PieChart style={{ width: '30%' }} data={chartdata} />

      <View style={styles.card_new}>
        <View style={styles.item}>
          <Text style={styles.name}>{chartdata[0]['name']}</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#EF7A6D',}}>{chartdata[0]['value']} %</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>{chartdata[1]['name']}</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#FFBB00',}}>{chartdata[1]['value']} %</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>{chartdata[2]['name']}</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#00E879',}}>{chartdata[2]['value']} %</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>{chartdata[3]['name']}</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#29E5FE',}}>{chartdata[3]['value']} %</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>{chartdata[4]['name']}</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ffffff',}}>{chartdata[4]['value']} %</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#181818',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    width: '90%',
  },
  card_chart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#181818',
    borderRadius: 20,
    padding: 8,
    marginVertical: 8,
    width: '90%',
  },
  card_new: {
    backgroundColor: '#181818',
    borderRadius: 20,
    paddingHorizontal: 10,
    elevation: 2,
    width: '70%',
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  balance: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00E879',
  },
  income: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#29E5FE',
  },
  spending: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EF7A6D',
  },
  target: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFBB00',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  
});

export {InfoBox, ChartBox };
export default InfoBox;
