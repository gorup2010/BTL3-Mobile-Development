import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const initialAccounts = [
  {name: 'Ví chính', balance: 1000000 , icon: 'info-outline'},
  {name: 'Tiết kiệm', balance: 5000000 ,icon: ''},
  {name: 'Dự phòng', balance: 2000000 ,icon: ''},
];

export default function SelectWallet({route, navigation}) {
  const [accounts, setAccounts] = useState(initialAccounts);
  //Update balance
  const updateBalance = (key, newBalance) => {
  const updatedAccounts = accounts.map(account =>
    account.key === key ? { ...account, balance: newBalance } : account
  );
  setAccounts(updatedAccounts);
};
  // Get name of wallet and go back
  const { onSelectItem } = route.params;
  const handleItemPress = (item) => {
      onSelectItem(item.name);
      navigation.goBack();
    };

  const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      {item.icon !== '' &&
      <View style={{flexDirection:'row',alignItems: 'center'}}>
        <Icon name={item.icon}  size={20} color="#5E5F65"/>
        <Text style={{color: "#5E5F65"}}> mặc định </Text>
      </View>}
      <View>
          <Text style={{fontSize: 12}}>Số dư</Text>
          <Text style={styles.balance}>{item.balance.toLocaleString('vi-VN')} VND</Text>
      </View>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#EEEFF6',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 15,
    justifyContent: 'center',
    padding: 5,
  },
  balance: {
    fontSize: 12,
    color: '#00E879'
  },
});