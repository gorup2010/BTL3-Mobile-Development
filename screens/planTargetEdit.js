import React, { useState, useEffect, useCallback } from 'react';
import { View, Switch, TextInput, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// import components

const planTargetEdit = ({ navigation }) => {
  const route = useRoute();
  const { type } = route.params;
  const { planName } = route.params;

  const [totalTarget, setTotalTarget] = useState(0);
  const [target, onChangeTarget] = useState("0");
  const [note, onChangeNote] = useState(null);

  const editTarget = async (newTarget) => {
    try {
      let storedPlanLst = await AsyncStorage.getItem('plan_lst');
      if (storedPlanLst == null) {
        storedPlanLst = [];
      } else {
        storedPlanLst = JSON.parse(storedPlanLst);
      }
      let storedPlan = null;
      for (let i in storedPlanLst) {
        if (storedPlanLst[i]['title'] == planName) {
          storedPlan = storedPlanLst[i];
          break;
        }
      }
      let storedTargetLst = storedPlan['target_lst'];
      //console.log(storedTargetLst);
      let tempTotalTarget = totalTarget;
      let targetItem = null;
      for (let i in storedTargetLst) {
        if (storedTargetLst[i]['type'] == type) {
          //console.log(storedTargetLst[i]);
          tempTotalTarget -=  parseInt(storedTargetLst[i]['target']);
          //console.log(tempTotalTarget);
          storedTargetLst[i]['target'] = newTarget['target'];
          tempTotalTarget +=  parseInt(storedTargetLst[i]['target']);
          //console.log(tempTotalTarget);
          storedTargetLst[i]['note'] = newTarget['note'];
          storedPlan['target'] = tempTotalTarget.toString();
        }
      } 

      await AsyncStorage.setItem('plan_lst', JSON.stringify(storedPlanLst));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          const storedPlanLst = JSON.parse(
            await AsyncStorage.getItem('plan_lst')
          );
          let storedPlan = null;
          let storedTargetItem = null;
          for (let i in storedPlanLst) {
            if (storedPlanLst[i]['title'] == planName) {
              storedPlan = storedPlanLst[i];
              setTotalTarget(parseInt(storedPlanLst[i]['target']));
              break;
            }
          }
          for (let i in storedPlan['target_lst']) {
            if (storedPlan['target_lst'][i]['type'] == type) {
              storedTargetItem = storedPlan['target_lst'][i];
              onChangeTarget(storedTargetItem['target']);
              onChangeNote(storedTargetItem['note']);
        
            }
          }
          //onChangeTarget(storedTarget);
          //onChangeNote(storedNote);
          
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

  //console.log("Target: ", target);
  //console.log("Note: ", note);

  return (
    <View style={styles.container}>
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
          editable={false}
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
          placeholder="Nhập ghi chú cho mục tiêu này"
          multiline
          keyboardType="text"
          blurOnSubmit={true}
        />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '15%',
        }}>
        <View style={{ padding: 20 }}>
          <Button
            title="Thoát"
            color="#181818"
            buttonStyle={{
              borderRadius: 20,
              width: 100,
              height: 40,
              backgroundColor: '#181818',
            }}
            onPress={() => navigation.navigate('CHI TIẾT MỤC TIÊU', {type: type, planName: planName})}></Button>
        </View>
        <View style={{ padding: 20 }}>
          <Button
            buttonStyle={{
              borderRadius: 20,
              width: 100,
              height: 40,
              backgroundColor: '#00E879',
            }}
            style={{ paddingHorizontal: 20 }}
            title="Lưu"
            onPress={async () => {
              await editTarget({ type: type, target: target.toString(), note: note });
              navigation.navigate('CHI TIẾT MỤC TIÊU', {type: type, planName: planName});
            }}></Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5E5F65',
  },
  input: {
    height: 45,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE',
  },
  input_des: {
    height: '35%',
    width: '100%',
    textAlignVertical: 'top',
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default planTargetEdit;
