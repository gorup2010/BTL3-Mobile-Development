import React, {useState, useEffect, useCallback} from 'react';
import {View, Switch, TextInput, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// import components

// import style sheet
import styles from '../assets/styleSheet';

const planEdit = ({navigation}) => {
  const route = useRoute();
  const { planName } = route.params;

  const [isDefault, setIsDefault] = useState(false);
  const [name, onChangeName] = useState(planName);
  const [nameError, setNameError] = useState(false);
  const [des, onChangeDes] = useState(null);
  const toggleSwitch = () => setIsDefault(previousState => !previousState);

  const editPlan = async (newPlan) => {
  try {
    let storedPlanLst = await AsyncStorage.getItem('plan_lst');
    if (storedPlanLst == null) {
      storedPlanLst = [];
    } else {
      storedPlanLst = JSON.parse(storedPlanLst);
    }
    for (let i in storedPlanLst) {
      if (storedPlanLst[i]['title'] == planName) {
        storedPlanLst[i]['title'] = name;
        storedPlanLst[i]['des'] = des;
        break;
      }
    }
    
    await AsyncStorage.setItem('plan_lst', JSON.stringify(storedPlanLst));
  } catch (error) {
    console.error('Error fetching data: ', error);
  }

}

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
      try {
        const storedDefaultPlan = await AsyncStorage.getItem('default_plan');
        if (storedDefaultPlan !== null && storedDefaultPlan == name) {
          await setIsDefault(true);
        }
        const storedPlanLst = JSON.parse(await AsyncStorage.getItem('plan_lst'));
        let description = '';
        for (let i in storedPlanLst) {
          if (storedPlanLst[i]['title'] == name) {
            description = storedPlanLst[i]['des'];
            break;
          }
        }
        await onChangeDes(description);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    await fetchData();

    return () => {
      console.log('Chỉnh sửa kế hoạch is unfocused');
    };
  }, [])
);
  
  return (
    <View style={styles.container}>
      
      <View style={{alignSelf: 'flex-end', paddingHorizontal: 20}}>
        <Switch
          trackColor={{false: '#D5D8DE', true: '#00E879'}}
          thumbColor={isDefault ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDefault}
        />
      </View>
      <View style={{alignSelf: 'flex-start', paddingHorizontal: 20, width: '100%'}}>
        <View style={styles.labelHeader}>
          <Text style={styles.label}>Tên kế hoạch</Text>
          <Text style={styles.errorMessage}> {nameError? 'Không để trống mục này' : null} </Text>
        </View>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          onChangeText={onChangeName}
          value={name}
          placeholder="Nhập tên ví"
        />
        
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.input_des}
          onChangeText={onChangeDes}
          value={des}
          placeholder="Nhập mục đích sử dụng của ví"
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
                setNameError(false); 
                let haveError = false
                if (name == null || name.trim() == 0) {
                  setNameError(true);
                  haveError = true;
                }
                if (haveError) return;         
                await editPlan({title: name, des: des,});
                if (isDefault) await AsyncStorage.setItem('default_plan', name);
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

export default planEdit;