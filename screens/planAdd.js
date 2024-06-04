import React, {useState, useEffect} from 'react';
import {View, Switch, TextInput, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
// import components
import InfoBox from '../components/infoBox';
// import style sheet
import styles from '../assets/styleSheet';

const addNewPlan = async (newPlan) => {
  try {
    let storedPlanLst = await AsyncStorage.getItem('plan_lst');
    if (storedPlanLst == null) {
      storedPlanLst = [];
    } else {
      storedPlanLst = JSON.parse(storedPlanLst);
    }
    storedPlanLst.push(newPlan);
    await AsyncStorage.setItem('plan_lst', JSON.stringify(storedPlanLst));
  } catch (error) {
    console.error('Error fetching data: ', error);
  }

}

const planAdd = ({navigation}) => {
  const [isDefault, setIsDefault] = useState(false);
  const [planName, onChangePlanName] = useState(null);
  const [planNameError, setPlanNameError] = useState(false);
  const [des, onChangeDes] = useState(null);
  const toggleSwitch = () => setIsDefault(previousState => !previousState);
  
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
          <Text style={styles.errorMessage}> {planNameError? 'Không để trống mục này' : null} </Text>
        </View>
        <TextInput
          style={[styles.input, planNameError ? styles.inputError : null]}
          onChangeText={onChangePlanName}
          value={planName}
          placeholder="Nhập tên kế hoạch"
        />
     
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.input_des}
          onChangeText={onChangeDes}
          value={des}
          placeholder="Nhập mô tả kế hoạch"
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
            onPress={() => navigation.navigate('DANH SÁCH KẾ HOẠCH')}  
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
                let haveError = false
                if (planName == null || planName.trim() == 0) {
                  setPlanNameError(true);
                  haveError = true;
                }
                if (haveError) return;
                if (isDefault) await AsyncStorage.setItem('default_plan', planName);
                await addNewPlan({title: planName, des: des, target: '0', target_lst: []});
                navigation.navigate('DANH SÁCH KẾ HOẠCH');
              }
            }  
          > 
          </Button>
        </View>
      </View>
    </View>
    
  );
};

export default planAdd;