import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import {ListItem1, ListItem2} from './listItem.js';

const ScrollList = ({ dataList, default_wallet, navigation, option }) => {
  return (
    <View style={styles.card}>
      <FlatList
        style={{height: '65%'}}
        data={dataList}
        renderItem={({ item }) => 
          ((option == "1" || option == null) ? (<ListItem1 title={item.title} default_op={item.default_op} balance={item.balance} default_wallet={default_wallet} navigation={navigation}/>) : 
          ((option == "2") ? (<ListItem2 type={item.type} date={item.date} isExpense={item.isExpense} value={item.value} navigation={navigation}/>) : null))
        }
        keyExtractor={item => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});

export default ScrollList;
