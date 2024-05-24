import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const transactionIconPaths = {
  'Ăn uống': require('../assets/transaction_icon/Ăn uống.png'),
  'Tiền lương': require('../assets/transaction_icon/Tiền lương.png'),
  'Chữa bệnh': require('../assets/transaction_icon/Chữa bệnh.png'),
  'Chuyển khoản': require('../assets/transaction_icon/Chuyển khoản.png'),
  'Đầu tư': require('../assets/transaction_icon/Đầu tư.png'),
  'Di chuyển': require('../assets/transaction_icon/Di chuyển.png'),
  'Du lịch': require('../assets/transaction_icon/Du lịch.png'),
  'Giải trí': require('../assets/transaction_icon/Giải trí.png'),
  'Giáo dục': require('../assets/transaction_icon/Giáo dục.png'),
  'Hóa đơn điện': require('../assets/transaction_icon/Hóa đơn điện.png'),
  'Hóa đơn nước': require('../assets/transaction_icon/Hóa đơn nước.png'),
  'Khác': require('../assets/transaction_icon/Khác.png'),
  'Làm đẹp': require('../assets/transaction_icon/Làm đẹp.png'),
  'Mua sắm': require('../assets/transaction_icon/Mua sắm.png'),
  'Nhà ở': require('../assets/transaction_icon/Nhà ở.png'),
  'Qùa tặng': require('../assets/transaction_icon/Qùa tặng.png'),
  'Quyên góp': require('../assets/transaction_icon/Quyên góp.png'),
  'Sửa chữa': require('../assets/transaction_icon/Sửa chữa.png'),
  'Thể thao': require('../assets/transaction_icon/Thể thao.png'),
  'Thú cưng': require('../assets/transaction_icon/Thú cưng.png'),
  'Vé số': require('../assets/transaction_icon/Vé số.png'),
};

const ListItem1 = ({ title, balance, default_wallet, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('CHI TIẾT VÍ', {walletName: title})}>
  <View style={styles.item}>
    <Text style={{fontWeight: 'bold', fontSize: 12,}}>{title}</Text>
    <Text style={{fontStyle: 'italic', color: '#5E5F65', fontSize: 11}}>{(default_wallet==title)? "mặc định" : ""}</Text>
    <View style={{display: 'flex', alignItems:'flex-end'}}>
      <Text style={{fontSize: 12, fontWeight: 'bold',}}>Số dư</Text>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#00E879'}}>{balance} VND</Text>
    </View>
  </View>
  </TouchableOpacity>
);
//<TouchableOpacity onPress={() => navigation.navigate('CHI TIẾT VÍ', {walletName: title})}>
const ListItem2 = ({ type, date, isExpense, value, navigation }) => (
  
  <View style={styles.item}>
    <Image source={transactionIconPaths[type]} />
    <View style={{display: 'flex', alignItems:'flex-end'}}>
      <Text style={{fontSize: 14, fontWeight: 'bold',}}>{type}</Text>
      <Text style={{fontSize: 12, fontStyle: 'italic'}}>{date}</Text>
    </View>
    <View style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between',alignItems:'center'}}>
      <Text style={{fontSize: 12, fontStyle: 'italic', color: '#A4A6B2'}}>{(isExpense) ? "Chi phí: " : "Thu nhập: "}</Text>
      {(isExpense) ? 
      <Text style={{fontSize: 12, fontWeight: 'bold', color: "#EF736D"}}>-{value} VND</Text> : 
      <Text style={{fontSize: 12, fontWeight: 'bold', color: "#00E879"}}>+{value} VND</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
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

export {ListItem1, ListItem2};