import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import transactionIconPaths from './transactionIcon';
import PropTypes from 'prop-types';

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

const ListItem3 = ({ type, value, isExpense, navigation }) => (
  
  <View style={styles.item}>
    <Image source={transactionIconPaths[type]} />
    <View style={{display: 'flex', alignItems:'flex-end'}}>
      <Text style={{fontSize: 14, fontWeight: 'bold',}}>{type}</Text>
    </View>
    <View style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between',alignItems:'center'}}>
      <Text style={{fontSize: 12, fontStyle: 'italic', color: '#A4A6B2'}}>{(isExpense) ? "Chi phí: " : "Thu nhập: "}</Text>
      {(isExpense) ? 
      <Text style={{fontSize: 12, fontWeight: 'bold', color: "#EF736D"}}>-{value} VND</Text> : 
      <Text style={{fontSize: 12, fontWeight: 'bold', color: "#00E879"}}>+{value} VND</Text>}
    </View>
  </View>
);

const ListItem4 = ({ title, default_plan, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('CHI TIẾT KẾ HOẠCH', {planName: title})}>
  <View style={styles.item}>
    <View style={{display: 'flex', alignItems:'flex-end'}}>
      <Text style={{fontSize: 14, fontWeight: 'bold',}}>{title}</Text>
    </View>
    <View style={{display: 'flex', flexDirection: 'row', width: '30%', justifyContent: 'space-between',alignItems:'center'}}>
      <Text style={{fontStyle: 'italic', color: '#5E5F65', fontSize: 11}}>{(default_plan==title)? "đang áp dụng" : ""}</Text>
    </View>
  </View>
  </TouchableOpacity>
);

const ListItem5 = ({ type, plan, target, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('CHI TIẾT MỤC TIÊU', {type: type, planName: plan})}>
  <View style={styles.item}>
    <Image source={transactionIconPaths[type]} />
    <View style={{display: 'flex', alignItems:'flex-end'}}>
      <Text style={{fontSize: 14, fontWeight: 'bold',}}>{type}</Text>
    </View>
    <View style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between',alignItems:'center'}}>
      <Text style={{fontSize: 12, fontStyle: 'italic', color: '#A4A6B2'}}>Mục tiêu: </Text> 
      <Text style={{fontSize: 12, fontWeight: 'bold', color: "#EF736D"}}>-{target} VND</Text>
    </View>
  </View>
  </TouchableOpacity>
);

const ListItem6 = ({ list, onPressFunc, navigation }) => (
  <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', alignItems: 'center', padding: 10}}>
    <TouchableOpacity style={styles.icon} onPress={async () => 
        {
          console.log(list[0]);
          await onPressFunc(list[0]);}
      }>
      <View style={styles.icon_1}>
        <Image style={{padding: 8}} source={transactionIconPaths[list[0]]} />
        <Text style={{paddingVertical: 8}}>{list[0]}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon} onPress={async () => await onPressFunc(list[1])}>
      <View style={styles.icon_1}>
        <Image style={{padding: 8}} source={transactionIconPaths[list[1]]} />
        <Text style={{paddingVertical: 8}}>{list[1]}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon} onPress={async () => await onPressFunc(list[2])}>
      <View style={styles.icon_1}>
        <Image style={{padding: 8}} source={transactionIconPaths[list[2]]} />
        <Text style={{paddingVertical: 8}}>{list[2]}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

ListItem6.propTypes = {
  onPressFunc: PropTypes.func.isRequired,
};

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
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%'
  },
  icon_1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
});

export {ListItem1, ListItem2, ListItem3, ListItem4, ListItem5, ListItem6};