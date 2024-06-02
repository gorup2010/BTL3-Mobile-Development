import React, { useState, useEffect, useCallback } from 'react';
import { View, Switch, TextInput, Text, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import components
import ScrollList from '../components/scrollList';
// import services
import {
  getAllExpenseTypes,
  getDefaultWalletName,
  getWalletLst,
} from '../services/dataFetching';
import { addTransaction } from '../services/dataUpdate';
// import styles sheet
import styles from '../assets/styleSheet';

const transactionExpenseAdd = ({ navigation }) => {
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

  const [expenseTypes, setExpenseTypes] = useState([]);
  const [note, onChangeNote] = useState(null);
  const [type, setType] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [defaultWallet, setDefaultWallet] = useState(null);
  const [walletLst, setWalletLst] = useState([]);
  const [expense, onChangeExpense] = useState(null);
  const [expenseError, setExpenseError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const clearData = async () => {
    setType(null);
    onChangeExpense(null);
    onChangeNote(null);
    const defaultWalletName = await getDefaultWalletName();
    setWallet(defaultWalletName);
    setDefaultWallet(defaultWalletName);

    let getCurrTime = new Date();
    //console.log ("Curr Time: ", getCurrTime);
    const currMonth = getCurrTime.getMonth() + 1;
    const currDay = getCurrTime.getUTCDate();
    const currYear = getCurrTime.getUTCFullYear();
    getCurrTime = currMonth + '-' + currDay + '-' + currYear;
    //console.log ("Curr Time: ", getCurrTime);
    setDate(getCurrTime);
  };

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          const allExpenseTypes = await getAllExpenseTypes();
          setExpenseTypes(allExpenseTypes);

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
            dataList={expenseTypes}
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
      <Modal
        transparent={true}
        visible={successModalVisible}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MaterialIcons name="check-circle" color={"#00E879"} size={50} />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Thêm giao dịch thành công</Text>
          </View>
        </View>
      </Modal>
      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Phân loại</Text>
          <Text style={styles.errorMessage}>
            {' '}
            {typeError ? 'Không để trống mục này' : null}{' '}
          </Text>
        </View>
        <TextInput
          style={[styles.input, typeError ? styles.inputError : null]}
          value={type}
          placeholder="Chọn phân loại chi tiêu"
          onPressIn={() => setModalVisible(!modalVisible)}
        />
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Số tiền chi tiêu</Text>
          <Text style={styles.errorMessage}>
            {' '}
            {expenseError ? 'Không để trống mục này' : null}{' '}
          </Text>
        </View>
        <TextInput
          style={[styles.input, expenseError ? styles.inputError : null]}
          onChangeText={onChangeExpense}
          value={expense}
          placeholder="Nhập số tiền chi tiêu"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Ghi chú</Text>
        <TextInput
          style={[styles.input_des, { height: '17%' }]}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Nhập ghi chú cho mục tiêu"
          multiline
          keyboardType="text"
          blurOnSubmit={true}
        />

        <Text style={styles.label}>Ví</Text>
        <TextInput
          style={styles.input}
          value={wallet}
          placeholder="Chọn ví"
          onPressIn={() => setWalletModalVisible(!walletModalVisible)}
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            padding: 10,
          }}>
          <Button
            buttonStyle={{
              borderRadius: 20,
              width: 150,
              height: 40,
              backgroundColor: '#181818',
            }}
            style={{ paddingHorizontal: 20 }}
            title="Xóa"
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
              setTypeError(false);
              setExpenseError(false);
              let haveError = false;
              if (type == null || type.trim() == 0) {
                setTypeError(true);
                haveError = true;
              }
              if (expense == null || expense.trim() == 0) {
                setExpenseError(true);
                haveError = true;
              }
              if (haveError) return;
              await addTransaction(
                {
                  type: type,
                  date: date,
                  value: expense,
                  isExpense: true,
                  note: note,
                },
                wallet
              );
              clearData();
              setTypeError(false);
              setExpenseError(false);
              setSuccessModalVisible(true);
              const timer = setTimeout(() => {
                setSuccessModalVisible(false);
              }, 1000);

              return () => clearTimeout(timer);
            }}></Button>
        </View>
      </View>
    </View>
  );
};

export default transactionExpenseAdd;
