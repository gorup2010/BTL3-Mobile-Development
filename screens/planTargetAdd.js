import React, {useState, useEffect, useCallback} from 'react';
import {View, Switch, TextInput, Text, StyleSheet, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// import components
import InfoBox from '../components/infoBox';
import ScrollList from '../components/scrollList';
import TransactionChoiceGrid from '../components/transactionChoiceGrid';
import {expenseLst} from '../components/transactionIcon';
// import style sheet
import styles from '../assets/styleSheet';

const addNewTarget = async (newTarget, planName) => {
  try {
    let storedPlanLst = await AsyncStorage.getItem('plan_lst');
    if (storedPlanLst == null) {
      storedPlanLst = [];
    } else {
      storedPlanLst = JSON.parse(storedPlanLst);
    }
    let storedPlanTargetLst = null;
    let storedPlanTarget = null;
    for (let i in storedPlanLst) {
      if (storedPlanLst[i]['title'] == planName){
        storedPlanTargetLst = storedPlanLst[i]['target_lst'];
        storedPlanLst[i]['target'] = (parseInt(storedPlanLst[i]['target']) + parseInt(newTarget['target'])).toString();
      }
    }
    storedPlanTargetLst.push(newTarget);
    await AsyncStorage.setItem('plan_lst', JSON.stringify(storedPlanLst));
  } catch (error) {
    console.error('Error fetching data: ', error);
  }

}

const getRemainTypes = async (planName) => {
  let storedPlanLst = await AsyncStorage.getItem('plan_lst');
  if (storedPlanLst == null) {
    storedPlanLst = [];
  } else {
    storedPlanLst = JSON.parse(storedPlanLst);
  }
  let storedPlanTargetLst = null;
  for (let i in storedPlanLst) {
    //console.log( storedPlanLst[i], planName);
    if (storedPlanLst[i]['title'] == planName) {
      storedPlanTargetLst = storedPlanLst[i]['target_lst'];
    }
  } 
  //console.log("Target List: ", storedPlanTargetLst);
  let usedTypes = [];
  for (let i in storedPlanTargetLst) {
    usedTypes.push(storedPlanTargetLst[i]['type']);
  }
  //console.log("Used Types: ", usedTypes);
  let remainTypes = expenseLst;
  //console.log("All Types: ", remainTypes);
  remainTypes = await remainTypes.filter(item => !(usedTypes.includes(item)));
  //console.log("Remainning Types: ", remainTypes);
  let chunks = [];
  // Iterate over the array in steps of 3
  for (let i = 0; i < remainTypes.length; i += 3) {
    // Slice out a chunk of 3 elements and push it to the chunks array
    chunks.push(remainTypes.slice(i, i + 3));
  }
  return chunks;
}

const planTargetAdd = ({navigation}) => {
  const route = useRoute();
  const { planName } = route.params;
  const changeType = async (type) => {
    //console.log("Running");
    setModalVisible(prevState => !prevState);
    setType(type);
  };
  const [name, setName] = useState('');
  const [remainTypes, setRemainTypes] = useState([]);
  const [note, onChangeNote] = useState(null);
  const [type, setType] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [target, onChangeTarget] = useState(null);
  const [targetError, setTargetError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          setName(planName);
          let tempRemainTypes = await getRemainTypes(planName);
          //console.log("Get Remaining Types: ", tempRemainTypes);
          setRemainTypes(tempRemainTypes);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Chi tiết mục tiêu is unfocused');
      };
    }, [route.params])
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
        <View style={{paddingVertical: 30}}>
          <ScrollList dataList= {remainTypes} onPressFunc={changeType} opheight='100%' option='6'>
          </ScrollList>
        </View>
      </Modal>
      <View style={{alignSelf: 'flex-start', paddingHorizontal: 20, width: '100%'}}>
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Phân loại</Text>
          <Text style={styles.errorMessage}> {typeError? 'Không để trống mục này' : null} </Text>
        </View>
        <TextInput
          style={[styles.input, typeError ? styles.inputError : null]}
          value={type}
          placeholder="Chọn phân loại cho mục tiêu"
          onPressIn={()=>setModalVisible(!modalVisible)}
        />
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Mục tiêu</Text>
          <Text style={styles.errorMessage}> {targetError? 'Không để trống mục này' : null} </Text>
        </View>
        <TextInput
          style={[styles.input, targetError ? styles.inputError : null]}
          onChangeText={onChangeTarget}
          value={target}
          placeholder="Nhập mục tiêu chi tiêu"
          keyboardType="numeric"
        />
     
        <Text style={styles.label}>Ghi chú</Text>
        <TextInput
          style={styles.input_des}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Nhập ghi chú cho mục tiêu"
          multiline
          keyboardType='text'
          blurOnSubmit={true}
        />
      </View>
      
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center', height: "15%"}}>
        <View style={{padding: 20}}>
          <Button
            title="Thoát"
            color="#181818"
            buttonStyle={{borderRadius: 20, width: 100, height: 40, backgroundColor: '#181818'}}
            onPress={() => navigation.navigate('CHI TIẾT KẾ HOẠCH', {planName: name})}  
          > 
          </Button>
        </View>
        <View style={{padding: 20}}>
          <Button
            buttonStyle={{borderRadius: 20, width: 100, height: 40, backgroundColor: '#00E879'}}
            style={{paddingHorizontal: 20}}
            title="Lưu"
            onPress={
              async () => {
                setTypeError(false);
                setTargetError(false);
                let haveError = false
                if (type == null || type.trim() == 0) {
                  setTypeError(true);
                  haveError = true;
                }
                if (target == null || target.trim() == 0) {
                  setTargetError(true);
                  haveError = true;
                }
                if (haveError) return;
                await addNewTarget({type: type, target: target.toString(), note: note}, name);

                navigation.navigate('CHI TIẾT KẾ HOẠCH', {planName: name});
              }
            }  
          > 
          </Button>
        </View>
      </View>
    </View>
    
  );
};

export default planTargetAdd;