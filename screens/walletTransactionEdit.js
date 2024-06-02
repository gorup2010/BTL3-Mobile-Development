import React, { useState, useEffect, useCallback } from 'react';
import { View, Switch, TextInput, Text, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import components
import ScrollList from '../components/scrollList';
// import services
import {
  getAllExpenseTypes, getAllIncomeTypes,
  getDefaultWalletName,
  getWalletLst,
} from '../services/dataFetching';
import { updateTransaction } from '../services/dataUpdate';
// import styles sheet
import styles from '../assets/styleSheet';

const walletTransactionEdit = ({ navigation }) => {
  const route = useRoute();
  const { transaction } = route.params;
  const { wallet } = route.params;


  const changeType = async (type) => {
    //console.log("Running");
    setModalVisible((prevState) => !prevState);
    setType(type);
  };

  const changeWallet = async (wallet) => {
    //console.log("Running");
    setWalletModalVisible((prevState) => !prevState);
    setWallet(wallet);
  };

  const changeDate = async (date) => {
    //console.log("Running");
    const currMonth = date.getMonth() + 1;
    const currDay = date.getUTCDate();
    const currYear = date.getUTCFullYear();
    let currTime = currMonth + '-' + currDay + '-' + currYear;
    setDate(currTime);
    setDateModalVisible((prevState) => !prevState);
  };

  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [note, onChangeNote] = useState(transaction['note']);
  const [type, setType] = useState(transaction['type']);
  //const [wallet, setWallet] = useState(null);
  const [defaultWallet, setDefaultWallet] = useState(null);
  const [walletLst, setWalletLst] = useState([]);
  const [value, onChangeValue] = useState(transaction['value']);
  const [valueError, setValueError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [date, setDate] = useState(transaction['date']);

  const clearData = async () => {
    setType(transaction['type']);
    onChangeValue(transaction['value']);
    onChangeNote(transaction['note']);
    const defaultWalletName = await getDefaultWalletName();
    setWallet(defaultWalletName);
    setDefaultWallet(defaultWalletName);
    setDate(transaction['date']);
  };

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          let allTypes = null;
          if (transaction['isExpense']) {allTypes = await getAllExpenseTypes();}
          else {allTypes = await getAllIncomeTypes();}
          setTypes(allTypes);

          const defaultWalletName = await getDefaultWalletName();
          setWallet(defaultWalletName);
          setDefaultWallet(defaultWalletName);

          const storedWalletLst = await getWalletLst();
          setWalletLst(storedWalletLst);

          let getCurrTime = new Date();
          //console.log ("Curr Time: ", getCurrTime);
          const currMonth = getCurrTime.getMonth() + 1;
          const currDay = getCurrTime.getUTCDate();
          const currYear = getCurrTime.getUTCFullYear();
          getCurrTime = currMonth + '-' + currDay + '-' + currYear;
          //console.log ("Curr Time: ", getCurrTime);
          setDate(getCurrTime);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Chi tiết mục tiêu is unfocused');
      };
    }, [])
  );

  //console.log("Plan name: ", planName);
  //console.log("Remaining Types: ", remainTypes);
  //console.log("Function 0: ", changeType);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ paddingVertical: 30 }}>
          <ScrollList
            dataList={types}
            onPressFunc={changeType}
            opheight="100%"
            option="6"></ScrollList>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={walletModalVisible}
        onRequestClose={() => {
          setWalletModalVisible(!walletModalVisible);
        }}>
        <View style={{ paddingVertical: 30 }}>
          <ScrollList
            dataList={walletLst}
            default_wallet={defaultWallet}
            onPressFunc={changeWallet}
            navigation={navigation}
            opheight="100%"
            option="8"></ScrollList>
        </View>
      </Modal>
      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <Text style={styles.label}>Phân loại</Text>
        <TextInput
          style={styles.input}
          value={type}
          placeholder="Chọn phân loại"
          onPressIn={() => setModalVisible(!modalVisible)}
        />
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Số tiền</Text>
          <Text style={styles.errorMessage}> {valueError? 'Không để trống mục này' : null} </Text>
        </View>
        <TextInput
          style={[styles.input, valueError ? styles.inputError : null]}
          onChangeText={onChangeValue}
          value={value}
          placeholder="Nhập số tiền"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Ghi chú</Text>
        <TextInput
          style={styles.input_des}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Nhập ghi chú cho mục tiêu"
          multiline
          keyboardType="text"
          blurOnSubmit={true}
        />

        <Text style={styles.label}>Thời gian</Text>
        <TextInput
          style={styles.input}
          value={date}
          placeholder="Chọn thời gian"
          onPressIn={() => setDateModalVisible(!dateModalVisible)}
        />
        <DateTimePickerModal
          isVisible={dateModalVisible}
          mode="date"
          onConfirm={changeDate}
          onCancel={() => setDateModalVisible(!dateModalVisible)}
        />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '10%',
        }}>
        <View style={{ display:'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: 10 }}>
          <Button
            buttonStyle={{
              borderRadius: 20,
              width: 150,
              height: 40,
              backgroundColor: '#181818',
            }}
            style={{ paddingHorizontal: 20 }}
            title="Không đổi"
            onPress={async () => {
              clearData();
            }}></Button>
          <Button
            buttonStyle={{
              borderRadius: 20,
              width: 150,
              height: 40,
              backgroundColor: '#00E879',
            }}
            style={{ paddingHorizontal: 20 }}
            title="Lưu"
            onPress={async () => {
              if (value.trim() === '') {
                //console.long ("NaN detected");
                setValueError(true);
                return;
              }
              await updateTransaction( transaction,
                {
                  type: type,
                  date: date,
                  value: value,
                  isExpense: transaction['isExpense'],
                  note: note,
                },
                wallet
              );
              navigation.navigate('CHI TIẾT VÍ', {walletName: wallet});
            }}></Button>
        </View>
      </View>
    </View>
  );
};


export default walletTransactionEdit;
