import React, {useState, useEffect, useCallback} from 'react';
import {View, Switch, TextInput, Text, StyleSheet, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// import components
import InfoBox from '../components/infoBox';
import ScrollList from '../components/scrollList';
import TransactionChoiceGrid from '../components/transactionChoiceGrid';
import {expenseLst} from '../components/transactionIcon';

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
    console.log("Running");
    setModalVisible(prevState => !prevState);
    setType(type);
  };
  
  const [remainTypes, setRemainTypes] = useState([]);
  const [note, onChangeNote] = useState(null);
  const [type, setType] = useState(null);
  const [target, onChangeTarget] = useState(null);
  const toggleSwitch = () => setIsDefault(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
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
    }, [])
  );
  
  //console.log("Plan name: ", planName);
  //console.log("Remaining Types: ", remainTypes);
  console.log("Function 0: ", changeType);  

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
        <Text style={styles.label}>Phân loại</Text>
        <TextInput
          style={styles.input}
          value={type}
          placeholder="Chọn phân loại cho mục tiêu"
          onPressIn={()=>setModalVisible(!modalVisible)}
        />
        <Text style={styles.label}>Mục tiêu</Text>
        <TextInput
          style={styles.input}
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
            onPress={() => navigation.navigate('CHI TIẾT KẾ HOẠCH', {planName: planName})}  
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
                await addNewTarget({type: type, target: target.toString(), note: note}, planName);
                navigation.navigate('CHI TIẾT KẾ HOẠCH', {planName: planName});
              }
            }  
          > 
          </Button>
        </View>
      </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5E5F65'
  },
  input: {
    height: 45,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE'
  },
  input_des: {
    height: '35%',
    width: '100%',
    textAlignVertical: "top",
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default planTargetAdd;