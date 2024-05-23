import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';

const ListItem = ({ title, balance, default_wallet }) => (
  <View style={styles.item}>
    <Text style={{fontWeight: 'bold', fontSize: 12,}}>{title}</Text>
    <Text style={{fontStyle: 'italic', color: '#5E5F65', fontSize: 11}}>{(default_wallet==title)? "mặc định" : ""}</Text>
    <View style={{display: 'flex', alignItems:'flex-end'}}>
      <Text style={{fontSize: 12, fontWeight: 'bold',}}>Số dư</Text>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#00E879'}}>{balance} VND</Text>
    </View>
  </View>
);

const ScrollList = ({ dataList, default_wallet }) => {
  return (
    <View style={styles.card}>
      <FlatList
        style={{height: '65%'}}
        data={dataList}
        renderItem={({ item }) => <ListItem title={item.title} default_op={item.default_op} balance={item.balance} default_wallet={default_wallet }/>}
        keyExtractor={item => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  item: {
    backgroundColor: '#EEEFF6',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ScrollList;
