// screens/Movies.js
import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, TouchableHighlight,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Button,Keyboard} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectSpendingGroup from './SelectSpendingGroup';
import SetDate from '../components/SetDate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTransaction = async (transaction) => {
  try {
    // Create a transaction object
    const newTransaction = {
      type: transaction.type,
      date: transaction.date,
      isExpense: transaction.isExpense,
      value: transaction.value,
      note: transaction.note,
    };
    // Get existing transactions
    const storedTransactions = await AsyncStorage.getItem('transactions');
    let transactions = [];
    if (storedTransactions !== null) {
      transactions = JSON.parse(storedTransactions);
    }
    // Add new transaction
    transactions.push(newTransaction);
    // Save updated transactions back to AsyncStorage
    await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    console.log('Transaction saved successfully!',transactions);
  } catch (error) {
    console.error('Error saving transaction: ', error);
  }
};
const getTransactionInfo = (type,date,isExpense,value,note) =>{
    const transaction = {
              type: type,  // Source wallet when in transfer
              date: date,
              isExpense: isExpense, // Destination wallet when in transfer
              value: value,
              note: note,
            };
    saveTransaction(transaction)
}

const Tab = createMaterialTopTabNavigator();

const TransactionAddIncome = ({navigation}) => {
   const [money, setMoney] = useState('');
   const [note, setNote] = useState('');
   const [IncomeGroup, setIncomeGroup] = useState('');
   const [Wallet, setWallet] = useState('');
   const [Time, setTime] = useState('');
   const [savePress, setSavePress] = useState(false);
   const handlePress = (destination, setInputValue) => {
      navigation.navigate(destination,
      {onSelectItem: (selectedItem) => {
        setInputValue(selectedItem);
       },
     });
   };

  return (
    <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textbox}>Số tiền</Text>
          <TextInput
                  style={styles.inputbox}
                  placeholder="VND"
                  onChangeText={newText => setMoney(newText)}
                  defaultValue={money}
                  keyboardType="numeric"
                />
          {!money && savePress ? <Text style={styles.error}>Vui lòng nhập số tiền</Text> : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Nhóm thu nhập</Text>
          <TouchableOpacity onPress={() => handlePress('CHỌN NHÓM THU NHẬP',setIncomeGroup)}>
          <View style = {[styles.inputbox,{flexDirection: 'row'}]} pointerEvents="none">
            <Icon name="menu" size={30} color="#5E5F65" style={styles.icon} />
              <TextInput
                   style={{justifyContent:'center',
                           paddingHorizontal: 10,
                           fontSize: 20,
                           marginLeft: 3,
                           color: "#323941"
                           }}
                   placeholder="Nhấp vào để chọn"
                   editable={false}
                   value={IncomeGroup}
               />
          </View>
          </TouchableOpacity>
          {!IncomeGroup && savePress ? <Text style={styles.error}>Vui lòng chọn nhóm thu nhập</Text> : ''}

          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ghi chú</Text>
                     <TextInput
                             style={[styles.inputbox,{height: 159},{paddingVertical: 12}]}
                             placeholder="Thêm ghi chú vào đây"
                             multiline={true}
                             textAlignVertical="top"
                             onChangeText={newText => setNote(newText)}
                             defaultValue={note} />
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ví</Text>
          <TouchableOpacity onPress={() => handlePress('CHỌN VÍ TIỀN',setWallet)} pointerEvents="none">
             <View style = {[styles.inputbox,{flexDirection: 'row'}]}>
             <Icon name="menu" size={30} color="#5E5F65" style={styles.icon}/>
             <TextInput
               style={{justifyContent:'center',
                   paddingHorizontal: 10,
                   fontSize: 20,
                   marginLeft: 3,
                   color: "#323941",
               }}
               placeholder="Nhấp vào để chọn"
               editable = {false}
               value={Wallet}
               />
             </View>
          </TouchableOpacity>
          {!Wallet && savePress ? setWallet('Ví chính') : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Thời gian</Text>
          <View >
                <SetDate value={Time} onChange={setTime} />
          </View>
          {!Time && savePress ? setTime('Hôm nay') : ''}
          <View style ={{paddingVertical: 20,paddingHorizontal: 35,justifyContent: 'space-between',flexDirection: 'row'}}>
             <TouchableHighlight
                  style={{justifyContent: 'center',alignItems: 'center',borderRadius: 20, width: 141, height: 40, backgroundColor: '#FCFCFC',borderColor: '#222222',borderWidth: 1}}
                  onPress={() => navigation.navigate('LỊCH SỬ GIAO DỊCH')}
                >
                  <Text style={{textAlign: 'center', fontWeight: 'bold',fontSize: 16}}>Hủy</Text>
             </TouchableHighlight>
             <TouchableHighlight
                  style={{justifyContent: 'center',alignItems: 'center',borderRadius: 20, width: 141, height: 40, backgroundColor: '#00E879'}}
                  onPress={() => {
                  setSavePress(true);
                  if (money&&IncomeGroup) {
                  console.log(IncomeGroup,Time,money,note)
                  getTransactionInfo(IncomeGroup,Time,false,money,note)
                  navigation.navigate('LỊCH SỬ GIAO DỊCH');
                  }
                  }}
                >
                  <Text style={{textAlign: 'center', fontWeight: 'bold',color: "#FCFCFC",fontSize: 16}}>Lưu</Text>
             </TouchableHighlight>
          </View>
    </ScrollView>
    </View>
  );
};

const TransactionAddExpense = ({navigation}) => {
   const [money, setMoney] = useState('');
   const [note, setNote] = useState('');
   const [SpendingGroup, setSpendingGroup] = useState('');
   const [Wallet, setWallet] = useState('');
   const [Time, setTime] = useState('');
   const [savePress, setSavePress] = useState(false);

   const handlePress = (destination, setInputValue) => {
      navigation.navigate(destination,
      {onSelectItem: (selectedItem) => {
        setInputValue(selectedItem);
         },
      });
   };
  return (
    <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textbox}>Số tiền</Text>
          <TextInput
                  style={styles.inputbox}
                  placeholder="VND"
                  onChangeText={newText => setMoney(newText)}
                  defaultValue={money}
                  keyboardType="numeric"
                />
          {!money && savePress ? <Text style={styles.error}>Vui lòng nhập số tiền</Text> : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Nhóm chi tiêu</Text>
          <TouchableOpacity onPress={() => handlePress('CHỌN NHÓM CHI TIÊU',setSpendingGroup)}>
          <View style = {[styles.inputbox,{flexDirection: 'row'}]} pointerEvents="none">
          <Icon name="menu" size={30} color="#5E5F65" style={styles.icon}/>
          <TextInput
               style={{justifyContent:'center',
                       paddingHorizontal: 10,
                       fontSize: 20,
                       marginLeft: 3,
                       color: '#323941'
                       }}
               placeholder={"Nhấp vào để chọn"}
               value={SpendingGroup}
               editable={false}
               />
          </View>
          </TouchableOpacity>
          {!SpendingGroup && savePress ? <Text style={styles.error}>Vui lòng chọn nhóm chi tiêu</Text> : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ghi chú</Text>
                     <TextInput
                             style={[styles.inputbox,{height: 159},{paddingVertical: 12}]}
                             placeholder="Thêm ghi chú vào đây"
                             multiline={true}
                             textAlignVertical="top"
                             onChangeText={newText => setNote(newText)}
                             defaultValue={note} />
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ví</Text>
                    <TouchableOpacity onPress={() => handlePress('CHỌN VÍ TIỀN',setWallet)}>
                       <View style = {[styles.inputbox,{flexDirection: 'row'}]}  pointerEvents="none">
                       <Icon name="menu" size={30} color="#5E5F65" style={styles.icon}/>
                       <TextInput
                         style={{justifyContent:'center',
                             paddingHorizontal: 10,
                             fontSize: 20,
                             marginLeft: 3,
                             color: "#323941",
                         }}
                         placeholder="Nhấp vào để chọn"
                         editable = {false}
                         value={Wallet}
                         />
                       </View>
                    </TouchableOpacity>
          {!Wallet && savePress ? setWallet('Ví chính') : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Thời gian</Text>
            <View >
                  <SetDate value={Time} onChange={setTime} />
            </View>
            {!Time && savePress ? setTime('Hôm nay') : ''}
          <View style ={{paddingVertical: 20,paddingHorizontal: 35,justifyContent: 'space-between',flexDirection: 'row'}}>
              <TouchableHighlight
                    style={{justifyContent: 'center',alignItems: 'center',borderRadius: 20, width: 141, height: 40, backgroundColor: '#FCFCFC',borderColor: '#222222',borderWidth: 1}}
                    onPress={() => navigation.navigate('LỊCH SỬ GIAO DỊCH')}
                  >
                    <Text style={{textAlign: 'center', fontWeight: 'bold',fontSize: 16}}>Hủy</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{justifyContent: 'center',alignItems: 'center',borderRadius: 20, width: 141, height: 40, backgroundColor: '#00E879'}}
                onPress={() => {
                setSavePress(true);
                if (money&&SpendingGroup) {
                navigation.navigate('LỊCH SỬ GIAO DỊCH');
                getTransactionInfo(SpendingGroup,Time,true,money,note);
                }
                }}
              >
                <Text style={{textAlign: 'center', fontWeight: 'bold',color: "#FCFCFC",fontSize: 16}}>Lưu</Text>
              </TouchableHighlight>
          </View>
    </ScrollView>
    </View>
  );
};

const TransactionAddTransfer = ({navigation}) => {
   const [money, setMoney] = useState('');
   const [note, setNote] = useState('');
   const [SourceWallet, setSourceWallet] = useState('');
   const [DestinationWallet, setDestinationWallet] = useState('');
   const [Time, setTime] = useState('Hôm nay');
   const [savePress, setSavePress] = useState(false);
   const handlePress = (destination, setInputValue) => {
      navigation.navigate(destination,
      {onSelectItem: (selectedItem) => {
        setInputValue(selectedItem);
         },
      });
   };
  return (
    <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textbox}>Số tiền</Text>
          <TextInput
                  style={styles.inputbox}
                  placeholder="VND"
                  onChangeText={newText => setMoney(newText)}
                  defaultValue={money}
                  keyboardType="numeric"
                />
          {!money && savePress ? <Text style={styles.error}>Vui lòng nhập số tiền</Text> : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ví nguồn</Text>
              <TouchableOpacity onPress={() => handlePress('CHỌN VÍ TIỀN',setSourceWallet)}>
                 <View style = {[styles.inputbox,{flexDirection: 'row'}]}  pointerEvents="none">
                     <Icon name="menu" size={30} color="#5E5F65" style={styles.icon}/>
                     <TextInput
                       style={{justifyContent:'center',
                           paddingHorizontal: 10,
                           fontSize: 20,
                           marginLeft: 3,
                           color: "#323941",
                       }}
                       placeholder="Nhấp vào để chọn"
                       editable = {false}
                       value={SourceWallet}
                       />
                 </View>
              </TouchableOpacity>
              {!SourceWallet && savePress ? <Text style={styles.error}>Vui lòng chọn ví nguồn</Text> : ''}

            <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ví đích</Text>
              <TouchableOpacity onPress={() => handlePress('CHỌN VÍ TIỀN',setDestinationWallet)}>
                <View style = {[styles.inputbox,{flexDirection: 'row'}]}  pointerEvents="none">
                    <Icon name="menu" size={30} color="#5E5F65" style={styles.icon}/>
                    <TextInput
                        style={{justifyContent:'center',
                            paddingHorizontal: 10,
                            fontSize: 20,
                            marginLeft: 3,
                            color: "#323941",
                       }}
                        placeholder="Nhấp vào để chọn"
                        editable = {false}
                        value={DestinationWallet}
                     />
                </View>
              </TouchableOpacity>
              {!DestinationWallet && savePress ? <Text style={[styles.error,{flexDirection:'column'}]}>Vui lòng chọn ví đích</Text> : ''}
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Ghi chú</Text>
                     <TextInput
                             style={[styles.inputbox,{height: 159},{paddingVertical: 12}]}
                             placeholder="Thêm ghi chú vào đây"
                             multiline={true}
                             textAlignVertical="top"
                             onChangeText={newText => setNote(newText)}
                             defaultValue={note} />
          <View style ={{paddingVertical: 5}}></View>
          <Text style={styles.textbox}>Thời gian</Text>
              <View >
                    <SetDate value={Time} onChange={setTime} />
              </View>
          {!Time && savePress ? setTime('Hôm nay') : ''}
          <View style ={{paddingVertical: 20,paddingHorizontal: 35,justifyContent: 'space-between',flexDirection: 'row'}}>
          <TouchableHighlight
                  style={{justifyContent: 'center',alignItems: 'center',borderRadius: 20, width: 141, height: 40, backgroundColor: '#FCFCFC',borderColor: '#222222',borderWidth: 1}}
                  onPress={() => navigation.navigate('LỊCH SỬ GIAO DỊCH')}
                >
                  <Text style={{textAlign: 'center', fontWeight: 'bold',fontSize: 16}}>Hủy</Text>
                </TouchableHighlight>
          <TouchableHighlight
                  style={{justifyContent: 'center',alignItems: 'center',borderRadius: 20, width: 141, height: 40, backgroundColor: '#00E879'}}
                  onPress={() => {
                  setSavePress(true);
                  if (money&&SourceWallet&&DestinationWallet) {
                  getTransactionInfo(SourceWallet,Time,DestinationWallet,money,note)
                  navigation.navigate('LỊCH SỬ GIAO DỊCH')
                  }
                  }}
                >
                  <Text style={{textAlign: 'center', fontWeight: 'bold',color: "#FCFCFC",fontSize: 16}}>Lưu</Text>
          </TouchableHighlight>
          </View>
    </ScrollView>
    </View>
  );
};

export default function TransactionAdd () {

  return (
    <PaperProvider>
        <Tab.Navigator
          initialRouteName="Expense"
          screensOptions={{
            tabBarLabelStyle: { fontSize: 15, textAlign: 'center',textTransform: 'none', fontWeight:'bold'},
            tabBarItemStyle: {flexDirection: 'row',justifyContent:'center',height: 40 },
            tabBarStyle: { backgroundColor: '#FFF'}, // Adjust the height here
            tabBarIndicatorStyle: { backgroundColor: '#000' },
          }}
        >
          <Tab.Screen
            name="Expense"
            component={TransactionAddExpense}
            options={{ tabBarLabel: 'Chi tiêu'}}
          />
          <Tab.Screen
            name="Income"
            component={TransactionAddIncome}
            options={{ tabBarLabel: 'Thu nhập'}}
          />
          <Tab.Screen
             name="Transfer"
             component={TransactionAddTransfer}
             options={{ tabBarLabel: 'Chuyển khoản' }}
          />
        </Tab.Navigator>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF'
  },

  inputbox: {
      height: 44,
      width: 310,
      borderColor: '#323941',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 20,
      fontSize: 20,
      marginLeft: 20,
    },
  textbox: {
      color: '#5E5F65',
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent: 'top',
      alignItems: 'left',
      paddingBottom:5,
      marginLeft: 20,
  },
  icon: {
      color: '#5E5F65',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
  },
  error: {
  color: '#FF0000',
  fontSize: 16,
  marginLeft: 20,
  paddingTop: 5,
  },
});
