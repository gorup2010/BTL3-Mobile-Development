import React from 'react';
import { View, Text, StyleSheet, ProgressViewIOS } from 'react-native';

const InfoBox = ({ balance, income, spending, target }) => {
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.name}>Tổng số dư các ví:</Text>
        <Text style={styles.balance}>${balance} VND</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>Thu nhập hằng tháng:</Text>
        <Text style={styles.income}>+${income} VND</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>Chi tiêu tháng:</Text>
        <Text style={styles.spending}>-${spending} VND</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>Mục tiêu chi tiêu:</Text>
        <Text style={styles.target}>-${target} VND</Text>
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

export default InfoBox;
